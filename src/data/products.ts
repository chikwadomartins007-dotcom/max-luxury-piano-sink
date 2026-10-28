import { Product, AtmospherePreset } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_smart_home_1792998458994.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'lunar-halo-sconce',
    name: 'Lumen Lunar Crescent Sconce',
    subtitle: 'Indirect Circadian Ambient Wall Fixture',
    category: 'lighting',
    categoryLabel: 'Smart Lighting',
    price: 1280,
    originalPrice: 1450,
    rating: 4.96,
    reviewCount: 84,
    image: '/src/assets/images/product_lunar_halo_sconce_1792998460218.jpg',
    tag: 'Signature Series',
    description: 'A sculptural crescent luminaire casting soft, shadowless moonlight illumination across wall surfaces. Seamlessly syncs with natural astronomical cycles from dawn warm amber to nocturnal low-lumen moonlight.',
    features: [
      'Stepless 1800K to 5500K dynamic circadian spectrum',
      'Solid aerospace-grade titanium and brushed graphite chassis',
      'Integrated touch-proximity gesture dimming',
      'Matter, Apple Home, Control4, and KNX certified',
      'Zero flicker driver rated for 60,000 continuous hours'
    ],
    specs: [
      { label: 'Luminous Flux', value: '1,400 lm stepless tunable' },
      { label: 'Color Rendering', value: 'CRI 98.4 / R9 > 95' },
      { label: 'Dimensions', value: '540mm H × 290mm W × 45mm D' },
      { label: 'Connectivity', value: 'Thread / Matter / Zigbee 3.0' },
      { label: 'Input Power', value: '100–240V AC, 24W peak' },
      { label: 'Mounting', value: 'Flush magnetic dock with safety latch' }
    ],
    finishes: [
      { id: 'obsidian', name: 'Brushed Obsidian Titanium', hex: '#262930' },
      { id: 'champagne', name: 'Champagne Gold PVD', hex: '#CDB172' },
      { id: 'basalt', name: 'Matte Basalt Black', hex: '#14161B' }
    ],
    leadTime: 'In Stock · Ships in 48 hours',
    inStock: true
  },
  {
    id: 'aura-climate-dial',
    name: 'Aura Precision Climate Dial',
    subtitle: 'Thermal Regulation & Air Quality Terminal',
    category: 'climate',
    categoryLabel: 'Climate Control',
    price: 1450,
    originalPrice: 1600,
    rating: 4.98,
    reviewCount: 112,
    image: '/src/assets/images/product_climate_thermostat_dial_1792998460921.jpg',
    tag: 'Architectural Edition',
    description: 'Precision knurled rotary console with hidden-until-lit micro-LED matrix. Delivers continuous micro-zone temperature modulation, continuous indoor air filtration monitoring, and humidity equilibrium.',
    features: [
      'Diamond-knurled aerospace alloy bezel with tactile haptic feedback',
      'Hidden-until-lit microscopic OLED display matrix behind dark titanium face',
      'Multi-sensor suite: VOC, PM2.5, Humidity, CO2, Barometric pressure',
      'Self-learning predictive comfort algorithm',
      'Whisper-quiet damper control with multi-stage HVAC compatibility'
    ],
    specs: [
      { label: 'Display', value: 'Ultra-dense Micro-LED ambient sensor array' },
      { label: 'Sensors', value: 'NDIR CO2, Laser PM2.5, Temp (±0.1°F), RH%' },
      { label: 'Dimensions', value: '88mm diameter × 18mm wall projection' },
      { label: 'HVAC Compatibility', value: 'Heat Pump, Hydronic Radiant, VRF/VRV' },
      { label: 'Wiring', value: '24V standard C-wire or wireless battery dock' },
      { label: 'Finish', value: 'PVD vapor-deposited matte titanium' }
    ],
    finishes: [
      { id: 'titanium', name: 'Dark Titanium Gunmetal', hex: '#31343C' },
      { id: 'stealth', name: 'Matte Obsidian Black', hex: '#111317' },
      { id: 'brass', name: 'Burnished Warm Brass', hex: '#B89758' }
    ],
    leadTime: 'In Stock · Complimentary White-Glove Setup',
    inStock: true
  },
  {
    id: 'crescent-floor-lamp',
    name: 'Crescent Arc Sculptural Floor Node',
    subtitle: 'Freestanding Circadian Living Light',
    category: 'lighting',
    categoryLabel: 'Smart Lighting',
    price: 2850,
    originalPrice: 3100,
    rating: 4.94,
    reviewCount: 67,
    image: '/src/assets/images/product_crescent_floor_lamp_1792998461728.jpg',
    tag: 'Limited Architectural Piece',
    description: 'An architectural focal point defined by an unbroken parabolic crescent sweep. Floods seating lounges with meditative, glare-free indirect moonlight glow without visible hardware or dangling cables.',
    features: [
      'Monolithic extruded aeronautical aluminum arch with concealed counterweight base',
      'Concealed capacitive brass touch interface along arc spine',
      'Astronomical sunset simulation with 1% deep amber nightlight mode',
      'Dual-zone control: indirect room wash and targeted reading glow',
      'Braided graphite power umbilical with solid brass foot tap switch'
    ],
    specs: [
      { label: 'Height / Reach', value: '2,150mm Height × 1,820mm Arc Reach' },
      { label: 'Base Weight', value: '24 kg solid precision counterweight' },
      { label: 'Max Output', value: '3,200 lm stepless dimmable (0.1% to 100%)' },
      { label: 'Color Temp', value: '1600K candle warmth to 5000K daylight' },
      { label: 'Efficiency', value: '110 lm/W high-density linear array' },
      { label: 'Finish', value: 'Architectural powdercoat with brass accents' }
    ],
    finishes: [
      { id: 'obsidian-brass', name: 'Obsidian Arc with Brass Accent', hex: '#1E2024' },
      { id: 'graphite-monolith', name: 'Pure Brushed Graphite', hex: '#2E323A' }
    ],
    leadTime: 'Low Stock · 6 Units Remaining',
    inStock: true
  },
  {
    id: 'celeste-ceiling-matrix',
    name: 'Celeste Integrated Ceiling Matrix',
    subtitle: 'Concentric Lunar Light & Laminar Airflow Cassette',
    category: 'unified',
    categoryLabel: 'Unified Systems',
    price: 3600,
    originalPrice: 3950,
    rating: 5.0,
    reviewCount: 43,
    image: '/src/assets/images/product_ambient_ceiling_node_1792998461264.jpg',
    tag: 'Unified Architecture',
    description: 'The pinnacle of architectural integration. Combines concentric lunar ring lighting with whisper-silent laminar airflow louvers into a single zero-sightline flush ceiling terminal.',
    features: [
      'Dual concentric halo rings for uniform, glare-free ceiling radiance',
      'Perimeter 360° micro-laminar climate air dispersion (sub-18dB whisper quiet)',
      'Built-in thermal imaging room occupancy and temperature sensor',
      'Completely eliminates ugly plastic ceiling grilles and separate fixtures',
      'Engineered for flush drywall or architectural panel mud-in installation'
    ],
    specs: [
      { label: 'Dimensions', value: '600mm × 600mm flush square profile' },
      { label: 'Air Flow Capacity', value: 'Up to 280 CFM laminar whisper quiet' },
      { label: 'Acoustics', value: 'NC-18 (< 19 dBA at full volume)' },
      { label: 'Lighting Output', value: '4,500 lm high-efficacy diffused halo' },
      { label: 'Thermal Sensor', value: '16-pixel spatial thermal array' },
      { label: 'Integration', value: 'BACnet / KNX / Crestron / Matter' }
    ],
    finishes: [
      { id: 'graphite-black', name: 'Architectural Matte Graphite', hex: '#1A1C22' },
      { id: 'pure-plaster', name: 'Plaster-in Primed White', hex: '#EAE6DF' }
    ],
    leadTime: 'Custom Built · 10 Business Days',
    inStock: true
  },
  {
    id: 'atmosphere-master-bridge',
    name: 'Atmosphere Core Master Bridge',
    subtitle: 'Edge AI Automation & Multiprotocol Gateway',
    category: 'hubs',
    categoryLabel: 'Control Hubs',
    price: 890,
    originalPrice: 990,
    rating: 4.92,
    reviewCount: 128,
    image: '/src/assets/images/product_climate_thermostat_dial_1792998460921.jpg',
    tag: 'Autonomous Core',
    description: 'Milled from a solid block of black anodized billet aluminum. Runs 100% offline edge automation so your home lighting and climate respond with zero internet dependency and absolute cryptographic privacy.',
    features: [
      'Sub-5ms local automation trigger latency',
      '100% offline edge execution — no cloud telemetry or subscription required',
      'Native Matter, Thread border router, Zigbee 3.0, and Dual-Band WiFi',
      'Predictive thermal inertia model saves up to 32% HVAC energy',
      'Passively cooled silent acoustic chassis'
    ],
    specs: [
      { label: 'Processor', value: 'Quad-Core 2.0GHz Edge NPU' },
      { label: 'Memory / Storage', value: '4GB LPDDR4 / 64GB Industrial eMMC' },
      { label: 'Radios', value: 'Thread (802.15.4), Zigbee 3.0, BLE 5.3' },
      { label: 'Ports', value: 'Gigabit Ethernet with 802.3af PoE' },
      { label: 'Dimensions', value: '110mm × 110mm × 26mm' },
      { label: 'Enclosure', value: 'CNC 6061 billet aluminum block' }
    ],
    finishes: [
      { id: 'obsidian-black', name: 'Anodized Obsidian Black', hex: '#0F1115' },
      { id: 'space-graphite', name: 'Space Graphite', hex: '#2A2E38' }
    ],
    leadTime: 'In Stock · Ships in 24 hours',
    inStock: true
  },
  {
    id: 'lunar-crescent-linear-array',
    name: 'Crescent Cove Micro-Linear System',
    subtitle: 'Continuous Indirect Architectural Illumination',
    category: 'lighting',
    categoryLabel: 'Smart Lighting',
    price: 740,
    originalPrice: 820,
    rating: 4.95,
    reviewCount: 56,
    image: '/src/assets/images/hero_luxury_smart_home_1792998458994.jpg',
    tag: 'Architectural Channel',
    description: 'Continuous modular indirect cove lighting profile delivering high-density dotless illumination with seamless wall grazing and circadian curve synchronization.',
    features: [
      'Dot-free continuous phosphor optical diffusion lens',
      'Field-cuttable every 25mm for bespoke millwork and ceiling drops',
      'Ultra-deep dimming down to 0.01% without color shift',
      'High copper double-layer PCB for zero voltage drop over 15 meters',
      'Pre-curved crescent corners and magnetic channel mounting'
    ],
    specs: [
      { label: 'Output', value: '1,200 lm per meter' },
      { label: 'Color Range', value: '1800K to 6500K Tunable White' },
      { label: 'Voltage', value: '24V DC constant voltage' },
      { label: 'Dimensions', value: '18mm profile width × 12mm depth' },
      { label: 'Certification', value: 'UL Listed / CE / Title 24 Compliant' },
      { label: 'Driver', value: 'DALI-2 / 0-10V / Matter wireless' }
    ],
    finishes: [
      { id: 'black-profile', name: 'Black Anodized Channel', hex: '#1C1D21' },
      { id: 'bronze-profile', name: 'Muted Bronze Channel', hex: '#3B332A' }
    ],
    leadTime: 'In Stock · Sold per 5-meter kit',
    inStock: true
  }
];

export const ATMOSPHERE_PRESETS: AtmospherePreset[] = [
  {
    id: 'lunar-dusk',
    name: 'Moonlight Dusk',
    lightingTemp: 2200,
    brightness: 35,
    temperature: 71,
    humidity: 48,
    modeDescription: 'Deep twilight ambience with glowing warm perimeter halos and chilled ambient air for evening relaxation.',
    glowColor: 'rgba(235, 185, 110, 0.45)'
  },
  {
    id: 'circadian-focus',
    name: 'Circadian Clarity',
    lightingTemp: 4800,
    brightness: 85,
    temperature: 69,
    humidity: 45,
    modeDescription: 'Crisp architectural illumination paired with active laminar ventilation to enhance mental clarity and focus.',
    glowColor: 'rgba(215, 235, 255, 0.45)'
  },
  {
    id: 'warm-hearth',
    name: 'Sanctuary Amber',
    lightingTemp: 1800,
    brightness: 25,
    temperature: 73,
    humidity: 50,
    modeDescription: 'Ultra-warm low-kelvin candlelight aesthetic with gentle radiant heat for intimate dinner and conversation.',
    glowColor: 'rgba(240, 150, 70, 0.5)'
  },
  {
    id: 'deep-sleep',
    name: 'Lunar Sleep Equilibrium',
    lightingTemp: 1900,
    brightness: 6,
    temperature: 66,
    humidity: 52,
    modeDescription: 'Zero-blue light spectrum at sub-10 lux with optimized sleep-cycle cooling (66°F) for deep REM restorative rest.',
    glowColor: 'rgba(220, 175, 120, 0.2)'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Max Luxury Home Tech transformed our Tribeca duplex. The crescent ambient lights recreate the calm of moonlight at night, and the precision climate dial has completely eliminated drafts and hot zones.",
    author: "Elena Vance",
    role: "Architect & Partner",
    firm: "Vance + Atelier NY",
    location: "New York, NY"
  },
  {
    quote: "The Celeste ceiling system is an engineering masterpiece. Visitors marvel at how clean our ceilings look without visible HVAC grilles, while the ambient concentric lighting sets an unmatched mood.",
    author: "Julian Moreau",
    role: "Private Collector & Villa Owner",
    firm: "Villa Solarium",
    location: "Bel Air, CA"
  },
  {
    quote: "Their offline edge automation was the deciding factor. Complete instantaneous responsiveness, zero cloud dependencies, and finishes that match our custom titanium millwork.",
    author: "Dr. Alistair Thorne",
    role: "Technology Executive",
    firm: "Lakeview Residence",
    location: "Zurich, Switzerland"
  }
];

export const RESIDENCE_SPACES = [
  {
    id: 'penthouse',
    name: 'Penthouse Salon',
    description: 'Expansive open-plan living with floor-to-ceiling glass and high ceilings.',
    recommendedFixtures: '2× Crescent Arc Nodes + 4× Lunar Sconces + 2× Celeste Matrix Air/Light Cassettes',
    estimatedCoverage: '1,400 sq.ft / 3 Climate Zones'
  },
  {
    id: 'master-suite',
    name: 'Master Sanctuary',
    description: 'Circadian lighting synchronized to astronomical sleep patterns with silent night cooling.',
    recommendedFixtures: '2× Lunar Crescent Sconces + 1× Aura Precision Climate Dial + Perimeter Micro-Linear Cove',
    estimatedCoverage: '650 sq.ft / 1 Precision Micro-Zone'
  },
  {
    id: 'gallery-dining',
    name: 'Architectural Dining & Gallery',
    description: 'High-CRI museum grade art lighting with precision humidity control for fine art.',
    recommendedFixtures: '6× Lunar Crescent Wall Nodes + 1× Celeste Unified Cassette + Atmosphere Master Bridge',
    estimatedCoverage: '900 sq.ft / 2 Climate Zones'
  }
];
