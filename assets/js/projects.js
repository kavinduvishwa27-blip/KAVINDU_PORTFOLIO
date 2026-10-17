/* =========================================================
   PROJECT DATA — every card and case study is built from this.
   To add a project: copy one object, change the fields, and
   drop its images in assets/img/<folder>/.
   gallery sizes: "wide" (2 cols), "tall" (2 rows), "normal".
   ========================================================= */
window.PROJECTS = [
  {
    id: 'emmark',
    category: 'systems',
    year: '2026',
    client: 'EMMARK Light Fittings Wholesale',
    card: 'EMMARK Lighting — Website & ERP',
    summary: 'Wholesale LED lighting website with a live catalogue, quote builder and lighting calculator, backed by a full ERP for quotations, invoices, inventory and China → Sri Lanka shipments.',
    tags: ['JavaScript', 'Three.js', 'Cloudflare Workers', 'ERP'],
    title: 'EMMARK <em>Lighting</em><br/>Website &amp; ERP',
    tagline: 'A premium public catalogue for a lighting wholesaler, and the secure business platform behind it that runs sales, stock and shipments.',
    links: [
      ['Visit live site', 'https://emmark.kavinduvishwa27.workers.dev/'],
      ['ERP staff sign-in', 'https://emmark.kavinduvishwa27.workers.dev/erp/index.html']
    ],
    facts: [['Client', 'EMMARK'], ['Role', 'Full-Stack Developer'], ['Year', '2026'], ['Scope', 'Website · ERP']],
    overview: [
      'EMMARK imports light fittings from China and sells them wholesale across Sri Lanka. The owner works from China while the sales team works locally, so the business needed one platform both sides could run from — not just a brochure site.',
      'The <strong>public website</strong> is a fast, mobile-first catalogue of 100 products across six ranges, with a 3D hero, product detail pages, a quote list customers build as they browse, and a “Light Lab” that estimates how much light a room needs and previews colour temperature.',
      'Behind it sits the <strong>ERP</strong>: leads, quotations, sales orders, invoices, payments, inventory across warehouses, purchase orders, shipments and customs with landed cost, expenses, profitability reports and user roles. Every action in the ERP is monitored: who created, edited, approved or deleted what, and when, is written to an audit log the owner can review from anywhere. The public site never exposes prices, staff logins or customer data.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'Cloudflare Workers', 'Cloudflare D1 (SQL)', 'Python build tooling', 'Role-based access'],
    features: [
      ['Live Product Catalogue', 'Six lighting ranges, filterable product pages and SKU detail views, generated from a single catalogue source.'],
      ['Quote Builder', 'Customers add fittings to a quote list and send a request; it lands in the ERP as a lead for the sales team.'],
      ['Light Lab Tools', 'A room lighting calculator (lumens, lux, wattage) and a 2700K–6500K colour-temperature preview.'],
      ['Business ERP', 'Quotations, invoices, inventory, purchase orders, shipments and customs, behind a staff-only sign-in with role permissions and an audit log of every action.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/emmark/home.jpg', 'Homepage', 'wide'],
      ['assets/img/emmark/mobile.jpg', 'Mobile view', 'tall'],
      ['assets/img/emmark/ranges.jpg', 'Lighting ranges', 'normal'],
      ['assets/img/emmark/products.jpg', 'Product catalogue', 'normal'],
      ['assets/img/emmark/product-detail.jpg', 'Product detail', 'normal'],
      ['assets/img/emmark/lux-calculator.jpg', 'Light Lab calculator', 'wide'],
      ['assets/img/emmark/quote.jpg', 'Request a quote', 'normal'],
      ['assets/img/emmark/erp-signin.jpg', 'ERP staff sign-in', 'wide']
    ]
  },
  {
    id: 'exa',
    category: 'web',
    year: '2026',
    client: 'Exa Studio Desks',
    card: 'EXA Studio Desks — Store & 3D Desk Builder',
    summary: 'A fast, 3D-driven store for a Sri Lankan desk workshop: a live Three.js desk builder, 20-product catalogue with exact pricing, PDF quotations and WhatsApp checkout.',
    tags: ['JavaScript', 'Three.js', 'Cloudflare Pages', 'E-Commerce'],
    title: 'EXA <em>Studio</em><br/>Desks &amp; 3D Builder',
    tagline: 'A 3D-driven storefront for a studio-desk workshop in Hanwella, from a live desk builder to WhatsApp checkout and branded PDF quotations.',
    links: [],
    facts: [['Client', 'Exa Studio Desks'], ['Role', 'Full-Stack Developer'], ['Year', '2026'], ['Scope', 'E-Commerce · 3D']],
    overview: [
      'Exa Studio Desks builds studio, office and gaming desks in Hanwella, Sri Lanka, and sold mostly through a WhatsApp Business catalogue. They needed a real storefront that shows the craftsmanship, quotes exact prices and still lets customers order the way they already do: on WhatsApp.',
      'The <strong>store</strong> carries all 20 catalogue products with their real photos, every size, colour and price, collection filters, search and a cart that sends the order to WhatsApp with a reference number. Any product can be exported as a <strong>professional PDF quotation</strong> with the company logo, quotation number, validity date, warranty wording, terms and signature lines.',
      'A <strong>Three.js 3D studio</strong> lets customers plan a custom desk (size, finish, frame and extras) and request a quote, while the home page previews finishes in 3D and draws the flagship desk’s measurements as you scroll. Live Google reviews, SEO structured data, security headers, keyboard navigation and a reduced-motion path are built in.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'Cloudflare Pages', 'Pages Functions', 'PDF generation', 'Structured data (SEO)'],
    features: [
      ['3D Desk Builder', 'Size, finish, frame and extras rendered live in 3D, then sent as a quotation request on WhatsApp.'],
      ['Exact Catalogue Pricing', 'Every variant, colour, sale price and warranty line comes from one catalogue file, so the site always matches the shop.'],
      ['PDF Quotations', 'Branded quotations with live preview, product photos, totals, payment options, terms and signature lines.'],
      ['WhatsApp Checkout', 'Cart, customer details and payment options (Cash on Delivery or KoKo) sent to WhatsApp with an order reference.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/exa/home.jpg', 'Homepage — flagship studio table', 'wide'],
      ['assets/img/exa/mobile.jpg', 'Mobile view', 'tall'],
      ['assets/img/exa/finishes.jpg', 'Live 3D finish preview', 'normal'],
      ['assets/img/exa/anatomy.jpg', 'Measurements drawn on scroll', 'normal'],
      ['assets/img/exa/shop.jpg', 'The collection', 'normal'],
      ['assets/img/exa/product.jpg', 'Product page with exact pricing', 'wide'],
      ['assets/img/exa/build.jpg', '3D custom desk studio', 'wide']
    ]
  },
  {
    id: 'freelancer',
    category: 'web',
    year: '2026',
    client: 'Freelancer College',
    card: 'Freelancer College — Website & Admin',
    summary: 'Course website for a Sinhala-language freelancing school, with cohort enrolment, online checkout and an admin panel that edits live content, leads and payments without a rebuild.',
    tags: ['Python', 'JavaScript', 'Cloudflare Pages', 'D1'],
    title: 'Freelancer <em>College</em><br/>Website &amp; Admin',
    tagline: 'A clean, conversion-focused course website and the admin system that lets a small team run enrolments, leads and content themselves.',
    links: [['Visit live site', 'https://learn-with-bevin.pages.dev/']],
    facts: [['Client', 'Freelancer College'], ['Role', 'Developer'], ['Year', '2026'], ['Scope', 'Website · Admin panel']],
    overview: [
      'Freelancer College teaches sellable skills such as UI/UX design and Linux in Sinhala, then the system to turn them into paid work. The site needed to explain the programs clearly, show proof, and take people from interest to enrolment.',
      'The <strong>public website</strong> covers the courses (Designer X and Linux Master), the LEAP method, success stories, webinars, free resources, a blog and checkout, built mobile-first and fast on Cloudflare Pages.',
      'The <strong>admin panel</strong> manages batch dates and prices, curriculum, FAQs, testimonials and blog posts, and changes go live in about ten seconds with no rebuild. Every form lands as a lead, every checkout becomes an enrolment, seats-left updates automatically, and card payments are recorded through PayHere.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Python (build)', 'Cloudflare Pages', 'Pages Functions', 'Cloudflare D1 (SQL)', 'PayHere'],
    features: [
      ['Live Content Editing', 'Prices, dates, curriculum, FAQs and blog posts are edited in the panel and appear on the site within seconds.'],
      ['Leads &amp; Enrolments', 'Webinar, contact, quiz and waitlist forms feed one lead list, with status, notes, WhatsApp and CSV export.'],
      ['Payments &amp; Seats', 'Checkout creates an enrolment; payments update its status and the seats left shown on the website.'],
      ['Secure &amp; Resilient', 'Admin protected by password or Cloudflare Access; if the database is unreachable, pre-built pages are served so the site never breaks.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/freelancer/home.jpg', 'Homepage', 'wide'],
      ['assets/img/freelancer/mobile.jpg', 'Mobile view', 'tall'],
      ['assets/img/freelancer/courses.jpg', 'Courses', 'normal'],
      ['assets/img/freelancer/method.jpg', 'The LEAP method', 'normal'],
      ['assets/img/freelancer/designer-x.jpg', 'Designer X program', 'normal'],
      ['assets/img/freelancer/webinar.jpg', 'Free webinar registration', 'wide']
    ]
  },
  {
    id: 'grandcanyon',
    category: 'web',
    year: '2026',
    client: 'Grand Canyon Banquet Hall',
    card: 'Grand Canyon — Banquet Hall Website',
    summary: '“The night lights up here.” A cinematic, scroll-told site for a banquet hall in Pethiyagoda: pinned scenes, doors that open as you scroll, and a colour picker that relights the whole page.',
    tags: ['JavaScript', 'GSAP', 'Motion Design', 'Cloudflare Pages'],
    title: 'Grand <em>Canyon</em><br/>Banquet Hall',
    tagline: 'A cinematic, scroll-told website built around the venue’s real signature: its neon sign, colour-lit lotus pillars and light-up dance floor.',
    links: [],
    facts: [['Client', 'Grand Canyon Banquet Hall'], ['Role', 'Designer &amp; Developer'], ['Year', '2026'], ['Focus', 'Motion · Bookings']],
    overview: [
      'Grand Canyon is a wedding and events hall on Gampaha Road, Pethiyagoda. Its signature is light, so instead of a generic venue template the website was designed around one idea: <strong>“The night lights up here.”</strong>',
      'The home page tells <strong>one evening as a sequence of scenes</strong>. The neon sign flickers on, the hall’s doors swing open as you scroll, four acts of the night slide sideways while the room changes colour, and a spotlight iris opens on the first dance. Every photo appears exactly once.',
      'Visitors can <strong>pick a pillar colour</strong> and the whole site relights to match; the choice is remembered and added to their WhatsApp enquiry. Real Google reviews, a facilities list and a four-step “check your date” flow finish the page, and with reduced motion or no JavaScript every section and button still works.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'GSAP + ScrollTrigger', 'Lenis smooth scroll', 'Cloudflare Pages', 'WhatsApp enquiries', 'Reduced-motion fallback'],
    features: [
      ['Scroll-Told Story', 'Arrive, the hall, your colours, the evening, the moment: one night told as pinned, cinematic scenes.'],
      ['Live Colour Theming', 'Pick a pillar colour and every neon accent on the site follows it, then rides along into the booking enquiry.'],
      ['Four Acts, Sideways', 'A pinned horizontal sequence where the room’s colour changes with each act of the night.'],
      ['Booking-First Design', 'A magnetic “Check your date” flow, real reviews and WhatsApp hand-off, so every scene leads to an enquiry.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/grandcanyon/home.jpg', 'Opening scene — the night lights up', 'wide'],
      ['assets/img/grandcanyon/mobile.jpg', 'Mobile view', 'tall'],
      ['assets/img/grandcanyon/colours.jpg', 'Pick a colour, the hall wears it', 'normal'],
      ['assets/img/grandcanyon/reviews.jpg', 'Real Google reviews', 'normal'],
      ['assets/img/grandcanyon/evening.jpg', 'One night, four acts', 'wide'],
      ['assets/img/grandcanyon/inside.jpg', 'The hall doors open', 'wide']
    ]
  },
  {
    id: 'fitness',
    category: 'web',
    year: '2026',
    client: 'Fitness Glory Gym',
    card: 'Fitness Glory — Gym Website & Fitness Lab',
    summary: 'A bold, data-driven site for a two-branch gym: branch comparisons, plan-finder quiz, smart pricing toggles, supplement shop and a Fitness Lab of BMI, macro and workout tools.',
    tags: ['JavaScript', 'Data-Driven UI', 'Calculators', 'Cloudflare Pages'],
    title: 'Fitness <em>Glory</em><br/>Gym &amp; Fitness Lab',
    tagline: 'A high-energy website for a two-branch gym in Gampaha and Udugampola, built to turn visitors into members.',
    links: [],
    facts: [['Client', 'Fitness Glory'], ['Role', 'Web Developer'], ['Year', '2026'], ['Scope', 'Website · Tools']],
    overview: [
      'Fitness Glory runs two training floors, in Gampaha and Udugampola. The site needed to show both branches honestly, make the packages easy to compare and move every interested visitor towards a conversation on WhatsApp.',
      'The <strong>home page</strong> covers branch photo sliders with a side-by-side comparison, services, a plan-finder quiz, pricing with branch and single/couple toggles, a membership cost calculator, a supplement shop, a filterable gallery with lightbox, reels, FAQ and a contact form that sends through WhatsApp or email.',
      'A separate <strong>Fitness Lab</strong> gives members real tools: BMI, calories and macros, one-rep max, a weekly workout planner and a hydration target. Prices, branches and contact details live in one data file, so a single edit updates pricing, quiz, calculator and gallery at once. Dark and light themes and a phone-first bottom navigation are included.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Data-driven content', 'Cloudflare Pages', 'WhatsApp integration', 'Dark / light themes', 'Responsive design'],
    features: [
      ['Plan-Finder Quiz', 'A few questions about goals and schedule point each visitor to the right branch and package.'],
      ['Smart Pricing', 'Branch and couple toggles recalculate every plan, with the per-month cost and savings shown up front.'],
      ['Fitness Lab', 'BMI, calories and macros, one-rep max, a weekly workout planner and hydration — each with a booking hand-off.'],
      ['One Data Source', 'Prices, branches and contacts are edited in one file and flow to every section of the site.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/fitness/home.jpg', 'Homepage — train for glory', 'wide'],
      ['assets/img/fitness/mobile.jpg', 'Mobile view', 'tall'],
      ['assets/img/fitness/branches.jpg', 'Branch sliders &amp; facilities', 'normal'],
      ['assets/img/fitness/pricing.jpg', 'Packages with branch &amp; couple toggles', 'normal'],
      ['assets/img/fitness/gallery.jpg', 'Filterable gallery', 'normal'],
      ['assets/img/fitness/tools.jpg', 'Fitness Lab — BMI calculator', 'wide']
    ]
  },
  {
    id: 'wilpotha',
    category: 'brand',
    year: '2026',
    client: 'Wilpotha Agri Business',
    card: 'Wilpotha Agri — Brand & Digital Launch',
    summary: 'Modernization plan, brand system and website build spec for a Sri Lankan cashew and peanut supplier — taking it from commodity sales to a branded business selling online.',
    tags: ['Brand System', 'Web Spec', 'Strategy', 'Launch Plan'],
    title: 'Wilpotha <em>Agri</em><br/>Brand &amp; Digital Launch',
    tagline: 'Planning the move from selling commodity nuts to a premium, branded food business with its own online sales channel.',
    links: [],
    facts: [['Client', 'Wilpotha Agri Business'], ['Role', 'Digital &amp; Brand Lead'], ['Year', '2026'], ['Focus', 'Brand · Web · Launch']],
    overview: [
      'Wilpotha Agri Business sources, grades and distributes cashews and peanuts. It sold mainly as a commodity supplier and wanted to become a recognised premium brand that sells online, to retailers, hotels and corporate clients.',
      'I wrote an <strong>eight-phase modernization plan</strong> (research, product development, production, branding, sales, digital transformation, launch and scale) and a product strategy that turns one raw material into six product lines at different price points.',
      'For the digital side I produced the <strong>website build spec</strong> (brand tokens, typography, sitemap, page-by-page copy, components, SEO and functionality) and a <strong>launch plan</strong> to get an online purchasing site, social channels, payments and courier in place for a 5 October 2026 launch.'
    ],
    stack: ['Brand Identity', 'Design Tokens', 'Information Architecture', 'Copywriting', 'SEO', 'Project Planning', 'E-Commerce Planning'],
    features: [
      ['Brand System', '“Quiet luxury from the soil”: forest, ivory and heritage gold with Cormorant Garamond and Jost, ready as CSS tokens.'],
      ['Website Build Spec', 'Sitemap, page-by-page copy, components, SEO and a checklist so the site can be built by any developer or tool.'],
      ['Modernization Roadmap', 'Eight phases from research to export readiness, with workstreams, product strategy and key questions to answer.'],
      ['Launch Plan', 'A coordinated online launch: website, social coverage, ads, payment-link approval and courier onboarding.']
    ],
    galleryTitle: 'From the plan.',
    gallery: [
      ['assets/img/wilpotha/website-hero.jpg', 'Website hero concept', 'wide'],
      ['assets/img/wilpotha/mobile-concept.jpg', 'Mobile website concept', 'tall'],
      ['assets/img/wilpotha/cashew-grades.jpg', 'Cashew grade guide', 'normal'],
      ['assets/img/wilpotha/brand-system.jpg', 'Brand system', 'normal'],
      ['assets/img/wilpotha/roadmap.jpg', 'Modernization roadmap', 'normal'],
      ['assets/img/wilpotha/product-strategy.jpg', 'Product strategy', 'normal'],
      ['assets/img/wilpotha/launch-plan.jpg', 'Launch plan', 'normal']
    ]
  },
  {
    id: 'pos',
    category: 'systems',
    year: '2026',
    client: 'S&amp;K House',
    card: 'Automated POS & Payroll System',
    summary: 'End-to-end point-of-sale and payroll system built for S&K House. Handles daily transactions and auto-generates employee paysheets, replacing a manual workflow that ate hours every cycle.',
    tags: ['Python', 'SQL', 'JavaScript', 'Automation'],
    title: 'Automated <em>POS</em><br/>&amp; Payroll System',
    tagline: 'A complete retail operations system replacing a manual cash and paysheet workflow with one connected platform.',
    links: [],
    facts: [['Client', 'S&amp;K House'], ['Role', 'System Developer'], ['Year', '2026 — Present'], ['Status', 'In Production']],
    overview: [
      'S&amp;K House needed to retire a manual cash-handling and paysheet routine that ate hours every cycle and left the business exposed to human error. I built a connected <strong>point-of-sale and payroll system</strong> that runs the storefront, captures every transaction, and rolls daily sales straight into payroll.',
      'At month-end the system <strong>generates employee paysheets automatically</strong> from the same data, eliminating reconciliation work and removing the spreadsheet-shuffle entirely. Staff get a clear, auditable record. Management gets back time.',
      'Alongside the system I also took over the company’s <strong>digital presence</strong> — managing social channels and supporting internal workflows so the operational and digital sides stayed in step.'
    ],
    stack: ['Python', 'SQL', 'JavaScript', 'HTML &amp; CSS', 'Workflow Automation'],
    features: [
      ['Live POS Terminal', 'Fast checkout flow purpose-built for the shop floor, with sales history searchable by date, item, and operator.'],
      ['Auto-Generated Paysheets', 'Monthly payroll cycles run end-to-end without a spreadsheet — paysheets land in the right format, every time.'],
      ['Single Source of Truth', 'Sales, staff hours and payroll share one database, so reports stay reconciled and auditable.'],
      ['Digital Workflow Support', 'Connected to the social and content workflow so the storefront and the brand operate from the same data.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/shot-01.png', 'Overview Dashboard', 'wide'],
      ['assets/img/shot-02.png', 'Employee Management', 'normal'],
      ['assets/img/shot-03.png', 'Edit Employee - Details', 'normal'],
      ['assets/img/shot-04.png', 'Edit Employee - Payment Method', 'normal'],
      ['assets/img/shot-05.png', 'Work Load &amp; Assignments', 'normal'],
      ['assets/img/shot-06.png', 'Paysheet Generator', 'wide'],
      ['assets/img/shot-07.png', 'Payslip Preview', 'normal'],
      ['assets/img/shot-08.png', 'Print / Save PDF Dialog', 'normal'],
      ['assets/img/shot-09.png', 'Payslip History', 'normal'],
      ['assets/img/shot-10.png', 'Generated Payslip PDF', 'normal']
    ]
  },
  {
    id: 'trading',
    category: 'systems',
    year: '2026',
    client: 'Self-Initiated',
    card: 'AI Trading Signal Platform',
    summary: 'Technical-analysis web app for crypto and forex markets. An AI agent ingests live news and runs eight strategies to emit trade signals — validated across 20+ rounds of live progress tracking.',
    tags: ['Python', 'AI Agent', 'JavaScript', 'News API'],
    title: 'AI <em>Trading</em><br/>Signal Platform',
    tagline: 'A technical analysis web app for crypto and forex markets, powered by an AI agent that reads the news and runs eight strategies in parallel.',
    links: [],
    facts: [['Project Type', 'Self-Initiated'], ['Role', 'Solo Developer'], ['Year', '2026'], ['Strategies', '8 in parallel']],
    overview: [
      'Markets move on news as much as charts. So instead of writing another indicator overlay, I built a platform where an <strong>AI agent ingests live news</strong> and feeds it into the same engine running technical analysis on crypto pairs and forex.',
      'The engine evaluates <strong>eight distinct strategies</strong> in parallel for every signal — momentum, mean-reversion, breakout, volume-confirmed trends, and others — and only emits a trade when the strategies agree across both the chart and the news context.',
      'I tracked every emitted signal across <strong>more than twenty rounds</strong> of live progress checks, watching how each strategy held up under different market conditions and tightening the agent’s behavior cycle after cycle.'
    ],
    stack: ['Python', 'AI Agent', 'News API', 'JavaScript', 'Charting', 'Technical Analysis'],
    features: [
      ['AI News Agent', 'An autonomous agent pulls financial news in real time and tags each story by market, asset and sentiment before handing it to the engine.'],
      ['Eight-Strategy Ensemble', 'Trend-following, mean-reversion, breakout and momentum strategies run in parallel — signals fire only when multiple strategies align.'],
      ['Live Tracking &amp; Iteration', 'Each signal is monitored against actual price action across 20+ live rounds, so strategy weights adapt instead of being hard-coded.'],
      ['Crypto &amp; Forex Coverage', 'The same engine works on both crypto pairs and traditional forex, so the platform stays useful across asset classes.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/shot-11.png', 'Market Confluence Dashboard', 'wide'],
      ['assets/img/shot-12.png', '8-Strategy Confluence Engine', 'normal'],
      ['assets/img/shot-13.png', 'Price Action &amp; Live Chart', 'normal'],
      ['assets/img/shot-14.png', 'Indicators &amp; Trade Setup Calculator', 'normal'],
      ['assets/img/shot-15.png', 'Asset Selection Menu (Crypto &amp; Forex)', 'normal'],
      ['assets/img/shot-16.png', 'Forex Market Analysis (EUR/USD Lean Sell)', 'wide'],
      ['assets/img/shot-17.png', 'Real-Time Signal Alert (Gold Lean Sell)', 'normal']
    ]
  },
  {
    id: 'coofandy',
    category: 'web',
    year: '2024',
    client: 'COOFANDY Clothing',
    card: 'COOFANDY E-Commerce Platform',
    summary: 'Rebuilt and optimized the company’s e-commerce site for speed, security, and responsive UX. Collaborated with the team to lift platform usability and keep the store fully functional under real traffic.',
    tags: ['HTML', 'CSS', 'JavaScript', 'E-Commerce'],
    title: 'COOFANDY<br/><em>E-Commerce</em> Platform',
    tagline: 'Rebuilding a clothing store’s online presence for speed, security, and a buyer journey that holds up under real traffic.',
    links: [],
    facts: [['Client', 'COOFANDY'], ['Role', 'Web Developer'], ['Year', '2024'], ['Focus', 'Speed · UX · Security']],
    overview: [
      'COOFANDY’s storefront needed an overhaul. The store was functional but slow, visually inconsistent across devices, and missing the security baselines a real e-commerce operation depends on. I worked with the team to rebuild it from the inside out.',
      'The brief covered three priorities at once: <strong>performance</strong>, so pages loaded fast across patchy mobile connections; <strong>usability</strong>, so the path from landing to checkout was obvious and frictionless; and <strong>security</strong>, so transactions and customer data were handled with the defaults you’d expect from a modern shop.',
      'I optimized assets, restructured the layout for responsive breakpoints, hardened forms and inputs, and collaborated with the team on the broader platform experience so the store felt cohesive end-to-end.'
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'E-Commerce', 'Web Security'],
    features: [
      ['Performance Pass', 'Compressed assets, leaner markup, and smarter load order so the store feels instant on mobile networks.'],
      ['Responsive From The Start', 'Layout rebuilt for fluid breakpoints — the storefront looks intentional on a phone, tablet or desktop.'],
      ['Security Hardening', 'Form validation, input sanitization, and secure handling of customer data to meet the baseline expected of an online shop.'],
      ['Smoother Buyer Journey', 'Clearer browse-to-cart-to-checkout flow worked out with the team — fewer dead-ends, more conversions.']
    ],
    galleryTitle: 'From the build.',
    gallery: [
      ['assets/img/shot-18.jpg', 'Homepage', 'wide'],
      ['assets/img/shot-19.jpg', 'Mobile View', 'tall'],
      ['assets/img/shot-20.jpg', 'Product Page', 'normal'],
      ['assets/img/shot-21.jpg', 'Cart View', 'normal'],
      ['assets/img/shot-22.jpg', 'Checkout Flow', 'normal'],
      ['assets/img/shot-23.jpg', 'Category Grid', 'normal']
    ]
  }
];
