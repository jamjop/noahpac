import React from "react";
import { 
  Activity, FlaskConical, Pill, Shield, BookOpen, 
  Stethoscope, Syringe, Calculator, AlertTriangle, 
  ArrowRight, ExternalLink 
} from "lucide-react";

export default function NavyConfident() {
  const categories = [
    {
      title: "Screening & Preventive Care",
      icon: <Shield className="w-5 h-5" />,
      tools: [
        {
          name: "USPSTF Screener",
          description: "Evidence-based preventive services and counseling guidelines.",
          icon: <Activity className="w-5 h-5" />,
          chips: ["USPSTF 2026", "Ages 3-110"]
        },
        {
          name: "Immunization Schedule",
          description: "Catch-up schedules and contraindications for vaccines.",
          icon: <Syringe className="w-5 h-5" />,
          chips: ["ACIP 2025", "Birth–90 yr"]
        }
      ]
    },
    {
      title: "Clinical Calculators",
      icon: <Calculator className="w-5 h-5" />,
      tools: [
        {
          name: "Medical Calculators",
          description: "Commonly used clinical decision rules and formulas.",
          icon: <Calculator className="w-5 h-5" />,
          chips: ["13 calculators", "Live results"]
        },
        {
          name: "Opioid Conversion",
          description: "Equianalgesic dosing and cross-tolerance adjustments.",
          icon: <Pill className="w-5 h-5" />,
          chips: ["CDC MME 2022", "Cross-tolerance"]
        },
        {
          name: "STI Treatment",
          description: "Current treatment regimens for sexually transmitted infections.",
          icon: <Activity className="w-5 h-5" />,
          chips: ["CDC 2021", "21 conditions"]
        }
      ]
    },
    {
      title: "Clinical Reference",
      icon: <BookOpen className="w-5 h-5" />,
      tools: [
        {
          name: "Antibiotic Reference",
          description: "Empiric and targeted antimicrobial therapy guidelines.",
          icon: <Pill className="w-5 h-5" />,
          chips: ["IDSA Guidelines", "17 infections"]
        },
        {
          name: "Lab Differentials",
          description: "Diagnostic approach to abnormal laboratory results.",
          icon: <FlaskConical className="w-5 h-5" />,
          chips: ["40+ tests", "Differentials"]
        },
        {
          name: "Lab Reference",
          description: "Normal reference ranges and panic values.",
          icon: <FlaskConical className="w-5 h-5" />,
          chips: ["90+ tests", "Sex-specific"]
        }
      ]
    },
    {
      title: "Field Medicine",
      icon: <AlertTriangle className="w-5 h-5" />,
      tools: [
        {
          name: "TCCC / MARCH PAWS",
          description: "Tactical Combat Casualty Care protocols for field providers.",
          icon: <Shield className="w-5 h-5" />,
          chips: ["CoTCCC 2023", "PWA · Offline"]
        }
      ]
    },
    {
      title: "Drug & Code Reference",
      icon: <Stethoscope className="w-5 h-5" />,
      tools: [
        {
          name: "Code & Drug Lookup",
          description: "Searchable database of diagnoses and medications.",
          icon: <Activity className="w-5 h-5" />,
          chips: ["ICD-10", "RxTerms", "LOINC"]
        },
        {
          name: "Drug Reference",
          description: "Pharmacology, interactions, and safety alerts.",
          icon: <Pill className="w-5 h-5" />,
          chips: ["openFDA", "Recalls"]
        },
        {
          name: "Pediatric Dosing",
          description: "Weight-based dosing parameters for pediatric patients.",
          icon: <Stethoscope className="w-5 h-5" />,
          chips: ["Weight-based", "Broselow"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-cyan-900 selection:text-cyan-50">
      {/* Header */}
      <header className="bg-[#0F2044] border-b border-cyan-900/50 pt-16 pb-12 px-6 lg:px-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-800/50">
              Noah PA-C
            </span>
            <div className="flex gap-2">
              <span className="text-xs font-medium bg-white/10 text-white/70 border border-white/20 px-2.5 py-0.5 rounded-full">
                v4.2.0
              </span>
              <span className="text-xs font-medium bg-white/10 text-white/70 border border-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Clinical Reference Tools
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Evidence-based point-of-care utilities for rapid clinical decision making. Strictly for use by licensed medical professionals.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 lg:px-12 py-12 space-y-16">
        {categories.map((category, idx) => (
          <section key={idx} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                {category.icon}
              </div>
              <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                {category.title}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-900/50 to-transparent ml-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.tools.map((tool, tIdx) => (
                <a 
                  key={tIdx} 
                  href="#"
                  className="group block bg-[#1E293B] border border-slate-700/50 rounded-lg p-5 hover:border-cyan-500/50 transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                        {tool.icon}
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {tool.name}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1" />
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tool.chips.map((chip, cIdx) => (
                      <span 
                        key={cIdx} 
                        className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-800/50"
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
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1120] border-t border-slate-800 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3 text-slate-500">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">
              <strong className="text-slate-400 font-semibold">Not medical advice.</strong> Verify all information before clinical use.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              Terms of Use
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              Privacy Policy
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
