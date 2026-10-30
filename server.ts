import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Meta Pixel ID from moonlightcrecent.shop
const DEFAULT_PIXEL_ID = '947636671276929';
const PIXEL_ID = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
const GRAPH_API_VERSION = 'v21.0';

// In-memory diagnostics event buffer (last 50 events)
interface TrackedEventLog {
  id: string;
  eventName: string;
  eventId: string;
  timestamp: string;
  value?: number;
  currency?: string;
  sentToMeta: boolean;
  metaResponse?: any;
  userDataPreview: {
    hasEmail: boolean;
    hasPhone: boolean;
    hasFbp: boolean;
    hasFbc: boolean;
    ip: string;
  };
}

const eventHistory: TrackedEventLog[] = [];

// Helper hashing functions compliant with Meta Conversions API specifications
function hashSha256(value?: string): string | undefined {
  if (!value) return undefined;
  const clean = value.trim().toLowerCase();
  if (!clean) return undefined;
  return crypto.createHash('sha256').update(clean).digest('hex');
}

function hashPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // If Nigerian local format starting with 0, convert to international +234
  if (digits.startsWith('0') && digits.length === 11) {
    digits = '234' + digits.slice(1);
  }
  return crypto.createHash('sha256').update(digits).digest('hex');
}

function extractCookie(req: Request, name: string): string | undefined {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : undefined;
}

// ==========================================
// Meta Conversions API Endpoints
// ==========================================

// 1. Status & Diagnostics Endpoint
app.get('/api/meta-conversions/status', (_req: Request, res: Response) => {
  const token = process.env.META_CONVERSIONS_API_TOKEN || process.env.META_ACCESS_TOKEN;
  res.json({
    status: 'online',
    pixelId: PIXEL_ID,
    hasServerToken: Boolean(token),
    testEventCode: process.env.META_TEST_EVENT_CODE || null,
    totalEventsReceived: eventHistory.length,
    recentEvents: eventHistory.slice(-15).reverse(),
    instructions: token
      ? 'Meta Conversions API is fully connected with active server token.'
      : 'Events are being received and processed. To send directly to Meta Graph API, provide META_CONVERSIONS_API_TOKEN in the environment.'
  });
});

// 2. Main Conversions API Dispatch Handler
const handleMetaConversions = async (req: Request, res: Response) => {
  try {
    const {
      event_name,
      event_id,
      event_source_url,
      custom_data = {},
      user_data = {},
      test_event_code
    } = req.body;

    if (!event_name) {
      return res.status(400).json({ error: 'event_name is required' });
    }

    const eventId = event_id || `capi_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const eventTime = Math.floor(Date.now() / 1000);
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
    const clientUserAgent = req.headers['user-agent'] || 'Mozilla/5.0';

    // Normalize user identifiers
    const fbp = user_data.fbp || extractCookie(req, '_fbp');
    const fbc = user_data.fbc || extractCookie(req, '_fbc');

    // Build the Meta Conversions API standard payload
    const normalizedUserData: Record<string, any> = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
    };

    if (fbp) normalizedUserData.fbp = fbp;
    if (fbc) normalizedUserData.fbc = fbc;
    if (user_data.em) normalizedUserData.em = [hashSha256(user_data.em)];
    if (user_data.ph) normalizedUserData.ph = [hashPhone(user_data.ph)];
    if (user_data.fn) normalizedUserData.fn = [hashSha256(user_data.fn)];
    if (user_data.ct) normalizedUserData.ct = [hashSha256(user_data.ct)];

    const eventPayload: Record<string, any> = {
      event_name,
      event_time: eventTime,
      event_id: eventId,
      event_source_url: event_source_url || (req.headers.referer as string) || `https://${req.headers.host}/`,
      action_source: 'website',
      user_data: normalizedUserData,
      custom_data: {
        currency: custom_data.currency || 'NGN',
        value: typeof custom_data.value === 'number' ? custom_data.value : undefined,
        content_name: custom_data.content_name,
        content_type: custom_data.content_type || 'product',
        content_ids: custom_data.content_ids || (custom_data.product_id ? [custom_data.product_id] : undefined),
        num_items: custom_data.num_items,
        order_id: custom_data.order_id,
        ...custom_data
      }
    };

    const accessToken = process.env.META_CONVERSIONS_API_TOKEN || process.env.META_ACCESS_TOKEN;
    const testCode = test_event_code || process.env.META_TEST_EVENT_CODE;

    let metaResult: any = null;
    let sentToMeta = false;

    if (accessToken) {
      try {
        const metaRequestBody: Record<string, any> = {
          data: [eventPayload]
        };
        if (testCode) {
          metaRequestBody.test_event_code = testCode;
        }

        const metaResponse = await fetch(
          `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${accessToken}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metaRequestBody)
          }
        );

        metaResult = await metaResponse.json();
        sentToMeta = metaResponse.ok;
        console.log(`[Meta CAPI] Dispatched ${event_name} (Event ID: ${eventId}) -> HTTP ${metaResponse.status}`);
      } catch (metaErr) {
        console.error('[Meta CAPI] Remote dispatch error:', metaErr);
        metaResult = { error: String(metaErr) };
      }
    } else {
      console.log(`[Meta CAPI Local Log] Event: ${event_name} | ID: ${eventId} | Value: ${custom_data.value || 'N/A'} (No live access token in env)`);
      metaResult = {
        status: 'simulated_success',
        notice: 'Event captured and validated for Meta CAPI. Provide META_CONVERSIONS_API_TOKEN to transmit to live Meta Graph API.'
      };
    }

    // Record into in-memory diagnostics history
    eventHistory.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      eventName: event_name,
      eventId,
      timestamp: new Date().toISOString(),
      value: custom_data.value,
      currency: custom_data.currency || 'NGN',
      sentToMeta,
      metaResponse: metaResult,
      userDataPreview: {
        hasEmail: Boolean(user_data.em),
        hasPhone: Boolean(user_data.ph),
        hasFbp: Boolean(fbp),
        hasFbc: Boolean(fbc),
        ip: clientIp
      }
    });

    if (eventHistory.length > 50) {
      eventHistory.shift();
    }

    return res.status(200).json({
      success: true,
      event_name,
      event_id: eventId,
      pixel_id: PIXEL_ID,
      sent_to_meta: sentToMeta,
      meta_response: metaResult
    });
  } catch (err: any) {
    console.error('[Meta CAPI Error]', err);
    return res.status(500).json({ error: 'Failed to process Conversions API event', details: err?.message });
  }
};

app.post('/api/meta-conversions', handleMetaConversions);
app.post('/api/capi', handleMetaConversions);

// ==========================================
// Formspree Order Forwarder & Backup Store
// ==========================================
const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjyyrzjw';
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || DEFAULT_FORMSPREE_ENDPOINT;

interface OrderRecord {
  order_id: string;
  customer_name?: string;
  phone_number?: string;
  delivery_address?: string;
  ordered_items?: string;
  total_amount?: string;
  timestamp: string;
  formspree_status?: string;
}

const receivedOrders: OrderRecord[] = [];

// Order submission handler (backup and Formspree proxy)
app.post('/api/order', async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const orderId = orderData.order_id || `ORD-${Date.now()}`;

    // Record order in memory
    const record: OrderRecord = {
      order_id: orderId,
      customer_name: orderData.customer_name,
      phone_number: orderData.phone_number,
      delivery_address: orderData.delivery_address,
      ordered_items: orderData.ordered_items,
      total_amount: orderData.total_amount_payable,
      timestamp: new Date().toISOString()
    };

    // Forward to Formspree
    let formspreeOk = false;
    try {
      const fsRes = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      formspreeOk = fsRes.ok;
      record.formspree_status = fsRes.ok ? 'delivered_to_formspree' : `error_${fsRes.status}`;
      console.log(`[Formspree Order] ${orderId} -> Formspree HTTP ${fsRes.status}`);
    } catch (fsErr) {
      console.error('[Formspree Forward Error]', fsErr);
      record.formspree_status = 'network_error';
    }

    receivedOrders.push(record);
    if (receivedOrders.length > 100) receivedOrders.shift();

    return res.status(200).json({
      success: true,
      order_id: orderId,
      formspree_status: record.formspree_status,
      formspree_endpoint: FORMSPREE_ENDPOINT
    });
  } catch (err: any) {
    console.error('[Order Processing Error]', err);
    return res.status(500).json({ error: 'Order processing failed', details: err?.message });
  }
});

app.get('/api/orders', (_req: Request, res: Response) => {
  res.json({
    totalOrders: receivedOrders.length,
    formspreeEndpoint: FORMSPREE_ENDPOINT,
    orders: receivedOrders.slice(-20).reverse()
  });
});

// ==========================================
// Vite Integration (Dev & Production)
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Max Luxury Home Tech running on http://0.0.0.0:${PORT}`);
    console.log(`[Meta CAPI] Listening for events on /api/meta-conversions (Pixel ID: ${PIXEL_ID})`);
  });
}

startServer();
