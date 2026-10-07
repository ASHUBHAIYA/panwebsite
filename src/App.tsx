import React, { useState, useMemo } from 'react';
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  FileText,
  Building2,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  Scale,
  Menu,
  X,
  ExternalLink,
  Printer,
  AlertCircle,
  Check
} from 'lucide-react';

// Contact Constants
const PHONE_NUMBER = '+91 88712 17486';
const PHONE_NUMBER_RAW = '918871217486';
const OFFICE_LANDLINE = '011-2345-6789';
const OFFICE_EMAIL = 'helpdesk@jansuvidhacenter.in';
const OFFICE_ADDRESS = 'Shop No. 12, Ground Floor, Sai Plaza Commercial Complex, Opp. SDM / Tehsil Office, Main Market Road, Sector 14, New Delhi - 110001';

interface ServiceItem {
  id: string;
  title: string;
  category: 'taxation' | 'licenses' | 'legal' | 'personal';
  categoryLabel: string;
  description: string;
  turnaround: string;
  documents: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  // Card 1: PAN Card (Always First)
  {
    id: 'pan-card',
    title: 'PAN Card (New, Correction & Minor)',
    category: 'personal',
    categoryLabel: 'Personal & Identity',
    description: 'New PAN applications, minor-to-major updates, corrections in name or date of birth, duplicate physical card reprint, and Aadhaar-PAN linking.',
    turnaround: 'E-PAN in 2-4 Hours | Physical Card in 5-7 Days',
    documents: [
      'Aadhaar Card',
      '2 Passport Size Photos',
      'Proof of Date of Birth (Marksheet / Birth Certificate)',
      'Old PAN copy (for corrections or reprint)'
    ],
  },

  // Category: Taxation & Returns
  {
    id: 'gst-reg',
    title: 'GST Registration & Returns',
    category: 'taxation',
    categoryLabel: 'Taxation & Returns',
    description: 'Fresh GSTIN allotment, monthly GSTR-1 & GSTR-3B filings, annual GSTR-9 reconciliation, and amendment filings.',
    turnaround: '3 - 5 Working Days',
    documents: [
      'PAN Card & Aadhaar of Owner/Directors',
      'Electricity Bill / Rent Agreement of Office',
      'Cancelled Cheque / Bank Statement',
      'Passport Size Photo'
    ],
  },
  {
    id: 'itr-filing',
    title: 'Income Tax Return (ITR 1 to 4)',
    category: 'taxation',
    categoryLabel: 'Taxation & Returns',
    description: 'Tax return preparation for salaried individuals, small businesses (44AD/44ADA), capital gains, and refund claims.',
    turnaround: 'Same Day / 24 Hours',
    documents: [
      'Form 16 / Salary Slips',
      'Bank Statement for the financial year',
      'Aadhaar Card & PAN Card',
      'Investment Proofs (80C, 80D)'
    ],
  },
  {
    id: 'epfo-esic',
    title: 'EPFO & ESIC Registration & Challans',
    category: 'taxation',
    categoryLabel: 'Taxation & Returns',
    description: 'Establishment PF and ESIC code allotment, monthly ECR challan generation, worker KYC linking, and claims assistance.',
    turnaround: '4 - 7 Working Days',
    documents: [
      'Firm Registration / Certificate of Incorporation',
      'Owner PAN, Aadhaar & Digital Signature',
      'Specimen Signature Card',
      'List of Employees with Aadhaar & Bank Details'
    ],
  },
  {
    id: 'tds-filing',
    title: 'TDS Returns & 26AS Reconciliation',
    category: 'taxation',
    categoryLabel: 'Taxation & Returns',
    description: 'Quarterly TDS return preparation (24Q, 26Q), Form 16/16A generation, tax demand resolution, and AIS discrepancy matching.',
    turnaround: '2 - 3 Working Days',
    documents: [
      'TAN Allotment Letter',
      'Deductor PAN & Payment Challans',
      'Deductee wise payment sheet'
    ],
  },
  {
    id: 'ptax-reg',
    title: 'Professional Tax (P-Tax) Enrollment',
    category: 'taxation',
    categoryLabel: 'Taxation & Returns',
    description: 'State-wise Professional Tax registration for business entities and regular payment challans for salaried employees.',
    turnaround: '2 - 4 Working Days',
    documents: [
      'Shop License / Business Proof',
      'PAN Card & Bank Details',
      'Office Address Proof'
    ],
  },

  // Category: Business Licenses
  {
    id: 'fssai-foscos',
    title: 'Food License / FSSAI (FoSCoS)',
    category: 'licenses',
    categoryLabel: 'Business Licenses',
    description: 'Basic registration, state license, and FoSCoS filings for restaurants, cloud kitchens, grocery stores, and food stalls.',
    turnaround: '2 - 4 Working Days',
    documents: [
      'Photo ID & Passport Photo of Operator',
      'Business Address Proof (Electricity bill / NOC)',
      'List of Food Categories / Menu Items',
      'Partnership Deed / MOA (if company)'
    ],
  },
  {
    id: 'shop-act-gumasta',
    title: 'Shop Act / Gumasta / Trade License',
    category: 'licenses',
    categoryLabel: 'Business Licenses',
    description: 'Municipal trade license and commercial establishment certificate required to legally run shops, clinics, and offices.',
    turnaround: '1 - 3 Working Days',
    documents: [
      'Aadhaar & PAN Card',
      'Shop Front Signboard Photograph',
      'Rent Agreement & Landlord NOC',
      'Electricity Bill of Premises'
    ],
  },
  {
    id: 'msme-udyam',
    title: 'MSME / Udyam Registration',
    category: 'licenses',
    categoryLabel: 'Business Licenses',
    description: 'Official Ministry of MSME certificate for micro, small, and medium enterprises to avail priority bank loans and subsidies.',
    turnaround: 'Same Day (2 - 4 Hours)',
    documents: [
      'Aadhaar Card (Mobile Linked for OTP)',
      'PAN Card of Proprietor / Enterprise',
      'Bank Account Number & IFSC',
      'Business Activity Details'
    ],
  },
  {
    id: 'contractor-reg',
    title: 'Labour & Contractor Registration',
    category: 'licenses',
    categoryLabel: 'Business Licenses',
    description: 'State Labour Department registration, Contract Labour (R&A) licenses, and commercial establishment safety compliances.',
    turnaround: '5 - 8 Working Days',
    documents: [
      'Work Order / Contract Copy',
      'Firm Registration & PAN',
      'Labour Count Details & Records',
      'Owner Identity Documents'
    ],
  },
  {
    id: 'iec-dgft',
    title: 'Import Export Code (IEC - DGFT)',
    category: 'licenses',
    categoryLabel: 'Business Licenses',
    description: '10-digit DGFT Import Export Code allotment and mandatory annual electronic renewal for traders and exporters.',
    turnaround: '24 - 48 Hours',
    documents: [
      'Firm PAN & Entity Proof',
      'Cancelled Cheque showing Firm Name',
      'Valid Digital Signature / Aadhaar OTP',
      'Address Proof of Office'
    ],
  },

  // Category: Legal & Certification
  {
    id: 'dsc-tokens',
    title: 'Digital Signature (Class 3 DSC Token)',
    category: 'legal',
    categoryLabel: 'Legal & Certification',
    description: 'Class 3 Signing and Encryption USB crypto tokens for MCA filings, e-Tenders, EPFO, ICEGATE, and GST portals.',
    turnaround: 'Same Day Desk Handover',
    documents: [
      'Original PAN Card & Aadhaar',
      'Active Mobile & Email for Video Verification',
      'Passport Size Photo'
    ],
  },
  {
    id: 'trademark-filing',
    title: 'Trademark (™) Brand Filing',
    category: 'legal',
    categoryLabel: 'Legal & Certification',
    description: 'Brand name, logo, and tagline protection. Pre-filing search, class selection, online submission, and TM receipt generation.',
    turnaround: '24 - 48 Hours',
    documents: [
      'Logo Image in High Resolution',
      'Brand User Affidavit with Date of First Use',
      'Identity Proof of Applicant',
      'Power of Attorney / Authorization Form'
    ],
  },
  {
    id: 'iso-cert',
    title: 'ISO 9001:2015 Certification',
    category: 'legal',
    categoryLabel: 'Legal & Certification',
    description: 'Accredited ISO quality certifications for corporate tenders, government vendor listings, and compliance badges.',
    turnaround: '4 - 7 Working Days',
    documents: [
      'Business Registration Certificate',
      'Company Letterhead & Scope of Work',
      'Invoices & Process Documentation'
    ],
  },
  {
    id: 'affidavits-notary',
    title: 'Stamp Paper, Affidavits & Agreements',
    category: 'legal',
    categoryLabel: 'Legal & Certification',
    description: 'E-Stamp paper purchase, name change affidavits, address change declarations, rental agreements, and local notary attestations.',
    turnaround: 'Same Day Service',
    documents: [
      'Aadhaar Card of Executants & Witnesses',
      'Draft Matter or Supporting Certificates',
      'Physical Presence or Signed Authorization'
    ],
  },
  {
    id: 'deed-incorporation',
    title: 'Partnership Deed & Firm Incorporation',
    category: 'legal',
    categoryLabel: 'Legal & Certification',
    description: 'Drafting of Partnership Deeds, Registrar of Firms (ROF) documentation, and Company / LLP incorporation filing support.',
    turnaround: '5 - 10 Working Days',
    documents: [
      'PAN & Aadhaar of all Partners/Directors',
      'Registered Office Proof (Electricity Bill + NOC)',
      'Profit Sharing Ratio & Capital Details'
    ],
  },

  // Category: Personal & Banking Support
  {
    id: 'bank-account-help',
    title: 'Current Account Opening Paperwork',
    category: 'personal',
    categoryLabel: 'Personal & Identity',
    description: 'Complete documentation dossier preparation for business current account opening with leading banks.',
    turnaround: '1 - 2 Working Days',
    documents: [
      'GST / Shop Act / MSME Certificate',
      'PAN & Aadhaar of Signatories',
      'Initial Cheque & Board Resolution (if company)'
    ],
  },
  {
    id: 'aeps-banking-agent',
    title: 'AEPS & CSP Banking Agent Helpdesk',
    category: 'personal',
    categoryLabel: 'Personal & Identity',
    description: 'Guidance and onboarding facilitation for local shopkeepers to become authorized banking points (CSP, DMT, AEPS).',
    turnaround: '2 - 3 Working Days',
    documents: [
      'Shop Proof & Photo',
      'Police Clearance / Character Certificate',
      'PAN, Aadhaar & Bank Passbook'
    ],
  },
  {
    id: 'railway-aadhaar-desk',
    title: 'Railway Agent & Aadhaar Helpdesk',
    category: 'personal',
    categoryLabel: 'Personal & Identity',
    description: 'IRCTC authorized commercial ticketing agent registration guidance and Aadhaar demographic update consultation.',
    turnaround: '2 - 4 Working Days',
    documents: [
      'Class 3 Digital Signature Token',
      'Personal PAN & Aadhaar',
      'Broadband & Computer Verification'
    ],
  },
];

const BUSINESS_PROFILES = [
  {
    id: 'retail',
    name: 'Retail Store / Kirana / Shop',
    badge: 'Shops & Retail',
    recommended: ['Shop Act / Gumasta', 'MSME / Udyam', 'GST Registration (if applicable)', 'DSC Class 3 Token'],
    why: 'Required to open a business Current Account, avoid municipal fines, and access priority trade loans.',
    docs: ['Shop photo with signboard', 'Rent Agreement & Electricity bill', 'Proprietor PAN & Aadhaar', 'Bank statement'],
  },
  {
    id: 'food',
    name: 'Food Stall / Restaurant / Kitchen',
    badge: 'Food Ventures',
    recommended: ['FSSAI Food License (FoSCoS)', 'Shop Act / Gumasta', 'MSME Udyam', 'GSTIN for Swiggy/Zomato'],
    why: 'Mandatory before preparing or selling food, and required for onboarding on delivery platforms.',
    docs: ['Food menu list', 'Kitchen premises electricity bill & NOC', 'Operator Aadhaar & PAN', 'Passport photo'],
  },
  {
    id: 'contractor',
    name: 'Contractor / Agency / Services',
    badge: 'Services & Works',
    recommended: ['GST Registration', 'EPFO & ESIC Code', 'MSME Certificate', 'Digital Signature for Tenders'],
    why: 'Mandatory to bid on government/private tenders, pass TDS checks, and bill corporate clients legally.',
    docs: ['Firm PAN', 'Office address proof', 'Bank account details', 'Authorized signatory ID'],
  },
  {
    id: 'individual',
    name: 'Salaried / Professional / Individual',
    badge: 'Personal & Tax',
    recommended: ['Income Tax Return (ITR)', 'PAN Card Correction / New', 'Aadhaar Demographic Guidance', 'Rental Agreements / Affidavits'],
    why: 'Claim your TDS refunds, get speedy loan approvals, and keep KYC records updated.',
    docs: ['Form 16 / Salary slips', 'Bank statements', 'Aadhaar & PAN card'],
  }
];

const FAQS = [
  {
    q: 'Do I need to visit your physical center, or can I send documents over WhatsApp?',
    a: 'Both options are supported. You can send clear photos or PDF scans of your documents directly on our official WhatsApp (+91 88712 17486). For physical token collection (like Digital Signature USB tokens) or in-person verification, you can visit our Sector 14 center during office hours.'
  },
  {
    q: 'How do you prevent rejections or delays on government portals?',
    a: 'Government portals reject applications for small typographical mistakes or mismatched spelling between Aadhaar and PAN. Our desk specialists audit your paperwork thoroughly before creating official submissions.'
  },
  {
    q: 'What happens if a government department raises a query or objection?',
    a: 'We handle query clarification filings at no extra service charge until your certificate or license is issued.'
  },
  {
    q: 'Are government portal statutory fees separate from your service fee?',
    a: 'Yes. Our consultancy charges are quoted upfront. Where applicable, statutory government fees (such as FSSAI state fee or Trademark fee) are generated with official government receipts.'
  },
  {
    q: 'How fast can I receive my Digital Signature (DSC) or MSME certificate?',
    a: 'MSME/Udyam certificates are typically generated within 2 to 4 hours. Digital Signature (DSC Class 3) crypto USB tokens are prepared and handed over within 30 to 60 minutes once video-verification OTP is completed at our desk.'
  },
  {
    q: 'Is my personal information and document copy secure with your center?',
    a: 'Yes. Your identity documents, salary slips, and financial statements are strictly used only for authorized filing with official government departments and are never shared with 3rd parties.'
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'taxation' | 'licenses' | 'legal' | 'personal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedDocService, setExpandedDocService] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string>('retail');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    serviceCategory: 'PAN Card / Personal Identity',
    cityArea: '',
    preferredMode: 'WhatsApp',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered Services (PAN Card is always positioned at index 0)
  const filteredServices = useMemo(() => {
    const list = SERVICES_DATA.filter((srv) => {
      const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
      const matchesSearch =
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.documents.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Ensure PAN Card is the first card if present in the results
    return list.sort((a, b) => {
      if (a.id === 'pan-card') return -1;
      if (b.id === 'pan-card') return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+918871217486');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }
    setFormSubmitted(true);
  };

  const getWhatsAppServiceLink = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello JanSuvidha Desk, I need assistance with "${serviceTitle}". Please share the required document checklist and fee details.`
    );
    return `https://wa.me/${PHONE_NUMBER_RAW}?text=${text}`;
  };

  const getWhatsAppFormLink = () => {
    const text = encodeURIComponent(
      `*New Callback / Facilitation Inquiry*\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Service Required:* ${formData.serviceCategory}\n` +
      `*Area/City:* ${formData.cityArea || 'Not specified'}\n` +
      `*Preferred Mode:* ${formData.preferredMode}\n` +
      (formData.notes ? `*Notes:* ${formData.notes}` : '')
    );
    return `https://wa.me/${PHONE_NUMBER_RAW}?text=${text}`;
  };

  const currentProfileData = BUSINESS_PROFILES.find((p) => p.id === selectedProfile) || BUSINESS_PROFILES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <header className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">Offline Desk Open:</span>
            <span>Mon–Sat: 9:30 AM – 7:30 PM • Walk-ins & WhatsApp consultations welcome</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+918871217486" className="hover:text-white flex items-center gap-1.5 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Sector 14, Near SDM Office, New Delhi</span>
            </span>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-sm">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                  Jan<span className="text-blue-700">Suvidha</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Business & E-Governance Center
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
              <a href="#services" className="hover:text-blue-700 transition-colors">Services</a>
              <a href="#checker" className="hover:text-blue-700 transition-colors">Document Guide</a>
              <a href="#how-it-works" className="hover:text-blue-700 transition-colors">How It Works</a>
              <a href="#why-us" className="hover:text-blue-700 transition-colors">Why Choose Us</a>
              <a href="#location" className="hover:text-blue-700 transition-colors">Office Location</a>
              <a href="#faq" className="hover:text-blue-700 transition-colors">FAQs</a>
            </div>

            {/* Quick Action Badges */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href="tel:+918871217486"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                <Phone className="w-4 h-4 text-blue-700" />
                <span>Call Desk</span>
              </a>

              <a
                href={`https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent('Hi JanSuvidha Desk, I need help with documentation services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="tel:+918871217486"
                className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                aria-label="Call Office"
              >
                <Phone className="w-4 h-4 text-blue-700" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <a
                href="tel:+918871217486"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-200"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                Call Desk
              </a>
              <a
                href={`https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent('Hello JanSuvidha, I want to inquire about offline documentation services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                WhatsApp
              </a>
            </div>
            <div className="flex flex-col space-y-2 pt-1 border-t border-slate-100 text-sm font-medium text-slate-700">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Services</a>
              <a href="#checker" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Document Guide</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">How It Works</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Why Choose Us</a>
              <a href="#callback-section" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Request Callback</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">Office Location & Timings</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 rounded-md hover:bg-slate-50">FAQs</a>
            </div>
          </div>
        )}
      </nav>

      {/* 3. MAIN SERVICES DIRECTORY (DIRECT FIRST PAGE VIEW) */}
      <main id="services" className="pt-6 pb-16 sm:pb-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter & Search Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-xs border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { key: 'all', label: 'All Services' },
                { key: 'personal', label: 'PAN & Identity' },
                { key: 'taxation', label: 'Taxation & GST' },
                { key: 'licenses', label: 'Business Licenses' },
                { key: 'legal', label: 'Legal & DSC' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === tab.key
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PAN, GST, Food License..."
                className="w-full pl-9 pr-7 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => {
              const isDocExpanded = expandedDocService === service.id;
              const isPanCard = service.id === 'pan-card';

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-xl border p-5 flex flex-col justify-between hover:shadow-md transition-shadow ${
                    isPanCard ? 'border-blue-600/70 ring-1 ring-blue-600/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Category Label & Turnaround */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {service.categoryLabel}
                      </span>
                      <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {service.turnaround}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Documents Checklist Toggle */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setExpandedDocService(isDocExpanded ? null : service.id)}
                        className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-700 py-1"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>Documents Required ({service.documents.length})</span>
                        </span>
                        {isDocExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isDocExpanded && (
                        <ul className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5">
                          {service.documents.map((doc, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={getWhatsAppServiceLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Inquire on WhatsApp</span>
                    </a>

                    <a
                      href="tel:+918871217486"
                      className="p-2.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                      title={`Call office for ${service.title}`}
                      aria-label={`Call office regarding ${service.title}`}
                    >
                      <Phone className="w-4 h-4 text-blue-700" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="font-heading font-bold text-base text-slate-800">No matching service found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Contact our desk directly to discuss your custom documentation requirement.
              </p>
              <div className="mt-3 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  Reset Filters
                </button>
                <a
                  href={`https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent(`Hi, I am looking for: ${searchQuery}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Ask Desk
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 4. DOCUMENT & PACKAGE GUIDE */}
      <section id="checker" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Business License & Registration Guide
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              Select your business type below to view mandatory registrations and required documents.
            </p>

            {/* Profile Selector Buttons */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {BUSINESS_PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProfile(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedProfile === p.id
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${
                    selectedProfile === p.id ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {p.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-900">
                    {p.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Profile Details */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {currentProfileData.name}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    {currentProfileData.why}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Recommended Registrations:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentProfileData.recommended.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-white/10 text-xs font-semibold text-white"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Documents to Keep Ready:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfileData.docs.map((doc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-900/60 border border-blue-700/50 text-xs text-blue-200"
                      >
                        <FileText className="w-3 h-3 text-amber-300" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="lg:col-span-4 bg-white text-slate-900 rounded-xl p-5 space-y-3">
                <h4 className="font-heading text-base font-bold text-slate-900">
                  Ready to Apply?
                </h4>
                <p className="text-xs text-slate-500">
                  Send copies via WhatsApp for a quick pre-scrutiny and quotation.
                </p>
                <div className="space-y-2 pt-1">
                  <a
                    href={`https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent(`Hi JanSuvidha Desk, I need documentation for: ${currentProfileData.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <a
                    href="tel:+918871217486"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-700" />
                    <span>Call {PHONE_NUMBER}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How It Works (3 Steps)
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Simple and transparent offline processing without technical confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                1. Reach Out
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Call our desk or drop a message on WhatsApp with the service you need. We provide the exact list of required documents.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                2. Share Paperwork
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send photo copies on WhatsApp or drop them off at our Sector 14 center. We perform a pre-check to prevent portal rejections.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                3. Fast Completion
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We complete portal submission, resolve any department queries, and deliver your officially stamped certificate & acknowledgment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section id="why-us" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Our Center
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Direct human assistance, verifiable physical location, and transparent fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Users className="w-5 h-5 text-blue-700" />
              <h3 className="font-heading font-bold text-sm text-slate-900">Direct Human Help</h3>
              <p className="text-xs text-slate-600">Speak directly with experienced document specialists without automated chatbots.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <FileText className="w-5 h-5 text-blue-700" />
              <h3 className="font-heading font-bold text-sm text-slate-900">Pre-Filing Audit</h3>
              <p className="text-xs text-slate-600">Meticulous check of name spellings, address proof, and KYC details to avoid delays.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Scale className="w-5 h-5 text-blue-700" />
              <h3 className="font-heading font-bold text-sm text-slate-900">Transparent Pricing</h3>
              <p className="text-xs text-slate-600">Clear upfront facilitation charges and official government fee receipts.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Printer className="w-5 h-5 text-blue-700" />
              <h3 className="font-heading font-bold text-sm text-slate-900">Printouts & Tokens</h3>
              <p className="text-xs text-slate-600">In-person USB token handover, color certificate prints, and document lamination desk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEAD CAPTURE & CALLBACK FORM */}
      <section id="callback-section" className="py-14 sm:py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Our officer will reach out on <strong>{formData.phone}</strong> shortly.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
                  <a
                    href={getWhatsAppFormLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Forward Details on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        serviceCategory: 'PAN Card / Personal Identity',
                        cityArea: '',
                        preferredMode: 'WhatsApp',
                        notes: ''
                      });
                    }}
                    className="text-xs text-blue-700 hover:underline py-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">
                    Request a Free Callback & Quotation
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Leave your contact details and our team will get in touch with required documents and fees.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 88712 17486"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Service Category *
                    </label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="PAN Card / Personal Identity">PAN Card (New / Correction / Minor)</option>
                      <option value="Taxation (GST / ITR / EPFO / TDS)">Taxation (GST / ITR / TDS / EPFO)</option>
                      <option value="Business Licenses (Food / Shop Act / MSME)">Business Licenses (Food / Shop Act / MSME)</option>
                      <option value="Legal (DSC Tokens / Trademark / Affidavits)">Legal (DSC Tokens / Trademark / Affidavits)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sector 14, Delhi NCR"
                      value={formData.cityArea}
                      onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                >
                  Submit Callback Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. OFFICE LOCATION & TIMINGS */}
      <section id="location" className="py-14 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Office Location & Timings
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Visit our facilitation center during office hours for in-person document handover and token collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Address & Hours Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Address:</h4>
                    <p className="text-slate-600 mt-0.5">{OFFICE_ADDRESS}</p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Landmark: Opposite SDM Court / Tehsil Complex
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Working Hours:</h4>
                    <p className="text-slate-600 mt-0.5"><strong>Monday to Saturday:</strong> 9:30 AM – 7:30 PM</p>
                    <p className="text-slate-600"><strong>Sunday:</strong> 10:00 AM – 2:00 PM (By Appointment)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">Contact:</h4>
                    <p className="text-slate-600 mt-0.5">Mobile: <strong className="text-slate-900">{PHONE_NUMBER}</strong> | Landline: {OFFICE_LANDLINE}</p>
                    <p className="text-slate-600">Email: {OFFICE_EMAIL}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('JanSuvidha Kendra Sector 14 New Delhi')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                >
                  {copiedPhone ? 'Copied' : 'Copy Number'}
                </button>
              </div>
            </div>

            {/* Quick Amenities */}
            <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base text-white">
                  Walk-In Desk Facilities
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instant photo cropping and document scanning to portal specs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Same-day Class 3 Digital Signature (DSC) USB token configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>E-stamp paper procurement and notary attestation desk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Color certificate printing and lamination</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-white/10 text-xs text-slate-300">
                Customer parking available outside Sai Plaza.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-800"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. LEGAL DISCLAIMER */}
      <section className="bg-amber-50/80 border-y border-amber-200 py-4 text-amber-950 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-amber-900 leading-relaxed">
            <strong>Disclaimer:</strong> JanSuvidha Center is an independent offline business consultancy and documentation facilitation center. We assist individuals and enterprises with paperwork preparation and procedural filings. We are not a government department or affiliated with any official ministry.
          </p>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-10 pb-20 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold">
                J
              </div>
              <span className="font-heading font-bold text-white text-base">
                JanSuvidha Center
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-slate-400">
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#checker" className="hover:text-white">Document Guide</a>
              <a href="#how-it-works" className="hover:text-white">How It Works</a>
              <a href="#location" className="hover:text-white">Location</a>
              <a href="#faq" className="hover:text-white">FAQs</a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} JanSuvidha Kendra & Business Facilitation Center.</p>
            <p>Phone: {PHONE_NUMBER} | Email: {OFFICE_EMAIL}</p>
          </div>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP BUTTON (DESKTOP) */}
      <div className="fixed bottom-5 right-5 z-50 hidden sm:flex">
        <a
          href={`https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent('Hello JanSuvidha Desk, I need help with documentation.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="font-bold text-xs">WhatsApp Desk</span>
        </a>
      </div>

      {/* 13. STICKY MOBILE BOTTOM BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-2 shadow-lg flex items-center gap-2">
        <a
          href="tel:+918871217486"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-700 text-white font-bold text-xs"
        >
          <Phone className="w-3.5 h-3.5 fill-white" />
          <span>Call Desk</span>
        </a>
        <a
          href={`https://wa.me/${PHONE_NUMBER_RAW}?text=${encodeURIComponent('Hello JanSuvidha Desk, I need help with documentation.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
