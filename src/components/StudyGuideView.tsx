import React, { useState } from 'react';
import {
  FileSpreadsheet,
  TestTube,
  Syringe,
  Activity,
  HeartPulse,
  Calculator,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

type GuideSection =
  | 'phlebotomy'
  | 'injections'
  | 'ekg'
  | 'vitals'
  | 'math'
  | 'law';

export const StudyGuideView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<GuideSection>('phlebotomy');
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-800 text-xs font-black mb-2 shadow-sm">
          <span>🎀</span>
          <span>High-Yield Clinical Reference</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-pink-950 tracking-tight">
          NHA CCMA Clinical Cheat Sheets & Guides 🎀
        </h1>
        <p className="text-sm text-pink-800/90 mt-1 font-medium">
          High-yield visual reference sheets for phlebotomy order of draw, injection angles, 12-lead EKG placement, vital signs, and dosage formulas.
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-pink-200 pb-2">
        <button
          id="guide-tab-phlebotomy"
          onClick={() => setActiveSection('phlebotomy')}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeSection === 'phlebotomy'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
          }`}
        >
          <TestTube className="w-4 h-4" />
          <span>Order of Draw 🎀</span>
        </button>

        <button
          id="guide-tab-injections"
          onClick={() => setActiveSection('injections')}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeSection === 'injections'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span>Injection Specs</span>
        </button>

        <button
          id="guide-tab-ekg"
          onClick={() => setActiveSection('ekg')}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeSection === 'ekg'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>12-Lead EKG</span>
        </button>

        <button
          id="guide-tab-vitals"
          onClick={() => setActiveSection('vitals')}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeSection === 'vitals'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>Vital Signs</span>
        </button>

        <button
          id="guide-tab-math"
          onClick={() => setActiveSection('math')}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeSection === 'math'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Pharm Math</span>
        </button>

        <button
          id="guide-tab-law"
          onClick={() => setActiveSection('law')}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeSection === 'law'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-pink-800 hover:bg-pink-50 hover:text-pink-950'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>HIPAA & Ethics</span>
        </button>
      </div>

      {/* SECTION 1: PHLEBOTOMY */}
      {activeSection === 'phlebotomy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Venipuncture Table */}
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-pink-950 flex items-center gap-2">
                  <span>🎀 CLSI Venipuncture Order of Draw (Evacuated Tube System)</span>
                </h3>
                <p className="text-xs text-pink-700 font-medium">
                  Strictly mandated by Clinical and Laboratory Standards Institute (CLSI) to prevent chemical additive carryover.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-pink-100 text-pink-800 rounded-full border border-pink-300 self-start sm:self-auto">
                Mnemonic: Boys Love Ravishing Girls Like Gold
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-pink-200 text-pink-700 uppercase tracking-wider font-black">
                    <th className="pb-3">Order & Tube Color</th>
                    <th className="pb-3">Additive / Mechanism</th>
                    <th className="pb-3">Inversions</th>
                    <th className="pb-3">Common Diagnostic Tests</th>
                    <th className="pb-3">Clinical Key</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100">
                  <tr className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-300 border border-amber-400 shadow-sm" />
                        <span className="text-pink-950 font-black">1. Yellow (SPS / Blood Cultures)</span>
                      </div>
                    </td>
                    <td className="py-3 text-pink-900 font-medium">
                      Sodium Polyanethol Sulfonate (SPS) / Blood culture bottles
                    </td>
                    <td className="py-3 font-mono font-bold text-pink-950">8 - 10</td>
                    <td className="py-3 text-pink-900 font-medium">
                      Blood Cultures (Aerobic + Anaerobic), FUO, Septicemia
                    </td>
                    <td className="py-3 text-pink-700">
                      Must be drawn 1st to maintain absolute sterile chain; clean site with chlorhexidine/iodine for 30s.
                    </td>
                  </tr>

                  <tr className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-sky-400 border border-sky-500 shadow-sm" />
                        <span className="text-pink-950 font-black">2. Light Blue</span>
                      </div>
                    </td>
                    <td className="py-3 text-pink-900 font-medium">
                      3.2% Sodium Citrate (Binds calcium, reversible anticoagulant)
                    </td>
                    <td className="py-3 font-mono font-black text-rose-600">3 - 4</td>
                    <td className="py-3 text-pink-900 font-medium">
                      PT / INR (Warfarin monitoring), PTT / aPTT (Heparin), D-Dimer
                    </td>
                    <td className="py-3 text-pink-700">
                      Must be filled 100% to 9:1 blood-to-anticoagulant ratio! Underfilling invalidates clotting times.
                    </td>
                  </tr>

                  <tr className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-500 border border-rose-600 shadow-sm" />
                        <span className="text-pink-950 font-black">3. Red / Gold (SST)</span>
                      </div>
                    </td>
                    <td className="py-3 text-pink-900 font-medium">
                      Clot activator & thixotropic separator gel (Serum separator tube)
                    </td>
                    <td className="py-3 font-mono font-bold text-pink-950">5 (SST) / 0 (Glass Red)</td>
                    <td className="py-3 text-pink-900 font-medium">
                      CMP, BMP, Lipid Panel, Thyroid, hCG pregnancy, PSA, Cardiac enzymes
                    </td>
                    <td className="py-3 text-pink-700">
                      Must clot for 30 minutes at room temp before centrifuging for 10-15 mins.
                    </td>
                  </tr>

                  <tr className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 border border-emerald-600 shadow-sm" />
                        <span className="text-pink-950 font-black">4. Green</span>
                      </div>
                    </td>
                    <td className="py-3 text-pink-900 font-medium">
                      Lithium Heparin or Sodium Heparin (Inhibits thrombin)
                    </td>
                    <td className="py-3 font-mono font-bold text-pink-950">8 - 10</td>
                    <td className="py-3 text-pink-900 font-medium">
                      STAT Chemistries, Ammonia (on ice slurry), Troponin, Electrolytes
                    </td>
                    <td className="py-3 text-pink-700">
                      Do NOT use sodium heparin for electrolytes or lithium heparin for lithium levels.
                    </td>
                  </tr>

                  <tr className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-500 border border-purple-600 shadow-sm" />
                        <span className="text-pink-950 font-black">5. Lavender / Purple</span>
                      </div>
                    </td>
                    <td className="py-3 text-pink-900 font-medium">
                      K2 or K3 EDTA (Chelates calcium; preserves cellular morphology)
                    </td>
                    <td className="py-3 font-mono font-bold text-pink-950">8 - 10</td>
                    <td className="py-3 text-pink-900 font-medium">
                      CBC with diff, Hemoglobin & Hematocrit (H&H), ESR, Sickle cell, Hgb A1c
                    </td>
                    <td className="py-3 text-pink-700">
                      Never centrifuge for CBC. If micro-clots form, specimen must be redrawn.
                    </td>
                  </tr>

                  <tr className="hover:bg-pink-50/60 transition-colors">
                    <td className="py-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-400 border border-slate-500 shadow-sm" />
                        <span className="text-pink-950 font-black">6. Gray</span>
                      </div>
                    </td>
                    <td className="py-3 text-pink-900 font-medium">
                      Potassium Oxalate (anticoagulant) + Sodium Fluoride (antiglycolytic agent)
                    </td>
                    <td className="py-3 font-mono font-bold text-pink-950">8 - 10</td>
                    <td className="py-3 text-pink-900 font-medium">
                      Fasting Glucose, OGTT, Lactic Acid (on ice), Legal Blood Alcohol (BAC)
                    </td>
                    <td className="py-3 text-pink-700">
                      Sodium fluoride halts glycolysis. For BAC test, clean skin with chlorhexidine, NEVER alcohol!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Capillary Order of Draw vs Venipuncture Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="luxury-card border-2 border-pink-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <h4 className="font-black text-pink-950 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-pink-600" />
                <span>Capillary (Dermal Puncture) Order of Draw 🎀</span>
              </h4>
              <p className="text-xs text-pink-800 leading-relaxed font-medium">
                Why is Capillary order different from Venipuncture? Because platelets rapidly clump at skin puncture sites.
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs font-bold text-pink-950">
                <li>Capillary Blood Gas (CBG)</li>
                <li>EDTA Micro-collection tubes (Lavender) — first to prevent platelet clots!</li>
                <li>Other additive micro-containers (Green / Lithium Heparin)</li>
                <li>Serum / Non-additive micro-containers (Red / Gold SST)</li>
              </ol>
            </div>

            <div className="luxury-card border-2 border-pink-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <h4 className="font-black text-pink-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Venipuncture Key Technique Rules</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-pink-900 font-medium">
                <li>• <strong>Needle insertion angle:</strong> 15° to 30° with bevel facing UP.</li>
                <li>• <strong>Tourniquet application:</strong> 3 to 4 inches above site; max 1 minute to prevent hemoconcentration.</li>
                <li>• <strong>Primary vein choice:</strong> Median cubital (1st), Cephalic (2nd - best for obese), Basilic (3rd - close to brachial artery & median nerve).</li>
                <li>• <strong>Infant heel stick:</strong> Medial or lateral plantar borders only; lancet depth ≤ 2.0 mm to avoid calcaneus osteomyelitis.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: INJECTIONS */}
      {activeSection === 'injections' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* IM */}
            <div className="luxury-card border-2 border-pink-300 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-pink-700">
                  Deep Muscle 🎀
                </span>
                <span className="font-mono text-xl font-black text-pink-600">
                  90°
                </span>
              </div>

              <h3 className="font-black text-pink-950 text-lg">
                Intramuscular (IM)
              </h3>

              <div className="space-y-2 text-xs text-pink-900 font-medium">
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Needle Gauge:</span>
                  <span className="font-bold font-mono text-pink-950">20G to 23G (Adult) / 22G to 25G (Peds)</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Needle Length:</span>
                  <span className="font-bold font-mono text-pink-950">1 to 1.5 inches</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Max Volume (Deltoid):</span>
                  <span className="font-bold font-mono text-pink-950">1.0 mL</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Max Volume (Gluteal):</span>
                  <span className="font-bold font-mono text-pink-950">3.0 mL</span>
                </div>
              </div>

              <div className="p-3 bg-pink-50 rounded-2xl text-xs space-y-1.5 border border-pink-200 text-pink-900">
                <span className="font-bold text-pink-950 block">Sites & Pearls:</span>
                <p>• <strong>Deltoid:</strong> 1-2 inches (2-3 fingerbreadths) below acromion process.</p>
                <p>• <strong>Vastus Lateralis:</strong> Anterolateral middle third of thigh (Primary site for infants &lt;12 months).</p>
                <p>• <strong>Ventrogluteal:</strong> Safest for large doses; free of major nerves/vessels.</p>
                <p>• <strong>Z-Track Method:</strong> Displace skin 1-1.5 in laterally before inserting needle; prevents subcutaneous staining.</p>
              </div>
            </div>

            {/* SubQ */}
            <div className="luxury-card border-2 border-pink-300 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-pink-700">
                  Adipose Tissue 🎀
                </span>
                <span className="font-mono text-xl font-black text-pink-600">
                  45° or 90°
                </span>
              </div>

              <h3 className="font-black text-pink-950 text-lg">
                Subcutaneous (SubQ)
              </h3>

              <div className="space-y-2 text-xs text-pink-900 font-medium">
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Needle Gauge:</span>
                  <span className="font-bold font-mono text-pink-950">25G to 27G</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Needle Length:</span>
                  <span className="font-bold font-mono text-pink-950">3/8 to 5/8 inch</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Max Volume:</span>
                  <span className="font-bold font-mono text-pink-950">1.0 mL</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Angle Rule:</span>
                  <span className="font-bold font-mono text-pink-950">45° (90° if 2 in fat pinched)</span>
                </div>
              </div>

              <div className="p-3 bg-pink-50 rounded-2xl text-xs space-y-1.5 border border-pink-200 text-pink-900">
                <span className="font-bold text-pink-950 block">Sites & Meds:</span>
                <p>• <strong>Sites:</strong> Outer posterior upper arm, abdomen (2 in from umbilicus), anterior thigh.</p>
                <p>• <strong>Common Meds:</strong> Insulin, Heparin, Lovenox, MMR, Varicella, Polio (IPV).</p>
                <p>• <strong>Caution:</strong> Do NOT aspirate or massage heparin/insulin sites (causes hematoma).</p>
              </div>
            </div>

            {/* ID */}
            <div className="luxury-card border-2 border-pink-300 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-pink-700">
                  Dermis Layer 🎀
                </span>
                <span className="font-mono text-xl font-black text-pink-600">
                  10° - 15°
                </span>
              </div>

              <h3 className="font-black text-pink-950 text-lg">
                Intradermal (ID)
              </h3>

              <div className="space-y-2 text-xs text-pink-900 font-medium">
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Needle Gauge:</span>
                  <span className="font-bold font-mono text-pink-950">26G to 27G</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Needle Length:</span>
                  <span className="font-bold font-mono text-pink-950">3/8 to 1/2 inch</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Max Volume:</span>
                  <span className="font-bold font-mono text-pink-950">0.1 mL</span>
                </div>
                <div className="flex justify-between border-b border-pink-100 pb-1">
                  <span className="text-pink-700">Bevel Position:</span>
                  <span className="font-bold font-mono text-pink-950">Bevel UP</span>
                </div>
              </div>

              <div className="p-3 bg-pink-50 rounded-2xl text-xs space-y-1.5 border border-pink-200 text-pink-900">
                <span className="font-bold text-pink-950 block">Sites & Testing:</span>
                <p>• <strong>Sites:</strong> Anterior forearm (3-4 fingerbreadths below antecubital), upper back.</p>
                <p>• <strong>Expected Result:</strong> Distinct 6-10 mm wheal (bleb). If no wheal forms, injection went subcutaneous and must be redrawn!</p>
                <p>• <strong>PPD / Mantoux Test:</strong> Read 48 to 72 hours later. Measure induration (palpable hardness), NOT redness!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: EKG */}
      {activeSection === 'ekg' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Precordial Leads Card */}
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-black text-pink-950 flex items-center gap-2">
              <span>🎀 12-Lead EKG Precordial (Chest) Lead Placements</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200">
                  <span className="font-black text-rose-600 block text-sm">V1 (Red)</span>
                  <p className="text-pink-950 font-medium">4th Intercostal Space (ICS) at the RIGHT sternal border.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200">
                  <span className="font-black text-amber-600 block text-sm">V2 (Yellow)</span>
                  <p className="text-pink-950 font-medium">4th Intercostal Space (ICS) at the LEFT sternal border.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200">
                  <span className="font-black text-emerald-600 block text-sm">V3 (Green)</span>
                  <p className="text-pink-950 font-medium">Directly midway between lead V2 and lead V4.</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200">
                  <span className="font-black text-blue-600 block text-sm">V4 (Blue)</span>
                  <p className="text-pink-950 font-medium">5th Intercostal Space (ICS) at the LEFT Midclavicular line.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200">
                  <span className="font-black text-orange-600 block text-sm">V5 (Orange)</span>
                  <p className="text-pink-950 font-medium">5th ICS at the LEFT Anterior Axillary line (horizontal level with V4).</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200">
                  <span className="font-black text-purple-600 block text-sm">V6 (Purple)</span>
                  <p className="text-pink-950 font-medium">5th ICS at the LEFT Midaxillary line (horizontal level with V4).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Limb Leads & Standardization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="luxury-card rounded-3xl p-6 border-2 border-pink-200 shadow-xl space-y-3">
              <h4 className="font-black text-base text-pink-950">Limb Lead Color Codes & Placement 🎀</h4>
              <ul className="space-y-2 text-xs text-pink-900 font-medium">
                <li>• <strong className="text-pink-950">White (RA):</strong> Right Arm / infraclavicular fossa</li>
                <li>• <strong className="text-pink-950">Black (LA):</strong> Left Arm / infraclavicular fossa</li>
                <li>• <strong className="text-emerald-700 font-bold">Green (RL):</strong> Right Leg / lower abdomen (Ground lead)</li>
                <li>• <strong className="text-rose-600 font-bold">Red (LL):</strong> Left Leg / lower abdomen</li>
              </ul>
              <div className="pt-2 border-t border-pink-100 text-[11px] text-pink-700 font-semibold">
                Mnemonic: &quot;White on Right, Snow over Grass (White/Green on right); Smoke over Fire (Black/Red on left)&quot;.
              </div>
            </div>

            <div className="luxury-card rounded-3xl p-6 border-2 border-pink-200 shadow-xl space-y-3 text-xs">
              <h4 className="font-black text-base text-pink-950">Standard EKG Calibration & Settings</h4>
              <ul className="space-y-2 text-pink-900 font-medium">
                <li>• <strong>Paper Speed:</strong> 25 mm/second (1 small box = 0.04 sec, 1 large box = 0.20 sec).</li>
                <li>• <strong>Voltage / Gain:</strong> 10 mm/mV (1 mV calibration mark = 10 small boxes or 2 large boxes high).</li>
                <li>• <strong>Somatic Tremor Artifact:</strong> Jagged, irregular spikes caused by patient shivering or tension.</li>
                <li>• <strong>AC 60-Hz Interference:</strong> Regular uniform spikes caused by nearby electrical wiring.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: VITALS */}
      {activeSection === 'vitals' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-black text-pink-950 flex items-center gap-2">
              <span>🎀 Lifespan Vital Signs Reference Chart</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-pink-200 text-pink-700 uppercase tracking-wider font-black">
                    <th className="pb-3">Age Group</th>
                    <th className="pb-3">Heart Rate (Pulse)</th>
                    <th className="pb-3">Respiratory Rate</th>
                    <th className="pb-3">Systolic Blood Pressure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100 font-medium">
                  <tr className="hover:bg-pink-50/60">
                    <td className="py-3 font-bold text-pink-950">Newborn (0 - 28 days)</td>
                    <td className="py-3 font-mono text-pink-900">120 - 160 bpm (Apical)</td>
                    <td className="py-3 font-mono text-pink-900">30 - 60 breaths/min</td>
                    <td className="py-3 font-mono text-pink-900">60 - 80 mmHg</td>
                  </tr>
                  <tr className="hover:bg-pink-50/60">
                    <td className="py-3 font-bold text-pink-950">Infant (1 - 12 months)</td>
                    <td className="py-3 font-mono text-pink-900">80 - 140 bpm (Apical)</td>
                    <td className="py-3 font-mono text-pink-900">20 - 40 breaths/min</td>
                    <td className="py-3 font-mono text-pink-900">70 - 100 mmHg</td>
                  </tr>
                  <tr className="hover:bg-pink-50/60">
                    <td className="py-3 font-bold text-pink-950">Toddler (1 - 3 years)</td>
                    <td className="py-3 font-mono text-pink-900">80 - 130 bpm</td>
                    <td className="py-3 font-mono text-pink-900">20 - 30 breaths/min</td>
                    <td className="py-3 font-mono text-pink-900">80 - 110 mmHg</td>
                  </tr>
                  <tr className="hover:bg-pink-50/60">
                    <td className="py-3 font-bold text-pink-950">School Age (6 - 12 years)</td>
                    <td className="py-3 font-mono text-pink-900">70 - 110 bpm</td>
                    <td className="py-3 font-mono text-pink-900">16 - 22 breaths/min</td>
                    <td className="py-3 font-mono text-pink-900">90 - 120 mmHg</td>
                  </tr>
                  <tr className="bg-pink-100/60 font-semibold">
                    <td className="py-3 font-black text-pink-950">Adult (&ge;18 years) 🎀</td>
                    <td className="py-3 font-mono text-pink-900 font-bold">60 - 100 bpm</td>
                    <td className="py-3 font-mono text-pink-900 font-bold">12 - 20 breaths/min</td>
                    <td className="py-3 font-mono text-pink-900 font-bold">&lt; 120 / &lt; 80 mmHg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AHA Blood Pressure Classifications */}
          <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-3 text-xs">
            <h4 className="font-black text-base text-pink-950">
              AHA / ACC Adult Blood Pressure Stages
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950">
                <span className="font-black text-emerald-700 block">Normal</span>
                <span>Systolic &lt;120 AND</span><br />
                <span>Diastolic &lt;80 mmHg</span>
              </div>
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-950">
                <span className="font-black text-amber-700 block">Elevated</span>
                <span>Systolic 120-129 AND</span><br />
                <span>Diastolic &lt;80 mmHg</span>
              </div>
              <div className="p-3.5 bg-orange-50 border border-orange-300 rounded-2xl text-orange-950">
                <span className="font-black text-orange-700 block">Stage 1 HTN</span>
                <span>Systolic 130-139 OR</span><br />
                <span>Diastolic 80-89 mmHg</span>
              </div>
              <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl text-rose-950">
                <span className="font-black text-rose-700 block">Stage 2 HTN</span>
                <span>Systolic &ge;140 OR</span><br />
                <span>Diastolic &ge;90 mmHg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: MATH */}
      {activeSection === 'math' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
              <h3 className="font-black text-base text-pink-950">
                Dosage by Formula 🎀
              </h3>
              <div className="p-4 bg-pink-100 rounded-2xl font-mono text-center text-sm font-black text-pink-950 border border-pink-300">
                (Desired Dose ÷ On Hand Dose) × Vehicle (Quantity) = Amount
              </div>
              <div className="space-y-2 text-pink-900 leading-relaxed font-medium">
                <p><strong>Example:</strong> Physician orders amoxicillin 750 mg PO. Suspension available is 250 mg / 5 mL.</p>
                <p className="font-mono bg-white border-2 border-pink-200 p-3 rounded-xl text-pink-950 font-bold">
                  (750 mg ÷ 250 mg) × 5 mL = 3 × 5 mL = 15 mL (or 1 tablespoon)
                </p>
              </div>
            </div>

            <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
              <h3 className="font-black text-base text-pink-950">
                Essential Unit Conversions
              </h3>
              <div className="grid grid-cols-2 gap-2 text-pink-950 font-mono font-bold">
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 kg = 2.2 lbs</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 tsp = 5 mL</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 tbsp = 15 mL (3 tsp)</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 fl oz = 30 mL</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 g = 1,000 mg</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 mg = 1,000 mcg</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 L = 1,000 mL</div>
                <div className="p-3 bg-white border border-pink-200 rounded-xl">1 inch = 2.54 cm</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: LAW */}
      {activeSection === 'law' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-3 text-xs">
              <h3 className="font-black text-base text-pink-950">
                Core Medical Legal Doctrines 🎀
              </h3>
              <div className="space-y-2 text-pink-900 font-medium">
                <p>• <strong className="text-pink-950 font-black">Respondeat Superior:</strong> &quot;Let the master answer&quot; — Physician is legally liable for employees&apos; negligence within scope.</p>
                <p>• <strong className="text-pink-950 font-black">Res Ipsa Loquitur:</strong> &quot;The thing speaks for itself&quot; — Injury couldn&apos;t happen without negligence.</p>
                <p>• <strong className="text-pink-950 font-black">Subpoena Duces Tecum:</strong> Court summons demanding witness appear with specified medical records.</p>
                <p>• <strong className="text-pink-950 font-black">Locum Tenens:</strong> Temporary substitute physician filling in for another provider.</p>
              </div>
            </div>

            <div className="luxury-card border-2 border-pink-200 rounded-3xl p-6 shadow-xl space-y-3 text-xs">
              <h3 className="font-black text-base text-pink-950">
                The Four &quot;Ds&quot; of Negligence
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-pink-900 font-medium">
                <li><strong className="text-pink-950 font-black">Duty:</strong> Established doctor-patient relationship and standard of care.</li>
                <li><strong className="text-pink-950 font-black">Dereliction:</strong> Failure to adhere to the established standard of care.</li>
                <li><strong className="text-pink-950 font-black">Direct Cause:</strong> The breach directly produced the injury.</li>
                <li><strong className="text-pink-950 font-black">Damages:</strong> Compensable actual injury or financial loss suffered by patient.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
