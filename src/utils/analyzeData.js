export const analyzeData = (data) => {
    let score = 0;
    let flags = [];
  
    Object.values(data).forEach((time) => {
      // 🍚 Rice logic
      if (time.rice.includes("২") || time.rice.includes("৩")) {
        score += 2;
      }
  
      // 🍖 Meat logic
      if (time.meat.includes("৩") || time.meat.includes("৪")) {
        score += 2;
      }
  
      // 🥤 Soft drink risk
      if (time.softDrink.includes("২") || time.softDrink.includes("৩")) {
        score += 3;
        flags.push("High sugar intake");
      }
  
      // ☕ Tea
      if (time.tea === "করেছি") {
        score += 1;
      }
  
      // 🍘 Pitha
      if (time.pitha === "খেয়েছি") {
        score += 1;
      }
    });
  
    // 🟢 RESULT CASES
  
    if (score <= 5) {
      return {
        type: "Light Diet",
        message: "তোমার খাবার কম বা balanced আছে",
        risk: "Low",
        flags,
      };
    }
  
    if (score <= 10) {
      return {
        type: "Moderate Diet",
        message: "তোমার খাবার মাঝারি level এ আছে",
        risk: "Medium",
        flags,
      };
    }
  
    return {
      type: "Heavy Diet",
      message: "তুমি বেশি calorie intake করছো",
      risk: "High",
      flags,
    };
  };