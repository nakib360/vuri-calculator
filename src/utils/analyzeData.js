export const analyzeData = (data) => {
  let score = 0;

  let riceCount = 0;
  let meatCount = 0;
  let softDrinkCount = 0;
  let teaCount = 0;
  let pithaCount = 0;
  let rutiCount = 0;

  const flags = [];
  const funnyComments = [];
  const titles = [];

  // =========================
  // 🔢 NUMBER EXTRACTOR
  // =========================

  const getNumber = (text) => {
    if (!text) return 0;

    if (text.includes("১")) return 1;
    if (text.includes("২")) return 2;
    if (text.includes("৩")) return 3;
    if (text.includes("৪")) return 4;

    return 0;
  };

  // =========================
  // 🍽️ MAIN ANALYSIS
  // =========================

  Object.values(data).forEach((time) => {
    const rice = getNumber(time.rice);
    const meat = getNumber(time.meat);
    const ruti = getNumber(time.ruti);
    const softDrink = getNumber(time.softDrink);

    riceCount += rice;
    meatCount += meat;
    rutiCount += ruti;
    softDrinkCount += softDrink;

    score += rice * 2;
    score += meat * 3;
    score += ruti;
    score += softDrink * 4;

    if (time.tea === "করেছি") {
      teaCount++;
      score += 1;
    }

    if (time.pitha === "খেয়েছি") {
      pithaCount++;
      score += 2;
    }
  });

  // =========================
  // 🚨 FLAGS
  // =========================

  if (softDrinkCount >= 2) {
    flags.push("চিনির প্রতি অস্বাভাবিক আকর্ষণ।");
  }

  if (softDrinkCount >= 4) {
    flags.push("অতিরিক্ত কোমল পানীয় গ্রহণ করেছেন।");
    titles.push("চিনির সম্রাট");
  }

  if (teaCount >= 4) {
    flags.push("চায়ের উপর নির্ভরশীল।");
    titles.push("চা চালিত মানব");
  }

  if (riceCount >= 8) {
    flags.push("অস্বাভাবিক পরিমাণ ভাত গ্রহণ করেছেন।");
    titles.push("ভাতের টাইটান");
  }

  if (meatCount >= 8) {
    flags.push("মাংস গ্রহণ বিপজ্জনক পর্যায়ে পৌঁছেছে");
    titles.push("মাংস ধ্বংসকারী");
  }

  if (score >= 35) {
    flags.push("অতিরিক্ত খাদ্য গ্রহণের প্রবণতা।");
    titles.push("বুফে আতঙ্ক");
  }

  // =========================
  // 🧠 INTELLIGENT ANALYSIS
  // =========================

  if (
    score <= 5 &&
    riceCount === 0 &&
    meatCount === 0 &&
    rutiCount === 0
  ) {
    funnyComments.push(
      "আপনি আজ খাবার না, বাতাস খেয়ে দিন পার করছেন।",
      "ফ্রিজ আপনার অপেক্ষায় থেকে হতাশ হয়ে গেছে।",
      "এভাবে চলতে থাকলে পেট ধর্মঘট ডাকতে পারে।"
    );

    titles.push("বাতাসভোজী");
  }

  if (
    teaCount >= 3 &&
    riceCount <= 1 &&
    meatCount <= 1 &&
    rutiCount <= 1
  ) {
    funnyComments.push(
      "আপনার শরীরে এখন রক্তের বদলে চা প্রবাহিত হচ্ছে।",
      "চা কোম্পানি আপনাকে ব্র্যান্ড অ্যাম্বাসেডর বানাতে চায়।",
      "আপনি খাবারের চেয়ে চায়ের উপর বেশি ভরসা করেন মনে হচ্ছে।"
    );
  }

  if (riceCount >= 8 && meatCount <= 2) {
    funnyComments.push(
      "এত ভাত খেয়ে আপনি ধানের জমির অংশীদার হয়ে গেছেন।",
      "ভাত আপনাকে জাতীয় ক্রেতা হিসেবে ঘোষণা করতে চায়।",
      "আপনার প্লেটে অন্য সবকিছু side character, মূল নায়ক শুধু ভাত।"
    );
  }

  if (meatCount >= 8 && riceCount <= 3) {
    funnyComments.push(
      "গরু-খাসিরা আজ জরুরি বৈঠকে বসেছে।",
      "আপনার মাংস খাওয়ার গতি দেখে রেস্টুরেন্ট ভয় পাচ্ছে।",
      "আপনি মাংসপ্রেমী না, মাংস ধ্বংসকারী।"
    );
  }

  if (riceCount >= 8 && meatCount >= 8) {
    funnyComments.push(
      "আপনি খাবার খান না, খাবারের উপর অভিযান চালান।",
      "বুফে মালিক আপনাকে দেখে লুকানোর জায়গা খুঁজছে।",
      "পেট এখন জায়গা সংকটে ভুগতেছে।"
    );

    flags.push("অস্বাভাবিক মাত্রার খাদ্য আক্রমণ শনাক্ত হয়েছে");
    titles.push("খাদ্য দানব");
  }

  if (softDrinkCount >= 4) {
    funnyComments.push(
      "আপনার শরীরে এখন পানির বদলে কোমল পানীয় চলাচল করছে।",
      "চিনি আপনাকে নিজের পরিবারের সদস্য মনে করছে।",
      "ডাক্তার রিপোর্ট লেখার প্রস্তুতি নিচ্ছে।"
    );
  }

  if (softDrinkCount >= 3 && pithaCount >= 2) {
    funnyComments.push(
      "আপনার খাবারের তালিকা দেখে চিনি নিজেই ভয় পাচ্ছে।",
      "মিষ্টির প্রতি আপনার ভালোবাসা কিংবদন্তি পর্যায়ে।",
      "আপনি সম্ভবত মিষ্টি ছাড়া জীবন কল্পনাই করতে পারেন না।"
    );

    titles.push("মিষ্টি সম্রাট");
  }

  if (teaCount >= 3 && softDrinkCount >= 3) {
    funnyComments.push(
      "আপনি ধীরে ধীরে তরলভিত্তিক প্রাণীতে পরিণত হচ্ছেন।",
      "এত পানীয় খেয়ে শরীর বিভ্রান্ত হয়ে গেছে।",
      "আপনি খাবারের চেয়ে পানীয়তে বেশি বিশ্বাস করেন।"
    );

    titles.push("তরল প্রাণী");
  }

  if (rutiCount >= 8) {
    funnyComments.push(
      "রুটি কারখানা আপনার নামে নতুন শাখা খুলতে চায়।",
      "আপনি এখন আনুষ্ঠানিকভাবে রুটি বিশেষজ্ঞ।",
      "বেলন আপনাকে স্যালুট দিচ্ছে।"
    );

    titles.push("রুটির রাজা");
  }

  if (
    rutiCount >= 2 &&
    riceCount <= 1 &&
    meatCount <= 1 &&
    softDrinkCount === 0
  ) {
    funnyComments.push(
      "আপনি এখনো নিয়ন্ত্রিত খাদ্যাভ্যাসের মানুষদের দলে আছেন।",
      "ডায়েট আপনাকে নিয়ে গর্ব অনুভব করছে।",
      "আপনার শরীর এখনো আপনার উপর সন্তুষ্ট।"
    );

    titles.push("ভদ্র ভোজনকারী");
  }

  // =========================
  // 🌙 NIGHT ANALYSIS
  // =========================

  const nightData = data.night;

  const nightRice = getNumber(nightData.rice);
  const nightMeat = getNumber(nightData.meat);
  const nightDrink = getNumber(nightData.softDrink);

  if (
    nightRice >= 3 ||
    nightMeat >= 3 ||
    nightDrink >= 2
  ) {
    funnyComments.push(
      "রাত হলেই আপনার ভেতরের খাদ্যদানব জেগে উঠে।",
      "মধ্যরাতে ফ্রিজ আপনাকে দেখে ভয় পায়।",
      "রাতের খাবারে আপনার আত্মনিয়ন্ত্রণ হারিয়ে গেছে।"
    );

    titles.push("রাতের শিকারি");
  }

  // =========================
  // 🌅 MORNING VS NIGHT
  // =========================

  const morningData = data.morning;

  const morningRice = getNumber(morningData.rice);
  const morningMeat = getNumber(morningData.meat);

  if (
    morningRice === 0 &&
    morningMeat === 0 &&
    score >= 25
  ) {
    funnyComments.push(
      "দিনে শান্ত, রাতে ভয়ংকর ভোজনরসিক।",
      "সকাল বাদ দিয়ে রাতে প্রতিশোধমূলক খাওয়া চলছে।",
      "আপনার আসল রূপ রাতেই প্রকাশ পায়।"
    );
  }

  // =========================
  // ⚖️ BALANCE
  // =========================

  if (
    riceCount >= 3 &&
    riceCount <= 5 &&
    meatCount >= 2 &&
    meatCount <= 4 &&
    softDrinkCount <= 1
  ) {
    funnyComments.push(
      "অবিশ্বাস্যভাবে ভারসাম্যপূর্ণ খাবার গ্রহণ করেছেন।",
      "আপনার পেট আজ অনেক খুশি।",
      "আপনি এখনো সভ্য ভোজনকারীদের তালিকায় আছেন।"
    );

    titles.push("ভারসাম্যের গুরু");
  }

  // =========================
  // 🤯 CHAOTIC EATER
  // =========================

  if (
    softDrinkCount >= 2 &&
    meatCount >= 5 &&
    teaCount >= 3 &&
    score >= 30
  ) {
    funnyComments.push(
      "আপনার খাবারের ধরন দেখে পুষ্টিবিদ হতবাক।",
      "পেটের ভিতরে এখন বিশৃঙ্খল পরিস্থিতি চলছে।",
      "আপনি যা সামনে পান তাই খাও নীতিতে বিশ্বাসী।"
    );

    flags.push("অগোছালো খাদ্যাভ্যাস শনাক্ত হয়েছে");
    titles.push("বিশৃঙ্খল ভোজনকারী");
  }

  // =========================
  // 🔥 EXTREME MODE
  // =========================

  if (
    riceCount >= 10 ||
    meatCount >= 10 ||
    score >= 45
  ) {
    funnyComments.push(
      "আপনার পেট সম্ভবত অসীম স্টোরেজ প্রযুক্তিতে চলে।",
      "আপনার খাওয়া দেখে বুফে ব্যবসা হুমকির মুখে।",
      "বিশ্ব খাদ্য সংস্থা আপনাকে নজরদারিতে রেখেছে।"
    );

    flags.push("চরম মাত্রার খাদ্য গ্রহণ শনাক্ত হয়েছে");
    titles.push("অসীম ভোজনকারী");
  }

  // =========================
  // ✅ HEALTHY HUMAN
  // =========================

  if (
    score >= 10 &&
    score <= 18 &&
    softDrinkCount === 0 &&
    teaCount <= 2
  ) {
    funnyComments.push(
      "আপনি এখনো সুস্থ খাদ্যাভ্যাসের দলে আছেন।",
      "আপনার খাবারের অভ্যাস আশ্চর্যজনকভাবে ভালো।",
      "শরীর এখনো আপনার বিরুদ্ধে অভিযোগ করে নাই।"
    );

    titles.push("স্বাস্থ্য সচেতন");
  }

  // =========================
  // 📊 GENERAL SCORE ANALYSIS
  // =========================

  if (score <= 8) {
    funnyComments.push(
      "এত কম খেলে বাতাসেও উড়ে যাওয়ার সম্ভাবনা আছে।",
      "আপনার পেট এখনো খাবারের অপেক্ষায় বসে আছে।"
    );
  }

  if (score > 8 && score <= 18) {
    funnyComments.push(
      "মোটামুটি ভদ্রলোক পর্যায়ের খাওয়াদাওয়া।",
      "শরীর এখনো আপনাকে সহ্য করে যাচ্ছে।"
    );
  }

  if (score > 18 && score <= 30) {
    funnyComments.push(
      "আপনি খাবার খান না, খাবারের উপর আধিপত্য করেন।",
      "পেট অনুরোধ জানাচ্ছে একটু বিরতি দেওয়ার জন্য।"
    );
  }

  if (score > 30) {
    funnyComments.push(
      "আপনার খাওয়া দেখে বুফে মালিক আতঙ্কিত।",
      "ওজন মাপার মেশিন চাকরি ছাড়ার কথা ভাবছে।",
      "আপনি মানুষ নাকি খাদ্য শোষণকারী ব্ল্যাকহোল বুঝা যাচ্ছে না।"
    );
  }

  // =========================
  // 🎯 RARE SECRET COMMENTS
  // =========================

  const rareComments = [
    "আপনাকে দেখে ফ্রিজ নিজেই লক হয়ে যেতে চায়।",
    "আপনার প্লেট সম্ভবত ভয় পেয়ে গেছে।",
    "খাবার আপনাকে দেখলেই আত্মসমর্পণ করে।",
    "আপনার চামচও overtime কাজ করছে।",
  ];

  if (Math.random() > 0.8) {
    funnyComments.push(
      rareComments[
        Math.floor(Math.random() * rareComments.length)
      ]
    );
  }

  // =========================
  // 🛟 FALLBACK
  // =========================

  if (funnyComments.length === 0) {
    funnyComments.push(
      "আপনার খাবারের ধরন এখনো রহস্যময় রয়ে গেছে।",
      "বিশ্লেষণ ব্যবস্থা এখনো আপনাকে বুঝার চেষ্টা করছে।"
    );
  }

  // =========================
  // 📊 FINAL RESULT
  // =========================

  let type = "";
  let risk = "";
  let message = "";

  if (score <= 10) {
    type = "হালকা খাদ্যগ্রহণ";
    risk = "কম";
    message = "খাবার গ্রহণের পরিমাণ কম।";
  } else if (score <= 25) {
    type = "মধ্যম খাদ্যগ্রহণ";
    risk = "মাঝারি";
    message = "মোটামুটি ভারসাম্যপূর্ণ খাবার গ্রহণ করেছেন।";
  } else {
    type = "ভারী খাদ্যগ্রহণ";
    risk = "উচ্চ";
    message = "অতিরিক্ত খাদ্য গ্রহণ শনাক্ত হয়েছে।";
  }

  // =========================
  // 🎲 RANDOM COMMENT & TITLE
  // =========================

  const randomComment =
    funnyComments[
      Math.floor(Math.random() * funnyComments.length)
    ];

  const randomTitle =
    titles.length > 0
      ? titles[Math.floor(Math.random() * titles.length)]
      : "সাধারণ ভোজনকারী";

  return {
    type,
    risk,
    message,
    score,
    flags,
    title: randomTitle,
    funnyComment: randomComment,
    allFunnyComments: funnyComments,

    stats: {
      riceCount,
      meatCount,
      rutiCount,
      softDrinkCount,
      teaCount,
      pithaCount,
    },
  };
};