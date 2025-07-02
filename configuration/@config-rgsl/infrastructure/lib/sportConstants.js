'use strict';

const sportCodes = {
    danceSports: 'danceSports',
    acrobaticRockNRoll: 'acrobaticRockNRoll',
    breaking: 'Breaking',
    karting: 'Karting'
};

const sportTypes = [
    {
        code: sportCodes.danceSports,
        name: 'Танцевальный спорт'
    },
    {
        code: sportCodes.acrobaticRockNRoll,
        name: 'Акробатический рок-н-ролл'
    },
    {
        code: sportCodes.breaking,
        name: 'Брейкинг',
    },
    {
        code: sportCodes.karting,
        name: 'Картинг'
    }
];

const sportCodes2 = {
    aviaModelSport: "aviaModelSport",
    aviationSports: "aviationSports",
    carSport: "carSport",
    autoModifiedSport: "autoModifiedSport",
    aikido: "aikido",
    academicRowing: "academicRowing",
    acrobaticsIsSports: "acrobaticsIsSports",
    acrobaticDances: "acrobaticDances",
    acrobaticRockNRoll: "acrobaticRockNRoll",
    activeRest: "activeRest",
    americanFootball: "americanFootball",
    armyHandToHandCombat: "armyHandToHandCombat",
    armlifting: "armlifting",
    armrestling: "armrestling",
    armport: "armport",
    athleticsAreHeavy: "athleticsAreHeavy",
    aeroturum: "aeroturum",
    badminton: "badminton",
    bikerCross: "bikerCross",
    poging: "poging",
    ballDancing: "ballDancing",
    basketballIsInteractive: "basketballIsInteractive",
    steeplechase: "steeplechase",
    baseball: "baseball",
    biathlon: "biathlon",
    billiardSport: "billiardSport",
    bMX: "bMX",
    bobsled: "bobsled",
    bodyBuilding: "bodyBuilding",
    martialArts: "martialArts",
    bockingJumpingOnJamper: "bockingJumpingOnJamper",
    boxing: "boxing",
    boxingIsInteractive: "boxingIsInteractive",
    struggle: "struggle",
    theStruggleOnTheBelts: "theStruggleOnTheBelts",
    bowling: "bowling",
    bowlSports: "bowlSports",
    bowlport: "bowlport",
    bootySport: "bootySport",
    wakeboarding: "wakeboarding",
    wakesurfing: "wakesurfing",
    cyclingTrack: "cyclingTrack",
    cyclingShossa: "cyclingShossa",
    helicopterSport: "helicopterSport",
    funStarts: "funStarts",
    windsurfing: "windsurfing",
    waterPolo: "waterPolo",
    waterSport: "waterSport",
    waterMotorSport: "waterMotorSport",
    waterRescueAllAround: "waterRescueAllAround",
    waterSkis: "waterSkis",
    waterScooter: "waterScooter",
    militaryFees: "militaryFees",
    militaryAppliedSport: "militaryAppliedSport",
    militarySportsFees: "militarySportsFees",
    aerotiveSport: "aerotiveSport",
    airAcrobatics: "airAcrobatics",
    airGymnastics: "airGymnastics",
    airborneEquity: "airborneEquity",
    volleyballInTheSnow: "volleyballInTheSnow",
    volleyball: "volleyball",
    freeStruggle: "freeStruggle",
    workout: "workout",
    easternCombatMartialArts: "easternCombatMartialArts",
    allEatingKarate: "allEatingKarate",
    vietInTao: "vietInTao",
    gyreanSport: "gyreanSport",
    golf: "golf",
    huntingRaces: "huntingRaces",
    snowmobileRaces: "snowmobileRaces",
    obstaclesRaces: "obstaclesRaces",
    skiSkiing: "skiSkiing",
    freestyleSkiing: "freestyleSkiing",
    gorodnySport: "gorodnySport",
    rowingOnKayaks: "rowingOnKayaks",
    rowingOnCanoe: "rowingOnCanoe",
    rowingOnBoats: "rowingOnBoats",
    rowingSlalom: "rowingSlalom",
    rowingPairingBiases: "rowingPairingBiases",
    grecoRomanStruggle: "grecoRomanStruggle",
    grappling: "grappling",
    tRP: "tRP",
    divingUpTo40MetersExceptForDivingInUnderwaterCaves: "divingUpTo40MetersExceptForDivingInUnderwaterCaves",
    darts: "darts",
    jujutsu: "jujutsu",
    zando: "zando",
    judo: "judo",
    duatlon: "duatlon",
    cycling: "cycling",
    drivingSport: "drivingSport",
    zorbing: "zorbing",
    zumba: "zumba",
    indoreHockey: "indoreHockey",
    interactiveFootball: "interactiveFootball",
    historicalAndMilitaryReconstructionTournaments: "historicalAndMilitaryReconstructionTournaments",
    yoga: "yoga",
    kayking: "kayking",
    kaitesurfing: "kaitesurfing",
    capoeira: "capoeira",
    karting: "Karting",
    cardGames: "cardGames",
    skatingOnATVs: "skatingOnATVs",
    kayaking: "kayaking",
    kendoCando: "kendoCando",
    curling: "curling",
    eSTERSTY: "eSTERSTY",
    kickboxing: "kickboxing",
    kinologicalSport: "kinologicalSport",
    kyokusinkai: "kyokusinkai",
    classicalStruggle: "classicalStruggle",
    kobudo: "kobudo",
    complexMartialArts: "complexMartialArts",
    computerSports: "computerSports",
    horsePolo: "horsePolo",
    horseSport: "horseSport",
    skating: "skating",
    corfbol: "corfbol",
    kravMaga: "kravMaga",
    cricket: "cricket",
    croquet: "croquet",
    crossKantry: "crossKantry",
    crossfit: "crossfit",
    kudo: "kudo",
    kungFu: "kungFu",
    campo: "campo",
    laserTag: "laserTag",
    lacrosse: "lacrosse",
    athletics: "athletics",
    lightAthletics: "lightAthletics",
    lightAthleticsAllAround: "lightAthleticsAllAround",
    iceHazarding: "iceHazarding",
    longboarding: "longboarding",
    skiing: "skiing",
    mountinbike: "mountinbike",
    internationalMilitarySportsAllAround: "internationalMilitarySportsAllAround",
    grenadeThrowing: "grenadeThrowing",
    diskThrowing: "diskThrowing",
    spearThrowing: "spearThrowing",
    hammerThrowing: "hammerThrowing",
    throwingTheBall: "throwingTheBall",
    theNucleusThrowing: "theNucleusThrowing",
    swordBattle: "swordBattle",
    seaAllAround: "seaAllAround",
    motorcycleSport: "motorcycleSport",
    motorcycleSportMotobol: "motorcycleSportMotobol",
    motorcycleSportMotocross: "motorcycleSportMotocross",
    motorcycleSportEnduro: "motorcycleSportEnduro",
    muaiTai: "muaiTai",
    backgammon: "backgammon",
    knifeBattle: "knifeBattle",
    pankration: "pankration",
    parachuteSport: "parachuteSport",
    sailing: "sailing",
    powerlifting: "powerlifting",
    paintball: "paintball",
    twistingTheRope: "twistingTheRope",
    beachVolleyball: "beachVolleyball",
    beachFootball: "beachFootball",
    underwaterHunting: "underwaterHunting",
    underwaterFishing: "underwaterFishing",
    underwaterPhotography: "underwaterPhotography",
    underwaterOrientation: "underwaterOrientation",
    underwaterSport: "underwaterSport",
    fireAndAppliedSport: "fireAndAppliedSport",
    fireAndRescueSports: "fireAndRescueSports",
    paulDance: "paulDance",
    polyatlon: "polyatlon",
    practicalShooting: "practicalShooting",
    summerCamp: "summerCamp",
    diving: "diving",
    jumpingIntoTheWater: "jumpingIntoTheWater",
    longJumps: "longJumps",
    acrobaticPaths: "acrobaticPaths",
    doubleMiniGradeJumps: "doubleMiniGradeJumps",
    skiJumping: "skiJumping",
    sprinkleJumps: "sprinkleJumps",
    poleVaulting: "poleVaulting",
    battleJumps: "battleJumps",
    bulletShooting: "bulletShooting",
    radioSports: "radioSports",
    rocketModelSport: "rocketModelSport",
    stretchingStretching: "stretchingStretching",
    rafting: "rafting",
    rugby: "rugby",
    rugbyInTheSnow: "rugbyInTheSnow",
    ragbol: "ragbol",
    rohean: "rohean",
    rollerSport: "rollerSport",
    rollerSportsTrack: "rollerSportsTrack",
    ropeSkipping: "ropeSkipping",
    handToHandCombat: "handToHandCombat",
    russianBastShoes: "russianBastShoes",
    fishingSport: "fishingSport",
    savat: "savat",
    sambo: "sambo",
    selfRollingSport: "selfRollingSport",
    saoineSport: "saoineSport",
    swimran: "swimran",
    northernAllAround: "northernAllAround",
    powerExtreme: "powerExtreme",
    simmeyDo: "simmeyDo",
    synchronizedSwimming: "synchronizedSwimming",
    skyranning: "skyranning",
    scalingOnArtificialRelief: "scalingOnArtificialRelief",
    squash: "squash",
    skateboarding: "skateboarding",
    skeleton: "skeleton",
    skiathlon: "skiathlon",
    songHockey: "songHockey",
    mixedCombatMartialArts: "mixedCombatMartialArts",
    snowboardFreestyle: "snowboardFreestyle",
    snowing: "snowing",
    modernSportsDances: "modernSportsDances",
    softball: "softball",
    layingOnCatamarans: "layingOnCatamarans",
    sportsAcrobatics: "sportsAcrobatics",
    sportsAerobics: "sportsAerobics",
    sportsGymnastics: "sportsGymnastics",
    sportsWalking: "sportsWalking",
    sportsThrowingAKnife: "sportsThrowingAKnife",
    sportsThrowingAxes: "sportsThrowingAxes",
    orienteering: "orienteering",
    sportsOrientationCycling: "sportsOrientationCycling",
    sportsOrientationCross: "sportsOrientationCross",
    sportsOrientationSkiRace: "sportsOrientationSkiRace",
    sportsAndAppliedDogBreeding: "sportsAndAppliedDogBreeding",
    sportsBridge: "sportsBridge",
    sportsPoker: "sportsPoker",
    sportsTourism: "sportsTourism",
    sportsTourismWater: "sportsTourismWater",
    sportsTourismIsMountainous: "sportsTourismIsMountainous",
    sportsTourismSki: "sportsTourismSki",
    standOfShooting: "standOfShooting",
    strikbol: "strikbol",
    rifleSport: "rifleSport",
    rootingFromACrossbow: "rootingFromACrossbow",
    archery: "archery",
    streetball: "streetball",
    shipwritingSport: "shipwritingSport",
    sumo: "sumo",
    sandboarding: "sandboarding",
    thaiBoxing: "thaiBoxing",
    danceSports: "danceSports",
    dancingOnIce: "dancingOnIce",
    tennisIsLarge: "tennisIsLarge",
    tennisDesktop: "tennisDesktop",
    shotPut: "shotPut",
    traillance: "traillance",
    tracking: "tracking",
    tablelonWinter: "tablelonWinter",
    triking: "triking",
    tourismIsMountainous: "tourismIsMountainous",
    taekwondo: "taekwondo",
    universalBattle: "universalBattle",
    wHUSH: "wHUSH",
    fencing: "fencing",
    figureSkating: "figureSkating",
    fitness: "fitness",
    flaringDisk: "flaringDisk",
    freeFighting: "freeFighting",
    fryborning: "fryborning",
    fridivingUpTo40Meters: "fridivingUpTo40Meters",
    frilineScience: "frilineScience",
    freestyleAcrobatika: "freestyleAcrobatika",
    freestyleSkiCross: "freestyleSkiCross",
    functionalAllAround: "functionalAllAround",
    football: "football",
    futzal: "futzal",
    hapkido: "hapkido",
    hipHopAerobics: "hipHopAerobics",
    walkingOnSnowshoes: "walkingOnSnowshoes",
    walkingScandinavian: "walkingScandinavian",
    hockeyOnIceWithABall: "hockeyOnIceWithABall",
    fieldHockey: "fieldHockey",
    bandy: "bandy",
    iceHockey: "iceHockey",
    choreography: "choreography",
    rhythmicGymnastics: "rhythmicGymnastics",
    chirSport: "chirSport",
    chirlingChir: "chirlingChir",
    choiQuangBefore: "choiQuangBefore",
    chess: "chess",
    checkers: "checkers",
    sixthAcrobatics: "sixthAcrobatics",
    aestheticGymnastics: "aestheticGymnastics",
    yakutNationalJumps: "yakutNationalJumps",
    yachting: "yachting"
};

const sportTypes2 = [
    {
        code: sportCodes2.aviaModelSport,
        name: "Авиамодельный спорт"
    },
    {
        code: sportCodes2.aviationSports,
        name: "Авиационный спорт"
    },
    {
        code: sportCodes2.carSport,
        name: "Автомобильный спорт"
    },
    {
        code: sportCodes2.autoModifiedSport,
        name: "Автомодельный спорт"
    },
    {
        code: sportCodes2.aikido,
        name: "Айкидо"
    },
    {
        code: sportCodes2.academicRowing,
        name: "Академическая гребля"
    },
    {
        code: sportCodes2.acrobaticsIsSports,
        name: "Акробатика спортивная"
    },
    {
        code: sportCodes2.acrobaticDances,
        name: "Акробатические танцы"
    },
    {
        code: sportCodes2.acrobaticRockNRoll,
        name: "Акробатический рок-н-ролл"
    },
    {
        code: sportCodes2.activeRest,
        name: "Активный отдых"
    },
    {
        code: sportCodes2.americanFootball,
        name: "Американский футбол"
    },
    {
        code: sportCodes2.armyHandToHandCombat,
        name: "Армейский рукопашный бой"
    },
    {
        code: sportCodes2.armlifting,
        name: "Армлифтинг"
    },
    {
        code: sportCodes2.armrestling,
        name: "Армрестлинг"
    },
    {
        code: sportCodes2.armport,
        name: "Армспорт"
    },
    {
        code: sportCodes2.athleticsAreHeavy,
        name: "Атлетика тяжелая"
    },
    {
        code: sportCodes2.aeroturum,
        name: "Аэротруба"
    },
    {
        code: sportCodes2.badminton,
        name: "Бадминтон"
    },
    {
        code: sportCodes2.bikerCross,
        name: "Байкер-кросс"
    },
    {
        code: sportCodes2.poging,
        name: "Погинг"
    },
    {
        code: sportCodes2.ballDancing,
        name: "Бальные танцы"
    },
    {
        code: sportCodes2.basketballIsInteractive,
        name: "Баскетбол интерактивный"
    },
    {
        code: sportCodes2.steeplechase,
        name: "Бег с препятстсвиями"
    },
    {
        code: sportCodes2.baseball,
        name: "бейсбол"
    },
    {
        code: sportCodes2.biathlon,
        name: "Биатлон (Лыже роллы)"
    },
    {
        code: sportCodes2.billiardSport,
        name: "Бильярдный спорт"
    },
    {
        code: sportCodes2.bMX,
        name: "BMX"
    },
    {
        code: sportCodes2.bobsled,
        name: "Бобслей"
    },
    {
        code: sportCodes2.bodyBuilding,
        name: "Бодибилдинг"
    },
    {
        code: sportCodes2.martialArts,
        name: "Боевые искусства (боевые единоборства)"
    },
    {
        code: sportCodes2.bockingJumpingOnJamper,
        name: "Бокинг/прыжки на джамперах"
    },
    {
        code: sportCodes2.boxing,
        name: "Бокс"
    },
    {
        code: sportCodes2.boxingIsInteractive,
        name: "Бокс интерактивный"
    },
    {
        code: sportCodes2.struggle,
        name: "Борьба"
    },
    {
        code: sportCodes2.theStruggleOnTheBelts,
        name: "Борьба на поясах"
    },
    {
        code: sportCodes2.bowling,
        name: "Боулинг"
    },
    {
        code: sportCodes2.bowlSports,
        name: "Боулспорт (бочче)"
    },
    {
        code: sportCodes2.bowlport,
        name: "Боулспорт (петанк)"
    },
    {
        code: sportCodes2.bootySport,
        name: "Буерный спорт"
    },
    {
        code: sportCodes2.wakeboarding,
        name: "Вейкбординг (открытая вода, бассейн)"
    },
    {
        code: sportCodes2.wakesurfing,
        name: "Вейксерфинг"
    },
    {
        code: sportCodes2.cyclingTrack,
        name: "Велоспорт-трек"
    },
    {
        code: sportCodes2.cyclingShossa,
        name: "Велоспорт-шоссе"
    },
    {
        code: sportCodes2.helicopterSport,
        name: "Вертолетный спорт"
    },
    {
        code: sportCodes2.funStarts,
        name: "Веселые старты"
    },
    {
        code: sportCodes2.windsurfing,
        name: "виндсерфинг"
    },
    {
        code: sportCodes2.waterPolo,
        name: "Водное поло"
    },
    {
        code: sportCodes2.waterSport,
        name: "Воднолыжный спорт"
    },
    {
        code: sportCodes2.waterMotorSport,
        name: "Водномоторный спорт"
    },
    {
        code: sportCodes2.waterMotorSport,
        name: "Водно-моторный спорт"
    },
    {
        code: sportCodes2.waterRescueAllAround,
        name: "Водно-спасательное многоборье"
    },
    {
        code: sportCodes2.waterSkis,
        name: "Водные лыжи"
    },
    {
        code: sportCodes2.waterScooter,
        name: "Водный скутер"
    },
    {
        code: sportCodes2.militaryFees,
        name: "Военно-полевые сборы"
    },
    {
        code: sportCodes2.militaryAppliedSport,
        name: "Военно-прикладной спорт"
    },
    {
        code: sportCodes2.militarySportsFees,
        name: "Военно-спортивные сборы"
    },
    {
        code: sportCodes2.aerotiveSport,
        name: "Воздухоплавательный спорт (дирижабли, аэростаты)"
    },
    {
        code: sportCodes2.airAcrobatics,
        name: "Воздушная акробатика"
    },
    {
        code: sportCodes2.airGymnastics,
        name: "Воздушная гимнастика"
    },
    {
        code: sportCodes2.airborneEquity,
        name: "Воздушно-спортивный эквилибр"
    },
    {
        code: sportCodes2.volleyballInTheSnow,
        name: "Волейбол  на снегу"
    },
    {
        code: sportCodes2.volleyball,
        name: "Волейбол (за исключением волейбола на снегу)"
    },
    {
        code: sportCodes2.freeStruggle,
        name: "Вольная борьба"
    },
    {
        code: sportCodes2.workout,
        name: "Воркаут"
    },
    {
        code: sportCodes2.easternCombatMartialArts,
        name: "Восточное боевое единоборство"
    },
    {
        code: sportCodes2.allEatingKarate,
        name: "Всестилевое каратэ"
    },
    {
        code: sportCodes2.vietInTao,
        name: "Вьет во дао"
    },
    {
        code: sportCodes2.gyreanSport,
        name: "Гиревой спорт"
    },
    {
        code: sportCodes2.golf,
        name: "Гольф"
    },
    {
        code: sportCodes2.huntingRaces,
        name: "Гонки на охотничьих лыжах"
    },
    {
        code: sportCodes2.snowmobileRaces,
        name: "Гонки на снегоходах"
    },
    {
        code: sportCodes2.obstaclesRaces,
        name: "Гонки с препятствиями"
    },
    {
        code: sportCodes2.skiSkiing,
        name: "Горные лыжи"
    },
    {
        code: sportCodes2.freestyleSkiing,
        name: "Горные лыжи фристайл"
    },
    {
        code: sportCodes2.gorodnySport,
        name: "Городошный спорт"
    },
    {
        code: sportCodes2.rowingOnKayaks,
        name: "Гребля на байдарках"
    },
    {
        code: sportCodes2.rowingOnCanoe,
        name: "Гребля на каноэ"
    },
    {
        code: sportCodes2.rowingOnBoats,
        name: "Гребля на шлюпках"
    },
    {
        code: sportCodes2.rowingSlalom,
        name: "Гребной слалом"
    },
    {
        code: sportCodes2.rowingPairingBiases,
        name: "Гребно-парусное двоеборье"
    },
    {
        code: sportCodes2.grecoRomanStruggle,
        name: "Греко-римская борьба"
    },
    {
        code: sportCodes2.grappling,
        name: "Грэпплинг"
    },
    {
        code: sportCodes2.tRP,
        name: "ГТО"
    },
    {
        code: sportCodes2.divingUpTo40MetersExceptForDivingInUnderwaterCaves,
        name: "Дайвинг до 40 метров, кроме дайвинга в подводных пещерах"
    },
    {
        code: sportCodes2.darts,
        name: "Дартс"
    },
    {
        code: sportCodes2.jujutsu,
        name: "Джиу-джитсу"
    },
    {
        code: sportCodes2.zando,
        name: "Дзэндо"
    },
    {
        code: sportCodes2.judo,
        name: "Дзюдо"
    },
    {
        code: sportCodes2.duatlon,
        name: "Дуатлон"
    },
    {
        code: sportCodes2.cycling,
        name: "Езда на велосипеде"
    },
    {
        code: sportCodes2.drivingSport,
        name: "Ездовой спорт"
    },
    {
        code: sportCodes2.zorbing,
        name: "Зорбинг"
    },
    {
        code: sportCodes2.zumba,
        name: "Зумба"
    },
    {
        code: sportCodes2.indoreHockey,
        name: "Индор-хоккей"
    },
    {
        code: sportCodes2.interactiveFootball,
        name: "Интерактивный футбол"
    },
    {
        code: sportCodes2.historicalAndMilitaryReconstructionTournaments,
        name: "Исторические и военные реконструкции, турниры"
    },
    {
        code: sportCodes2.yoga,
        name: "Йога"
    },
    {
        code: sportCodes2.kayking,
        name: "Кайкинг"
    },
    {
        code: sportCodes2.kaitesurfing,
        name: "Кайтсерфинг"
    },
    {
        code: sportCodes2.capoeira,
        name: "Капоэйра"
    },
    {
        code: sportCodes2.karting,
        name: "Картинг"
    },
    {
        code: sportCodes2.cardGames,
        name: "Карточные игры"
    },
    {
        code: sportCodes2.skatingOnATVs,
        name: "Катание на квадроциклах"
    },
    {
        code: sportCodes2.kayaking,
        name: "Каякинг"
    },
    {
        code: sportCodes2.kendoCando,
        name: "Кендо /Кэндо"
    },
    {
        code: sportCodes2.curling,
        name: "Керлинг"
    },
    {
        code: sportCodes2.eSTERSTY,
        name: "Киберспорт"
    },
    {
        code: sportCodes2.kickboxing,
        name: "Кикбоксинг"
    },
    {
        code: sportCodes2.kinologicalSport,
        name: "Кинологический спорт"
    },
    {
        code: sportCodes2.kyokusinkai,
        name: "Киокусинкай"
    },
    {
        code: sportCodes2.classicalStruggle,
        name: "Классическая борьба"
    },
    {
        code: sportCodes2.kobudo,
        name: "Кобудо"
    },
    {
        code: sportCodes2.complexMartialArts,
        name: "Комплексное единоборство"
    },
    {
        code: sportCodes2.computerSports,
        name: "Компьютерный спорт"
    },
    {
        code: sportCodes2.horsePolo,
        name: "конное поло"
    },
    {
        code: sportCodes2.horseSport,
        name: "Конный спорт"
    },
    {
        code: sportCodes2.skating,
        name: "Конькобежный спорт"
    },
    {
        code: sportCodes2.corfbol,
        name: "Корфбол"
    },
    {
        code: sportCodes2.kravMaga,
        name: "Крав-мага"
    },
    {
        code: sportCodes2.cricket,
        name: "Крикет"
    },
    {
        code: sportCodes2.croquet,
        name: "Крокет"
    },
    {
        code: sportCodes2.crossKantry,
        name: "Кросс-кантри"
    },
    {
        code: sportCodes2.crossfit,
        name: "Кроссфит"
    },
    {
        code: sportCodes2.kudo,
        name: "Кудо"
    },
    {
        code: sportCodes2.kungFu,
        name: "Кунг-фу"
    },
    {
        code: sportCodes2.campo,
        name: "Кэмпо"
    },
    {
        code: sportCodes2.laserTag,
        name: "Лазертаг"
    },
    {
        code: sportCodes2.lacrosse,
        name: "Лакросс"
    },
    {
        code: sportCodes2.athletics,
        name: "Легкая атлетика"
    },
    {
        code: sportCodes2.lightAthletics,
        name: "Легкая атлетика (бег, кросс, ходьба, прыжки в длину, прыжок тройной, метание молота/диска/гранаты/копья/мяча/ядра)"
    },
    {
        code: sportCodes2.lightAthleticsAllAround,
        name: "Легкая атлетика многоборье"
    },
    {
        code: sportCodes2.iceHazarding,
        name: "Ледолазание (1-4 категории сложности)"
    },
    {
        code: sportCodes2.longboarding,
        name: "Лонгбординг"
    },
    {
        code: sportCodes2.skiing,
        name: "Лыжные гонки (лыжироллеры)"
    },
    {
        code: sportCodes2.mountinbike,
        name: "Маунтинбайк"
    },
    {
        code: sportCodes2.internationalMilitarySportsAllAround,
        name: "Международное военно-спортивное многоборье"
    },
    {
        code: sportCodes2.grenadeThrowing,
        name: "Метание гранаты"
    },
    {
        code: sportCodes2.diskThrowing,
        name: "Метание диска"
    },
    {
        code: sportCodes2.spearThrowing,
        name: "Метание копья"
    },
    {
        code: sportCodes2.hammerThrowing,
        name: "Метание молота"
    },
    {
        code: sportCodes2.throwingTheBall,
        name: "Метание мяча"
    },
    {
        code: sportCodes2.theNucleusThrowing,
        name: "Метание ядра"
    },
    {
        code: sportCodes2.swordBattle,
        name: "Мечевой бой"
    },
    {
        code: sportCodes2.seaAllAround,
        name: "Морское многоборье"
    },
    {
        code: sportCodes2.motorcycleSport,
        name: "Мотоциклетный спорт"
    },
    {
        code: sportCodes2.motorcycleSportMotobol,
        name: "Мотоциклетный спорт - мотобол"
    },
    {
        code: sportCodes2.motorcycleSportMotocross,
        name: "Мотоциклетный спорт - мотокросс"
    },
    {
        code: sportCodes2.motorcycleSportEnduro,
        name: "Мотоциклетный спорт - эндуро"
    },
    {
        code: sportCodes2.muaiTai,
        name: "Муай Тай"
    },
    {
        code: sportCodes2.backgammon,
        name: "Нарды"
    },
    {
        code: sportCodes2.knifeBattle,
        name: "Ножевой бой"
    },
    {
        code: sportCodes2.pankration,
        name: "Панкратион"
    },
    {
        code: sportCodes2.parachuteSport,
        name: "Парашютный спорт"
    },
    {
        code: sportCodes2.sailing,
        name: "Парусный спорт"
    },
    {
        code: sportCodes2.powerlifting,
        name: "Пауэрлифтинг"
    },
    {
        code: sportCodes2.paintball,
        name: "Пейнтбол"
    },
    {
        code: sportCodes2.twistingTheRope,
        name: "Перетягивание каната"
    },
    {
        code: sportCodes2.beachVolleyball,
        name: "Пляжный волейбол"
    },
    {
        code: sportCodes2.beachFootball,
        name: "Пляжный футбол"
    },
    {
        code: sportCodes2.poging,
        name: "Погинг"
    },
    {
        code: sportCodes2.underwaterHunting,
        name: "Подводная охота"
    },
    {
        code: sportCodes2.underwaterFishing,
        name: "Подводная рыбалка"
    },
    {
        code: sportCodes2.underwaterPhotography,
        name: "Подводная фотосъемка"
    },
    {
        code: sportCodes2.underwaterOrientation,
        name: "Подводное ориентирование"
    },
    {
        code: sportCodes2.underwaterSport,
        name: "Подводный спорт (подводное плавание)"
    },
    {
        code: sportCodes2.fireAndAppliedSport,
        name: "Пожарно-прикладной спорт"
    },
    {
        code: sportCodes2.fireAndRescueSports,
        name: "Пожарно-спасательный спорт"
    },
    {
        code: sportCodes2.paulDance,
        name: "Пол дэнс"
    },
    {
        code: sportCodes2.polyatlon,
        name: "Полиатлон"
    },
    {
        code: sportCodes2.practicalShooting,
        name: "Практическая стрельба"
    },
    {
        code: sportCodes2.summerCamp,
        name: "Пребывание в летнем лагере"
    },
    {
        code: sportCodes2.diving,
        name: "Прыжки в воду"
    },
    {
        code: sportCodes2.jumpingIntoTheWater,
        name: "Прыжки в воду (бассейн)"
    },
    {
        code: sportCodes2.longJumps,
        name: "Прыжки в длину"
    },
    {
        code: sportCodes2.acrobaticPaths,
        name: "Прыжки на акробатической дорожке"
    },
    {
        code: sportCodes2.doubleMiniGradeJumps,
        name: "Прыжки на двойном минитрапе"
    },
    {
        code: sportCodes2.skiJumping,
        name: "Прыжки на лыжах"
    },
    {
        code: sportCodes2.skiJumping,
        name: "Прыжки на лыжах (кроме прыжков с вертолета)"
    },
    {
        code: sportCodes2.sprinkleJumps,
        name: "Прыжки с трамплина"
    },
    {
        code: sportCodes2.poleVaulting,
        name: "Прыжки с шестом"
    },
    {
        code: sportCodes2.battleJumps,
        name: "Прыжки на батуте"
    },
    {
        code: sportCodes2.bulletShooting,
        name: "Пулевая стрельба"
    },
    {
        code: sportCodes2.bulletShooting,
        name: "Пулевая стрельба"
    },
    {
        code: sportCodes2.radioSports,
        name: "Радиоспорт"
    },
    {
        code: sportCodes2.rocketModelSport,
        name: "Ракетомодельный спорт"
    },
    {
        code: sportCodes2.stretchingStretching,
        name: "Растяжка, стретчинг"
    },
    {
        code: sportCodes2.rafting,
        name: "Рафтинг"
    },
    {
        code: sportCodes2.rugby,
        name: "Регби"
    },
    {
        code: sportCodes2.rugbyInTheSnow,
        name: "Регби на снегу"
    },
    {
        code: sportCodes2.ragbol,
        name: "Регбол"
    },
    {
        code: sportCodes2.rohean,
        name: "Рогейн"
    },
    {
        code: sportCodes2.rollerSport,
        name: "Роллер спорт (хоккей, хоккей с мячом, фигурное катание)"
    },
    {
        code: sportCodes2.rollerSportsTrack,
        name: "Роллер спорт трек"
    },
    {
        code: sportCodes2.ropeSkipping,
        name: "Роупскиппинг (спортивная скакалка)"
    },
    {
        code: sportCodes2.handToHandCombat,
        name: "Рукопашный бой"
    },
    {
        code: sportCodes2.russianBastShoes,
        name: "Русская лапта"
    },
    {
        code: sportCodes2.fishingSport,
        name: "Рыболовный спорт"
    },
    {
        code: sportCodes2.savat,
        name: "Сават"
    },
    {
        code: sportCodes2.sambo,
        name: "Самбо"
    },
    {
        code: sportCodes2.selfRollingSport,
        name: "Самокатный спорт"
    },
    {
        code: sportCodes2.saoineSport,
        name: "Санный спорт"
    },
    {
        code: sportCodes2.swimran,
        name: "Свимран"
    },
    {
        code: sportCodes2.northernAllAround,
        name: "Северное многоборье"
    },
    {
        code: sportCodes2.powerExtreme,
        name: "Силовой экстрим"
    },
    {
        code: sportCodes2.simmeyDo,
        name: "симмей-до"
    },
    {
        code: sportCodes2.synchronizedSwimming,
        name: "Синхронное плавание"
    },
    {
        code: sportCodes2.skyranning,
        name: "Скайраннинг"
    },
    {
        code: sportCodes2.scalingOnArtificialRelief,
        name: "Скалолазание на искуственном рельефе"
    },
    {
        code: sportCodes2.squash,
        name: "Сквош"
    },
    {
        code: sportCodes2.skateboarding,
        name: "Скейтбординг"
    },
    {
        code: sportCodes2.skeleton,
        name: "Скелетон"
    },
    {
        code: sportCodes2.skiathlon,
        name: "Скиатлон"
    },
    {
        code: sportCodes2.songHockey,
        name: "Следж-хоккей"
    },
    {
        code: sportCodes2.mixedCombatMartialArts,
        name: "Смешанное боевое единоборство (ММА)"
    },
    {
        code: sportCodes2.snowboardFreestyle,
        name: "Сноуборд фристайл"
    },
    {
        code: sportCodes2.snowing,
        name: "Сноукайтинг"
    },
    {
        code: sportCodes2.modernSportsDances,
        name: "Современные спортивные танцы"
    },
    {
        code: sportCodes2.softball,
        name: "Софтбол"
    },
    {
        code: sportCodes2.layingOnCatamarans,
        name: "Сплав на катамаранах"
    },
    {
        code: sportCodes2.sportsAcrobatics,
        name: "Спортивная акробатика"
    },
    {
        code: sportCodes2.sportsAerobics,
        name: "Спортивная аэробика"
    },
    {
        code: sportCodes2.sportsGymnastics,
        name: "Спортивная гимнастика"
    },
    {
        code: sportCodes2.sportsWalking,
        name: "Спортивная ходьба"
    },
    {
        code: sportCodes2.sportsThrowingAKnife,
        name: "Спортивное метание ножа"
    },
    {
        code: sportCodes2.sportsThrowingAxes,
        name: "Спортивное метание топоров"
    },
    {
        code: sportCodes2.orienteering,
        name: "Спортивное ориентирование"
    },
    {
        code: sportCodes2.sportsOrientationCycling,
        name: "Спортивное ориентирование - велокросс"
    },
    {
        code: sportCodes2.sportsOrientationCross,
        name: "Спортивное ориентирование - кросс"
    },
    {
        code: sportCodes2.sportsOrientationSkiRace,
        name: "Спортивное ориентирование - лыжная гонка"
    },
    {
        code: sportCodes2.sportsAndAppliedDogBreeding,
        name: "Спортивно-прикладное собаководство"
    },
    {
        code: sportCodes2.sportsBridge,
        name: "Спортивный бридж"
    },
    {
        code: sportCodes2.sportsPoker,
        name: "Спортивный покер"
    },
    {
        code: sportCodes2.sportsTourism,
        name: "Спортивный туризм"
    },
    {
        code: sportCodes2.sportsTourismWater,
        name: "Спортивный туризм водный"
    },
    {
        code: sportCodes2.sportsTourismIsMountainous,
        name: "Спортивный туризм горный"
    },
    {
        code: sportCodes2.sportsTourismSki,
        name: "Спортивный туризм лыжный"
    },
    {
        code: sportCodes2.standOfShooting,
        name: "Стендовая стрельба"
    },
    {
        code: sportCodes2.strikbol,
        name: "Страйкбол (аирсофт)"
    },
    {
        code: sportCodes2.rifleSport,
        name: "Стрелковый спорт"
    },
    {
        code: sportCodes2.rootingFromACrossbow,
        name: "Стрельба из арбалета"
    },
    {
        code: sportCodes2.archery,
        name: "Стрельба из лука"
    },
    {
        code: sportCodes2.streetball,
        name: "Стритбол"
    },
    {
        code: sportCodes2.shipwritingSport,
        name: "Судомодельный спорт"
    },
    {
        code: sportCodes2.sumo,
        name: "Сумо"
    },
    {
        code: sportCodes2.sandboarding,
        name: "Сэндбординг"
    },
    {
        code: sportCodes2.thaiBoxing,
        name: "Тайский бокс"
    },
    {
        code: sportCodes2.danceSports,
        name: "Танцевальный спорт"
    },
    {
        code: sportCodes2.dancingOnIce,
        name: "Танцы на льду"
    },
    {
        code: sportCodes2.tennisIsLarge,
        name: "Теннис большой"
    },
    {
        code: sportCodes2.tennisDesktop,
        name: "Теннис настольный"
    },
    {
        code: sportCodes2.shotPut,
        name: "Толкание ядра"
    },
    {
        code: sportCodes2.traillance,
        name: "Трейлраннинг"
    },
    {
        code: sportCodes2.tracking,
        name: "Треккинг"
    },
    {
        code: sportCodes2.tablelonWinter,
        name: "Триатлон зимний"
    },
    {
        code: sportCodes2.triking,
        name: "Трикинг"
    },
    {
        code: sportCodes2.tourismIsMountainous,
        name: "Туризм горный"
    },
    {
        code: sportCodes2.taekwondo,
        name: "Тхэквондо"
    },
    {
        code: sportCodes2.universalBattle,
        name: "Универсальный бой"
    },
    {
        code: sportCodes2.wHUSH,
        name: "Ушу"
    },
    {
        code: sportCodes2.fencing,
        name: "Фехтование (рапира, шпага)"
    },
    {
        code: sportCodes2.fencing,
        name: "Фехтование (сабля)"
    },
    {
        code: sportCodes2.figureSkating,
        name: "Фигурное катание"
    },
    {
        code: sportCodes2.fitness,
        name: "Фитнес"
    },
    {
        code: sportCodes2.flaringDisk,
        name: "Флаинг-диск"
    },
    {
        code: sportCodes2.freeFighting,
        name: "Фри файтинг"
    },
    {
        code: sportCodes2.fryborning,
        name: "Фрибординг"
    },
    {
        code: sportCodes2.fridivingUpTo40Meters,
        name: "Фридайвинг до 40 метров"
    },
    {
        code: sportCodes2.frilineScience,
        name: "Фрилайн-скейтинг"
    },
    {
        code: sportCodes2.freestyleAcrobatika,
        name: "Фристайл акробатика"
    },
    {
        code: sportCodes2.freestyleSkiCross,
        name: "Фристайл ски-кросс"
    },
    {
        code: sportCodes2.functionalAllAround,
        name: "Фукциональное многоборье"
    },
    {
        code: sportCodes2.football,
        name: "Футбол"
    },
    {
        code: sportCodes2.futzal,
        name: "Футзал"
    },
    {
        code: sportCodes2.hapkido,
        name: "Хапкидо"
    },
    {
        code: sportCodes2.hipHopAerobics,
        name: "Хип-хоп аэробика"
    },
    {
        code: sportCodes2.walkingOnSnowshoes,
        name: "Ходьба на снегоступах"
    },
    {
        code: sportCodes2.walkingScandinavian,
        name: "Ходьба скандинавская"
    },
    {
        code: sportCodes2.hockeyOnIceWithABall,
        name: "Хоккей на льду с мячом"
    },
    {
        code: sportCodes2.fieldHockey,
        name: "Хоккей на траве"
    },
    {
        code: sportCodes2.bandy,
        name: "Хоккей с мячом"
    },
    {
        code: sportCodes2.iceHockey,
        name: "Хоккей с шайбой"
    },
    {
        code: sportCodes2.choreography,
        name: "Хореография"
    },
    {
        code: sportCodes2.rhythmicGymnastics,
        name: "Художественная гимнастика"
    },
    {
        code: sportCodes2.chirSport,
        name: "Чир спорт"
    },
    {
        code: sportCodes2.chirlingChir,
        name: "Чирлидинг, чир"
    },
    {
        code: sportCodes2.choiQuangBefore,
        name: "Чой кван до"
    },
    {
        code: sportCodes2.chess,
        name: "Шахматы"
    },
    {
        code: sportCodes2.checkers,
        name: "Шашки"
    },
    {
        code: sportCodes2.sixthAcrobatics,
        name: "Шестовая акробатика"
    },
    {
        code: sportCodes2.aestheticGymnastics,
        name: "Эстетическая гимнастика"
    },
    {
        code: sportCodes2.yakutNationalJumps,
        name: "Якутские нацональные прыжки"
    },
    {
        code: sportCodes2.yachting,
        name: "Яхтинг"
    }
];

const selectedTypesMaxLimit = 15;

module.exports = {
    sportCodes,
    sportTypes,
    sportCodes2,
    sportTypes2,
    selectedTypesMaxLimit
};
