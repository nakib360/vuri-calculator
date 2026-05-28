import { useState } from "react";
import { Check } from "lucide-react";

const App = () => {
  const [step, setStep] = useState(1);
  const [showOverview, setShowOverview] = useState(false);

  // 4 Time Periods
  const timeSteps = [
    { id: 1, title: "সকাল", key: "morning" },
    { id: 2, title: "দুপুর", key: "afternoon" },
    { id: 3, title: "সন্ধ্যা", key: "evening" },
    { id: 4, title: "রাত", key: "night" },
  ];

  // Dynamic Dropdown Database
  const foodFields = [
    {
      name: "meat",
      label: "মাংস কয় প্লেট খেয়েছেন?",
      options: [
        { label: "খাই নি", value: "খাই নি" },
        { label: "১ প্লেট", value: "১ প্লেট" },
        { label: "২ প্লেট", value: "২ প্লেট" },
        { label: "৩ প্লেট", value: "৩ প্লেট" },
        { label: "৪ প্লেট", value: "৪ প্লেট" },
      ],
    },
    {
      name: "rice",
      label: "ভাত কয় প্লেট খেয়েছেন?",
      options: [
        { label: "খাই নি", value: "খাই নি" },
        { label: "১ প্লেট", value: "১ প্লেট" },
        { label: "২ প্লেট", value: "২ প্লেট" },
        { label: "৩ প্লেট", value: "৩ প্লেট" },
      ],
    },
    {
      name: "ruti",
      label: "রুটি কয়টা খেয়েছেন?",
      options: [
        { label: "খাই নি", value: "খাই নি" },
        { label: "১ টা", value: "১ টা" },
        { label: "২ টা", value: "২ টা" },
        { label: "৩ টা", value: "৩ টা" },
      ],
    },
    {
      name: "pitha",
      label: "পিঠা খেয়েছেন?",
      options: [
        { label: "খাই নি", value: "খাই নি" },
        { label: "খেয়েছি", value: "খেয়েছি" },
      ],
    },
    {
      name: "tea",
      label: "চা পান করেছেন?",
      options: [
        { label: "করিনি", value: "করিনি" },
        { label: "করেছি", value: "করেছি" },
      ],
    },
    {
      name: "softDrink",
      label: "কোমল পানীয় কয় বোতল খেয়েছেন?",
      options: [
        { label: "খাই নি", value: "খাই নি" },
        { label: "১ বোতল", value: "১ বোতল" },
        { label: "২ বোতল", value: "২ বোতল" },
        { label: "৩ বোতল", value: "৩ বোতল" },
      ],
    },
  ];

  // Default values
  const generateDefaultValues = () => {
    return foodFields.reduce((acc, field) => {
      acc[field.name] = field.options[0].value;
      return acc;
    }, {});
  };

  const [allData, setAllData] = useState({
    morning: generateDefaultValues(),
    afternoon: generateDefaultValues(),
    evening: generateDefaultValues(),
    night: generateDefaultValues(),
  });

  const currentTimeKey = timeSteps[step - 1].key;
  const currentTimeTitle = timeSteps[step - 1].title;

  const progressWidth =
    ((step - 1) / (timeSteps.length - 1)) * 100;

  // FIXED: NO Number() (important)
  const handleChange = (name, value) => {
    setAllData((prev) => ({
      ...prev,
      [currentTimeKey]: {
        ...prev[currentTimeKey],
        [name]: value,
      },
    }));
  };

  const handleNext = () => {
    if (step < timeSteps.length) {
      setStep(step + 1);
    }
  };

  const handleOverview = () => {
    setShowOverview(true);

    setTimeout(() => {
      console.log(JSON.stringify(allData, null, 2));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black/60 p-5 md:p-10">

      <div className="absolute inset-5 md:inset-10 rounded-[40px] bg-[#161616] border border-white/10 shadow-2xl overflow-hidden flex flex-col">

        {/* Glow */}
        <div className="absolute top-0 left-0 w-full h-40 bg-blue-500/10 blur-3xl"></div>

        {/* Animated Container */}
        <div
          className={`
            flex flex-col h-full transition-all duration-700
            ${
              showOverview
                ? "opacity-0 scale-95 blur-md"
                : "opacity-100 scale-100 blur-0"
            }
          `}
        >

          {/* Header */}
          <div className="relative z-10 p-8 md:p-16 pb-6 shrink-0 bg-[#161616]">

            <div className="max-w-4xl mx-auto">

              {/* Progress */}
              <div className="relative">

                <div className="absolute top-5 left-0 w-full h-1 bg-white/10 rounded-full"></div>

                <div
                  className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressWidth}%` }}
                ></div>

                <div className="relative flex justify-between">
                  {timeSteps.map((item) => {
                    const active = step >= item.id;

                    return (
                      <div
                        key={item.key}
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
                          {item.id}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-4xl md:text-5xl text-center font-bold text-white mt-12">
                {currentTimeTitle}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 md:px-16 pb-10">

            <div className="max-w-4xl mx-auto space-y-6">

              {foodFields.map((field) => (
                <div key={field.name} className="w-full">

                  <label className="block text-gray-300 text-sm mb-3 font-medium">
                    {field.label}
                  </label>

                  <select
                    value={allData[currentTimeKey][field.name]}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                    className="w-full bg-[#222] border border-white/10 rounded-2xl px-5 py-4 text-white"
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {step === 4 ? (
                <button
                  onClick={handleOverview}
                  className="w-full mt-10 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  See Overview
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full mt-10 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400"
                >
                  Next Step
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;