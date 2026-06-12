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
} from "lucide-react";

export default function Clinical() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] font-sans text-gray-900 pb-16">
      {/* Header */}
      <header className="bg-white border-t-4 border-t-sky-500 shadow-sm mb-12">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-start gap-4">
          <div className="text-sky-500 font-mono text-xs font-semibold tracking-widest uppercase">
            Noah PA-C · Point-of-care Reference
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Clinical Reference Tools
          </h1>
          <div className="flex gap-3 mt-2">
            <span className="rounded-full bg-sky-50 text-sky-600 border border-sky-100 px-3 py-1 text-xs font-medium">
              Updated Jan 2025
            </span>
            <span className="rounded-full bg-sky-50 text-sky-600 border border-sky-100 px-3 py-1 text-xs font-medium">
              Offline Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Category 1 */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Screening & Preventive Care
            </h2>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="USPSTF Screener"
              description="Personalized preventive care recommendations based on patient age and sex."
              icon={<Shield className="w-5 h-5 text-sky-500" />}
              chips={["USPSTF 2026", "Ages 3-110"]}
            />
            <ToolCard
              title="Immunization Schedule"
              description="Routine and catch-up vaccine schedules for all age groups."
              icon={<Syringe className="w-5 h-5 text-sky-500" />}
              chips={["ACIP 2025", "Birth–90 yr"]}
            />
          </div>
        </section>

        {/* Category 2 */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Clinical Calculators
            </h2>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="Medical Calculators"
              description="Essential clinical risk scores, diagnostic criteria, and formulas."
              icon={<Calculator className="w-5 h-5 text-sky-500" />}
              chips={["13 calculators", "Live results"]}
            />
            <ToolCard
              title="Opioid Conversion"
              description="Safely convert between different opioid medications and routes."
              icon={<Pill className="w-5 h-5 text-sky-500" />}
              chips={["CDC MME 2022", "Cross-tolerance"]}
            />
            <ToolCard
              title="STI Treatment"
              description="Up-to-date guidelines for screening and treating sexually transmitted infections."
              icon={<Activity className="w-5 h-5 text-sky-500" />}
              chips={["CDC 2021", "21 conditions"]}
            />
          </div>
        </section>

        {/* Category 3 */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Clinical Reference
            </h2>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="Antibiotic Reference"
              description="Empiric treatment guidelines for common outpatient infections."
              icon={<FlaskConical className="w-5 h-5 text-sky-500" />}
              chips={["IDSA Guidelines", "17 infections"]}
            />
            <ToolCard
              title="Lab Differentials"
              description="Diagnostic approach to common laboratory abnormalities."
              icon={<Stethoscope className="w-5 h-5 text-sky-500" />}
              chips={["40+ tests", "Differentials"]}
            />
            <ToolCard
              title="Lab Reference"
              description="Normal reference ranges for common blood and urine tests."
              icon={<Activity className="w-5 h-5 text-sky-500" />}
              chips={["90+ tests", "Sex-specific"]}
            />
          </div>
        </section>

        {/* Category 4 */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Field Medicine
            </h2>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="TCCC / MARCH PAWS"
              description="Tactical Combat Casualty Care guidelines and algorithms."
              icon={<AlertTriangle className="w-5 h-5 text-sky-500" />}
              chips={["CoTCCC 2023", "PWA · Offline"]}
            />
          </div>
        </section>

        {/* Category 5 */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Drug & Code Reference
            </h2>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="Code & Drug Lookup"
              description="Search ICD-10 codes, medical terms, and drug identifiers."
              icon={<BookOpen className="w-5 h-5 text-sky-500" />}
              chips={["ICD-10", "RxTerms", "LOINC"]}
            />
            <ToolCard
              title="Drug Reference"
              description="Search FDA drug labels, black box warnings, and recalls."
              icon={<Pill className="w-5 h-5 text-sky-500" />}
              chips={["openFDA", "Recalls"]}
            />
            <ToolCard
              title="Pediatric Dosing"
              description="Weight-based medication dosing and equipment sizes for children."
              icon={<Activity className="w-5 h-5 text-sky-500" />}
              chips={["Weight-based", "Broselow"]}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-gray-200">
        <p className="text-center text-sm text-gray-400">
          Not medical advice. For educational and reference purposes only. Verify
          all clinical information before use.
        </p>
      </footer>
    </div>
  );
}

function ToolCard({
  title,
  description,
  icon,
  chips,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  chips: string[];
}) {
  return (
    <div className="group relative flex flex-col bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div className="bg-sky-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5 group-hover:text-sky-600 transition-colors">
        {title}
      </h3>
      <p className="text-[12px] text-gray-500 leading-relaxed mb-4 flex-1">
        {description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-medium"
            >
              {chip}
            </span>
          ))}
        </div>
        <ArrowRight className="w-4 h-4 text-sky-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </div>
  );
}
