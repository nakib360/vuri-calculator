export const analyzeData = (data) => {
  let score = 0;
  let flags = [];

  let riceCount = 0;
  let meatCount = 0;
  let softDrinkCount = 0;
  let teaCount = 0;
  let pithaCount = 0;
  let rutiCount = 0;

  Object.values(data).forEach((time) => {

    // 🍚 Rice
    if (time.rice.includes("১")) {
      score += 1;
      riceCount += 1;
    }

    if (time.rice.includes("২")) {
      score += 2;
      riceCount += 2;
    }

    if (time.rice.includes("৩")) {
      score += 3;
      riceCount += 3;
    }

    // 🍖 Meat
    if (time.meat.includes("১")) {
      score += 1;
      meatCount += 1;
    }

    if (time.meat.includes("২")) {
      score += 2;
      meatCount += 2;
    }

    if (time.meat.includes("৩")) {
      score += 3;
      meatCount += 3;
    }

    if (time.meat.includes("৪")) {
      score += 4;
      meatCount += 4;
    }

    // 🫓 Ruti
    if (time.ruti.includes("১")) {
      score += 1;
      rutiCount += 1;
    }

    if (time.ruti.includes("২")) {
      score += 2;
      rutiCount += 2;
    }

    if (time.ruti.includes("৩")) {
      score += 3;
      rutiCount += 3;
    }

    // 🥤 Soft Drink
    if (time.softDrink.includes("১")) {
      score += 2;
      softDrinkCount += 1;
    }

    if (time.softDrink.includes("২")) {
      score += 4;
      softDrinkCount += 2;
      flags.push("চিনির উপর অস্বাভাবিক ভালোবাসা detected");
    }

    if (time.softDrink.includes("৩")) {
      score += 6;
      softDrinkCount += 3;
      flags.push("কোমল পানীয় কোম্পানি আপনাকে ambassador বানাইতে চায়");
    }

    // ☕ Tea
    if (time.tea === "করেছি") {
      score += 1;
      teaCount += 1;
    }

    // 🍘 Pitha
    if (time.pitha === "খেয়েছি") {
      score += 2;
      pithaCount += 1;
    }
  });

  // 😂 Funny Comment Generator

  const funnyComments = [];

  // Extreme low food
  if (score <= 3) {
    funnyComments.push(
      "এত কম খাইলে হবে মিয়া।",
      "আপনার পেট এখনো loading এ আছে।",
      "এই diet দেখে ফ্রিজও কাঁদতেছে।"
    );
  }

  // Balanced
  if (score > 3 && score <= 10) {
    funnyComments.push(
      "মোটামুটি ভদ্রলোক টাইপ খাওয়া।",
      "শরীর এখনো আপনাকে ধন্যবাদ দিতেছে।",
      "এইভাবেই চললে বেলি control এ থাকবে।"
    );
  }

  // Heavy eater
  if (score > 10 && score <= 18) {
    funnyComments.push(
      "ভাই আপনি খাইতেছেন নাকি attack দিতেছেন খাবারের উপর।",
      "পেট বলতেছে: আর পারতেছি না বস।",
      "একটু হাঁটাহাঁটি করেন না হলে chair চাপা পড়ে যাবে।"
    );
  }

  // Monster mode
  if (score > 18) {
    funnyComments.push(
      "আয় হায়! আপনার পেট তো ফাইটা যাইতাছে।",
      "আপনার খাওয়া দেখে buffet মালিক লুকাইয়া পড়ছে।",
      "এভাবে চললে ওজন মাপার machine চাকরি ছাড়বে।",
      "ভাই আপনি মানুষ তো? নাকি black hole?।"
    );
  }

  // Meat lover
  if (meatCount >= 8) {
    funnyComments.push(
      "মাংসের প্রতি আপনার dedication সত্যিই inspirational।",
      "গরু-খাসিরা আজ collective meeting ডাকছে।"
    );
  }

  // Rice overload
  if (riceCount >= 8) {
    funnyComments.push(
      "এত ভাত খেয়ে আপনি হয়তো ধানের জমির shareholder।",
      "ভাত আপনাকে national customer ঘোষণা করছে।"
    );
  }

  // Tea addiction
  if (teaCount >= 3) {
    funnyComments.push(
      "চা ছাড়া আপনার system boot হয় না মনে হয়।",
      "আপনার রক্তে এখন ৪০% চা চলতেছে।"
    );
  }

  // Soft drinks danger
  if (softDrinkCount >= 4) {
    funnyComments.push(
      "আপনার শরীরে পানি না, soft drink circulate করতেছে।",
      "ডাক্তার already typing..."
    );
  }

  // Pitha lover
  if (pithaCount >= 3) {
    funnyComments.push(
      "পিঠা আপনাকে family member ভাবে এখন।",
      "গ্রামের দাদি আপনাকে দেখে proud ফিল করতেছে।"
    );
  }

  // Ruti monster
  if (rutiCount >= 6) {
    funnyComments.push(
      "রুটি factory আপনার নামে branch খুলতে চায়।"
    );
  }

  // Final result type
  let type = "";
  let risk = "";
  let message = "";

  if (score <= 5) {
    type = "Light Diet";
    risk = "Low";
    message = "খাবার intake কম";
  } else if (score <= 15) {
    type = "Moderate Diet";
    risk = "Medium";
    message = "মোটামুটি balanced খাবার";
  } else {
    type = "Heavy Diet";
    risk = "High";
    message = "অতিরিক্ত calorie intake detected।";
  }

  // Random funny comment
  const randomComment =
    funnyComments[Math.floor(Math.random() * funnyComments.length)];

  return {
    type,
    risk,
    message,
    score,
    flags,
    funnyComment: randomComment,
    allFunnyComments: funnyComments,
  };
};