import { useState } from "react";
import { Check } from "lucide-react";

const App = () => {
  const [step, setStep] = useState(1);

  const foodQuestions = [
    "মাংস কয় প্লেট খেয়েছেন?",
    "ভাত কয় প্লেট খেয়েছেন?",
    "রুটি কয়টা খেয়েছেন?",
    "পিঠা কয়টা খেয়েছেন?",
    "চা কয় কাপ খেয়েছেন?",
    "কোমল পানীয় কয় বোতল খেয়েছেন?",
  ];

  const steps = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  const progressWidth =
    ((step - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black/60 p-5 md:p-10">
      
      {/* Main Card */}
      <div className="absolute inset-5 md:inset-10 rounded-[40px] bg-[#161616] border border-white/10 shadow-2xl overflow-hidden flex flex-col">

        {/* Glow */}
        <div className="absolute top-0 left-0 w-full h-40 bg-blue-500/10 blur-3xl"></div>

        {/* Fixed Header */}
        <div className="relative z-10 p-8 md:p-16 pb-6 shrink-0 bg-[#161616]">

          <div className="max-w-4xl mx-auto">

            {/* Progress */}
            <div className="relative">

              {/* Background Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-white/10 rounded-full"></div>

              {/* Active Line */}
              <div
                className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progressWidth}%` }}
              ></div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((item) => {
                  const active = step >= item.id;
                  const completed = step > item.id;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          font-semibold text-sm border-2 transition-all duration-300
                          ${
                            active
                              ? "bg-gradient-to-br from-blue-500 to-cyan-400 border-transparent text-white shadow-lg shadow-blue-500/40 scale-110"
                              : "bg-[#222] border-white/10 text-gray-500"
                          }
                        `}
                      >
                        {completed ? (
                          <Check size={18} />
                        ) : (
                          item.id
                        )}
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                          Step {item.id}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heading */}
            <p className="text-4xl md:text-5xl text-center font-bold text-white tracking-tight leading-tight mt-5">
              সকাল
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-16 pb-10">

          <div className="max-w-4xl mx-auto">

            {/* Questions */}
            <div className="space-y-6">

              {foodQuestions.map((question, index) => (
                <div key={index} className="w-full">

                  <label className="block text-gray-300 text-sm mb-3 font-medium">
                    {question}
                  </label>

                  <select
                    className="
                      w-full
                      bg-[#222]
                      border border-white/10
                      rounded-2xl
                      px-5 py-4
                      text-white
                      outline-none
                      transition-all duration-300
                      focus:border-blue-500
                      focus:ring-4 focus:ring-blue-500/20
                      shadow-lg
                      cursor-pointer
                    "
                  >
                    <option className="bg-[#222]" value="">
                      খাই নি
                    </option>

                    <option className="bg-[#222]" value="2">
                      1
                    </option>

                    <option className="bg-[#222]" value="4">
                      2
                    </option>

                    <option className="bg-[#222]" value="6">
                      3
                    </option>

                    <option className="bg-[#222]" value="8">
                      4
                    </option>
                  </select>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={handleNext}
              disabled={step === steps.length}
              className="
                w-full
                mt-10
                px-8 py-4 rounded-2xl font-semibold text-white
                bg-gradient-to-r from-blue-500 to-cyan-400
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all duration-300
                disabled:opacity-40
                disabled:cursor-not-allowed
                shadow-lg shadow-blue-500/30
              "
            >
              {step === steps.length ? "Completed" : "Next Step"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;