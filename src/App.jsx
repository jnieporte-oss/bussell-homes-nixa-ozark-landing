import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  GraduationCap,
  Hammer,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  MoveRight,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Trees,
  X,
  Zap,
} from "lucide-react";

const PHONE = "417.374.0173";
const PHONE_LINK = "tel:+14173740173";
const EMAIL = "sales@bussellbuilding.com";
const INVENTORY_URL = "https://bussell-homes.com/available-homes-interest/";

const communities = [
  {
    id: "forest",
    name: "Forest Heights",
    city: "Nixa, Missouri",
    image: "/assets/forest-aerial.webp",
    eyebrow: "Limited Phase 4 availability",
    phase: "Phase 5 planned for Fall 2026",
    description:
      "Tucked away from Highway 14, Forest Heights pairs quiet Ozarks scenery with the everyday convenience of Nixa and nearby Springfield.",
    highlights: ["Nixa school district", "Established neighborhood", "Move-in-ready homes"],
    mapUrl: "https://bussellhomes.lotvue.com/marketing/Forest%20Heights/",
  },
  {
    id: "valley",
    name: "Valley Ridge",
    city: "Ozark, Missouri",
    image: "/assets/valley-aerial.jpg",
    eyebrow: "Phase 2 now underway",
    phase: "New homesites and build opportunities",
    description:
      "Just off South Street near the heart of Ozark, Valley Ridge offers the privacy buyers value with quick access to local dining, schools, and Highway 65.",
    highlights: ["Ozark school district", "New homesites", "Build or move in sooner"],
    mapUrl: "https://bussellhomes.lotvue.com/marketing/Valley%20Ridge%20Estates",
  },
];

const homes = [
  {
    id: 1,
    community: "Forest Heights",
    city: "Nixa",
    image: "/assets/bonnie.jpg",
    address: "822 S Wheaton Hills Dr.",
    plan: "The Bonnie",
    price: "$315,035",
    detail: "Open-concept living in an established Nixa neighborhood.",
  },
  {
    id: 2,
    community: "Forest Heights",
    city: "Nixa",
    image: "/assets/ashland.jpg",
    address: "722 S. Wheaton Hills Dr.",
    plan: "The Ashland",
    price: "$292,775",
    detail: "1,480 sq. ft. with connected kitchen, dining, and living spaces.",
  },
  {
    id: 3,
    community: "Forest Heights",
    city: "Nixa",
    image: "/assets/erica.jpg",
    address: "879 E. Virginia Ln.",
    plan: "The Erica Basement",
    price: "$471,350",
    detail: "Extra lower-level flexibility with room to grow.",
  },
  {
    id: 4,
    community: "Valley Ridge",
    city: "Ozark",
    image: "/assets/skylar.jpg",
    address: "2105 S. Edgewood Ct.",
    plan: "The Skylar · Homesite 52",
    price: "$316,900",
    detail: "Nearly 1,600 sq. ft. with an open kitchen, dining nook, and living room.",
  },
  {
    id: 5,
    community: "Valley Ridge",
    city: "Ozark",
    image: "/assets/emerson.jpg",
    address: "2109 S. Edgewood Ct.",
    plan: "The Emerson",
    price: "$280,500",
    detail: "A smart, efficient layout designed for easy everyday living.",
  },
  {
    id: 6,
    community: "Valley Ridge",
    city: "Ozark",
    image: "/assets/claire.jpg",
    address: "1915 W. Woodhaven Dr.",
    plan: "The Claire",
    price: "$346,275",
    detail: "A polished Ozark home in Valley Ridge Phase 2.",
  },
];

const lifestyleReasons = [
  {
    icon: GraduationCap,
    title: "Two sought-after school districts",
    description:
      "Choose between Nixa and Ozark—two growing Southwest Missouri communities known for strong local schools and community connection.",
  },
  {
    icon: Trees,
    title: "Ozarks pace, metro access",
    description:
      "Enjoy quieter neighborhood living while staying close to Springfield jobs, healthcare, shopping, dining, and entertainment.",
  },
  {
    icon: KeyRound,
    title: "A path that fits your timing",
    description:
      "Compare move-in-ready homes with build opportunities, then let the Bussell team help align the right plan, homesite, and timeline.",
  },
];

const advantages = [
  { icon: Hammer, title: "No construction loan", text: "Bussell carries construction costs; buyers secure a standard mortgage at closing." },
  { icon: Sparkles, title: "Everything is new", text: "Roof, HVAC, plumbing, finishes, and appliances begin their life with you." },
  { icon: Zap, title: "Modern efficiency", text: "Current construction standards can help reduce maintenance and energy surprises." },
  { icon: Building2, title: "20+ floor plans", text: "Single-level, family-focused, and basement options for different life stages." },
  { icon: ShieldCheck, title: "Builder accountability", text: "One experienced team connected to the home from planning through closing." },
  { icon: BadgeCheck, title: "Ethics recognized", text: "Recipient of the Better Business Bureau Torch Award for Ethics in 2022." },
];

const whyBussell = [
  ["30+ years", "Building homes for Southwest Missouri buyers"],
  ["Local expertise", "Communities selected around how people live here"],
  ["Clear choices", "Move-in-ready and build-from-the-ground-up paths"],
  ["Thoughtful plans", "Layouts shaped for real routines and everyday comfort"],
  ["Value-minded", "Homes starting in the mid-$200s across both communities"],
  ["Simple financing", "No construction loan required before closing"],
  ["Model-home access", "See workmanship and finishes in person in Nixa"],
  ["Human guidance", "A local team available by phone, email, or appointment"],
];

const comparisonRows = [
  ["Major systems", "New roof, HVAC, plumbing, and finishes", "Age and service history can vary"],
  ["Construction financing", "Bussell carries construction cost until closing", "Custom-build structure may vary"],
  ["Home selection", "20+ floor plans and basement options", "Limited to homes currently listed"],
  ["Community choice", "Nixa and Ozark options on one page", "Often requires a wider separate search"],
  ["Move-in path", "Move-in-ready or build opportunity", "Usually one existing-home timeline"],
  ["Builder connection", "Team involved from build through buyer handoff", "Prior work may involve multiple owners or vendors"],
];

const faqs = [
  {
    q: "What do homes cost in Forest Heights and Valley Ridge?",
    a: "Bussell Homes publishes both communities as starting in the mid-$200,000s. Current featured inventory on this page ranges from $280,500 to $471,350 as of August 26, 2026. Pricing changes with plan, homesite, selections, and availability.",
  },
  {
    q: "How large are the homes?",
    a: "Published community ranges are approximately 1,245 to 3,850 square feet, with 3–5 bedrooms, 2–3.5 bathrooms, and 2–3-car garages. The team can narrow options based on the space and layout you need.",
  },
  {
    q: "Can I buy a move-in-ready home?",
    a: "Yes. Both communities currently show move-in-ready or under-construction homes. Because inventory moves, request current availability before relying on a specific address or price.",
  },
  {
    q: "Can I build from the ground up?",
    a: "Valley Ridge Phase 2 is underway with new homesites and build opportunities. Forest Heights Phase 5 is scheduled to begin in Fall 2026. A Bussell advisor can explain what is available now and what is coming next.",
  },
  {
    q: "Do I need a construction loan?",
    a: "Bussell Homes states that buyers do not need to secure financing until closing. Bussell carries the cost of construction, and buyers arrange a standard mortgage for closing, subject to lender approval and terms.",
  },
  {
    q: "Where can I tour a Bussell model home?",
    a: "Visit the model home at 822 S Ridgemont Dr. in Nixa. Published hours are Monday–Friday 10 a.m.–6 p.m., Saturday 10 a.m.–6 p.m., and Sunday closed. An appointment is recommended.",
  },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function HubSpotForm({ onReady }) {
  const initialized = useRef(false);

  useEffect(() => {
    const win = /** @type {Window & { hbspt?: { forms: { create: (config: Record<string, unknown>) => void } } }} */ (window);
    const renderForm = () => {
      if (initialized.current || !win.hbspt?.forms) return;
      const target = document.getElementById("hs-bussell-form");
      if (!target) return;
      initialized.current = true;
      win.hbspt.forms.create({
        region: "na2",
        portalId: "242740896",
        formId: "57378aca-cdbf-47ed-adf8-177c604dd531",
        target: "#hs-bussell-form",
        cssRequired: `
          .hs-form { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; column-gap: 10px !important; align-items: start !important; }
          .hs-form > fieldset { width: 100% !important; max-width: 100% !important; margin: 0 !important; }
          .hs-form > fieldset.form-columns-1 { grid-column: auto !important; }
          .hs-form > fieldset.form-columns-2 { grid-column: 1 / -1 !important; display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; column-gap: 10px !important; }
          .hs-form > fieldset.form-columns-2 .hs-form-field { width: 100% !important; float: none !important; }
          .hs-form .hs-form-field { width: 100% !important; margin-bottom: 9px !important; }
          .hs-form .hs_submit, .hs-form .legal-consent-container, .hs-form .hs-richtext, .hs-form .hs_error_rollup, .hs-form > fieldset:has(.hs_sms_opt_in) { grid-column: 1 / -1 !important; }
          .hs-form > fieldset:has(.hs_utm_source), .hs-form > fieldset:has(.hs_utm_medium), .hs-form > fieldset:has(.hs_utm_term), .hs-form > fieldset:has(.hs_utm_campaign), .hs-form > fieldset:has(.hs_utm_keyword) { display: none !important; }
          .hs-form .legal-consent-container, .hs-form .hs_sms_opt_in { margin: 2px 0 8px !important; }
          .hs-form .legal-consent-container .inputs-list, .hs-form .hs_sms_opt_in .inputs-list { margin: 0 !important; padding: 0 !important; list-style: none !important; }
          .hs-form .legal-consent-container label, .hs-form .hs_sms_opt_in label { display: grid !important; grid-template-columns: 18px 1fr !important; gap: 7px !important; align-items: start !important; font-size: 9px !important; line-height: 1.45 !important; font-weight: 500 !important; }
          .hs-form .legal-consent-container input[type=checkbox], .hs-form .hs_sms_opt_in input[type=checkbox] { width: 16px !important; min-height: 16px !important; height: 16px !important; margin: 2px 0 0 !important; padding: 0 !important; }
          @media (max-width: 640px) { .hs-form { grid-template-columns: 1fr !important; } .hs-form > fieldset.form-columns-1, .hs-form > fieldset.form-columns-2, .hs-form .hs_submit, .hs-form .legal-consent-container, .hs-form .hs-richtext, .hs-form .hs_error_rollup { grid-column: 1 !important; } .hs-form > fieldset.form-columns-2 { grid-template-columns: 1fr !important; } }
          .hs-form .hs-form-field { margin-bottom: 9px !important; }
          .hs-form label { color: #143326 !important; font-family: Montserrat, sans-serif !important; font-size: 12px !important; font-weight: 700 !important; }
          .hs-form input, .hs-form select, .hs-form textarea { width: 100% !important; min-height: 46px !important; border: 1px solid #ccd8d0 !important; border-radius: 6px !important; padding: 10px 12px !important; font: 500 15px Montserrat, sans-serif !important; color: #143326 !important; background: #fff !important; box-sizing: border-box !important; }
          .hs-form input:focus, .hs-form select:focus, .hs-form textarea:focus { border-color: #167d43 !important; box-shadow: 0 0 0 3px rgba(22,125,67,.12) !important; outline: none !important; }
          .hs-form .hs-button { width: 100% !important; min-height: 50px !important; border: 0 !important; border-radius: 5px !important; background: #d8ef45 !important; color: #0b3f29 !important; font: 800 13px Montserrat, sans-serif !important; letter-spacing: .05em !important; text-transform: uppercase !important; cursor: pointer !important; }
          .hs-form .hs-button:hover { background: #c6dc39 !important; }
          .hs-form .hs-error-msgs { margin: 4px 0 !important; padding: 0 !important; list-style: none !important; }
          .hs-form .hs-error-msg { color: #9b2d30 !important; font-size: 12px !important; }
          .submitted-message { font: 600 15px/1.6 Montserrat, sans-serif !important; color: #0b3f29 !important; }
        `,
        onFormReady: onReady,
      });
    };

    let script = /** @type {HTMLScriptElement | null} */ (document.getElementById("hs-forms-script"));
    if (!script) {
      script = document.createElement("script");
      script.id = "hs-forms-script";
      script.src = "https://js-na2.hsforms.net/forms/embed/v2.js";
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", renderForm);
    renderForm();
    const readinessPoll = window.setInterval(renderForm, 350);
    const pollTimeout = window.setTimeout(() => window.clearInterval(readinessPoll), 30000);

    return () => {
      script?.removeEventListener("load", renderForm);
      window.clearInterval(readinessPoll);
      window.clearTimeout(pollTimeout);
    };
  }, [onReady]);

  return (
    <div className="form-embed-wrap">
      <div id="hs-bussell-form" aria-live="polite">
        <div className="form-loading">
          <span className="loading-line" />
          <span className="loading-line short" />
          <span className="loading-line" />
          <p>Loading secure request form…</p>
        </div>
      </div>
      <p className="form-privacy">
        By submitting, you agree that Bussell Homes may contact you about homes and communities. View the{" "}
        <a href="https://bussell-homes.com/privacy-policy" target="_blank" rel="noreferrer">privacy policy</a>.
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, light = false, align = "left" }) {
  return (
    <div className={`section-heading ${light ? "light" : ""} ${align === "center" ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function App() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [interest, setInterest] = useState("Forest Heights + Valley Ridge");
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredHomes = useMemo(
    () => (filter === "All" ? homes : homes.filter((home) => home.community === filter)),
    [filter],
  );

  const scrollToLead = (context) => {
    if (context) setInterest(context);
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 40);
  };

  const navClass = `site-header ${scrolled ? "scrolled" : ""}`;

  return (
    <div className="site-shell">
      <header className={navClass}>
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Bussell Homes landing page home">
            <span className="brand-plate"><img src="/assets/logo.png" alt="Bussell Homes" /></span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? "open" : ""}`} aria-label="Landing page navigation">
            <a href="#communities" onClick={() => setMenuOpen(false)}>Communities</a>
            <a href="#homes" onClick={() => setMenuOpen(false)}>Available homes</a>
            <a href="#why-bussell" onClick={() => setMenuOpen(false)}>Why Bussell</a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href={PHONE_LINK}><Phone size={16} /> {PHONE}</a>
            <button className="button button-accent nav-cta" onClick={() => scrollToLead("Nixa & Ozark communities")}>Get Homes & Pricing</button>
            <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-pattern" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-kicker"><MapPin size={16} /> Nixa + Ozark, Missouri</div>
              <h1>New homes. <em>Two great communities.</em> One trusted local builder.</h1>
              <p className="hero-lead">
                Explore Forest Heights and Valley Ridge—Bussell homes from the mid-$200s, with 3–5 bedrooms and plans from 1,245–3,850 sq. ft.
              </p>
              <div className="hero-facts" aria-label="Community home ranges">
                <span><CircleDollarSign /> From the mid-$200s</span>
                <span><BedDouble /> 3–5 bedrooms</span>
                <span><Ruler /> Up to 3,850 sq. ft.</span>
                <span><Car /> 2–3-car garages</span>
              </div>
              <div className="hero-actions">
                <button className="button button-accent" onClick={() => scrollToLead("Forest Heights + Valley Ridge")}>Get Homes & Pricing <ArrowRight size={17} /></button>
                <a className="button button-ghost-light" href={PHONE_LINK}><Phone size={17} /> Call a Home Advisor</a>
              </div>
              <p className="hero-proof"><BadgeCheck size={17} /> Serving Southwest Missouri homebuyers for more than 30 years.</p>
            </div>

            <aside className="lead-card" id="lead-form" aria-labelledby="lead-title">
              <div className="lead-card-topline">
                <span className={formReady ? "status-dot ready" : "status-dot"} />
                {formReady ? "Secure form ready" : "Loading secure form"}
              </div>
              <h2 id="lead-title">See current homes and pricing</h2>
              <p>Tell us how to reach you. A Bussell advisor can share updated availability for <strong>{interest}</strong>.</p>
              <div className="lead-benefits">
                <span><Check size={15} /> Current inventory</span>
                <span><Check size={15} /> Floor plans & pricing</span>
                <span><Check size={15} /> Tour availability</span>
              </div>
              <HubSpotForm onReady={() => setFormReady(true)} />
            </aside>
          </div>
          <a className="scroll-cue" href="#trust" aria-label="Scroll to learn more"><span>Explore</span><ChevronDown /></a>
        </section>

        <section className="trust-bar" id="trust" aria-label="Bussell Homes proof points">
          <div className="trust-inner">
            <div><strong>30+</strong><span>Years building locally</span></div>
            <div><strong>20+</strong><span>Thoughtful floor plans</span></div>
            <div><strong>12</strong><span>Current featured homes</span></div>
            <div><strong>2022</strong><span>BBB Torch Award for Ethics</span></div>
          </div>
        </section>

        <section className="section communities-section" id="communities">
          <div className="container">
            <SectionHeading
              eyebrow="Choose your community"
              title="Nixa or Ozark? Start with how you want to live."
              text="Both communities offer the same broad home range. The difference is the setting, current phase, and the opportunity that best matches your timing."
              align="center"
            />
            <div className="community-grid">
              {communities.map((community, index) => (
                <article className="community-card reveal" style={{ "--delay": `${index * 80}ms` }} key={community.id}>
                  <div className="community-media">
                    <img src={community.image} alt={`Aerial view of ${community.name} in ${community.city}`} loading="lazy" />
                    <div className="community-badge">{community.eyebrow}</div>
                    <div className="community-location"><MapPin size={15} /> {community.city}</div>
                  </div>
                  <div className="community-content">
                    <span className="phase-label">{community.phase}</span>
                    <h3>{community.name}</h3>
                    <p>{community.description}</p>
                    <ul>
                      {community.highlights.map((highlight) => <li key={highlight}><Check size={16} /> {highlight}</li>)}
                    </ul>
                    <div className="community-actions">
                      <button className="text-link" onClick={() => scrollToLead(community.name)}>Get {community.name} details <MoveRight size={17} /></button>
                      <a href={community.mapUrl} target="_blank" rel="noreferrer">View live map <ExternalLink size={14} /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section homes-section" id="homes">
          <div className="container">
            <div className="homes-heading-row">
              <SectionHeading
                eyebrow="Move-in-ready opportunities"
                title="Homes you can picture yourself in now."
                text="A curated snapshot of current Bussell inventory in the two featured communities."
              />
              <div className="filter-tabs" role="group" aria-label="Filter homes by community">
                {["All", "Forest Heights", "Valley Ridge"].map((option) => (
                  <button key={option} className={filter === option ? "active" : ""} onClick={() => setFilter(option)}>{option}</button>
                ))}
              </div>
            </div>

            <div className="home-grid">
              {filteredHomes.map((home, index) => (
                <article className="home-card reveal" key={home.id} style={{ "--delay": `${(index % 3) * 60}ms` }}>
                  <div className="home-image-wrap">
                    <img src={home.image} alt={`${home.plan} exterior representation at ${home.address}`} loading="lazy" />
                    <span className="home-status">Available now</span>
                    <span className="home-community">{home.community} · {home.city}</span>
                  </div>
                  <div className="home-card-body">
                    <div className="home-price-row"><span>{home.plan}</span><strong>{home.price}</strong></div>
                    <h3>{home.address}</h3>
                    <p>{home.detail}</p>
                    <button onClick={() => scrollToLead(`${home.address}, ${home.community}`)}>Request this home's details <ArrowRight size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="inventory-note">
              <Clock3 size={17} />
              <p>Pricing and availability verified August 26, 2026 and may change without notice. Photos may show a similar home. Request a live update before making plans.</p>
              <a href={INVENTORY_URL} target="_blank" rel="noreferrer">See all Bussell inventory <ExternalLink size={14} /></a>
            </div>
          </div>
        </section>

        <section className="section reasons-section">
          <div className="container">
            <SectionHeading
              eyebrow="Why buyers choose this corridor"
              title="Small-town connection without giving up convenience."
              text="Nixa and Ozark put you close to the people and places that matter—while giving you room to settle into a neighborhood that feels like home."
              align="center"
            />
            <div className="reason-grid">
              {lifestyleReasons.map(({ icon: Icon, title, description }, index) => (
                <article className="reason-card reveal" key={title} style={{ "--delay": `${index * 70}ms` }}>
                  <div className="reason-number" aria-hidden="true">0{index + 1}</div>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="advantage-section">
          <div className="advantage-media">
            <img src="/assets/forest-exterior.jpg" alt="Finished Bussell home exterior" loading="lazy" />
            <div className="image-caption">Built for life in Southwest Missouri</div>
          </div>
          <div className="advantage-content">
            <SectionHeading
              eyebrow="The new-home advantage"
              title="Fewer unknowns. More confidence from day one."
              text="A new home is more than fresh finishes. It is the relief of knowing the home’s systems, structure, and story begin with you."
              light
            />
            <div className="advantage-grid">
              {advantages.map(({ icon: Icon, title, text }) => (
                <div className="advantage-item" key={title}>
                  <Icon />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
            <button className="button button-accent" onClick={() => scrollToLead("New home consultation")}>Compare My Options <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="section why-section" id="why-bussell">
          <div className="container">
            <div className="why-layout">
              <div className="why-intro">
                <SectionHeading
                  eyebrow="Why Bussell Homes"
                  title="Local experience, translated into an easier next step."
                  text="Bussell has spent more than three decades building in Southwest Missouri. That local continuity matters when you are choosing the place and team behind a major life decision."
                />
                <div className="award-callout">
                  <img src="/assets/bbb-award.png" alt="2022 Better Business Bureau Torch Award for Ethics winner" loading="lazy" />
                  <div><strong>Recognized for ethics</strong><span>Better Business Bureau Torch Award, 2022</span></div>
                </div>
              </div>
              <div className="why-grid">
                {whyBussell.map(([title, text], index) => (
                  <article className="why-card reveal" style={{ "--delay": `${(index % 4) * 40}ms` }} key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section comparison-section">
          <div className="container">
            <SectionHeading
              eyebrow="A clearer comparison"
              title="What changes when the home is new?"
              text="Use this as a practical starting point when comparing a new Bussell home with an existing-home search."
              align="center"
            />
            <div className="comparison-wrap reveal" role="region" aria-label="New Bussell home compared with a typical existing-home search" tabIndex={0}>
              <table className="comparison-table">
                <thead><tr><th>What to compare</th><th><span className="table-logo">BH</span> New Bussell home</th><th>Typical existing-home search</th></tr></thead>
                <tbody>
                  {comparisonRows.map(([feature, bussell, other]) => (
                    <tr key={feature}>
                      <td>{feature}</td>
                      <td><Check size={17} /> {bussell}</td>
                      <td>{other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section visit-section" id="visit">
          <div className="container">
            <div className="visit-card">
              <div className="visit-copy">
                <span className="eyebrow">See Bussell quality in person</span>
                <h2>Visit the Nixa model home.</h2>
                <p>Walk the spaces, inspect the details, and ask a local advisor which Forest Heights or Valley Ridge opportunity best fits your timing.</p>
                <div className="visit-info">
                  <div><MapPin /><span><strong>822 S Ridgemont Dr.</strong>Nixa, Missouri</span></div>
                  <div><Clock3 /><span><strong>Mon–Fri 10–6 · Sat 10–6</strong>Sunday closed</span></div>
                  <div><Phone /><span><strong>{PHONE}</strong>Sales team</span></div>
                </div>
                <div className="visit-actions">
                  <button className="button button-accent" onClick={() => scrollToLead("Private model home tour")}>Schedule a Tour <CalendarDays size={17} /></button>
                  <a className="button button-outline-dark" href="https://maps.app.goo.gl/7n2EV4xkZCYTbaHt9" target="_blank" rel="noreferrer">Get Directions <ExternalLink size={15} /></a>
                </div>
              </div>
              <div className="visit-image"><img src="/assets/forest-home.jpg" alt="Bussell model home exterior in Nixa" loading="lazy" /><span>If it's not a Bussell home, it's just another house.</span></div>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-layout">
            <div className="faq-intro">
              <SectionHeading
                eyebrow="Questions, answered"
                title="Know the basics before you tour."
                text="If your question is more specific, request current details and a Bussell advisor can respond with the latest information."
              />
              <button className="text-link" onClick={() => scrollToLead("Questions about Nixa and Ozark homes")}>Ask about these communities <ArrowRight size={16} /></button>
            </div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details key={item.q} open={index === 0}>
                  <summary>{item.q}<ChevronDown size={18} /></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-image" aria-hidden="true" />
          <div className="final-cta-overlay" aria-hidden="true" />
          <div className="container final-cta-content">
            <span className="eyebrow">Your next address could be closer than you think</span>
            <h2>Find your fit in Nixa or Ozark.</h2>
            <p>Get the current list of homes, pricing, floor plans, and tour times for Forest Heights and Valley Ridge.</p>
            <div className="final-actions">
              <button className="button button-accent" onClick={() => scrollToLead("Forest Heights + Valley Ridge")}>Get Homes & Pricing <ArrowRight size={17} /></button>
              <a className="button button-ghost-light" href={PHONE_LINK}><Phone size={17} /> {PHONE}</a>
            </div>
            <span className="response-note"><Clock3 size={15} /> No pressure—just clear, current information from the local Bussell team.</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo"><img src="/assets/logo.png" alt="Bussell Homes" /></div>
              <p>Quality new homes across Southwest Missouri, built for comfort, value, and real life.</p>
            </div>
            <div className="footer-contact">
              <span>Talk to our team</span>
              <a href={PHONE_LINK}><Phone size={16} /> {PHONE}</a>
              <a href={`mailto:${EMAIL}`}><Mail size={16} /> {EMAIL}</a>
            </div>
            <div className="footer-links">
              <span>Helpful links</span>
              <a href="https://bussell-homes.com/privacy-policy" target="_blank" rel="noreferrer">Privacy policy</a>
              <a href={INVENTORY_URL} target="_blank" rel="noreferrer">All available homes</a>
              <a href="https://bussell-homes.com/floor-plans/" target="_blank" rel="noreferrer">Floor plans</a>
            </div>
            <div className="equal-housing"><img src="/assets/equal-housing.png" alt="Equal Housing Opportunity" /><span>Equal Housing Opportunity</span></div>
          </div>
          <div className="legal-notices">
            <p>* Published pricing and availability were verified on August 26, 2026, are for informational purposes, and may change without notice. Request current details directly from Bussell Homes.</p>
            <p>** Square footage, room counts, garage capacity, features, elevations, and specifications are approximate or plan-dependent and may vary by home.</p>
            <p>*** Photography may depict a similar home, model, community phase, optional feature, or prior construction. Images are for illustration and may not represent the exact home offered.</p>
            <p>**** Financing is subject to buyer qualification, lender approval, availability, and complete loan terms. Bussell Homes does not provide lending advice on this page.</p>
            <p>***** Any advertised rate or incentive is limited-time, subject to eligibility and separate terms, and may change or end without notice. Contact Bussell Homes and the applicable lender for current disclosures.</p>
          </div>
          <div className="footer-bottom"><span>© 2026 Bussell Homes. All rights reserved.</span><span>Forest Heights · Nixa &nbsp; | &nbsp; Valley Ridge · Ozark</span></div>
        </div>
      </footer>

      <aside className="mobile-cta" aria-label="Mobile contact actions">
        <a href={PHONE_LINK}><Phone size={18} /><span>Call</span></a>
        <button onClick={() => scrollToLead("Nixa & Ozark communities")}><Home size={18} /><span>Get Homes & Pricing</span></button>
      </aside>
    </div>
  );
}

export default App;
