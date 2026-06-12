import React from "react";
import { 
  Activity, 
  FlaskConical, 
  Pill, 
  Shield, 
  BookOpen, 
  Stethoscope, 
  Syringe, 
  Calculator, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  HeartPulse
} from "lucide-react";

const categories = [
  {
    title: "Screening & Preventive Care",
    icon: Shield,
    tools: [
      { name: "USPSTF Screener", desc: "Personalized preventive care recommendations based on current guidelines.", chips: ["USPSTF 2026", "Ages 3-110"], icon: Activity },
      { name: "Immunization Schedule", desc: "Childhood and adult vaccine schedules with catch-up guidance.", chips: ["ACIP 2025", "Birth–90 yr"], icon: Syringe },
    ]
  },
  {
    title: "Clinical Calculators",
    icon: Calculator,
    tools: [
      { name: "Medical Calculators", desc: "Commonly used clinical formulas and decision rules.", chips: ["13 calculators", "Live results"], icon: Calculator },
      { name: "Opioid Conversion", desc: "Equianalgesic dosing and MME calculator.", chips: ["CDC MME 2022", "Cross-tolerance"], icon: Pill },
      { name: "STI Treatment", desc: "Current guidelines for sexually transmitted infections.", chips: ["CDC 2021", "21 conditions"], icon: Stethoscope },
    ]
  },
  {
    title: "Clinical Reference",
    icon: BookOpen,
    tools: [
      { name: "Antibiotic Reference", desc: "Empiric and targeted antimicrobial therapy.", chips: ["IDSA Guidelines", "17 infections"], icon: Shield },
      { name: "Lab Differentials", desc: "Differential diagnoses for common lab abnormalities.", chips: ["40+ tests", "Differentials"], icon: FlaskConical },
      { name: "Lab Reference", desc: "Normal ranges and interpretation for blood panels.", chips: ["90+ tests", "Sex-specific"], icon: FlaskConical },
    ]
  },
  {
    title: "Field Medicine",
    icon: AlertTriangle,
    tools: [
      { name: "TCCC / MARCH PAWS", desc: "Tactical Combat Casualty Care reference.", chips: ["CoTCCC 2023", "PWA · Offline"], icon: AlertTriangle },
    ]
  },
  {
    title: "Drug & Code Reference",
    icon: BookOpen,
    tools: [
      { name: "Code & Drug Lookup", desc: "Search diagnosis codes and medication terminologies.", chips: ["ICD-10", "RxTerms", "LOINC"], icon: BookOpen },
      { name: "Drug Reference", desc: "Pharmacology, dosing, and safety information.", chips: ["openFDA", "Recalls"], icon: Pill },
      { name: "Pediatric Dosing", desc: "Weight-based medication dosing for children.", chips: ["Weight-based", "Broselow"], icon: Calculator },
    ]
  }
];

export default function WarmApproachable() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1C3A2E] to-[#2D5A45] pt-16 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle background pattern/texture could go here */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100 via-transparent to-transparent"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-emerald-300 text-sm tracking-wider uppercase bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-700/50">
              Noah PA-C
            </span>
            <span className="text-emerald-400/60">•</span>
            <div className="flex items-center gap-2 bg-white/10 text-white/80 border border-white/20 rounded-full px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All systems operational
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight">
            Clinical Reference Tools
          </h1>
          <p className="text-emerald-100/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Evidence-based point-of-care utilities designed for fast, accurate clinical decision making.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 -mt-12 pb-24 relative z-20">
        <div className="space-y-12">
          {categories.map((category, idx) => (
            <section key={idx} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-emerald-700">
                  <category.icon className="w-5 h-5 opacity-80" />
                  <h2 className="font-mono text-sm font-semibold uppercase tracking-widest">
                    {category.title}
                  </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-stone-200 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool, toolIdx) => (
                  <a 
                    key={toolIdx}
                    href="#"
                    className="group relative flex flex-col bg-white rounded-2xl border border-stone-100 p-6 shadow-sm shadow-amber-100/30 hover:shadow-md hover:shadow-amber-100/50 hover:border-emerald-200 transition-all duration-300 overflow-hidden"
                  >
                    {/* Left border accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 bg-stone-50 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 text-stone-400 transition-colors duration-300">
                        <tool.icon className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-stone-800 font-semibold text-lg mb-2 group-hover:text-emerald-900 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-stone-500 text-[12.5px] leading-relaxed mb-6 flex-grow">
                      {tool.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {tool.chips.map((chip, chipIdx) => (
                        <span 
                          key={chipIdx}
                          className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-50/50 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <HeartPulse className="w-6 h-6 text-emerald-300 mx-auto mb-4" />
          <p className="text-stone-500 text-sm mb-2 font-medium">
            Designed for clinical professionals.
          </p>
          <p className="text-stone-400 text-xs max-w-xl mx-auto leading-relaxed">
            This tool is for educational and reference purposes only. It does not replace clinical judgment. 
            Always verify dosages, interactions, and guidelines with official sources before treating patients.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-stone-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-600 transition-colors">Sources</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
