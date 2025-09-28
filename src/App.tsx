import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Menu, X, Shield, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

/* ========= Interactive Eye Logo ========= */
const EyeLogo: React.FC<{ size?: number; withText?: boolean; className?: string }> = ({
  size = 120,
  withText = true,
  className = "",
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hover, setHover] = React.useState(false);
  const lidControls = useAnimation();

  React.useEffect(() => {
    let mounted = true;
    const blink = async () => {
      if (!mounted) return;
      await lidControls.start({ scaleY: 0.15, transition: { duration: 0.08, ease: "easeIn" } });
      await lidControls.start({ scaleY: 1, transition: { duration: 0.12, ease: "easeOut" } });
    };
    const loop = () => {
      const t = 6000 + Math.random() * 4000;
      const id = setTimeout(async () => {
        await blink();
        loop();
      }, t);
      return () => clearTimeout(id);
    };
    const cleanup = loop();
    return () => {
      mounted = false;
      cleanup();
    };
  }, [lidControls]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = size * 0.09;
    const dist = Math.hypot(dx, dy);
    const scale = dist === 0 ? 0 : Math.min(1, max / dist);
    setPos({ x: dx * scale, y: dy * scale });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPos({ x: 0, y: 0 });
      }}
      className={`inline-flex flex-col items-center select-none ${className}`}
      style={{ width: size, userSelect: "none" }}
    >
      <motion.svg
        width={size}
        height={size * 0.7}
        viewBox="0 0 240 160"
        className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
        initial={{ filter: "brightness(1)" }}
        animate={hover ? { filter: "brightness(1.2)" } : { filter: "brightness(1)" }}
        transition={{ duration: 0.3 }}
      >
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#00D1E6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00A7C2" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="80" rx="108" ry="60" fill="#06121d" stroke="url(#grad)" strokeWidth="6" />
        <motion.g style={{ originY: "80px" }} animate={lidControls}>
          <ellipse cx="120" cy="80" rx="76" ry="42" fill="#e6fbff" />
          <circle cx={120 + pos.x * 0.35} cy={80 + pos.y * 0.35} r="26" fill="#00c6e8" />
          <circle cx={120 + pos.x} cy={80 + pos.y} r="10" fill="#0b1f2c" />
          <circle cx={112 + pos.x * 0.6} cy={72 + pos.y * 0.6} r="4" fill="#fff" opacity="0.9" />
        </motion.g>
      </motion.svg>
      {withText && (
        <div className="mt-2 text-center">
          <div className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300">
            CyberClarityGlobal
          </div>
          <div className="text-xs md:text-sm text-cyan-200/80">Vision for Secure Futures</div>
        </div>
      )}
    </div>
  );
};

/* ========= Layout Shell ========= */
const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    setOpen(false);
  }, [location]);

  const navLink = (to: string, label: string) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-xl transition hover:bg-white/5 ${isActive ? "text-white" : "text-cyan-100/80"}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(0,200,255,0.08),transparent),radial-gradient(1000px_600px_at_10%_110%,rgba(0,170,220,0.08),transparent)] bg-[#0a1621] text-cyan-50">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#0a1621]/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <EyeLogo size={46} withText={false} />
            <span className="font-semibold hidden sm:block">CyberClarityGlobal</span>
          </Link>
          <div className="ml-auto hidden md:flex items-center gap-1">
            {navLink("/services", "Services")}
            {navLink("/about", "About")}
            {navLink("/blog", "Blog")}
            {navLink("/contact", "Contact")}
            {navLink("/privacy", "Privacy")}
            {navLink("/terms", "Terms")}
          </div>
          <button className="md:hidden ml-auto p-2" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10"
            >
              <div className="px-4 py-2 flex flex-col gap-2">
                <Link className="py-2" to="/services">
                  Services
                </Link>
                <Link className="py-2" to="/about">
                  About
                </Link>
                <Link className="py-2" to="/blog">
                  Blog
                </Link>
                <Link className="py-2" to="/contact">
                  Contact
                </Link>
                <Link className="py-2" to="/privacy">
                  Privacy
                </Link>
                <Link className="py-2" to="/terms">
                  Terms
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
      <footer className="mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-cyan-200/80">
          <div>
            <EyeLogo size={44} withText={false} />
            <div className="mt-2">CyberClarityGlobal — Vision for Secure Futures</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="font-semibold text-cyan-100">Company</div>
              <Link to="/about" className="block hover:text-white">
                About
              </Link>
              <Link to="/blog" className="block hover:text-white">
                Blog
              </Link>
              <Link to="/services" className="block hover:text-white">
                Services
              </Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-cyan-100">Legal</div>
              <Link to="/privacy" className="block hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="block hover:text-white">
                Terms
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-cyan-100">Contact</div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> hello@cyberclarityglobal.com
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> +44 (0)20 0000 0000
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> London • Johannesburg
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-cyan-200/60 pb-8">
          © {new Date().getFullYear()} CyberClarityGlobal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

/* ========= Section helper ========= */
const Section: React.FC<{ title: string; subtitle?: string; children?: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <section className="my-12">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
    {subtitle && <p className="mt-2 text-cyan-200/80 max-w-2xl">{subtitle}</p>}
    <div className="mt-6">{children}</div>
  </section>
);

/* ========= Pages ========= */
const HomePage = () => (
  <>
    <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-white/5 border border-white/10 shadow-xl">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(400px_200px_at_20%_0%,rgba(0,230,255,0.08),transparent),radial-gradient(400px_200px_at_90%_40%,rgba(0,170,255,0.08),transparent)]" />
      <div className="grid md:grid-cols-2 gap-8 items-center relative">
        <div>
          <EyeLogo size={160} />
          <h1 className="mt-6 text-3xl md:text-5xl font-semibold leading-tight">Bespoke GRC, Privacy & Cybersecurity Consultancy</h1>
          <p className="mt-4 text-cyan-200/80 max-w-xl">
            We help fast-moving teams achieve certifications (ISO 27001, SOC 2, PCI-DSS), harden processes, and ship securely—without
            slowing down the business.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-cyan-400/90 text-[#07131e] font-medium hover:bg-cyan-300 transition"
            >
              Start a project <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-cyan-300/40 hover:bg-white/5">
              Explore services
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            { title: "ISO 27001 Programs", text: "Build or uplift ISMS: policy suites, risk registers, audit-ready evidence." },
            { title: "Privacy & GDPR", text: "Records of processing, DPIAs, vendor reviews, OneTrust workflows." },
            { title: "SOC 2 Readiness", text: "Control mapping, monitoring dashboards, executive reporting." },
            { title: "Third-Party Risk", text: "Due diligence, contractual controls, continuous monitoring." },
          ].map((c, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0f2231]/60 border border-white/10 flex items-start gap-3">
              <Shield className="shrink-0" />
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-cyan-200/80">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Section title="Why CyberClarityGlobal" subtitle="Outcome-first consulting designed for modern product teams.">
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { h: "Speed with Rigor", p: "We ship security programs that pass audits and move with your roadmap." },
          { h: "Executive-Ready Insight", p: "Live MI & dashboards that make risk visible and actionable." },
          { h: "From Policy to Practice", p: "We don’t just write documents—we implement controls and train teams." },
        ].map((b, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-semibold mb-2">{b.h}</div>
            <div className="text-sm text-cyan-200/80">{b.p}</div>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Selected Outcomes">
      <div className="grid md:grid-cols-3 gap-5">
        {["ISO 27001 certification in 14 weeks", "SOC 2 Type I in 90 days", "Vendor risk time cut by 60%"].map((t, i) => (
          <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <div className="flex items-center gap-2 text-cyan-100">
              <CheckCircle2 /> {t}
            </div>
            <p className="mt-2 text-sm text-cyan-200/80">Evidence packs, automated controls, and clean auditor hand-offs.</p>
          </div>
        ))}
      </div>
    </Section>
  </>
);

const ServicesPage = () => (
  <>
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-semibold">Services & Pricing</h1>
      <p className="mt-2 text-cyan-200/80 max-w-2xl">CyberClarityGlobal specialises in fast, actionable security and compliance for startups and scaleups.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      {[
        { t: "Cybersecurity Posture Assessments", d: "Quick, actionable reviews of your current security maturity. Identify risks, gaps, and urgent fixes with a prioritised action plan.", price: "£199" },
        { t: "Custom Policy & Compliance Kits", d: "Ready-to-use GDPR, Acceptable Use, Access Control, and Data Protection policies. Tailored templates that make compliance plug-and-play for small teams.", price: "£149 per kit" },
        { t: "Starter Bundle", d: "Assessment + 1 Policy.", price: "£299" },
        { t: "Core Bundle", d: "Assessment + 3 Policies + Checklist.", price: "£449" },
        { t: "Complete Bundle", d: "Everything + Breach Plan + DPIA Starter + Training.", price: "£749" },
        { t: "Incident & Breach Readiness", d: "Breach response playbooks, escalation guides, and checklists so founders can respond confidently and minimise damage.", price: "£199" },
        { t: "Onboarding & Offboarding Security Processes", d: "Easy-to-follow guides for adding/removing staff securely. Reduces insider risks and strengthens access control with clean, auditable steps.", price: "£99" },
        { t: "Due Diligence & Investor-Readiness Packs", d: "Security and compliance material needed during funding rounds—making you look enterprise-ready without enterprise cost.", price: "£349" },
        { t: "Monthly Compliance & Advisory Retainers", d: "Ongoing support for founders who need someone to own cybersecurity and compliance. Perfect for teams not yet ready for a full-time security hire.", price: "From £499/mo" },
      ].map((s, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="font-semibold">{s.t}</div>
            <div className="text-sm text-cyan-200/80 mt-2">{s.d}</div>
          </div>
          <div className="mt-4 text-cyan-100 font-medium">{s.price}</div>
        </div>
      ))}
    </div>

    <Section title="Bundles at a Glance" subtitle="Compare our packaged offerings for the best value.">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-white/10 rounded-2xl overflow-hidden">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-2 text-left">Bundle</th>
              <th className="px-4 py-2 text-left">Includes</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/10">
              <td className="px-4 py-3 font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} /> Starter
              </td>
              <td className="px-4 py-3 flex items-center gap-2">📄 Assessment + 🔒 1 Policy</td>
              <td className="px-4 py-3">£299</td>
              <td className="px-4 py-3">Early stage teams</td>
            </tr>
            <tr className="border-t border-white/10 bg-white/5">
              <td className="px-4 py-3 font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} /> Core
              </td>
              <td className="px-4 py-3 flex items-center gap-2">📄 Assessment + 📄 3 Policies + ✅ Checklist</td>
              <td className="px-4 py-3">£449</td>
              <td className="px-4 py-3">Founders needing fast compliance wins</td>
            </tr>
            <tr className="border-t border-white/10">
              <td className="px-4 py-3 font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} /> Complete{" "}
                <span className="ml-2 text-xs bg-cyan-500 text-[#07131e] px-2 py-1 rounded-full">Best Value</span>
              </td>
              <td className="px-4 py-3 flex flex-col gap-1">
                <span>📄 Everything</span>
                <span>🔒 Breach Plan</span>
                <span>📄 DPIA Starter</span>
                <span>✅ Training</span>
              </td>
              <td className="px-4 py-3">£749</td>
              <td className="px-4 py-3">Investor-ready & audit-ready teams</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-white/5 border border-white/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Not sure where to start?</div>
          <p className="text-sm text-cyan-200/80">Book a 30-minute discovery call and we’ll map the quickest path to a passable audit or investor-ready pack.</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-cyan-400/90 text-[#07131e] font-medium hover:bg-cyan-300 transition"
        >
          Schedule a call <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </>
);

const AboutPage = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-semibold">About</h1>
    <p className="mt-3 text-cyan-200/80 max-w-3xl">
      CyberClarityGlobal blends governance, risk, and compliance with product-centric execution. We’ve helped start-ups and scale-ups
      establish trust, win enterprise deals, and pass audits without derailing delivery.
    </p>
    <Section title="Principles">
      <ul className="grid md:grid-cols-3 gap-5">
        {["Clarity over jargon", "Automation where it counts", "Evidence-first by default"].map((p, i) => (
          <li key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            {p}
          </li>
        ))}
      </ul>
    </Section>
  </>
);

const BlogPage = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-semibold">Insights</h1>
    <p className="mt-2 text-cyan-200/80">Opinionated takes on compliance that actually helps ship.</p>
    <div className="grid md:grid-cols-3 gap-5 mt-6">
      {[1, 2, 3].map((i) => (
        <article key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-sm text-cyan-200/60">{`2025-0${i}-12`}</div>
          <h3 className="mt-1 font-semibold">{`Post ${i}: Modern ISO Metrics`}</h3>
          <p className="text-sm text-cyan-200/80 mt-2">Cut noise from KPIs, track outcomes that change behaviour.</p>
          <Link to="#" className="block mt-3 text-cyan-300 hover:text-white">
            Read more →
          </Link>
        </article>
      ))}
    </div>
  </>
);

const ContactPage = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
    <p className="mt-2 text-cyan-200/80">Tell us about your goals. We’ll respond within one business day.</p>
    <form className="mt-6 grid md:grid-cols-2 gap-4">
      {[
        { label: "Name", type: "text", name: "name" },
        { label: "Email", type: "email", name: "email" },
        { label: "Company", type: "text", name: "company" },
        { label: "Budget", type: "text", name: "budget" },
      ].map((f, i) => (
        <label key={i} className="block">
          <span className="text-sm text-cyan-200/80">{f.label}</span>
          <input
            type={f.type}
            name={f.name}
            className="mt-1 w-full rounded-xl bg-[#0f2231] border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder={f.label}
          />
        </label>
      ))}
      <label className="md:col-span-2 block">
        <span className="text-sm text-cyan-200/80">Project details</span>
        <textarea
          rows={5}
          className="mt-1 w-full rounded-xl bg-[#0f2231] border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="What outcome are you after?"
        />
      </label>
      <button
        type="button"
        className="md:col-span-2 inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-cyan-400/90 text-[#07131e] font-medium hover:bg-cyan-300 transition"
      >
        Send enquiry <ArrowRight size={18} />
      </button>
    </form>
  </>
);
// ...keep the rest of the file above unchanged...

const ContactPage = () => {
  type FormState = {
    name: string;
    email: string;
    company: string;
    budget: string;
    details: string;
  };

  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    company: "",
    budget: "",
    details: "",
  });

  const fields: Array<{ label: string; type: string; name: keyof FormState; required?: boolean }> = [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Email", type: "email", name: "email", required: true },
    { label: "Company", type: "text", name: "company" },
    { label: "Budget", type: "text", name: "budget" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const to = "hello@cyberclarityglobal.com";
    const subject = `Website enquiry from ${form.name || "Unknown"}${form.company ? ` (${form.company})` : ""}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Budget: ${form.budget}`,
      "",
      "Project details:",
      form.details,
    ].join("\n");

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
      <p className="mt-2 text-cyan-200/80">Tell us about your goals. We’ll respond within one business day.</p>

      <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {fields.map((f, i) => (
          <label key={i} className="block">
            <span className="text-sm text-cyan-200/80">{f.label}</span>
            <input
              type={f.type}
              name={f.name}
              required={f.required}
              value={form[f.name]}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.name]: e.target.value }))}
              className="mt-1 w-full rounded-xl bg-[#0f2231] border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder={f.label}
            />
          </label>
        ))}

        <label className="md:col-span-2 block">
          <span className="text-sm text-cyan-200/80">Project details</span>
          <textarea
            rows={5}
            value={form.details}
            onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
            className="mt-1 w-full rounded-xl bg-[#0f2231] border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="What outcome are you after?"
          />
        </label>

        <button
          type="submit"
          className="md:col-span-2 inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-cyan-400/90 text-[#07131e] font-medium hover:bg-cyan-300 transition"
        >
          Send enquiry <ArrowRight size={18} />
        </button>
      </form>
    </>
  );
};

// ...keep the rest of the file below unchanged...
const PrivacyPage = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
    <p className="mt-3 text-cyan-200/80 max-w-3xl">We take privacy seriously. This is a generic template—replace with your policy when ready.</p>
    <ul className="list-disc ml-6 mt-4 space-y-2 text-cyan-200/80">
      <li>We only collect data needed to deliver services.</li>
      <li>We never sell personal data.</li>
      <li>Data subject rights honoured within statutory timelines.</li>
    </ul>
  </>
);

const TermsPage = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-semibold">Terms of Service</h1>
    <p className="mt-3 text-cyan-200/80 max-w-3xl">These terms govern use of our site and services. Replace with your counsel-approved terms.</p>
    <ol className="list-decimal ml-6 mt-4 space-y-2 text-cyan-200/80">
      <li>Engagements are subject to a signed statement of work.</li>
      <li>Confidential information must be handled securely and used only for agreed purposes.</li>
      <li>Liability limited as per contract.</li>
    </ol>
  </>
);

/* ========= Router wrapper with page animation ========= */
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={useLocation().pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

/* ========= App (default export) ========= */
export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </PageTransition>
      </Shell>
    </BrowserRouter>
  );
}
