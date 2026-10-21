"use client";

import { useState } from "react";
import {
  Globe,
  Briefcase,
  ShoppingBag,
  Sparkles,
  Layout,
  Code2,
  Check,
  Send,
  MessageSquare,
  Mail,
  CreditCard,
  Database,
  Calendar,
  Bot,
  Users,
  Image as ImageIcon,
  Clock,
  DollarSign,
  User,
  Building,
  Phone,
  FileCode,
  ChevronDown,
  Palette,
  FileText,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

// Project Types
const PROJECT_TYPES = [
  { id: "business", label: "Business Website", icon: Briefcase, desc: "Showcase company services, team, and brand credibility" },
  { id: "portfolio", label: "Portfolio", icon: Globe, desc: "Personal showcase for developers, designers, or creators" },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingBag, desc: "Product catalog, cart, checkout, and inventory flow" },
  { id: "landing", label: "Landing Page", icon: Layout, desc: "High-conversion one-page site focused on leads or sales" },
  { id: "webapp", label: "Web App", icon: Code2, desc: "Custom dynamic software, client dashboard, or portal" },
  { id: "custom", label: "Custom Project", icon: Sparkles, desc: "Bespoke digital solution tailored to your exact scope" },
];

// Page Options
const PAGE_COUNTS = ["1 (Single Page)", "2–4 Pages", "5–8 Pages", "10+ Pages"];
const SUGGESTED_PAGES = [
  "Home",
  "About Us",
  "Services",
  "Portfolio / Work",
  "Blog / News",
  "Pricing",
  "Contact",
  "FAQ",
  "Testimonials",
  "Careers",
];

// Features
const FEATURES = [
  { id: "whatsapp", label: "WhatsApp Chat", icon: MessageSquare },
  { id: "contact_form", label: "Lead Contact Form", icon: Mail },
  { id: "gallery", label: "Image / Media Gallery", icon: ImageIcon },
  { id: "auth", label: "User Login / Auth", icon: Users },
  { id: "payments", label: "Payment Gateway", icon: CreditCard },
  { id: "booking", label: "Appointment Booking", icon: Calendar },
  { id: "chatbot", label: "AI Chatbot Assistant", icon: Bot },
  { id: "crm", label: "CRM & Leads Dashboard", icon: Database },
];

// Design Styles
const DESIGN_STYLES = [
  { id: "minimal", label: "Minimal & Clean", desc: "Spacious, uncluttered, focused on clear typography" },
  { id: "dark", label: "Dark & Cinematic", desc: "Deep dark tones, subtle glow, premium modern aesthetic" },
  { id: "luxury", label: "Luxury & Editorial", desc: "Sophisticated styling, serif accents, high-end feel" },
  { id: "corporate", label: "Corporate & Trustworthy", desc: "Structured, balanced, authoritative professional finish" },
  { id: "creative", label: "Creative & Expressive", desc: "Dynamic visuals, bold layout, and memorable identity" },
];

// Integrations
const INTEGRATIONS = [
  { id: "whatsapp", label: "WhatsApp Direct", icon: MessageSquare },
  { id: "email", label: "Email Automation (Resend / SMTP)", icon: Mail },
  { id: "payment_gateway", label: "Payment Gateway (Stripe / Razorpay)", icon: CreditCard },
  { id: "supabase", label: "Supabase / Database", icon: Database },
  { id: "crm_api", label: "Custom REST / GraphQL APIs", icon: FileCode },
];

// Budgets (USD strictly)
const BUDGETS = [
  { id: "under100", label: "Under $100", desc: "Quick setup or simple single-page site" },
  { id: "100_300", label: "$100 – $300", desc: "Standard multi-page business website" },
  { id: "300_500", label: "$300 – $500", desc: "Full-featured website with custom styling" },
  { id: "500_1000", label: "$500 – $1,000", desc: "Advanced web application or e-commerce" },
  { id: "1000_plus", label: "$1,000+", desc: "Full-scale custom portal or multi-system suite" },
  { id: "not_sure", label: "Not sure yet", desc: "Let's discuss and estimate together" },
];

// Timelines
const TIMELINES = [
  "As soon as possible",
  "2 – 4 weeks",
  "1 – 2 months",
  "Flexible",
];

export function ProjectBuilder() {
  // Accordion state: null = all hidden by default, or section id string
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Mobile summary accordion state (collapsed by default on mobile)
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState<boolean>(false);

  // Config selections
  const [projectType, setProjectType] = useState<string>("business");
  const [pageCount, setPageCount] = useState<string>("2–4 Pages");
  const [selectedPages, setSelectedPages] = useState<string[]>(["Home", "About Us", "Services", "Contact"]);
  const [customPage, setCustomPage] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["whatsapp", "contact_form"]);
  const [customFeature, setCustomFeature] = useState<string>("");
  const [extraFeatures, setExtraFeatures] = useState<string[]>([]);
  const [designStyle, setDesignStyle] = useState<string>("dark");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(["whatsapp"]);
  const [budget, setBudget] = useState<string>("$300 – $500");
  const [timeline, setTimeline] = useState<string>("2 – 4 weeks");

  // Contact info
  const [name, setName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Accordion toggle: closes other sections automatically
  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  // Handlers
  const togglePage = (page: string) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const addCustomPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPage.trim() && !selectedPages.includes(customPage.trim())) {
      setSelectedPages([...selectedPages, customPage.trim()]);
      setCustomPage("");
    }
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addCustomFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFeature.trim() && !extraFeatures.includes(customFeature.trim())) {
      setExtraFeatures([...extraFeatures, customFeature.trim()]);
      setCustomFeature("");
    }
  };

  const toggleIntegration = (id: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Compile formatted WhatsApp message
  const handleSendWhatsApp = () => {
    const selectedTypeObj = PROJECT_TYPES.find((t) => t.id === projectType);
    const selectedDesignObj = DESIGN_STYLES.find((d) => d.id === designStyle);
    const featureLabels = [
      ...selectedFeatures.map((fid) => FEATURES.find((f) => f.id === fid)?.label).filter(Boolean),
      ...extraFeatures,
    ];
    const integrationLabels = selectedIntegrations
      .map((iid) => INTEGRATIONS.find((i) => i.id === iid)?.label)
      .filter(Boolean);

    const message = `*Hi Siraj, I would like to discuss a project!* 🚀

*📋 Project Details:*
• *Project Type:* ${selectedTypeObj?.label || "Custom Project"}
• *Page Count:* ${pageCount}
• *Pages Needed:* ${selectedPages.length > 0 ? selectedPages.join(", ") : "Standard set"}
• *Design Aesthetic:* ${selectedDesignObj?.label || "Dark & Cinematic"}
• *Key Features:* ${featureLabels.length > 0 ? featureLabels.join(", ") : "Basic functionality"}
• *Integrations:* ${integrationLabels.length > 0 ? integrationLabels.join(", ") : "None specified"}
• *Budget (USD):* ${budget}
• *Target Timeline:* ${timeline}

*👤 Client Information:*
• *Name:* ${name.trim() || "Not specified"}
• *Business:* ${businessName.trim() || "Not specified"}
• *Phone:* ${phone.trim() || "Not specified"}
${notes.trim() ? `• *Additional Notes:* ${notes.trim()}\n` : ""}
Looking forward to hearing from you!`;

    const cleanNumber = "919176619665";
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Helper strings for collapsed badges
  const currentTypeName = PROJECT_TYPES.find((t) => t.id === projectType)?.label || "Custom";
  const currentDesignName = DESIGN_STYLES.find((d) => d.id === designStyle)?.label || "Dark";
  const totalFeaturesCount = selectedFeatures.length + extraFeatures.length;

  return (
    <div id="custom-project" aria-labelledby="builder-title" className="pt-12 sm:pt-16 border-t border-[#292E37]/80 relative">
      <div>
        {/* Header */}
        <Reveal className="max-w-[720px] mb-8 sm:mb-10">
          <p className="label mb-3 !text-[#6C8CFF]">Interactive Estimator</p>
          <h3 id="builder-title" className="text-[28px] sm:text-[34px] font-bold text-[#F5F5F0] tracking-tight">
            What&apos;s on Your Mind?
          </h3>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#A1A6B0] leading-relaxed">
            Customize your website requirements on demand. Click any category below to adjust options, preview the live estimate, and send it directly to my WhatsApp.
          </p>
        </Reveal>

        {/* 2-Column Responsive Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-start w-full min-w-0">
          {/* Left Column: Accordion Sections (All collapsed by default) */}
          <div className="w-full min-w-0 lg:col-span-8 space-y-3.5">
            {/* 1. PROJECT TYPE */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("project_type")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "project_type"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    01
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Project Type
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      Format &amp; primary goal of your build
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 text-[12px] font-medium text-[#6C8CFF]">
                    {currentTypeName}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "project_type" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Collapsed view indicator for small screens */}
              <div className="sm:hidden px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#6C8CFF] bg-[#6C8CFF]/10 px-2 py-0.5 rounded">
                  Selected: {currentTypeName}
                </span>
              </div>

              {activeAccordion === "project_type" && (
                <div className="border-t border-[#292E37] p-5 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PROJECT_TYPES.map((t) => {
                      const Icon = t.icon;
                      const isSelected = projectType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setProjectType(t.id)}
                          className={`flex flex-col text-left p-4 rounded-[12px] border transition-all duration-150 ${
                            isSelected
                              ? "border-[#6C8CFF] bg-[#6C8CFF]/10 shadow-[0_4px_20px_-8px_rgba(108,140,255,0.4)]"
                              : "border-[#292E37] bg-[#12151A] hover:border-[#3a414d]"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            <span className={`p-2 rounded-lg border ${isSelected ? "border-[#6C8CFF]/40 text-[#6C8CFF] bg-[#6C8CFF]/10" : "border-[#292E37] text-[#737985]"}`}>
                              <Icon size={18} />
                            </span>
                            {isSelected && <span className="h-5 w-5 rounded-full bg-[#6C8CFF] text-[#0B0D10] flex items-center justify-center"><Check size={12} strokeWidth={3} /></span>}
                          </div>
                          <span className="text-[14.5px] font-medium text-[#F5F5F0]">{t.label}</span>
                          <span className="text-[12px] text-[#737985] mt-1 leading-snug">{t.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. PAGES & STRUCTURE */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("pages")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "pages"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    02
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Pages &amp; Structure
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      Page count volume &amp; required page sections
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 text-[12px] font-medium text-[#6C8CFF]">
                    {pageCount} ({selectedPages.length} pages)
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "pages" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="sm:hidden px-3.5 sm:px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#6C8CFF] bg-[#6C8CFF]/10 px-2 py-0.5 rounded">
                  {pageCount} • {selectedPages.length} pages selected
                </span>
              </div>

              {activeAccordion === "pages" && (
                <div className="border-t border-[#292E37] p-4 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150 space-y-6">
                  {/* Page count tier */}
                  <div>
                    <label className="block text-[12.5px] font-mono uppercase tracking-wider text-[#A1A6B0] mb-2.5 flex items-center gap-1.5">
                      <FileText size={13} className="text-[#6C8CFF]" />
                      <span>Estimated Page Count</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {PAGE_COUNTS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setPageCount(c)}
                          className={`py-2 px-3 rounded-lg border text-[13px] font-medium transition-colors ${
                            pageCount === c
                              ? "border-[#6C8CFF] bg-[#6C8CFF]/15 text-[#F5F5F0]"
                              : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#A1A6B0]"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Required pages checkbox pills */}
                  <div>
                    <label className="block text-[12.5px] font-mono uppercase tracking-wider text-[#A1A6B0] mb-2.5">
                      Check All Required Pages
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {SUGGESTED_PAGES.map((page) => {
                        const isChecked = selectedPages.includes(page);
                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() => togglePage(page)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] transition-colors ${
                              isChecked
                                ? "border-[#6C8CFF]/60 bg-[#6C8CFF]/15 text-[#F5F5F0] font-medium"
                                : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#F5F5F0]"
                            }`}
                          >
                            {isChecked && <Check size={12} className="text-[#6C8CFF]" />}
                            <span>{page}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Add custom page input */}
                    <form onSubmit={addCustomPage} className="flex gap-2 max-w-[340px] w-full">
                      <input
                        type="text"
                        placeholder="Add other page (e.g. Case Studies)"
                        value={customPage}
                        onChange={(e) => setCustomPage(e.target.value)}
                        className="flex-1 min-w-0 bg-[#12151A] border border-[#292E37] rounded-lg px-3 py-2 text-[13px] text-[#F5F5F0] focus:border-[#6C8CFF] focus:outline-none"
                      />
                      <button type="submit" className="btn btn-ghost !h-auto !py-2 !px-3 text-[12.5px] shrink-0">
                        + Add
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* 3. KEY FEATURES */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("features")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "features"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    03
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Key Features
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      WhatsApp, contact form, login, payments, booking &amp; AI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 text-[12px] font-medium text-[#6C8CFF]">
                    {totalFeaturesCount} features selected
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "features" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="sm:hidden px-3.5 sm:px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#6C8CFF] bg-[#6C8CFF]/10 px-2 py-0.5 rounded">
                  {totalFeaturesCount} features selected
                </span>
              </div>

              {activeAccordion === "features" && (
                <div className="border-t border-[#292E37] p-4 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150">
                  <div className="grid gap-2.5 sm:grid-cols-2 mb-4">
                    {FEATURES.map((f) => {
                      const Icon = f.icon;
                      const isChecked = selectedFeatures.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => toggleFeature(f.id)}
                          className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-colors ${
                            isChecked
                              ? "border-[#6C8CFF]/70 bg-[#6C8CFF]/10 text-[#F5F5F0]"
                              : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#A1A6B0]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={16} className={isChecked ? "text-[#6C8CFF]" : "text-[#737985]"} />
                            <span className="text-[13.5px] font-medium">{f.label}</span>
                          </div>
                          <span className={`h-4 w-4 rounded border flex items-center justify-center ${isChecked ? "border-[#6C8CFF] bg-[#6C8CFF] text-[#0B0D10]" : "border-[#292E37]"}`}>
                            {isChecked && <Check size={11} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {extraFeatures.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {extraFeatures.map((ef) => (
                        <span
                          key={ef}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#6C8CFF]/40 bg-[#6C8CFF]/10 text-[12.5px] text-[#F5F5F0]"
                        >
                          <Check size={12} className="text-[#6C8CFF]" /> {ef}
                        </span>
                      ))}
                    </div>
                  )}

                  <form onSubmit={addCustomFeature} className="flex gap-2 max-w-[340px]">
                    <input
                      type="text"
                      placeholder="Other feature (e.g. Multi-language)"
                      value={customFeature}
                      onChange={(e) => setCustomFeature(e.target.value)}
                      className="flex-1 bg-[#12151A] border border-[#292E37] rounded-lg px-3 py-2 text-[13px] text-[#F5F5F0] focus:border-[#6C8CFF] focus:outline-none"
                    />
                    <button type="submit" className="btn btn-ghost !h-auto !py-2 !px-3 text-[12.5px]">
                      + Add
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* 4. DESIGN STYLE & VISUAL TONE */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("design")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "design"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    04
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Design Style
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      Minimal, corporate, luxury, creative, or dark
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 text-[12px] font-medium text-[#6C8CFF]">
                    {currentDesignName}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "design" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="sm:hidden px-3.5 sm:px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#6C8CFF] bg-[#6C8CFF]/10 px-2 py-0.5 rounded">
                  {currentDesignName}
                </span>
              </div>

              {activeAccordion === "design" && (
                <div className="border-t border-[#292E37] p-4 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {DESIGN_STYLES.map((d) => {
                      const isSelected = designStyle === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDesignStyle(d.id)}
                          className={`w-full text-left p-3.5 rounded-lg border transition-colors ${
                            isSelected
                              ? "border-[#6C8CFF] bg-[#6C8CFF]/10 text-[#F5F5F0]"
                              : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#A1A6B0]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-medium text-[#F5F5F0]">{d.label}</span>
                            {isSelected && <Check size={14} className="text-[#6C8CFF]" />}
                          </div>
                          <span className="block text-[12px] text-[#737985] mt-0.5">{d.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 5. INTEGRATIONS */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("integrations")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "integrations"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    05
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Integrations
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      WhatsApp, email, payment gateways, Supabase &amp; APIs
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 text-[12px] font-medium text-[#6C8CFF]">
                    {selectedIntegrations.length} connected
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "integrations" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="sm:hidden px-3.5 sm:px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#6C8CFF] bg-[#6C8CFF]/10 px-2 py-0.5 rounded">
                  {selectedIntegrations.length} integrations connected
                </span>
              </div>

              {activeAccordion === "integrations" && (
                <div className="border-t border-[#292E37] p-4 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {INTEGRATIONS.map((ig) => {
                      const isChecked = selectedIntegrations.includes(ig.id);
                      const Icon = ig.icon;
                      return (
                        <button
                          key={ig.id}
                          type="button"
                          onClick={() => toggleIntegration(ig.id)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-left transition-colors ${
                            isChecked
                              ? "border-[#6C8CFF]/60 bg-[#6C8CFF]/10 text-[#F5F5F0]"
                              : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#A1A6B0]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={15} className={isChecked ? "text-[#6C8CFF]" : "text-[#737985]"} />
                            <span className="text-[13px] font-medium">{ig.label}</span>
                          </div>
                          <span className={`h-4 w-4 rounded border flex items-center justify-center ${isChecked ? "border-[#6C8CFF] bg-[#6C8CFF] text-[#0B0D10]" : "border-[#292E37]"}`}>
                            {isChecked && <Check size={11} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 6. BUDGET & TIMELINE */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("budget_timeline")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "budget_timeline"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    06
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Budget &amp; Target Timeline
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      USD ($) budget ranges &amp; delivery window
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#22d3ee]/10 border border-[#22d3ee]/30 text-[12px] font-semibold text-[#22d3ee]">
                    {budget} • {timeline}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "budget_timeline" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="sm:hidden px-3.5 sm:px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded font-medium">
                  {budget} • {timeline}
                </span>
              </div>

              {activeAccordion === "budget_timeline" && (
                <div className="border-t border-[#292E37] p-4 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150 space-y-6">
                  {/* Budget options */}
                  <div>
                    <label className="block text-[12.5px] font-mono uppercase tracking-wider text-[#A1A6B0] mb-3 flex items-center gap-1.5">
                      <DollarSign size={14} className="text-[#6C8CFF]" />
                      <span>Estimated Budget (USD Strictly)</span>
                    </label>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {BUDGETS.map((b) => {
                        const isSelected = budget === b.label;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBudget(b.label)}
                            className={`p-3 rounded-lg border text-left transition-colors ${
                              isSelected
                                ? "border-[#6C8CFF] bg-[#6C8CFF]/15 text-[#F5F5F0] shadow-sm"
                                : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#A1A6B0]"
                            }`}
                          >
                            <span className="block text-[14px] font-semibold text-[#F5F5F0]">{b.label}</span>
                            <span className="block text-[11.5px] text-[#737985] mt-0.5">{b.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-[12.5px] font-mono uppercase tracking-wider text-[#A1A6B0] mb-2.5 flex items-center gap-1.5">
                      <Clock size={13} className="text-[#6C8CFF]" />
                      <span>Ideal Delivery Timeline</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIMELINES.map((tl) => (
                        <button
                          key={tl}
                          type="button"
                          onClick={() => setTimeline(tl)}
                          className={`p-2 rounded-lg border text-center text-[13px] font-medium transition-colors ${
                            timeline === tl
                              ? "border-[#6C8CFF] bg-[#6C8CFF]/15 text-[#F5F5F0]"
                              : "border-[#292E37] bg-[#12151A] text-[#737985] hover:text-[#A1A6B0]"
                          }`}
                        >
                          {tl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 7. CONTACT DETAILS */}
            <div className="rounded-[14px] border border-[#292E37] bg-[#12151A] overflow-hidden transition-all duration-200 w-full min-w-0">
              <button
                type="button"
                onClick={() => toggleAccordion("contact_details")}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left hover:bg-[#161a22] transition-colors focus:outline-none min-w-0"
                aria-expanded={activeAccordion === "contact_details"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6C8CFF]/15 text-[12px] font-mono font-semibold text-[#6C8CFF]">
                    07
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-[17px] font-semibold text-[#F5F5F0] truncate">
                      Contact Details &amp; Notes
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-[#737985] truncate">
                      Name, business name, and phone number
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/30 text-[12px] font-medium text-[#6C8CFF]">
                    {name ? name : "Optional info"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737985] transition-transform duration-200 ${
                      activeAccordion === "contact_details" ? "rotate-180 text-[#6C8CFF]" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="sm:hidden px-3.5 sm:px-4 pb-3 -mt-1 flex items-center">
                <span className="text-[11.5px] text-[#737985]">
                  {name ? `Client: ${name}` : "Tap to add contact details (optional)"}
                </span>
              </div>

              {activeAccordion === "contact_details" && (
                <div className="border-t border-[#292E37] p-4 sm:p-6 bg-[#0E1116]/60 animate-in fade-in duration-150">
                  <div className="grid gap-3.5 sm:grid-cols-3 mb-4">
                    <div>
                      <label className="block text-[12px] font-mono uppercase text-[#A1A6B0] mb-1.5 flex items-center gap-1">
                        <User size={12} /> Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#12151A] border border-[#292E37] rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#F5F5F0] focus:border-[#6C8CFF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-mono uppercase text-[#A1A6B0] mb-1.5 flex items-center gap-1">
                        <Building size={12} /> Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company or Brand"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-[#12151A] border border-[#292E37] rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#F5F5F0] focus:border-[#6C8CFF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-mono uppercase text-[#A1A6B0] mb-1.5 flex items-center gap-1">
                        <Phone size={12} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 / International"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#12151A] border border-[#292E37] rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#F5F5F0] focus:border-[#6C8CFF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-mono uppercase text-[#A1A6B0] mb-1.5">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any reference websites, specific requirements or scope notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#12151A] border border-[#292E37] rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#F5F5F0] focus:border-[#6C8CFF] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Project Summary & Send on WhatsApp */}
          <div className="w-full min-w-0 lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-[16px] border border-[#6C8CFF]/30 bg-[#12151A] p-4 sm:p-6 shadow-xl relative overflow-hidden w-full min-w-0">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6C8CFF] via-[#22d3ee] to-[#6C8CFF]" />

              {/* Summary Header: Clickable to toggle on mobile */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="label !text-[#6C8CFF]">Live Project Summary</span>
                  <h4 className="text-[18px] sm:text-[19px] font-semibold text-[#F5F5F0] mt-1">
                    {currentTypeName}
                  </h4>
                </div>

                {/* Mobile toggle button */}
                <button
                  type="button"
                  onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                  className="lg:hidden flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0E1116] border border-[#292E37] text-[12px] text-[#A1A6B0]"
                  aria-expanded={mobileSummaryOpen}
                >
                  <span>{mobileSummaryOpen ? "Hide" : "Details"}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileSummaryOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Key summary details - Collapsible on mobile, always visible on desktop */}
              <div className={`${mobileSummaryOpen ? "block" : "hidden"} lg:block`}>
                <div className="space-y-2.5 border-t border-[#292E37] pt-4 mt-4 text-[13px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#737985]">Scope:</span>
                    <span className="font-medium text-[#F5F5F0] text-right">{pageCount}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#737985]">Pages ({selectedPages.length}):</span>
                    <span className="font-medium text-[#F5F5F0] text-right truncate max-w-[160px]" title={selectedPages.join(", ")}>
                      {selectedPages.slice(0, 3).join(", ")}{selectedPages.length > 3 ? "..." : ""}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#737985]">Design:</span>
                    <span className="font-medium text-[#F5F5F0]">{currentDesignName}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#737985]">Features:</span>
                    <span className="font-medium text-[#6C8CFF]">
                      {totalFeaturesCount} selected
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#737985]">Target Budget:</span>
                    <span className="font-semibold text-[#22d3ee]">{budget}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#737985]">Timeline:</span>
                    <span className="font-medium text-[#F5F5F0]">{timeline}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action - Always visible & easily accessible */}
              <div className="mt-5 pt-4 border-t border-[#292E37]">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-[#25D366] text-[#0B0D10] font-semibold text-[14.5px] hover:bg-[#20ba59] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all shadow-[0_8px_24px_-8px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] cursor-pointer"
                >
                  <Send size={15} />
                  <span>Send on WhatsApp</span>
                </button>

                <p className="text-[11.5px] text-center text-[#737985] mt-2 leading-relaxed">
                  Opens WhatsApp message to <strong>+91 91766 19665</strong>. Review and send whenever ready.
                </p>
              </div>
            </div>

            {/* Quick trust note */}
            <div className="rounded-[12px] border border-[#292E37] bg-[#0E1116] p-3.5 text-[12.5px] text-[#A1A6B0] leading-relaxed">
              <span className="text-[#F5F5F0] font-medium block mb-0.5">Direct Collaboration</span>
              No sales bots. You&apos;ll discuss the scope directly with Siraj KS.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
