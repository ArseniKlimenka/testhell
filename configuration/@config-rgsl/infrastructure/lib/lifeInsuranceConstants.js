'use strict';

const productGroup = {
    ISZ: {
        descriptionRU: "investment",
        InvestmentLifeInsurance: "InvestmentLifeInsurance"
    },
    NSZ: {
        descriptionRU: "endowment",
        AccumulatedLifeInsurance: "AccumulatedLifeInsurance"
    },
    CSZ: {
        descriptionRU: "credit",
        CreditLifeInsurance: "CreditLifeInsurance"
    },
    DMS: {
        descriptionRU: "med",
        MedLifeInsurance: "MedLifeInsurance"
    },
    RISK: {
        descriptionRU: "risk",
        RiskLifeInsurance: "RiskLifeInsurance"
    },
    DSZ: {
        descriptionRU: "equity",
        EquityLifeInsurance: "EquityLifeInsurance"
    },
    NS: {
        descriptionRU: "accident",
        AccidentLifeInsurance: "AccidentLifeInsurance"
    }
};

const productGroupCollective = {
    Name: 'collectiveAll',
    AllConfigGroups: ['med', 'accidentOrIllness', 'endowment']
};

const productCode = {
    AccumulatedLifeInsuranceQuote: "AccumulatedLifeInsuranceQuote",
    AccumulatedLifeInsurancePolicy: "AccumulatedLifeInsurancePolicy",
    EquityLifeInsuranceQuote: "EquityLifeInsuranceQuote",
    EquityLifeInsurancePolicy: "EquityLifeInsurancePolicy",
    InvestmentLifeInsuranceQuote: "InvestmentLifeInsuranceQuote",
    InvestmentLifeInsurancePolicy: "InvestmentLifeInsurancePolicy",
    CreditLifeInsuranceQuote: "CreditLifeInsuranceQuote",
    CreditLifeInsurancePolicy: "CreditLifeInsurancePolicy",
    MedLifeInsuranceQuote: "MedLifeInsuranceQuote",
    MedLifeInsurancePolicy: "MedLifeInsurancePolicy",
    RiskLifeInsuranceQuote: "RiskLifeInsuranceQuote",
    RiskLifeInsurancePolicy: "RiskLifeInsurancePolicy",
    AccidentLifeInsuranceQuote: "AccidentLifeInsuranceQuote",
    AccidentLifeInsurancePolicy: "AccidentLifeInsurancePolicy",
    CollectiveLifeInsurancePolicy: "CollectiveLifeInsurancePolicy"
};

const productGroupToConfigurationMapping = {
    [productGroup.NS.descriptionRU]: productCode.AccidentLifeInsurancePolicy,
    [productGroup.CSZ.descriptionRU]: productCode.CreditLifeInsurancePolicy,
    [productGroup.NSZ.descriptionRU]: productCode.AccumulatedLifeInsurancePolicy,
    [productGroup.DSZ.descriptionRU]: productCode.EquityLifeInsurancePolicy,
    [productGroup.ISZ.descriptionRU]: productCode.InvestmentLifeInsurancePolicy,
    [productGroup.DMS.descriptionRU]: productCode.MedLifeInsurancePolicy,
    [productGroup.RISK.descriptionRU]: productCode.RiskLifeInsurancePolicy
};

const quotesCode = {
    AccumulatedLifeInsuranceQuote: "AccumulatedLifeInsuranceQuote",
    EquityLifeInsuranceQuote: "EquityLifeInsuranceQuote",
    InvestmentLifeInsuranceQuote: "InvestmentLifeInsuranceQuote",
    CreditLifeInsuranceQuote: "CreditLifeInsuranceQuote",
    MedLifeInsuranceQuote: "MedLifeInsuranceQuote",
    RiskLifeInsuranceQuote: "RiskLifeInsuranceQuote",
    AccidentLifeInsuranceQuote: "AccidentLifeInsuranceQuote"
};

const universalVersionedDocument = {
    Type: {
        Document: "Document",
        Correction: "Correction"
    },
    CodeName: {
        ProductConfiguration: "ProductConfiguration",
        ProductConfigurationCorrection: "ProductConfigurationCorrection"
    },
    Entity: {
        UniversalVersionedDocument: "UniversalVersionedDocument"
    }
};

const universalMasterEntity = {
    CodeName: {
        ContractEntity: "ContractEntity"
    },
    Entity: {
        UniversalMasterEntity: "UniversalMasterEntity"
    }
};

const actor = {
    Agent: 'Agent',
    Operations: 'Operations',
    OperationsDirector: 'OperationsDirector',
    System: 'System',
    UKSP: 'UKSP',
    Underwriter: "Underwriter"
};

const paymentFrequency = {
    oneTime: {
        code: '1',
        description: 'Единовременно'
    },
    annual: {
        code: '2',
        description: 'Ежегодно'
    },
    semiAnnual: {
        code: '3',
        description: 'Раз в полгода'
    },
    quarterly: {
        code: '4',
        description: 'Раз в квартал'
    },
    monthly: {
        code: '5',
        description: 'Раз в месяц'
    }
};

const guaranteedIncome = {
    insuranceTermEnd: {
        code: '1',
        description: 'В конце срока страхования'
    },
    annual: {
        code: '2',
        description: 'Ежегодно'
    }
};

const daysCount = {
    oneDay: '1',
    week: '7',
    month: '30',
    sixtyDays: '60',
    ninetyDays: '90',
    halfYear: '180',
    year: '365'
};

const availableInsuranceTermsDays = [
    {
        value: daysCount.oneDay,
        description: 'Один день'
    },
    {
        value: daysCount.week,
        description: 'Одна неделя'
    },
    {
        value: daysCount.month,
        description: 'Один месяц'
    },
    {
        value: daysCount.sixtyDays,
        description: 'Шестьдесят дней'
    },
    {
        value: daysCount.ninetyDays,
        description: 'Девяносто дней'
    },
    {
        value: daysCount.halfYear,
        description: 'Полгода'
    },
    {
        value: daysCount.year,
        description: 'Один год'
    }
];

const currency = {
    RUB: {
        code: 'RUB',
        description: 'Российский рубль',
        numericCode: '643'
    },
    EUR: {
        code: 'EUR',
        description: 'Евро',
        numericCode: '978'
    },
    USD: {
        code: 'USD',
        description: 'Доллар США',
        numericCode: '840'
    },
};

const issueForm = {
    paper: {
        issueFormCode: 'paper',
        issueFormDescription: 'Бумага'
    },
    offer: {
        issueFormCode: 'offer',
        issueFormDescription: 'Оферта'
    },
    twoSidesSign: {
        issueFormCode: 'twoSidesSign',
        issueFormDescription: 'Двустороннее подписание'
    },
    ePolicy: {
        issueFormCode: 'ePolicy',
        issueFormDescription: 'Эл. полис'
    }
};

const endowmentPaymentVariant = {
    "single": {
        endowmentPaymentVariantCode: 'single',
        endowmentPaymentVariantDescription: 'Единовременно'
    },
    "term": {
        endowmentPaymentVariantCode: 'term',
        endowmentPaymentVariantDescription: 'Срочный аннуитет'
    },
    "wholeLife": {
        endowmentPaymentVariantCode: 'wholeLife',
        endowmentPaymentVariantDescription: 'Пожизненный аннуитет'
    }
};

const relationType = {
    'mandatory': '01',
    'additional': '02',
    'replacement': '03'
};

const quoteState = {
    Draft: 'Draft',
    InfoRequest: 'InfoRequest',
    WaitReview: 'WaitReview',
    OnReview: 'OnReview',
    WaitUnderwriting: 'WaitUnderwriting',
    OnUnderwriting: 'OnUnderwriting',
    Approved: 'Approved',
    Rejected: 'Rejected',
    Active: 'Active',
    Cancelled: 'Cancelled',
    ChangeUnderwritingGroup: 'ChangeUnderwritingGroup'
};

const policyState = {
    Activated: 'Activated',
    InfoRequest: 'InfoRequest',
    OnReview: 'OnReview',
    Rejected: 'Rejected',
    Cancelled: 'Cancelled',
    Active: 'Active',
    Draft: 'Draft',
    Approved: 'Approved',
    Issued: 'Issued',
    CancelledByAmendment: 'CancelledByAmendment',
    OperationsApproval: 'OperationsApproval',
    Completed: "Completed"
};

const inquiryState = {
    Draft: {
        code: 'Draft',
        desc: 'Создан'
    },
    Issued: {
        code: 'Issued',
        desc: 'Закрыт'
    },
    Cancelled: {
        code: 'Cancelled',
        desc: 'Отменен'
    }
};

const inquiryConfiguratuionName = 'LifeInsuranceInquiry';

const policyInquiryConfiguratuionName = 'LifeInsurancePolicyInquiry';

const cnlInquiryConfiguratuionName = 'CancellationInquiry';

const endowmentInquiryConfiguratuionName = 'EndowmentInquiry';

const contractType = {
    Quote: 'Quote',
    Policy: 'Policy',
    Amendment: 'Amendment'
};

const entityTypes = {
    Contract: 'Contract'
};

const userGroup = {
    actuary: 'actuary',
    underwriting: 'underwriting',
    underwriting2: 'underwriting2',
    accounting: 'accounting',
    investment: 'investment',
    compliance: 'compliance',
    podft: 'podft',
    operations: 'operations',
    agentSalesSupport: 'agentSalesSupport',
    partnerSalesSupport: 'partnerSalesSupport',
    claims: 'claims',
    security: 'security',
    products: 'products',
    legal: 'legal',
    methodology: 'methodology',
    UKSP: 'UKSP',
    operationsDirector: 'operationsDirector',
    salesPSB: 'salesPSB',
    salesBFKO: 'salesBFKO',
    salesDemo: 'salesDemo',
    salesAKCEPT: 'salesAKCEPT',
    salesAKBARS: 'salesAKBARS',
    salesBFKOAuto: 'salesBFKOAuto',
    salesOAS: 'salesOAS',
    callCenter: 'callCenter',
    clientServiceCenter: 'clientServiceCenter',
    salesMINBANK: 'salesMINBANK',
    salesBFKOVIP: 'salesBFKOVIP',
    salesSOVKOMVIP: 'salesSOVKOMVIP',
    salesROSBANKVIP: 'salesROSBANKVIP',
    salesSMP: 'salesSMP',
    salesVTB: 'salesVTB',
    salesVTBMass: 'salesVTBMass',
    salesLIFEINVEST: 'salesLIFEINVEST',
    salesPB: 'salesPB',
    salesUBRR: 'salesUBRR',
    salesEKSPO: 'salesEKSPO',
    UFO: 'UFO',
    salesDummyNs: 'salesDummyNs',
    salesDummyPools: 'salesDummyPools',
    underwriting_quote: 'underwriting_quote',
    salesVTBVIP: 'Продавец ВТБ Прайм',
    salesVTBVIPNT: 'Продавец ВТБ Прайм НТ',
    salesVTBPremium: 'Продавец ВТБ Привилегия',
    salesVTBPremiumNT: 'Продавец ВТБ Привилегия НТ',
    salesVTBMassProducts: 'Продавец ВТБ РОЗНИЦА Продукты',
    salesVTBMassINV: 'Продавец ВТБ РОЗНИЦА ИСЖ',
    salesVTBMassNT: 'Продавец ВТБ РОЗНИЦА НТ',
    salesPSBProducts: 'Продавец ПСБ Продукты',
    salesPSBNT: 'Продавец ПСБ НТ',
    salesPSBAffluentNT: 'Продавец ПСБ Премиум НТ',
    salesPSBAffluent: 'Продавец ПСБ Премиум',
    salesPSBMIMO: 'Продавец ПСБ МиМО'
};

const partnerCode = {
    PSB: 15,
    BFKO: 249411,
    Demo: 999999,
    AKCEPT: 431120,
    AKBARS: 112479,
    ZENIT: 191127,
    PSBVIP: 191130,
    BFKOAuto: 107093,
    OAS: 247457,
    MINBANK: 110256,
    BFKOVIP: 23472,
    SOVKOMVIP: 93213,
    ROSBANKVIP: 21049,
    SMP: 113302,
    REINVEST: 866288,
    VTB: 76421,
    VTBmass: 115870,
    LIFEINVEST: 117903,
    PB: 118594,
    UBRR: 118880,
    EKSPO: 124402,
    DummyNs: 677,
    DummyPools: 192559

};

const serviceCode = {
    GenCheckHealth: 'GenCheckHealth',
    GenCheckSport: 'GenCheckSport',
    GenCheckTalents: 'GenCheckTalents'
};

const salesGroupByPartnerCode = {
    15: 'salesPSB',
    249411: 'salesBFKO',
    999999: 'salesDemo',
    431120: 'salesAKCEPT',
    112479: 'salesAKBARS',
    191127: 'salesZENIT',
    191130: 'salesPSBVIP',
    107093: 'salesBFKOAuto',
    247457: 'salesOAS',
    110256: 'salesMINBANK',
    23472: 'salesBFKOVIP',
    93213: 'salesSOVKOMVIP',
    21049: 'salesROSBANKVIP',
    113302: 'salesSMP',
    866288: 'salesREINVEST',
    76421: 'salesVTB',
    115870: 'salesVTBMass',
    117903: 'salesLIFEINVEST',
    118594: 'salesPB',
    118880: 'salesUBRR',
    192559: 'salesDummyPools',
    124402: 'salesEKSPO'
};

const salesGroupRelatedByPartnerCode = {
    [partnerCode.PSB]: 'salesPSB',
    [partnerCode.BFKO]: 'salesBFKO',
    [partnerCode.Demo]: 'salesDemo',
    [partnerCode.AKCEPT]: 'salesAKCEPT',
    [partnerCode.AKBARS]: 'salesAKBARS',
    [partnerCode.ZENIT]: 'salesZENIT',
    [partnerCode.PSBVIP]: 'salesPSBVIP',
    [partnerCode.BFKOAuto]: 'salesBFKOAuto',
    [partnerCode.OAS]: 'salesOAS',
    [partnerCode.MINBANK]: 'salesMINBANK',
    [partnerCode.BFKOVIP]: 'salesBFKOVIP',
    [partnerCode.SOVKOMVIP]: 'salesSOVKOMVIP',
    [partnerCode.ROSBANKVIP]: 'salesROSBANKVIP',
    [partnerCode.SMP]: 'salesSMP',
    [partnerCode.REINVEST]: 'salesREINVEST',
    [partnerCode.VTB]: 'salesVTB',
    [partnerCode.LIFEINVEST]: 'salesLIFEINVEST',
    [partnerCode.PB]: 'salesPB',
    [partnerCode.UBRR]: 'salesUBRR',
    [partnerCode.DummyNs]: 'salesDummyNs',
    [partnerCode.DummyPools]: 'salesDummyPools',
    [partnerCode.EKSPO]: 'salesEKSPO'
};

const participantType = {
    policyHolder: 'policyHolder',
    insuredPerson: 'insuredPerson',
    beneficiary: 'beneficiary'
};

const strategyDesc = {
    'endowment': 'Дожитие',
    'fosagro': 'Акции - Фосагро',
    'gazprom': 'Акции - Газпром',
    'indexMosbirzhi': 'Индекс Мосбиржи',
    'lukoil': 'Акции - Лукойл',
    'pif1': 'ПИФ 1',
    'pif2': 'ПИФ 2',
    'stock1': 'Акции - 1',
    'stock2': 'Акции - 2',
    'westernEconimic': 'Западная экономика',
    'worldwideTelecoms': 'Всемирные телекомы',
    'yandex': 'Акции - Яндекс'
};

const salesSegment = {
    mass: {
        code: 'mass',
        desc: 'ПСБ mass'
    },
    affluent: {
        code: 'affluent',
        desc: 'ПСБ OPC'
    },
    creditBFKO: {
        code: 'creditBFKO',
        desc: 'БФКО КСЖ'
    },
    massBFKO: {
        code: 'massBFKO',
        desc: 'БФКО mass'
    },
    demo: {
        code: 'demo',
        desc: 'Демо'
    },
    massAKCEPT: {
        code: 'massAKCEPT',
        desc: 'АКЦЕПТ mass'
    },
    massAKBARS: {
        code: 'massAKBARS',
        desc: 'АКБАРС mass'
    },
    massZENIT: {
        code: 'massZENIT',
        desc: 'ЗЕНИТ mass'
    },
    PSBVIP: {
        code: 'PSBVIP',
        desc: 'ПСБ VIP'
    },
    creditBFKOAuto: {
        code: 'creditBFKOAuto',
        desc: 'БФКО Авто'
    },
    massOAS: {
        code: 'massOAS',
        desc: 'ОАС mass'
    },
    migrated: {
        code: 'migrated',
        desc: 'Мигрированный'
    },
    massMINBANK: {
        code: 'massMINBANK',
        desc: 'МИНБанк mass'
    },
    BFKOVIP: {
        code: 'BFKOVIP',
        desc: 'БФКО VIP'
    },
    SOVKOMVIP: {
        code: 'SOVKOMVIP',
        desc: 'Совкомбанк VIP'
    },
    ROSBANKVIP: {
        code: 'ROSBANKVIP',
        desc: 'Росбанк VIP'
    },
    massSMP: {
        code: 'massSMP',
        desc: 'СМП'
    },
    massREINVEST: {
        code: 'massREINVEST',
        desc: 'Инновационные Решения'
    },
    massLIFEINVEST: {
        code: 'massLIFEINVEST',
        desc: 'Лайф Инвест'
    },
    PremiumVTB: {
        code: 'PremiumVTB',
        desc: 'ВТБ Premium'
    },
    VIPVTB: {
        code: 'VIPVTB',
        desc: 'ВТБ VIP'
    },
    VIPVTBNT: {
        code: 'VIPVTBNT',
        desc: 'ВТБ VIP Новые территории'
    },
    massCorp: {
        code: 'massCorp',
        desc: 'massCorp'
    },
    massVTB: {
        code: 'massVTB',
        desc: 'ВТБ mass'
    },
    massPB: {
        code: 'massPB',
        desc: 'ПБ mass'
    },
    affluentNT: {
        code: 'affluentNT',
        desc: 'ПСБ OPC новые территории'
    },
    PremiumVTBNT: {
        code: 'PremiumVTBNT',
        desc: 'ВТБ Premium Новые территории'
    },
    massVTBNT: {
        code: 'massVTBNT',
        desc: 'ВТБ mass Новые территории'
    },
    massPSBNT: {
        code: 'massPSBNT',
        desc: 'ПСБ mass Новые территории'
    },
    massUBRR: {
        code: 'massUBRR',
        desc: 'УБРиР'
    },
    DummyNs: {
        code: 'DummyNs',
        desc: 'спорт НС'
    },
    DummyPools: {
        code: 'DummyPools',
        desc: 'dummy_РГСЖ Пулы'
    },
    massEKSPO: {
        code: 'massEKSPO',
        desc: 'ЭКСПО Банк'
    }
};

const salesSegmentRoles = {
    'mass': {
        'endowment': ['AccumulatedLifePSBMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifePSBMass', 'GeneralBackOffice']
    },
    'affluent': {
        'endowment': ['AccumulatedLifePSBAffluent', 'GeneralBackOffice'],
        'investment': ['InvestmentLifePSBAffluent', 'GeneralBackOffice']
    },
    'creditBFKO': {
        'credit': ['CreditLifeBFKOMass', 'GeneralBackOffice']
    },
    'massBFKO': {
        'endowment': ['AccumulatedLifeBFKOMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeBFKOMass', 'GeneralBackOffice'],
        'med': ['MedLifeBFKOMass', 'GeneralBackOffice']
    },
    'demo': {
        'endowment': ['SalesDemoGroup', 'GeneralBackOffice'],
        'investment': ['SalesDemoGroup', 'GeneralBackOffice'],
        'equity': ['SalesDemoGroup', 'GeneralBackOffice'],
        'accident': ['GeneralBackOffice']
    },
    'massAKCEPT': {
        'endowment': ['AccumulatedLifeAKCEPTMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeAKCEPTMass', 'GeneralBackOffice']
    },
    'massAKBARS': {
        'endowment': ['AccumulatedLifeAKBARSMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeAKBARSMass', 'GeneralBackOffice']
    },
    'massZENIT': {
        'endowment': ['AccumulatedLifeZENITMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeZENITMass', 'GeneralBackOffice']
    },
    'PSBVIP': {
        'investment': ['InvestmentLifePSBVIP', 'GeneralBackOffice']
    },
    'creditBFKOAuto': {
        'credit': ['CreditLifeBFKOAuto', 'GeneralBackOffice']
    },
    'massOAS': {
        'endowment': ['AccumulatedLifeOASMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeOASMass', 'GeneralBackOffice'],
        'med': ['MedLifeOASMass', 'GeneralBackOffice'],
        'accidentOrIllness': ['GeneralBackOffice'],
        'risk': ['RisklifeOAS', 'GeneralBackOffice'],
        'equity': ['EquityLifeOASMass', 'GeneralBackOffice']
    },
    'massMINBANK': {
        'endowment': ['AccumulatedLifeMINBANK', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeMINBANK', 'GeneralBackOffice']
    },
    'migrated': {
        'endowment': ['GeneralBackOffice'],
        'investment': ['GeneralBackOffice'],
        'credit': ['GeneralBackOffice'],
        'med': ['GeneralBackOffice'],
        'risk': ['GeneralBackOffice'],
        'equity': ['GeneralBackOffice']
    },
    'BFKOVIP': {
        'investment': ['InvestmentLifeBFKOVIP', 'GeneralBackOffice'],
        'med': ['MedLifeBFKOVIP', 'GeneralBackOffice']
    },
    'SOVKOMVIP': {
        'investment': ['InvestmentLifeBFKOVIP', 'GeneralBackOffice']
    },
    'ROSBANKVIP': {
        'investment': ['InvestmentLifeBFKOVIP', 'GeneralBackOffice']
    },
    'massSMP': {
        'endowment': ['AccumulatedLifeSMPMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeSMPMass', 'GeneralBackOffice']
    },
    'massREINVEST': {
        'endowment': ['AccumulatedLifeREINVESTMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeREINVESTMass', 'GeneralBackOffice']
    },
    'massLIFEINVEST': {
        'endowment': ['AccumulatedLifeLIFEINVESTMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeLIFEINVESTMass', 'GeneralBackOffice']
    },
    'PremiumVTB': {
        'endowment': ['AccumulatedLifeVTBPremium', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeVTBPremium', 'GeneralBackOffice'],
        'equity': ['EquityLifeVTBPremium', 'GeneralBackOffice']
    },
    'VIPVTB': {
        'endowment': ['AccumulatedLifeVTBVIP', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeVTBVIP', 'GeneralBackOffice'],
        'equity': ['EquityLifeVTBVIP', 'GeneralBackOffice'],
        'risk': ['RisklifeVTBVIP', 'GeneralBackOffice']
    },
    'VIPVTBNT': {
        'endowment': ['AccumulatedLifeVTBVIPNT', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeVTBVIPNT', 'GeneralBackOffice']
    },
    'massCorp': {
        'accidentOrIllness': ['GeneralBackOffice']
    },
    'massVTB': {
        'endowment': ['AccumulatedLifeVTBMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeVTBMass', 'GeneralBackOffice']
    },
    'massPB': {
        'endowment': ['AccumulatedLifePBMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifePBMass', 'GeneralBackOffice']
    },
    'affluentNT': {
        'endowment': ['AccumulatedLifePSBAffluentNT', 'GeneralBackOffice'],
        'investment': ['InvestmentLifePSBAffluentNT', 'GeneralBackOffice']
    },
    'PremiumVTBNT': {
        'endowment': ['AccumulatedLifeVTBPremiumNT', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeVTBPremiumNT', 'GeneralBackOffice']
    },
    'massVTBNT': {
        'endowment': ['AccumulatedLifeVTBMassNT', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeVTBMassNT', 'GeneralBackOffice']
    },
    'massPSBNT': {
        'endowment': ['AccumulatedLifePSBMassNT', 'GeneralBackOffice'],
        'investment': ['InvestmentLifePSBMassNT', 'GeneralBackOffice']
    },
    'massUBRR': {
        'endowment': ['AccumulatedLifeUBRRMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeUBRRMass', 'GeneralBackOffice']
    },
    'massEKSPO': {
        'endowment': ['AccumulatedLifeEKSPOMass', 'GeneralBackOffice'],
        'investment': ['InvestmentLifeEKSPOMass', 'GeneralBackOffice']
    },
    'DummyNs': {
        'accident': ['AccidentLifeDummyRGSL', 'GeneralBackOffice']
    },
    'DummyPools': {
        'accident': ['AccidentLifeDummyRGSL', 'GeneralBackOffice']
    },
};

const excludeProductRoles = [
    {
        ApplicationRoleCodeName: 'ExcludeERCP2',
        productCodes: ['ERCP2', 'IDG3', 'IDG5', 'IDG7', 'IDG10', 'IDGP3', 'IDGP5', 'IDGP7', 'IDGP10', 'IBA3', 'IBA5', 'IBAP3', 'IBAP5']
    },
    {
        ApplicationRoleCodeName: 'ExcludeEBMP',
        productCodes: ['EBMPYBFKO', 'EBMPFBFKO']
    },
    {
        ApplicationRoleCodeName: 'ExcludeEBMG',
        productCodes: ['EBMG', 'EBMGP']
    },
    {
        ApplicationRoleCodeName: 'ExcludeNOTE',
        productCodes: ['NOTE2BFKO', 'NOTE3BFKO', 'NOTE1BFKO', 'NOTE1BFKO3', 'NOTE1BFKO4']
    },
    {
        ApplicationRoleCodeName: 'ExcludeREINVEST',
        productCodes: ['IBA5REINVEST', 'IBA3REINVEST', 'IDG3REINVEST', 'IDG5REINVEST']
    },
    {
        ApplicationRoleCodeName: 'ExcludeEBMOPTIMA',
        productCodes: ['EBMOPTIMAOAS2']
    },
    {
        ApplicationRoleCodeName: 'ExcludeEBMGVVTB',
        productCodes: ['EBMGVVTB']
    },
    {
        ApplicationRoleCodeName: 'ExcludeEBMGVNVTB',
        productCodes: ['EBMGVNVTB']
    },
    {
        ApplicationRoleCodeName: 'ExcludeEBMMGREINVEST',
        productCodes: ['EBMMGREINVEST']
    },
    {
        ApplicationRoleCodeName: 'ExcludeIDGREINVEST',
        productCodes: ['EBMGREINVEST', 'IDG1REINVEST', 'IDG3REINVEST', 'IDG5REINVEST']
    },
    {
        ApplicationRoleCodeName: 'ExcludeIDGRETVTB',
        productCodes: ['IDG2RETVTB', 'IDG3RETVTB', 'IDG5RETVTB']
    }
];

const verificationConfiguratuionName = 'LifeInsuranceAttachmentVerification';

const lifeInsuranceRequestConfigurationName = 'LifeInsuranceRequest';

const deduplicationDocumentConfigurationName = 'DeduplicationDocument';

const accountingCertificateConfigurationName = 'AccountingCertificate';

const assetConfigurationName = 'Asset';

const assetChangeAmendmentConfigurationName = 'AssetChangeAmendment';

const equityLifeInsuranceAmendments = {
    EquityLifeInsuranceCancellation: "EquityLifeInsuranceCancellation",
    EquityLifeInsuranceNonFinChange: "EquityLifeInsuranceNonFinChange",
    EquityLifeInsuranceFinChange: "EquityLifeInsuranceFinChange"
};


const strategyConfiguration = {
    codeName: 'LifeInsuranceStrategyConfiguration',
    allowedState: 'Draft'
};

const product = {
    ERC: 'ERC',
    ERCP: 'ERCP',
    EHVP: 'EHVP',
    IDC3: 'IDC3',
    IDC5: 'IDC5',
    IDC: 'IDC',
    IDCP3: 'IDCP3',
    IDCP5: 'IDCP5',
    IDCP: 'IDCP',
    ISO: 'ISO',
    ISP: 'ISP',
    IDFP: 'IDFP',
    CCP: 'CCP',
    CMS: 'CMS',
    CDMS: 'CDMS',
    ERC2: 'ERC2',
    ERCP2: 'ERCP2',
    EHVP2: 'EHVP2',
    IBG3BFKO: 'IBG3BFKO',
    IBG5BFKO: 'IBG5BFKO',
    IBG3BFKO2: 'IBG3BFKO2',
    IBG5BFKO2: 'IBG5BFKO2',
    IBI3BFKO: 'IBI3BFKO',
    IBI5BFKO: 'IBI5BFKO',
    EFRBFKO: 'EFRBFKO',
    CCP2: 'CCP2',
    CMP: 'CMP',
    IBG3: 'IBG3',
    IBG5: 'IBG5',
    IBG7: 'IBG7',
    IBG10: 'IBG10',
    IBGP3: 'IBGP3',
    IBGP5: 'IBGP5',
    IBGP7: 'IBGP7',
    IBGP10: 'IBGP10',
    IBI3: 'IBI3',
    IBI5: 'IBI5',
    IBI10: 'IBI10',
    IBIP3: 'IBIP3',
    IBIP5: 'IBIP5',
    IBIP10: 'IBIP10',
    DEMOACC: 'DEMOACC',
    DEMOINV: 'DEMOINV',
    IBI3AKCEPT: 'IBI3AKCEPT',
    IBI5AKCEPT: 'IBI5AKCEPT',
    IBG1AKCEPT: 'IBG1AKCEPT',
    EPGPAKBARS: 'EPGPAKBARS',
    EBMBFKO: 'EBMBFKO',
    IBI2ZENIT: 'IBI2ZENIT',
    IBI3ZENIT: 'IBI3ZENIT',
    IBI5ZENIT: 'IBI5ZENIT',
    IDG1ZENIT: 'IDG1ZENIT',
    EPCLZENIT: 'EPCLZENIT',
    EBMZENIT: 'EBMZENIT',
    EBMIBFKO: 'EBMIBFKO',
    EBMGBFKO: 'EBMGBFKO',
    IDG3: 'IDG3',
    IDG5: 'IDG5',
    IDG7: 'IDG7',
    IDG10: 'IDG10',
    IDGP3: 'IDGP3',
    IDGP5: 'IDGP5',
    IDGP7: 'IDGP7',
    IDGP10: 'IDGP10',
    EPGPZENIT: 'EPGPZENIT',
    IDGV2: 'IDGV2',
    IDGV3: 'IDGV3',
    CACB: 'CACB',
    IBA3: 'IBA3',
    IBA5: 'IBA5',
    IBA3BFKO: 'IBA3BFKO',
    IBA5BFKO: 'IBA5BFKO',
    IBAP3VTB: 'IBAP3VTB',
    IBAP5VTB: 'IBAP5VTB',
    IBAV3VTB: 'IBAV3VTB',
    IBAKVV5VTB: 'IBAKVV5VTB',
    IBAKVP5VTB: 'IBAKVP5VTB',
    IBAKVV5PEVTB: 'IBAKVV5PEVTB',
    IBAKVP5PEVTB: 'IBAKVP5PEVTB',
    IBAV5VTB: 'IBAV5VTB',
    IBAP3: 'IBAP3',
    IBAP5: 'IBAP5',
    IBA2P3: 'IBA2P3',
    IBA2P3VTB: 'IBA2P3VTB',
    IBA2P5VTB: 'IBA2P5VTB',
    IBA2V3VTB: 'IBA2V3VTB',
    IBA2V5VTB: 'IBA2V5VTB',
    EBMAKCEPT: 'EBMAKCEPT',
    IBI3OAS: 'IBI3OAS',
    IBI5OAS: 'IBI5OAS',
    IBG3OAS: 'IBG3OAS',
    IBG5OAS: 'IBG5OAS',
    EBMOAS: 'EBMOAS',
    IDG2ZENIT: 'IDG2ZENIT',
    EBMAKBARS: 'EBMAKBARS',
    CCP3: 'CCP3',
    CMP3: 'CMP3',
    CMC: 'CMC',
    CMP4: 'CMP4',
    CAPCLRELOAS: 'CAPCLRELOAS',
    CAPCLRELBOXOAS: 'CAPCLRELBOXOAS',
    CAPCLCHILDOAS: 'CAPCLCHILDOAS',
    CAPCLCHILDBOXOAS: 'CAPCLCHILDBOXOAS',
    WCENOAS: 'WCENOAS',
    WCEN3OAS: 'WCEN3OAS',
    RHELIGHTOAS: 'RHELIGHTOAS',
    RHEBASEOAS: 'RHEBASEOAS',
    RHEOPTIMAOAS: 'RHEOPTIMAOAS',
    GENCHKSPORT: 'GENCHKSPORT',
    GENCHKTALENTS: 'GENCHKTALENTS',
    GENCHKHEALTH: 'GENCHKHEALTH',
    PROGENTICSBFKO: 'PROGENTICSBFKO',
    PROHEALTHBFKO: 'PROHEALTHBFKO',
    PROZOZHBFKO: 'PROZOZHBFKO',
    EBMPFBFKO: 'EBMPFBFKO',
    EBMPYBFKO: 'EBMPYBFKO',
    IDGV1BFKO: 'IDGV1BFKO',
    IDGV2BFKO: 'IDGV2BFKO',
    IDGV3BFKO: 'IDGV3BFKO',
    IDGV5BFKO: 'IDGV5BFKO',
    IDGV2PPBFKO: 'IDGV2PPBFKO',
    IDGV3PPBFKO: 'IDGV3PPBFKO',
    IDGV5PPBFKO: 'IDGV5PPBFKO',
    IDGV1ROSBANK: 'IDGV1ROSBANK',
    IDGV2ROSBANK: 'IDGV2ROSBANK',
    IDGV3ROSBANK: 'IDGV3ROSBANK',
    IDGV5ROSBANK: 'IDGV5ROSBANK',
    IDGV2PPROSBANK: 'IDGV2PPROSBANK',
    IDGV3PPROSBANK: 'IDGV3PPROSBANK',
    IDGV5PPROSBANK: 'IDGV5PPROSBANK',
    IDGV2PP: 'IDGV2PP',
    IDGV3PP: 'IDGV3PP',
    EBMG: 'EBMG',
    EBMGP: 'EBMGP',
    EBMOAS2: 'EBMOAS2',
    EBMOPTIMAOAS2: 'EBMOPTIMAOAS2',
    IDGV2SOVKOM: 'IDGV2SOVKOM',
    IDGV3SOVKOM: 'IDGV3SOVKOM',
    IDGV5SOVKOM: 'IDGV5SOVKOM',
    IDGV3PPSOVKOM: 'IDGV3PPSOVKOM',
    IDGV5PPSOVKOM: 'IDGV5PPSOVKOM',
    CMS2: 'CMS2',
    CCP4: 'CCP4',
    CMP5: 'CMP5',
    IBA3SMP: 'IBA3SMP',
    IBA5SMP: 'IBA5SMP',
    EBMGSMP: 'EBMGSMP',
    ERC2SMP: 'ERC2SMP',
    EBMGMINBANK: 'EBMGMINBANK',
    NOTEV2BFKO: 'NOTEV2BFKO',
    NOTEV3BFKO: 'NOTEV3BFKO',
    NOTEV1BFKO: 'NOTEV1BFKO',
    NOTE2BFKO: 'NOTE2BFKO',
    NOTE3BFKO: 'NOTE3BFKO',
    IBA3REINVEST: 'IBA3REINVEST',
    IBA5REINVEST: 'IBA5REINVEST',
    IDG1REINVEST: 'IDG1REINVEST',
    IDG3REINVEST: 'IDG3REINVEST',
    IDG5REINVEST: 'IDG5REINVEST',
    EBMGREINVEST: 'EBMGREINVEST',
    IDG1LIFEINVEST: 'IDG1LIFEINVEST',
    IDG3LIFEINVEST: 'IDG3LIFEINVEST',
    IDG5LIFEINVEST: 'IDG5LIFEINVEST',
    EBMGLIFEINVEST: 'EBMGLIFEINVEST',
    NOTE1BFKO: 'NOTE1BFKO',
    NOTE1BFKO3: 'NOTE1BFKO3',
    NOTE1BFKO4: 'NOTE1BFKO4',
    MOPROZVBFKO: 'MOPROZVBFKO',
    MOPROCHEKVBFKO: 'MOPROCHEKVBFKO',
    EBMGZENIT: 'EBMGZENIT',
    IDG5ZENIT: 'IDG5ZENIT',
    IDG3ZENIT: 'IDG3ZENIT',
    IBI3BFKO17: 'IBI3BFKO17',
    IBI5BFKO17: 'IBI5BFKO17',
    IBI3ZENIT17: 'IBI3ZENIT17',
    IBI5ZENIT17: 'IBI5ZENIT17',
    IDGV1VTB: 'IDGV1VTB',
    IDGVN1VTB: 'IDGVN1VTB',
    IDGP1VTB: 'IDGP1VTB',
    IDGV2VTB: 'IDGV2VTB',
    IDGVN2VTB: 'IDGVN2VTB',
    IDGV3VTB: 'IDGV3VTB',
    IDGVN3VTB: 'IDGVN3VTB',
    IDGV4VTB: 'IDGV4VTB',
    IDGVN4VTB: 'IDGVN4VTB',
    IDGV5VTB: 'IDGV5VTB',
    IDGVN5VTB: 'IDGVN5VTB',
    IDGV2PPVTB: 'IDGV2PPVTB',
    IDGVN2PPVTB: 'IDGVN2PPVTB',
    IDGV3PPVTB: 'IDGV3PPVTB',
    IDGVN3PPVTB: 'IDGVN3PPVTB',
    IDGV4PPVTB: 'IDGV4PPVTB',
    IDGVN4PPVTB: 'IDGVN4PPVTB',
    IDGV5PPVTB: 'IDGV5PPVTB',
    IDGVN5PPVTB: 'IDGVN5PPVTB',
    EBMGVTB: 'EBMGVTB',
    EBMGVVTB: 'EBMGVVTB',
    EBMGVNVTB: 'EBMGVNVTB',
    IDGP2VTB: 'IDGP2VTB',
    IDGP3VTB: 'IDGP3VTB',
    IDGP4VTB: 'IDGP4VTB',
    IDGP5VTB: 'IDGP5VTB',
    IDGP2PPVTB: 'IDGP2PPVTB',
    IDGP3PPVTB: 'IDGP3PPVTB',
    IDGP4PPVTB: 'IDGP4PPVTB',
    IDGP5PPVTB: 'IDGP5PPVTB',
    IDGPN1VTB: 'IDGPN1VTB',
    IDGPN2VTB: 'IDGPN2VTB',
    IDGPN3VTB: 'IDGPN3VTB',
    IDGPN4VTB: 'IDGPN4VTB',
    IDGPN5VTB: 'IDGPN5VTB',
    IDGPN2PPVTB: 'IDGPN2PPVTB',
    IDGPN3PPVTB: 'IDGPN3PPVTB',
    IDGPN4PPVTB: 'IDGPN4PPVTB',
    IDGPN5PPVTB: 'IDGPN5PPVTB',
    TERMVVTB: 'TERMVVTB',
    CRHEBASEOAS: "CRHEBASEOAS",
    CRHELIGHTOAS: "CRHELIGHTOAS",
    CRHEOPTIMAOAS: "CRHEOPTIMAOAS",
    NSIBPOOLS373: "NSIBPOOLS373",
    NSIBPOOLS391: "NSIBPOOLS391",
    NSIBPOOLS311893: "NSIBPOOLS311893",
    NSIBPOOLS458907: "NSIBPOOLS458907",
    NSIBPOOLS746926: "NSIBPOOLS746926",
    NSIBPOOLS882248: "NSIBPOOLS882248",
    NSIBPOOLS67481: "NSIBPOOLS67481",
    NSIBPOOLS236055: "NSIBPOOLS236055",
    NSIBPOOLS200157: "NSIBPOOLS200157",
    NSIBPOOLS800: "NSIBPOOLS800",
    NSIBPOOLS581581: "NSIBPOOLS581581",
    NSIBPOOLS63440: "NSIBPOOLS63440",
    NSIBPOOLS34: "NSIBPOOLS34",
    NSIBPOOLS192559: "NSIBPOOLS192559",
    CorpDMS19633: "CorpDMS19633",
    NSIBCHOP: "NSIBCHOP",
    NSIBKIDS: "NSIBKIDS",
    NSIBVISITORS247457: "NSIBVISITORS247457",
    NSIBADULTS247457: "NSIBADULTS247457",
    NSIBKIDSA247457: "NSIBKIDSA247457",
    NSIBVISITORS677: "NSIBVISITORS677",
    NSIBVISITORS192559: "NSIBVISITORS192559",
    NSIBVISITORS495476: "NSIBVISITORS495476",
    NSIBADULTS677: "NSIBADULTS677",
    NSIBADULTS192559: "NSIBADULTS192559",
    NSIBADULTS495476: "NSIBADULTS495476",
    NSIBKIDSA677: "NSIBKIDSA677",
    NSIBKIDSA192559: "NSIBKIDSA192559",
    NSIBKIDSA495476: "NSIBKIDSA495476",
    MIXED247457: "MIXED247457",
    MIXED192559: "MIXED192559",
    ECATFPVTB: "ECATFPVTB",
    ECATFVVTB: "ECATFVVTB",
    ECATFZENIT: "ECATFZENIT",
    EBMGRETVTB: "EBMGRETVTB",
    ECOFPVTB: "ECOFPVTB",
    ECOFVVTB: "ECOFVVTB",
    EBMMGREINVEST: 'EBMMGREINVEST',
    EBMGPB: 'EBMGPB',
    IDGP2PB: 'IDGP2PB',
    IDGP3PB: 'IDGP3PB',
    IDGP5PB: 'IDGP5PB',
    IDGV2OAS: 'IDGV2OAS',
    IDGV3OAS: 'IDGV3OAS',
    IDGV5OAS: 'IDGV5OAS',
    IDGV2PPOAS: 'IDGV2PPOAS',
    IDGV3PPOAS: 'IDGV3PPOAS',
    IDGV5PPOAS: 'IDGV5PPOAS',
    IDGN3: 'IDGN3',
    IDGN5: 'IDGN5',
    EBMGN: 'EBMGN',
    EBMGNRETVTB: 'EBMGNRETVTB',
    EBMGNVTB: 'EBMGNVTB',
    EBMGNT: 'EBMGNT',
    IDG3NT: 'IDG3NT',
    IDG5NT: 'IDG5NT',
    IDG2UBRR: 'IDG2UBRR',
    IDG3UBRR: 'IDG3UBRR',
    IDG5UBRR: 'IDG5UBRR',
    EBMGUBRR: 'EBMGUBRR',
    ECATFUBRR: 'ECATFUBRR',
    PREEQUITYVTB: 'PREEQUITYVTB',
    ACCIDPC: 'ACCIDPC',
    ACCIDPC2: 'ACCIDPC2',
    ECOF2ZENIT: 'ECOF2ZENIT',
    EBM3GUBRR: 'EBM3GUBRR',
    IDG2RETVTB: 'IDG2RETVTB',
    IDG3RETVTB: 'IDG3RETVTB',
    IDG5RETVTB: 'IDG5RETVTB',
    IDGN2RETVTB: 'IDGN2RETVTB',
    IDGN3RETVTB: 'IDGN3RETVTB',
    IDGN5RETVTB: 'IDGN5RETVTB',
    PREEQUITYPVTB: 'PREEQUITYPVTB',
    IOCVVTB: 'IOCVVTB',
    IOCPVTB: 'IOCPVTB',
    IDG1EKSPO: 'IDG1EKSPO',
    PREEQUITYOAS: 'PREEQUITYOAS',
};

const riskCode = {
    DLP42204: 'DLP42204',
    DLPDPE36404: 'DLPDPE36404',
    DLPSS36404: 'DLPSS36404'
};

const triggersInsuredSum = {
    DLP42204: {
        TERMVVTB: {
            finDocuments: {
                withPackage: 13500000,
                withoutPackage: 40000001
            }
        }
    },
    DLPDPE36404: {
        ECATFPVTB: {
            medCheck: {
                withoutPackage: 15000001
            },
            finDocuments: {
                withoutPackage: 40000001
            }
        },
        ECATFUBRR: {
            medCheck: {
                withoutPackage: 10500001
            },
            finDocuments: {
                withoutPackage: 15000001
            }
        }
    },
    DLPSS36404: {
        ECOFPVTB: {
            medCheck: {
                withoutPackage: 15000001
            },
            finDocuments: {
                withPackage: 13500000,
                withoutPackage: 40000001
            }
        }
    }
};

const productsCOF = ['ECOFPVTB', 'ECOFVVTB', 'ECOF2ZENIT'];

const productsWorthyCentury = ['WCEN3OAS', 'WCENOAS'];

const productDescription = {
    [product.NOTE2BFKO]: "НОТА СЖ 2 года",
    [product.NOTE3BFKO]: "НОТА СЖ 3 года",
    [product.NOTEV2BFKO]: "НОТА СЖ 2 года",
    [product.NOTEV3BFKO]: "НОТА СЖ 3 года",
    [product.NOTEV1BFKO]: "НОТА СЖ 1 год",
    [product.NOTE1BFKO]: "НОТА СЖ 1 год",
    [product.NOTE1BFKO3]: "НОТА СЖ 1 год",
    [product.NOTE1BFKO4]: "НОТА СЖ 1 год",
    [product.ERC]: "Надежный выбор",
    [product.ERCP]: "Надежный выбор Премиум",
    [product.EHVP]: "Вектор здоровья Премиум",
    [product.IDC3]: "Драйвер. Классика (3 года)",
    [product.IDC5]: "Драйвер. Классика (5 лет)",
    [product.IDC]: "Драйвер. Купонный",
    [product.IDCP3]: "Драйвер. Классика Премиум (3 года)",
    [product.IDCP5]: "Драйвер. Классика Премиум (5 лет)",
    [product.IDCP]: "Драйвер. Купонный Премиум",
    [product.ISO]: "Страйк Оптимум",
    [product.ISP]: "Страйк Премиум",
    [product.IDFP]: "Драйвер. Фиксированный Премиум",
    [product.CCP]: "Защита кредита",
    [product.CMS]: "Моя стабильность",
    [product.CDMS]: "ДМС",
    [product.ERC2]: "Надежный выбор 2.0",
    [product.ERCP2]: "Надежный выбор Премиум 2.0",
    [product.EHVP2]: "Вектор здоровья Премиум 2.0",
    [product.IBG3BFKO]: "Базис Гарант (3 года)",
    [product.IBG5BFKO]: "Базис Гарант (5 лет)",
    [product.IBG3BFKO2]: "Базис Гарант 2.0 (3 года)",
    [product.IBG5BFKO2]: "Базис Гарант 2.0 (5 лет)",
    [product.IBI3BFKO]: "Базис Инвест (3 года)",
    [product.IBI5BFKO]: "Базис Инвест (5 лет)",
    [product.EFRBFKO]: "Финансовый резерв",
    [product.CCP2]: "Защита кредита 2",
    [product.CMP]: "Моя защита",
    [product.IBG3]: "Базис Гарант (3 года)",
    [product.IBG5]: "Базис Гарант (5 лет)",
    [product.IBG7]: "Базис Гарант (7 лет)",
    [product.IBG10]: "Базис Гарант (10 лет)",
    [product.IBGP3]: "Базис Гарант (3 года)",
    [product.IBGP5]: "Базис Гарант (5 лет)",
    [product.IBGP7]: "Базис Гарант (7 лет)",
    [product.IBGP10]: "Базис Гарант (10 лет)",
    [product.IBI3]: "Базис Инвест (3 года)",
    [product.IBI5]: "Базис Инвест (5 лет)",
    [product.IBI10]: "Базис Инвест (10 лет)",
    [product.IBIP3]: "Базис Инвест Премиум (3 года)",
    [product.IBIP5]: "Базис Инвест Премиум (5 лет)",
    [product.IBIP10]: "Базис Инвест Премиум (10 лет)",
    [product.DEMOACC]: "Демо НСЖ",
    [product.DEMOINV]: "Демо ИСЖ",
    [product.IBI3AKCEPT]: "Базис Инвест (3 года)",
    [product.IBI5AKCEPT]: "Базис Инвест (5 лет)",
    [product.IBG1AKCEPT]: "Базис Гарант (1 год)",
    [product.EPGPAKBARS]: "Премиум Гарант Плюс",
    [product.EBMBFKO]: "Стань миллионером",
    [product.IBI2ZENIT]: "Базис Инвест (2 года)",
    [product.IBI3ZENIT]: "Базис Инвест (3 года)",
    [product.IBI5ZENIT]: "Базис Инвест (5 лет)",
    [product.IDG1ZENIT]: "Драйвер гарантия (1 год)",
    [product.EPCLZENIT]: "Премиум выбор Лайт",
    [product.EBMZENIT]: "Стань миллионером",
    [product.IDG3]: "Драйвер Гарантия (3 года)",
    [product.IDG5]: "Драйвер Гарантия (5 лет)",
    [product.IDG7]: "Драйвер Гарантия (7 лет)",
    [product.IDG10]: "Драйвер Гарантия (10 лет)",
    [product.IDGP3]: "Драйвер Гарантия (3 года)",
    [product.IDGP5]: "Драйвер Гарантия (5 лет)",
    [product.IDGP7]: "Драйвер Гарантия (7 лет)",
    [product.IDGP10]: "Драйвер Гарантия (10 лет)",
    [product.EPGPZENIT]: "Премиум Гарант Плюс",
    [product.IDGV2]: "Драйвер Гарантия (2 года)",
    [product.IDGV3]: "Драйвер Гарантия (3 года)",
    [product.CACB]: "Гарант защиты",
    [product.IBA3]: "Базис Актив (3 года)",
    [product.IBA5]: "Базис Актив (5 лет)",
    [product.IBA3BFKO]: "Базис Актив (3 года)",
    [product.IBA5BFKO]: "Базис Актив (5 лет)",
    [product.IBAV3VTB]: "Базис Актив Ультра (3 года)",
    [product.IBAKVV5VTB]: "Ключевой выбор Ультра (5 лет)",
    [product.IBAKVV5PEVTB]: "Ключевой выбор Ультра (5 лет) с выплатой дохода в конце",
    [product.IBAV5VTB]: "Базис Актив Ультра (5 лет)",
    [product.IBAP3VTB]: "Базис Актив (3 года)",
    [product.IBAKVP5VTB]: "Ключевой выбор (5 лет)",
    [product.IBAKVP5PEVTB]: "Ключевой выбор (5 лет) с выплатой дохода в конце",
    [product.IBAP5VTB]: "Базис Актив (5 лет)",
    [product.IBA2P3]: "Базис Актив Премиум 2.0",
    [product.IBA2V3VTB]: "Базис Актив 2.0 Ультра (3 года)",
    [product.IBA2V5VTB]: "Базис Актив Ультра 2.0 (5 лет)",
    [product.IBA2P3VTB]: "Базис Актив 2.0 (3 года)",
    [product.IBA2P5VTB]: "Базис Актив 2.0 (5 лет)",
    [product.IBAP3]: "Базис Актив Премиум (3 года)",
    [product.IBAP5]: "Базис Актив Премиум (5 лет)",
    [product.EBMAKCEPT]: "Стань миллионером",
    [product.IBI3OAS]: "Базис Инвест (3 года)",
    [product.IBI5OAS]: "Базис Инвест (5 лет)",
    [product.IBG3OAS]: "Базис Гарант (3 года)",
    [product.IBG5OAS]: "Базис Гарант (5 лет)",
    [product.EBMOAS]: "Стань миллионером",
    [product.IDG2ZENIT]: "Драйвер Гарантия (2 года)",
    [product.IDG3ZENIT]: "Драйвер Гарантия (3 года)",
    [product.EBMAKBARS]: "Стратегия на пять",
    [product.EBMIBFKO]: "Стратегия на пять. Инвест",
    [product.EBMGBFKO]: "Стратегия на пять. Гарант",
    [product.CCP3]: "Защита кредита 3",
    [product.CMC]: "Моя уверенность",
    [product.CMP3]: "Моя защита 3",
    [product.CMP4]: "Моя защита 4",
    [product.CAPCLRELOAS]: "Надежный капитал. Классика 2.0 (Классика)",
    [product.CAPCLRELBOXOAS]: "Надежный капитал. Классика 2.0 (Коробка)",
    [product.CAPCLCHILDOAS]: "Детский капитал. Классика 2.0 (Классика)",
    [product.CAPCLCHILDBOXOAS]: "Детский капитал. Классика 2.0 (Коробка)",
    [product.WCENOAS]: "Достойный век 2.0",
    [product.WCEN3OAS]: "Достойный век 3.0",
    [product.RHELIGHTOAS]: "Восстанови здоровье Лайт",
    [product.RHEBASEOAS]: "Восстанови здоровье вариант Базовый",
    [product.RHEOPTIMAOAS]: "Восстанови здоровье вариант Оптима",
    [product.GENCHKSPORT]: "Генетический чек-ап «Питание и спорт»",
    [product.GENCHKTALENTS]: "Генетический чек-ап «Таланты и способности»",
    [product.GENCHKHEALTH]: "Генетический чек-ап «Мое здоровье»",
    [product.PROGENTICSBFKO]: "ПРО Генетику",
    [product.PROHEALTHBFKO]: "ПРО Здоровье",
    [product.PROZOZHBFKO]: "ПРО ЗОЖ",
    [product.IDGV1BFKO]: "Драйвер гарантия (1 год)",
    [product.IDGV2BFKO]: "Драйвер гарантия (2 года)",
    [product.IDGV3BFKO]: "Драйвер гарантия (3 года)",
    [product.IDGV5BFKO]: "Драйвер гарантия (5 лет)",
    [product.IDGV3PPBFKO]: "Драйвер гарантия (2 года) с периодической выплатой",
    [product.IDGV3PPBFKO]: "Драйвер гарантия (3 года) с периодической выплатой",
    [product.IDGV5PPBFKO]: "Драйвер гарантия (5 лет) с периодичечской выплатой",
    [product.IDGV1ROSBANK]: "Драйвер гарантия Оптима (1 год)",
    [product.IDGV2ROSBANK]: "Драйвер гарантия Оптима (2 года)",
    [product.IDGV3ROSBANK]: "Драйвер гарантия Оптима (3 года)",
    [product.IDGV5ROSBANK]: "Драйвер гарантия Оптима (5 лет)",
    [product.IDGV2PPROSBANK]: "Драйвер гарантия Оптима (2 года) с периодической выплатой",
    [product.IDGV3PPROSBANK]: "Драйвер гарантия Оптима (3 года) с периодической выплатой",
    [product.IDGV5PPROSBANK]: "Драйвер гарантия Оптима (5 лет) с периодичечской выплатой",
    [product.IDGV2SOVKOM]: "Драйвер гарантия (2 года)",
    [product.IDGV3SOVKOM]: "Драйвер гарантия (3 года)",
    [product.IDGV5SOVKOM]: "Драйвер гарантия (5 лет)",
    [product.IDGV3PPSOVKOM]: "Драйвер гарантия (3 года) с периодической выплатой",
    [product.IDGV5PPSOVKOM]: "Драйвер гарантия (5 лет) с периодичечской выплатой",
    [product.CMS2]: "Моя стабильность 2",
    [product.CCP4]: "Защита кредита 4",
    [product.CMP5]: "Моя защита 5",
    [product.ERC2SMP]: "Надежный выбор 2.0",
    [product.IBA3SMP]: "Базис Актив (3 года)",
    [product.IBA5SMP]: "Базис Актив (5 лет)",
    [product.EBMGSMP]: "Стратегия на пять. Гарант",
    [product.IBA3REINVEST]: "Базис Актив (3 года) реинвест",
    [product.IBA5REINVEST]: "Базис Актив (5 лет) реинвест",
    [product.EBMGREINVEST]: "Стратегия на пять. Гарант реинвест",
    [product.EBMGLIFEINVEST]: "Стратегия на пять. Гарант",
    [product.IDG1REINVEST]: "Драйвер гарантия (1 год) реинвест",
    [product.IDG3REINVEST]: "Драйвер гарантия (3 года) реинвест",
    [product.IDG5REINVEST]: "Драйвер гарантия (5 лет) ренивест",
    [product.IDG1LIFEINVEST]: "Драйвер гарантия (1 год) реинвест",
    [product.IDG3LIFEINVEST]: "Драйвер гарантия (3 года) реинвест",
    [product.IDG5LIFEINVEST]: "Драйвер гарантия (5 лет) ренивест",
    [product.MOPROZVBFKO]: "Медицинские обследования вариант PRO ЗДОРОВЬЕ",
    [product.MOPROCHEKVBFKO]: "Медицинские обследования вариант вариант PRO ЧЕК-АП",
    [product.EBMGZENIT]: "Стратегия на пять. Гарант",
    [product.EBMOPTIMAOAS2]: "Стань миллионером. Оптима",
    [product.IDG5ZENIT]: "Драйвер гарантия (5 лет)",
    [product.IBI3BFKO17]: "Базис Инвест (3 года)",
    [product.IBI5BFKO17]: "Базис Инвест (5 лет)",
    [product.IBI3ZENIT17]: "Базис Инвест (3 года)",
    [product.IBI5ZENIT17]: "Базис Инвест (5 лет)",
    [product.IDGV1VTB]: "Драйвер Гарантия Ультра (1 год)",
    [product.IDGVN1VTB]: "Драйвер Гарантия Ультра (1 год)",
    [product.IDGP1VTB]: "Драйвер Гарантия (1 год)",
    [product.IDGV2VTB]: "Драйвер Гарантия Ультра (2 года)",
    [product.IDGVN2VTB]: "Драйвер Гарантия Ультра (2 года)",
    [product.IDGV3VTB]: "Драйвер Гарантия Ультра (3 года)",
    [product.IDGVN3VTB]: "Драйвер Гарантия Ультра (3 года)",
    [product.IDGV4VTB]: "Драйвер Гарантия Ультра (4 года)",
    [product.IDGVN4VTB]: "Драйвер Гарантия Ультра (4 года)",
    [product.IDGV5VTB]: "Драйвер Гарантия Ультра (5 лет)",
    [product.IDGVN5VTB]: "Драйвер Гарантия Ультра (5 лет)",
    [product.IDGV2PPVTB]: "Драйвер Гарантия Ультра (2 года) с периодической выплатой дохода",
    [product.IDGVN2PPVTB]: "Драйвер Гарантия Ультра (2 года) с периодической выплатой дохода",
    [product.IDGV3PPVTB]: "Драйвер Гарантия Ультра (3 года) с периодической выплатой дохода",
    [product.IDGVN3PPVTB]: "Драйвер Гарантия Ультра (3 года) с периодической выплатой дохода",
    [product.IDGV4PPVTB]: "Драйвер Гарантия Ультра (4 года) с периодической выплатой дохода",
    [product.IDGVN4PPVTB]: "Драйвер Гарантия Ультра (4 года) с периодической выплатой дохода",
    [product.IDGV5PPVTB]: "Драйвер Гарантия Ультра (5 лет) с периодической выплатой дохода",
    [product.IDGVN5PPVTB]: "Драйвер Гарантия Ультра (5 лет) с периодической выплатой дохода",
    [product.EBMGVTB]: "Стратегия на пять. Гарант",
    [product.EBMGVVTB]: "Стратегия на пять. Гарант Ультра",
    [product.EBMGVNVTB]: "Стратегия на пять. Гарант Ультра",
    [product.IDGP2VTB]: "Драйвер Гарантия (2 года)",
    [product.IDGP3VTB]: "Драйвер Гарантия (3 года)",
    [product.IDGP4VTB]: "Драйвер Гарантия (4 года)",
    [product.IDGP5VTB]: "Драйвер Гарантия (5 лет)",
    [product.IDGP2PPVTB]: "Драйвер Гарантия (2 года) с периодической выплатой дохода",
    [product.IDGP3PPVTB]: "Драйвер Гарантия (3 года) с периодической выплатой дохода",
    [product.IDGP4PPVTB]: "Драйвер Гарантия (4 года) с периодической выплатой дохода",
    [product.IDGP5PPVTB]: "Драйвер Гарантия (5 лет) с периодической выплатой дохода",
    [product.IDGPN1VTB]: "Драйвер Гарантия (1 год)",
    [product.IDGPN2VTB]: "Драйвер Гарантия (2 года)",
    [product.IDGPN3VTB]: "Драйвер Гарантия (3 года)",
    [product.IDGPN4VTB]: "Драйвер Гарантия (4 года)",
    [product.IDGPN5VTB]: "Драйвер Гарантия (5 лет)",
    [product.IDGPN2PPVTB]: "Драйвер Гарантия (2 года) с периодической выплатой дохода",
    [product.IDGPN3PPVTB]: "Драйвер Гарантия (3 года) с периодической выплатой дохода",
    [product.IDGPN4PPVTB]: "Драйвер Гарантия (4 года) с периодической выплатой дохода",
    [product.IDGPN5PPVTB]: "Драйвер Гарантия (5 лет) с периодической выплатой дохода",
    [product.CRHEBASEOAS]: "Восстанови здоровье вариант Базовый",
    [product.CRHELIGHTOAS]: "Восстанови здоровье Лайт",
    [product.CRHEOPTIMAOAS]: "Восстанови здоровье вариант Оптима",
    [product.NSIBPOOLS373]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS391]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS311893]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS458907]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS746926]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS882248]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS67481]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS236055]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS200157]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS800]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS581581]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS63440]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS34]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.NSIBPOOLS192559]: "Коллективное страхование физических лиц от НСиБ (пулы)",
    [product.CorpDMS19633]: "Коллективный ДМС",
    [product.NSIBCHOP]: "Коллективное страхование сотрудников ЧОП от НСиБ",
    [product.NSIBKIDS]: "Коллективное страхование детей от НСиБ без андеррайтинга",
    [product.NSIBVISITORS247457]: "Коллективное страхование физических лиц от НСиБ (Посетители)",
    [product.NSIBADULTS247457]: "Коллективное страхование физических лиц от НСиБ (Взрослые)",
    [product.NSIBKIDSA247457]: "Коллективное страхование физических лиц от НСиБ (Дети)",
    [product.NSIBVISITORS677]: "Коллективное страхование физических лиц от НСиБ (Посетители)",
    [product.NSIBVISITORS192559]: "Коллективное страхование физических лиц от НСиБ (Посетители)",
    [product.NSIBVISITORS495476]: "Коллективное страхование физических лиц от НСиБ (Посетители)",
    [product.NSIBADULTS677]: "Коллективное страхование физических лиц от НСиБ (Взрослые)",
    [product.NSIBADULTS192559]: "Коллективное страхование физических лиц от НСиБ (Взрослые)",
    [product.NSIBADULTS495476]: "Коллективное страхование физических лиц от НСиБ (Взрослые)",
    [product.NSIBKIDSA677]: "Коллективное страхование физических лиц от НСиБ (Дети)",
    [product.NSIBKIDSA192559]: "Коллективное страхование физических лиц от НСиБ (Дети)",
    [product.NSIBKIDSA495476]: "Коллективное страхование физических лиц от НСиБ (Дети)",
    [product.MIXED247457]: "НСЖ. Смешанное страхование жизни",
    [product.MIXED192559]: "НСЖ. Смешанное страхование жизни",
    [product.ECATFPVTB]: "Забота о будущем",
    [product.ECATFVVTB]: "Забота о будущем Ультра",
    [product.ECATFZENIT]: "Забота о будущем",
    [product.EBMGRETVTB]: "Стратегия на пять. Гарант",
    [product.ECOFPVTB]: "Забота о семье",
    [product.ECOFVVTB]: "Забота о семье Ультра",
    [product.EBMMGREINVEST]: "Стратегия на пять. Мой Гарант",
    [product.EBMGPB]: "Стратегия на пять. Гарант",
    [product.IDGP2PB]: "Драйвер Гарантия (2 года)",
    [product.IDGP3PB]: "Драйвер Гарантия (3 года)",
    [product.IDGP5PB]: "Драйвер Гарантия (5 лет)",
    [product.IDGV2OAS]: "Драйвер Гарантия (2 года)",
    [product.IDGV3OAS]: "Драйвер Гарантия (3 года)",
    [product.IDGV5OAS]: "Драйвер Гарантия (5 лет)",
    [product.IDGV2PPOAS]: "Драйвер Гарантия (2 года) с периодической выплатой дохода",
    [product.IDGV3PPOAS]: "Драйвер Гарантия (3 года) с периодической выплатой дохода",
    [product.IDGV5PPOAS]: "Драйвер Гарантия (5 лет) с периодической выплатой дохода",
    [product.EBMGN]: "Стратегия на пять. Гарант",
    [product.IDGN3]: "Драйвер Гарантия (3 года)",
    [product.IDGN5]: "Драйвер Гарантия (5 лет)",
    [product.EBMGNRETVTB]: "Стратегия на пять. Гарант",
    [product.EBMGNVTB]: "Стратегия на пять. Гарант",
    [product.EBMGNT]: "Стратегия на пять. Гарант",
    [product.IDG3NT]: "Драйвер Гарантия (3 года)",
    [product.IDG5NT]: "Драйвер Гарантия (5 лет)",
    [product.IDG2UBRR]: "2 года Драйвер Гарантия",
    [product.IDG3UBRR]: "3 года Драйвер Гарантия",
    [product.IDG5UBRR]: "5 лет Драйвер Гарантия",
    [product.EBMGUBRR]: "Стратегия на пять. Гарант",
    [product.ECATFUBRR]: "Забота о будущем",
    [product.PREEQUITYVTB]: "Персональный фонд Ультра",
    [product.ACCIDPC]: "Защита чемпионов",
    [product.ACCIDPC2]: "Защита чемпионов 2.0",
    [product.ECOF2ZENIT]: "Забота о семье 2.0",
    [product.EBM3GUBRR]: "3 года Стратегия на пять. Гарант",
    [product.IDG2RETVTB]: "Драйвер Гарантия  (2 года)",
    [product.IDG3RETVTB]: "Драйвер Гарантия  (3 года)",
    [product.IDG5RETVTB]: "Драйвер Гарантия  (5 лет)",
    [product.IDGN2RETVTB]: "Драйвер Гарантия  (2 года)",
    [product.IDGN3RETVTB]: "Драйвер Гарантия  (3 года)",
    [product.IDGN5RETVTB]: "Драйвер Гарантия  (5 лет)",
    [product.PREEQUITYPVTB]: "Персональный фонд",
    [product.IOCVVTB]: 'Оптимальный выбор Ультра',
    [product.IOCPVTB]: 'Оптимальный выбор',
    [product.IDG1EKSPO]: "Драйвер Гарантия (1 год)",
    [product.PREEQUITYOAS]: "Персональный фонд Ультра",
};

const productGroupArray = {
    STRATEGY_FOR_FIVE_VTB: [
        product.EBMGVTB,
        product.EBMGVVTB,
        product.EBMGNVTB
    ],
    CREDIT_IR_IN_SEARCH: [
        product.CCP, product.CMS, product.CMS2, product.CCP2, product.CMP,
        product.CACB, product.CCP3, product.CCP4, product.CMP3, product.CMP4,
        product.CMP5, product.CMC],
    BASIS_ACTIVE_CHOSE_VTB: [
        product.IBAKVV5VTB,
        product.IBAKVP5VTB
    ],
    BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END: [
        product.IBAKVP5PEVTB,
        product.IBAKVV5PEVTB
    ],
    SHOW_INV_APP_QUOTE: [
        product.NOTE1BFKO, product.IDGV1BFKO, product.IDGV1ROSBANK,
        product.IDGV1VTB, product.IDGP1VTB, product.IDGVN1VTB, product.IDGV2VTB, product.IDGVN2VTB, product.IDGV3VTB, product.IDGVN3VTB, product.IDGV4VTB, product.IDGV5VTB, product.IDGVN5VTB,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB, product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IDGP2PB, product.IDGP3PB, product.IDGP5PB,
        product.IDG3REINVEST, product.IDG5REINVEST,
        product.IDG1EKSPO
    ],
    SHOW_INV_APP_POLICY: [
        product.NOTE1BFKO, product.NOTE3BFKO, product.NOTE1BFKO3, product.NOTE1BFKO4,
        product.IDGV1VTB, product.IDGP1VTB, product.IDGVN1VTB, product.IDGV2VTB, product.IDGVN2VTB, product.IDGV3VTB, product.IDGVN3VTB, product.IDGV4VTB, product.IDGV5VTB, product.IDGVN5VTB,
        product.IDGVN2VTB, product.IDGVN1VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB, product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB, product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IDGP2PB, product.IDGP3PB, product.IDGP5PB,
        product.IDGV5OAS, product.IDGV5PPOAS, product.IDGV2OAS, product.IDGV3OAS, product.IDGV2PPOAS, product.IDGV3PPOAS,
        product.IDG1EKSPO
    ],
    RATE_OF_RETURN: [
        product.IDGV2VTB, product.IDGV1VTB, product.IDGV3VTB, product.IDGV5VTB,
        product.IDGVN2VTB, product.IDGVN1VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV5PPVTB,
        product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGV4VTB, product.IDGV4PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB,
        product.EBMGREINVEST, product.IDG1REINVEST, product.IDG3REINVEST, product.IDG5REINVEST,
        product.IBAV3VTB, product.IBAV5VTB,
    ],
    RATE_OF_RETURN_PREMIUM_LIMIT: [
        product.IDGP2VTB, product.IDGP1VTB, product.IDGP3VTB, product.IDGP5VTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP5PPVTB,
        product.IDGP4VTB, product.IDGP4PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
    ],
    RATE_OF_RETURN_BASIS_ACTIVE: [
        product.IBAV3VTB, product.IBAV5VTB
    ],
    IDG_VTB_ULTRA: [
        product.IDGV1VTB, product.IDGP1VTB, product.IDGV2VTB, product.IDGV3VTB, product.IDGV4VTB, product.IDGV5VTB,
        product.IDGVN1VTB, product.IDGVN2VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB, product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IDGV2SOVKOM, product.IDGV3SOVKOM, product.IDGV5SOVKOM,
        product.IDGV3PPSOVKOM, product.IDGV5PPSOVKOM,
        product.IDGV5OAS, product.IDGV5PPOAS, product.IDGV3OAS, product.IDGV3PPOAS, product.IDGV2OAS, product.IDGV2PPOAS
    ],
    IDG_VTB_PP: [
        product.IDGV2PPVTB, product.IDGV3PPVTB,
        product.IDGVN2PPVTB, product.IDGVN3PPVTB,
        product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4PPVTB, product.IDGVN5PPVTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP5PPVTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IDGV3PPSOVKOM, product.IDGV5PPSOVKOM
    ],
    IDG_VTB: [
        product.IDGP2PPVTB, product.IDGP2VTB,
        product.IDGP3PPVTB, product.IDGP3VTB,
        product.IDGP4PPVTB, product.IDGP4VTB,
        product.IDGP5PPVTB, product.IDGP5VTB,
        product.IDGV2PPVTB, product.IDGV2VTB,
        product.IDGVN2PPVTB, product.IDGVN2VTB,
        product.IDGV3PPVTB, product.IDGV3VTB,
        product.IDGVN3PPVTB, product.IDGVN3VTB,
        product.IDGV4PPVTB, product.IDGV4VTB,
        product.IDGVN4PPVTB, product.IDGVN4VTB,
        product.IDGV5PPVTB, product.IDGV5VTB,
        product.IDGVN5PPVTB, product.IDGVN5VTB,
        product.IDGV1VTB, product.IDGP1VTB,
        product.IDGPN1VTB, product.IDGVN1VTB,
        product.IDGPN2PPVTB, product.IDGPN2VTB,
        product.IDGPN3PPVTB, product.IDGPN3VTB,
        product.IDGPN5PPVTB, product.IDGPN5VTB,
        product.IDGPN4PPVTB, product.IDGPN4VTB,
    ],
    FOR_ADD_TRIGGER_DRAFT_TO_ONREVIEW_APPLICATIONATTACHMENT: [
        product.IBAV3VTB, product.IBAV5VTB,
    ],

    SOCIAL_TAX_DEDUCTION: [product.EBMGRETVTB, product.ECOFPVTB, product.ECOFVVTB, product.EBMGNRETVTB, product.EBMGVVTB, product.EBMGVNVTB, product.EBMGVTB, product.EBMGNVTB, product.ECOF2ZENIT],
    NOTE_MANDT_APPR: [product.NOTEV2BFKO, product.NOTE2BFKO, product.NOTE3BFKO, product.NOTE1BFKO, product.NOTE1BFKO3, product.NOTE1BFKO4, product.NOTEV1BFKO],
    SERVICE_RULES: [product.EHVP2, product.ERCP2, product.ERC2SMP, product.ERC2, product.EBMGSMP],
    CREDIT_POLICY: [product.CMS2, product.CCP4, product.CMP5],
    IDG_REINVEST: [product.IDG1REINVEST, product.IDG3REINVEST, product.IDG5REINVEST, product.IDG1LIFEINVEST, product.IDG3LIFEINVEST, product.IDG5LIFEINVEST],
    REINVEST: [product.EBMGLIFEINVEST, product.IBA3REINVEST, product.IBA5REINVEST, product.IDG1REINVEST, product.IDG3REINVEST, product.IDG5REINVEST, product.IDG1LIFEINVEST, product.IDG3LIFEINVEST, product.IDG5LIFEINVEST, product.EBMGREINVEST, product.EBMGLIFEINVEST, product.EBMMGREINVEST],
    RHE: [product.RHELIGHTOAS, product.RHEBASEOAS, product.RHEOPTIMAOAS],
    GENCHK: [product.GENCHKSPORT, product.GENCHKTALENTS, product.GENCHKHEALTH],
    GENCHK_NOT_FROM_ENDOWMENT: [product.GENCHKHEALTH],
    GIFTSERVICES: [product.EFRBFKO, product.EBMIBFKO, product.EBMGBFKO, product.IBI5BFKO, product.IBI3BFKO, product.IBI5BFKO17, product.IBI3BFKO17, product.IBI5ZENIT17, product.IBI3ZENIT17, product.IBA5BFKO, product.IBA3BFKO],
    MEDPRO: [product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO],
    MO_DMS: [product.MOPROZVBFKO, product.MOPROCHEKVBFKO],
    ERC: [product.ERC2, product.ERCP2, product.ERC2SMP, product.EPCLZENIT],
    IBG: [product.IBG3BFKO, product.IBG5BFKO, product.IBG3OAS, product.IBG5OAS],
    IDG: [product.IDGV2BFKO, product.IDGV3BFKO, product.IDGV5BFKO, product.IDGV2PPBFKO, product.IDGV3PPBFKO, product.IDGV5PPBFKO, product.IDG5, product.IDGP3, product.IDGP5, product.IDGV3, product.IDGV2PP, product.IDGV3PP, product.IDGN3, product.IDGN5,],
    EBM: [product.EBMZENIT, product.EBMAKCEPT, product.EBMGBFKO, product.EBMG, product.EBMGSMP, product.EBMGP, product.EBMOAS2, product.EBMGZENIT, product.EBMGN, product.EBMGNT],
    CAPCL: [product.CAPCLRELOAS, product.CAPCLRELBOXOAS, product.CAPCLCHILDOAS, product.CAPCLCHILDBOXOAS],
    CAPCLCHILD: [product.CAPCLCHILDOAS, product.CAPCLCHILDBOXOAS],
    CAPCLREL: [product.CAPCLRELOAS, product.CAPCLRELBOXOAS],
    DMS: [product.GENCHKTALENTS, product.GENCHKSPORT, product.GENCHKHEALTH, product.RHELIGHTOAS, product.RHEBASEOAS, product.RHEOPTIMAOAS, product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO, product.MOPROZVBFKO, product.MOPROCHEKVBFKO],
    RISK_CU10800: [product.GENCHKTALENTS, product.GENCHKSPORT, product.GENCHKHEALTH, product.PROGENTICSBFKO, product.PROHEALTHBFKO],
    KID_VTB: [
        product.IDGV1VTB, product.IDGP1VTB, product.IDGV2VTB, product.IDGV3VTB, product.IDGV4VTB, product.IDGV5VTB,
        product.IDG1EKSPO,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB,
        product.IDGVN1VTB, product.IDGVN2VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.EBMGVTB, product.EBMGVVTB, product.EBMGVNVTB, product.EBMGUBRR, product.EBM3GUBRR,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.ECATFPVTB, product.ECATFVVTB, product.ECATFZENIT, product.ECOFPVTB, product.ECOFVVTB, product.EBMGNVTB, product.ECATFUBRR, product.ECOF2ZENIT
    ],
    KID_NSG: [
        product.EHVP2, product.ERC2,
        product.ERC2SMP, product.ERCP2,
        product.CAPCLRELOAS, product.CAPCLRELBOXOAS,
        product.EPCLZENIT,
        product.EFRBFKO,
        product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT
    ],
    KID_ECAT: [
        product.ECATFPVTB, product.ECATFVVTB, product.ECATFZENIT, product.ECATFUBRR
    ],
    KID_RSG: [product.TERMVVTB],
    KID_RHE_BASE_OPT: [product.RHEBASEOAS, product.RHEOPTIMAOAS],
    KID_WCENOAS: [product.WCENOAS, product.WCEN3OAS],
    KID_RHE_GENCHK_PRO: [product.RHELIGHTOAS, product.GENCHKHEALTH, product.GENCHKSPORT, product.GENCHKTALENTS, product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO],
    KID_BASIS_GARANT: [
        product.IBG10, product.IBG1AKCEPT, product.IBG3, product.IBG3BFKO, product.IBG3OAS,
        product.IBG5, product.IBG5BFKO, product.IBG3BFKO2, product.IBG5BFKO2, product.IBG5OAS, product.IBG7, product.IBGP10, product.IBGP3, product.IBGP5, product.IBGP7
    ],
    KID_DRIVER_MIL_GARANT: [
        product.IDG10, product.IDG1ZENIT, product.IDG2ZENIT, product.IDG3, product.IDG5, product.IDG5ZENIT, product.IDG7, product.IDGP10, product.IDGP3, product.IDGP5, product.IDGP7,
        product.IDGV1BFKO, product.IDGV2, product.IDGV2BFKO, product.IDGV2PP, product.IDGV3, product.IDGV3BFKO, product.IDGV3PP, product.IDGV2PPBFKO, product.IDGV3PPBFKO, product.IDGV5BFKO, product.IDGV5PPBFKO,
        product.IDGV1ROSBANK, product.IDGV2ROSBANK, product.IDGV3ROSBANK, product.IDGV5ROSBANK, product.IDGV3PPROSBANK, product.IDGV5PPROSBANK, product.IDGV2PPROSBANK,
        product.EBMAKCEPT, product.EBMOAS, product.EBMZENIT,
        product.EBMOAS2, product.EBMOPTIMAOAS2,
        product.EBMG, product.EBMGBFKO, product.EBMGMINBANK, product.EBMGP, product.EBMGSMP, product.EBMGZENIT,
        product.EBMGREINVEST, product.EBMGRETVTB, product.EBMGLIFEINVEST, product.EBMMGREINVEST, product.IDG1REINVEST, product.IDG3REINVEST, product.IDG5REINVEST, product.IDG1LIFEINVEST, product.IDG3LIFEINVEST, product.IDG5LIFEINVEST,
        product.IDGV1VTB, product.IDGP1VTB, product.IDGV2VTB, product.IDGV3VTB, product.IDGV4VTB, product.IDGV5VTB,
        product.IDG1EKSPO,
        product.IDGVN4VTB, product.IDGVN4PPVTB,
        product.IDGVN1VTB, product.IDGVN2VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGV2SOVKOM, product.IDGV3SOVKOM, product.IDGV5SOVKOM, product.IDGV3PPSOVKOM, product.IDGV5PPSOVKOM,
        product.EBMGVTB, product.EBMGVVTB, product.EBMGVNVTB, product.EBMGPB, product.EBMGUBRR, product.EBM3GUBRR,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IDGP2PB, product.IDGP3PB, product.IDGP5PB, product.IDGV5OAS, product.IDGV5PPOAS, product.IDGV3OAS, product.IDGV3PPOAS, product.IDGV2OAS, product.IDGV2PPOAS,
        product.IDGN3, product.IDGN5, product.EBMGN,
        product.EBMGNRETVTB, product.EBMGNVTB, product.EBMGNT, product.IDG3NT, product.IDG5NT, product.IDG2UBRR, product.IDG3UBRR, product.IDG5UBRR
    ],
    KID_CAPCLCHILDBOX: [product.CAPCLCHILDBOXOAS],
    KID_CAPCLCHILD: [product.CAPCLCHILDOAS],
    KID_TER_KID_RF: [
        product.RHEBASEOAS, product.RHEOPTIMAOAS, product.RHELIGHTOAS, product.GENCHKHEALTH,
        product.GENCHKSPORT, product.GENCHKTALENTS, product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO
    ],
    KID_PAYMENT_RHE_GENCHK_PRO: [product.RHELIGHTOAS, product.GENCHKHEALTH, product.GENCHKSPORT, product.GENCHKTALENTS, product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO],
    KID_PAYMENT_RHE_BASE_OPT: [product.RHEBASEOAS, product.RHEOPTIMAOAS],
    KID_PAYMENT_ERCP2_CAPCL: [product.ERCP2, product.CAPCLRELOAS, product.CAPCLCHILDBOXOAS, product.CAPCLCHILDOAS],
    KID_PAYMENT_WCENOAS: [product.WCENOAS, product.WCEN3OAS],
    KID_PAYMENT_TERMVVTB: [product.TERMVVTB],
    KID_PAYMENT_EHVP2_EFRBFKO: [product.EHVP2, product.EFRBFKO, product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT],
    KID_CREDIT: [product.CACB],
    KID_RETURN_PREMIUM: [
        product.RHEBASEOAS, product.RHEOPTIMAOAS, product.RHELIGHTOAS, product.GENCHKHEALTH, product.GENCHKSPORT,
        product.GENCHKTALENTS, product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO
    ],
    KID_WII_BASIS_GARANT: [
        product.IBG10, product.IBG1AKCEPT, product.IBG3, product.IBG3BFKO, product.IBG3OAS,
        product.IBG5, product.IBG5BFKO, product.IBG3BFKO2, product.IBG5BFKO2, product.IBG5OAS, product.IBG7, product.IBGP10, product.IBGP3, product.IBGP5, product.IBGP7
    ],
    KID_WII_EBM: [
        product.EBMAKCEPT, product.EBMOAS, product.EBMZENIT, product.EBMOAS2, product.EBMOPTIMAOAS2,
        product.EBMG, product.EBMGBFKO, product.EBMGMINBANK, product.EBMGP, product.EBMGSMP, product.EBMGLIFEINVEST, product.EBMGREINVEST, product.EBMGRETVTB, product.EBMMGREINVEST, product.EBMGLIFEINVEST, product.EBMGZENIT,
        product.EBMGVTB, product.EBMGVVTB, product.EBMGVNVTB, product.EBMGPB, product.EBMGN, product.EBMGNRETVTB, product.EBMGNVTB, product.EBMGNT, product.EBMGUBRR
    ],
    KID_WII_ERC2: [
        product.ERC2, product.ERC2SMP
    ],
    KID_WII_GENCHK_PRO: [product.GENCHKHEALTH, product.GENCHKSPORT, product.GENCHKTALENTS, product.PROGENTICSBFKO, product.PROHEALTHBFKO, product.PROZOZHBFKO],
    KID_WII_DRIVER: [
        product.IDG10, product.IDG3, product.IDG5, product.IDG7, product.IDGP10, product.IDGP3, product.IDGP5, product.IDGP7, product.IDGV1BFKO,
        product.IDGV2, product.IDGV2BFKO, product.IDGV3, product.IDGV3BFKO, product.IDGV5BFKO, product.IDG1ZENIT, product.IDG5ZENIT, product.IDG2ZENIT, product.IDGV2SOVKOM, product.IDGV3SOVKOM, product.IDGV5SOVKOM, product.IBG5BFKO2,
        product.IDG1REINVEST, product.IDG3REINVEST, product.IDG5REINVEST, product.IDG1LIFEINVEST, product.IDG3LIFEINVEST, product.IDG5LIFEINVEST,
        product.IDGV1VTB, product.IDGP1VTB, product.IDGV2VTB, product.IDGV3VTB, product.IDGV4VTB, product.IDGV5VTB,
        product.IDG1EKSPO,
        product.IDGVN4VTB, product.IDGVN1VTB, product.IDGVN2VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IDGV1ROSBANK, product.IDGV2ROSBANK, product.IDGV3ROSBANK, product.IDGV5ROSBANK,
        product.IDGP2PB, product.IDGP3PB, product.IDGP5PB,
        product.IDGV3OAS, product.IDGV5OAS, product.IDGN3, product.IDGN5, product.IDG3NT, product.IDG5NT, product.IDG2UBRR, product.IDG3UBRR, product.IDG5UBRR
    ],
    KID_WII_DRIVER_PERIODIC_PAYMENT: [
        product.IDGV2PP, product.IDGV3PP, product.IDGV2PPBFKO, product.IDGV3PPBFKO, product.IDGV5PPBFKO,
        product.IDGV3PPSOVKOM, product.IDGV5PPSOVKOM,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB, product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGV3PPROSBANK, product.IDGV5PPROSBANK, product.IDGV2PPROSBANK,
        product.IDGV5PPOAS, product.IDGV3PPOAS, product.EBM3GUBRR, product.IDGV2OAS, product.IDGV2PPOAS
    ],
    KID_RETURN_PREMIUM_ACCID: [product.ACCIDPC, product.ACCIDPC2],
    KID_WHAT_IS_NOT_INSURED_ACCID: [product.ACCIDPC, product.ACCIDPC2],
    COLLECTIVE_NSIBPOOLS: [
        product.NSIBPOOLS373,
        product.NSIBPOOLS391,
        product.NSIBPOOLS311893,
        product.NSIBPOOLS458907,
        product.NSIBPOOLS746926,
        product.NSIBPOOLS882248,
        product.NSIBPOOLS67481,
        product.NSIBPOOLS236055,
        product.NSIBPOOLS200157,
        product.NSIBPOOLS800,
        product.NSIBPOOLS581581,
        product.NSIBPOOLS63440,
        product.NSIBPOOLS34,
        product.NSIBPOOLS192559
    ],
    ECATF: [
        product.ECATFPVTB,
        product.ECATFVVTB,
        product.ECATFZENIT,
        product.ECATFUBRR
    ],
    TRIGGER_SKIP_IDGP: [
        product.IDGP1VTB,
        product.IDGP2VTB,
        product.IDGP3VTB,
        product.IDGP5VTB,
        product.IDGP2PPVTB,
        product.IDGP3PPVTB,
        product.IDGP5PPVTB,
        product.IDGP4VTB,
        product.IDGP4PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
    ],
    PRODUCT_FOR_DISABILITY_ANY_REASON: [
        product.CAPCLRELOAS,
        product.CAPCLCHILDOAS,
        product.ECATFPVTB,
        product.ECATFVVTB,
        product.ECATFZENIT,
        product.ECATFUBRR
    ],
    BASIS_ACTIVE_VTB: [
        product.IBAP3VTB,
        product.IBAP5VTB,
        product.IBAV3VTB,
        product.IBAV5VTB,
        product.IBAKVP5VTB,
        product.IBAKVV5VTB,
        product.IBAKVP5PEVTB,
        product.IBAKVV5PEVTB,
        product.IBA2P3,
        product.IDGV5OAS,
        product.IDGV5PPOAS,
        product.IDGV3OAS,
        product.IDGV3PPOAS,
        product.IDGV2OAS,
        product.IDGV2PPOAS,
        product.IBA2P3VTB,
        product.IBA2P5VTB,
        product.IBA2V3VTB,
        product.IBA2V5VTB,
    ],
    APP_DRIVER_GARANT_VTB: [
        product.IDGP2VTB,
        product.IDGP1VTB,
        product.IDGP3VTB,
        product.IDGP4VTB,
        product.IDGP5VTB,
        product.IDGP2PPVTB,
        product.IDGP3PPVTB,
        product.IDGP4PPVTB,
        product.IDGP5PPVTB,
        product.IDGV2VTB,
        product.IDGVN1VTB,
        product.IDGVN2VTB,
        product.IDGVN3VTB,
        product.IDGVN5VTB,
        product.IDGVN2PPVTB,
        product.IDGVN3PPVTB,
        product.IDGVN5PPVTB,
        product.IDGV3VTB,
        product.IDGV4VTB,
        product.IDGV5VTB,
        product.IDGV2PPVTB,
        product.IDGV3PPVTB,
        product.IDGV4PPVTB,
        product.IDGV5PPVTB,
        product.IDGVN4VTB,
        product.IDGVN4PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
    ],
    PRE_EQUITY_VTB: [
        product.PREEQUITYVTB, product.PREEQUITYPVTB, product.PREEQUITYOAS
    ],
    DYNAMIC_APP_VTB: [
        product.IBG3OAS,
        product.IBG5OAS,
        product.IBA2P3,
        product.IDG2ZENIT,
        product.IDGV1VTB, product.IDGV2VTB, product.IDGV3VTB, product.IDGV4VTB, product.IDGV5VTB,
        product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB, product.IDGVN1VTB, product.IDGVN2VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGP1VTB, product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB,
        product.IDG1EKSPO,
        product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB,
        product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB,
        product.IBAP3VTB, product.IBAP5VTB,
        product.IBAV3VTB, product.IBAV5VTB,
        product.IBA2P3VTB, product.IBA2P5VTB,
        product.IBA2V3VTB, product.IBA2V5VTB,
        product.IBAKVP5VTB, product.IBAKVV5VTB,
        product.IBAKVP5PEVTB, product.IBAKVV5PEVTB,
        product.IDGV5OAS, product.IDGV3OAS, product.IDGV2OAS,
        product.IDGV5PPOAS, product.IDGV3PPOAS, product.IDGV2PPOAS,
        product.IDGP2PB, product.IDGP3PB, product.IDGP5PB, product.IDG2UBRR, product.IDG3UBRR, product.IDG5UBRR,
        product.PREEQUITYVTB, product.PREEQUITYPVTB, product.PREEQUITYOAS

    ],
    DYNAMIC_APP_PSB: [
        product.IDG3, product.IDG5, product.IDG7, product.IDG10,
        product.IDGP3, product.IDGP5, product.IDGP7, product.IDGP10,
        product.IDGN3, product.IDGN5,
        product.IDG3NT, product.IDG5NT,
        product.EBMG, product.EBMGP, product.EBMGN, product.EBMGNT,
        product.EHVP, product.EHVP2,
        product.ERC2, product.ERCP2,
    ],
    DYNAMIC_APP_ECATF: [
        product.ECATFPVTB,
        product.ECATFVVTB,
        product.ECATFZENIT,
        product.ECATFUBRR
    ],
    BASIS_ACTIVE: [
        product.IBG3OAS,
        product.IBG5OAS,
        product.IBA2P3,
        product.IBAP3VTB,
        product.IBAP5VTB,
        product.IBAV3VTB,
        product.IBAV5VTB,
        product.IBA3BFKO,
        product.IBA5BFKO,
        product.IBA3REINVEST,
        product.IBA5REINVEST,
        product.IBAKVP5VTB,
        product.IBAKVV5VTB,
        product.IBAKVP5PEVTB,
        product.IBAKVV5PEVTB
    ],
    POLICY_CERT_IS_BA_OR_BI: [
        product.IBI3BFKO, product.IBI5BFKO,
        product.IBI3BFKO17, product.IBI5BFKO17,
        product.IBI3ZENIT17, product.IBI5ZENIT17,
        product.IBA3BFKO, product.IBA5BFKO,
        product.EBMIBFKO
    ],
    POLICY_CERT_IS_HIDE_OTHER_COND: [
        product.EBMOAS2, product.EBMZENIT, product.EBMAKCEPT,
        product.EBMGBFKO, product.EBMG, product.EBMGP,
        product.EFRBFKO,
        product.EHVP2,
        product.EBMPFBFKO, product.EBMPYBFKO,
        product.IBG3BFKO, product.IBG5BFKO,
        product.IBG5BFKO2, product.IBG3OAS, product.IBG5OAS,
        product.IDGV2BFKO, product.IDGV3BFKO, product.IDGV5BFKO,
        product.IDGV2PPBFKO, product.IDGV3PPBFKO, product.IDGV5PPBFKO,
        product.IDG5, product.IDGP3, product.IDGP5, product.IDGV3,
        product.IDGV2PP, product.IDGV3PP,
        product.EBMGZENIT, product.IDGN3, product.IDGN5, product.EBMGN, product.EBMGNT
    ],
    VERIFICATION_SUBJECT: [
        product.IBI3BFKO,
        product.IBI5BFKO,
        product.IBI3BFKO17,
        product.IBI5BFKO17,
        product.IBI3ZENIT17,
        product.IBI5ZENIT17,
        product.EBMPFBFKO,
        product.EBMPYBFKO,
        product.WCENOAS,
        product.WCEN3OAS
    ],
    BASIS_ACTIVE_CREDIT_RATING: [
        product.IBAV3VTB, product.IBAV5VTB,
        product.IBAP3VTB, product.IBAP5VTB,
        product.IBAKVV5VTB, product.IBAKVP5VTB,
        product.IBAKVV5PEVTB, product.IBAKVP5PEVTB,
        product.IBA2P3VTB, product.IBA2P5VTB,
        product.IBA2V3VTB, product.IBA2V5VTB,
        product.IBA2P3,
    ],
    EQUITY_CREDIT_RATING: [
        product.PREEQUITYVTB, product.PREEQUITYPVTB, product.PREEQUITYOAS
    ],
    EPOLICY_SEND_NEW_SMS_EMAIL: [
        product.EBMGRETVTB,
        product.EBMMGREINVEST,
        product.EBMGPB,
        product.EBMGNRETVTB,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.EBMGZENIT
    ],
    PB_SEVENTY_PLUS_IDG: [
        product.IDGP2PB,
        product.IDGP3PB,
        product.IDGP5PB
    ],
    INV_SEVENTY_PLUS_IDG_ULTRA: [
        product.IDGV1VTB,
        product.IDGV2VTB,
        product.IDGV3VTB,
        product.IDGV4VTB,
        product.IDGVN4VTB,
        product.IDGV5VTB,
        product.IDGVN1VTB,
        product.IDGVN2VTB,
        product.IDGVN3VTB,
        product.IDGVN5VTB
    ],
    REINVEST_BASIC_VARIANTS: [
        product.IDG1REINVEST,
        product.IDG3REINVEST,
        product.IDG5REINVEST,
        product.EBMGREINVEST
    ],
    QUOTE_ACC_APP_SHOW: [
        product.EBMGVTB,
        product.EBMGVVTB,
        product.EBMGVNVTB,
        product.ECATFPVTB,
        product.ECATFVVTB,
        product.ECATFZENIT,
        product.ECOFPVTB,
        product.ECOFVVTB,
        product.EBMGREINVEST,
        product.EBMGPB,
        product.EBMG,
        product.EBMGN,
        product.EBMGP,
        product.EBMGNVTB,
        product.EBMGNT,
        product.ECATFUBRR,
        product.EBMGUBRR,
        product.EBM3GUBRR,
        product.ECOF2ZENIT
    ],
    THIRTY_PERCENT_OF_DNS: [
        product.IBA2P3, product.IBAKVP5VTB, product.IBAKVV5VTB, product.IBAKVP5PEVTB, product.IBAKVV5PEVTB, product.IBAP3VTB, product.IBAP5VTB, product.IBAV3VTB, product.IBAV5VTB,
        product.IBA2P3VTB, product.IBA2P5VTB, product.IBA2V3VTB, product.IBA2V5VTB,
        product.IDG3LIFEINVEST, product.IDG1LIFEINVEST, product.IDG5LIFEINVEST, product.IDGP2PB, product.IDGP3PB, product.IDGP5PB,
        product.IDGV2VTB, product.IDGV3VTB, product.IDGV4VTB, product.IDGV5VTB, product.IDGV2PPVTB, product.IDGV3PPVTB, product.IDGV4PPVTB, product.IDGV5PPVTB,
        product.IDGVN4VTB, product.IDGVN4PPVTB, product.IDGVN2PPVTB, product.IDGVN3PPVTB, product.IDGVN5PPVTB,
        product.IDGP2VTB, product.IDGP3VTB, product.IDGP4VTB, product.IDGP5VTB, product.IDGP2PPVTB, product.IDGP3PPVTB, product.IDGP4PPVTB, product.IDGP5PPVTB,
        product.IDGP1VTB, product.IDGV1VTB, product.IDGVN1VTB, product.IDGVN2VTB, product.IDGVN3VTB, product.IDGVN5VTB,
        product.IDG1EKSPO,
        product.IDGPN1VTB, product.IDGPN2VTB, product.IDGPN3VTB, product.IDGPN4VTB, product.IDGPN5VTB, product.IDGPN2PPVTB, product.IDGPN3PPVTB, product.IDGPN4PPVTB, product.IDGPN5PPVTB, product.IDG2UBRR, product.IDG3UBRR, product.IDG5UBRR,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB, product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB
    ],
    THIRTY_PERCENT_OF_DNS_IDGV_OAS: [
        product.IDGV5OAS, product.IDGV5PPOAS, product.IDGV3OAS, product.IDGV3PPOAS, product.IDGV2PPOAS, product.IDGV2OAS
    ],
    REINVEST_PRODUCT_FOR_SKIP_DRPK: [
        product.IDG1REINVEST,
        product.IDG3REINVEST,
        product.IDG5REINVEST,
        product.EBMGREINVEST
    ],
    SKIP_DRPK_IN_CASE_OF_INCREASE: [
        product.IDGV2PPVTB, product.IDGV2VTB,
        product.IDGV3PPVTB, product.IDGV3VTB,
        product.IDGV4PPVTB, product.IDGV4VTB,
        product.IDGV5PPVTB, product.IDGV5VTB,
        product.IDGVN4PPVTB, product.IDGVN4VTB,
        product.IDGVN2PPVTB, product.IDGVN2VTB,
        product.IDGVN3PPVTB, product.IDGVN3VTB,
        product.IDGVN5PPVTB, product.IDGVN5VTB,
        product.IDGV1VTB, product.IDGVN1VTB,
        product.IDGP2PPVTB, product.IDGP2VTB,
        product.IDGP3PPVTB, product.IDGP3VTB,
        product.IDGP4PPVTB, product.IDGP4VTB,
        product.IDGP5PPVTB, product.IDGP5VTB,
        product.IDGP1VTB,
        product.IDGPN2PPVTB, product.IDGPN2VTB,
        product.IDGPN3PPVTB, product.IDGPN3VTB,
        product.IDGPN5PPVTB, product.IDGPN5VTB,
        product.IDGPN4PPVTB, product.IDGPN4VTB,
        product.IDGPN1VTB,
        product.IBAV3VTB, product.IBAV5VTB,
    ],
    PRINTOUT_CB_THREE_RISKS_TABLE: [
        product.IBAV3VTB, product.IBAV5VTB,
        product.IBAP3VTB, product.IBAP5VTB,
        product.IBAKVV5VTB, product.IBAKVP5VTB,
        product.IBAKVV5PEVTB, product.IBAKVP5PEVTB,
        product.IBA2P3,
        product.IBA2P3VTB,
        product.IBA2P5VTB,
        product.IBA2V3VTB,
        product.IBA2V5VTB,
    ],
    BASIS_ACTIVE_20: [
        product.IBA2P3VTB, product.IBA2P5VTB,
        product.IBA2V3VTB, product.IBA2V5VTB
    ],
    EQUITY_SEVENTY_PLUS: [
        product.PREEQUITYVTB, product.PREEQUITYPVTB
    ],
    BASIS_ACTIVE_DEFAULT: [
        product.IBAP3VTB, product.IBAP5VTB,
        product.IBAV3VTB, product.IBAV5VTB
    ],
    OAS_IDGV_MEMO: [
        product.IDGV3OAS, product.IDGV5OAS, product.IDGV2OAS,
        product.IDGV5PPOAS, product.IDGV3PPOAS, product.IDGV2PPOAS
    ],
    REMINDER_PAYMENT_EBMOAS: [
        product.EBMOAS2,
        product.EBMOPTIMAOAS2
    ],
    REMINDER_PAYMENT_IDGVOAS: [
        product.IDGV3OAS, product.IDGV5OAS, product.IDGV2OAS,
        product.IDGV5PPOAS, product.IDGV3PPOAS, product.IDGV2PPOAS
    ],
    REMINDER_PAYMENT_IBGOAS: [
        product.IBG3OAS, product.IBG5OAS
    ],
    SHOW_MANUAL_RISK_DELETION: [
        product.ERCP2,
        product.CAPCLRELOAS,
        product.CAPCLCHILDOAS,
        product.ECATFPVTB,
        product.ECATFVVTB,
        product.ECOFPVTB,
        product.ECOFVVTB,
        product.ECATFZENIT,
        product.ECATFUBRR,
        product.ECOF2ZENIT
    ],
    SHOW_NOTE_ABOUT_SIGNED: [
        product.EBMGRETVTB,
        product.EBMGNRETVTB,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.EBMGZENIT
    ],
    PRODUCT_TO_CHECK_FIN_QUESTIONNAIRE: [
        product.IBAV3VTB,
        product.IBAV5VTB,
        product.IBAP3VTB,
        product.IBAP5VTB,
        product.IBA2V3VTB,
        product.IBA2V5VTB,
        product.IBA2P3VTB,
        product.IBA2P5VTB,
        product.IBAKVV5VTB,
        product.IBAKVP5VTB,
        product.IBAKVV5PEVTB,
        product.IBAKVP5PEVTB,
        product.PREEQUITYVTB,
        product.PREEQUITYPVTB,
        product.PREEQUITYOAS
    ],
    POLICY_HOLDER_VALIDATION: [
        product.EBMGRETVTB,
        product.EBMGNRETVTB,
        product.EBMMGREINVEST,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.EBMGZENIT
    ],
    PH_VALIDATION_CHECK: [
        product.EBMGRETVTB,
        product.EBMGNRETVTB,
        product.EBMMGREINVEST,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.EBMGZENIT
    ],
    VARIANT_TO_PAPER: [
        product.IDG3REINVEST,
        product.IDG5REINVEST
    ],
    PSB_TEXT_AFTER_2024_12_15: [
        product.IDG3, product.IDG5,
        product.IDGP3, product.IDGP5,
        product.IDGN3, product.IDGN5,
        product.IDG3NT, product.IDG5NT,
        product.EBMG, product.EBMGP, product.EBMGNT,
        product.EHVP2, product.EBMGN, product.ERC2, product.ERCP2,
        product.IBA2P3
    ],
    OAS_TEXT_AFTER_2024_12_31: [
        product.IDGV2OAS, product.IDGV2PPOAS,
        product.IDGV3OAS, product.IDGV3PPOAS,
        product.IDGV5OAS, product.IDGV5PPOAS,
        product.EBMOAS2, product.EBMOPTIMAOAS2, product.WCENOAS, product.WCEN3OAS, product.CAPCLRELOAS, product.CAPCLCHILDOAS, product.CAPCLRELBOXOAS, product.CAPCLCHILDBOXOAS,
        product.IBG3OAS, product.IBG5OAS, product.GENCHKHEALTH, product.GENCHKSPORT, product.GENCHKTALENTS
    ],
    REINVEST_LIFEINVEST_TEXT_AFTER_2024_12_31: [
        product.EBMGREINVEST, product.EBMMGREINVEST, product.EBMGLIFEINVEST,
        product.IDG1LIFEINVEST, product.IDG1REINVEST, product.IDG3LIFEINVEST, product.IDG3REINVEST,
        product.IDG5LIFEINVEST, product.IDG5REINVEST,
    ],
    VTB_TEXT_AFTER_2025_02_21: [
        product.IDGV2PPVTB, product.IDGV2VTB,
        product.IDGV3PPVTB, product.IDGV3VTB,
        product.IDGV4PPVTB, product.IDGV4VTB,
        product.IDGV5PPVTB, product.IDGV5VTB,
        product.IDGVN4PPVTB, product.IDGVN4VTB,
        product.IDGVN2PPVTB, product.IDGVN2VTB,
        product.IDGVN3PPVTB, product.IDGVN3VTB,
        product.IDGVN5PPVTB, product.IDGVN5VTB,
        product.IDGV1VTB, product.IDGP1VTB, product.IDGPN1VTB, product.IDGVN1VTB,
        product.IDGP2PPVTB, product.IDGP2VTB,
        product.IDGP3PPVTB, product.IDGP3VTB,
        product.IDGP4PPVTB, product.IDGP4VTB,
        product.IDGP5PPVTB, product.IDGP5VTB,
        product.IDGPN2PPVTB, product.IDGPN2VTB,
        product.IDGPN3PPVTB, product.IDGPN3VTB,
        product.IDGPN5PPVTB, product.IDGPN5VTB,
        product.IDGPN4PPVTB, product.IDGPN4VTB,
        product.EBMGVTB, product.EBMGVVTB, product.EBMGVNVTB, product.EBMGNVTB, product.EBMGRETVTB, product.EBMGNRETVTB,
        product.ECATFPVTB, product.ECATFVVTB, product.ECOFPVTB, product.ECOFVVTB, product.TERMVVTB,
        product.IBAKVP5PEVTB, product.IBAKVV5PEVTB,
        product.IBAP3VTB, product.IBAP5VTB,
        product.IBAV3VTB, product.IBAV5VTB,
        product.IBA2V3VTB, product.IBA2V5VTB,
        product.IBA2P3VTB, product.IBA2P5VTB,
        product.IBAKVV5VTB, product.IBAKVP5VTB

    ],
    FIN5_PSB_SINCE_2025_02_15: [
        product.EBMGP, product.ERC2, product.ERCP2,
        product.IDG3, product.IDG5, product.IDGP3, product.IDGP5,
        product.IBA2P3
    ],
    TEXTS_FOR_MARKET_BANKS_SINCE_2025_03_07: [
        product.IDG2UBRR, product.IDG3UBRR, product.IDG5UBRR, product.ECATFUBRR,
        product.EBMGPB, product.IDGP2PB, product.IDGP3PB, product.IDGP5PB,
        product.EBMGZENIT, product.IDG2ZENIT, product.IDG5ZENIT, product.EBMAKCEPT

    ],
    SHOW_UW_BUTTON: [
        product.ECOFPVTB,
        product.ECOFVVTB,
        product.TERMVVTB,
        product.ECOF2ZENIT
    ],
    PRODUCTS_WITH_SPECIAL_OFFER: [
        product.EBMGVTB
    ],
    BASIS_ACTIVE_CHOSE_VTB_ALL: [
        product.IBAKVV5VTB,
        product.IBAKVP5VTB,
        product.IBAKVP5PEVTB,
        product.IBAKVV5PEVTB
    ],
    POLICY_CERT_INSURED_TABLE: [
        product.IBG5BFKO2,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB
    ],
    PH_ATTACHMENT_PASSPORT: [
        product.EBMGRETVTB,
        product.EBMGNRETVTB,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.EBMGZENIT
    ],
    IDG_ZENIT: [
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT
    ],
    TAX_DEDUCTION_SINCE_28_02_2025: [
        product.IBAP5VTB, product.IBAV5VTB,
        product.IBA2P5VTB, product.IBA2V5VTB,
        product.EBMOAS2, product.EBMOPTIMAOAS2,
        product.ECATFUBRR, product.ECATFZENIT,
        product.ECATFPVTB, product.ECATFVVTB,
        product.EBMGPB, product.EBMGUBRR,
        product.EBMGVTB, product.EBMGVVTB,
        product.EBMGNVTB, product.ECOFPVTB,
        product.ECOFVVTB, product.CAPCLCHILDOAS,
        product.CAPCLCHILDBOXOAS, product.CAPCLRELOAS,
        product.CAPCLRELBOXOAS, product.IBG5OAS,
        product.IDG5UBRR, product.EBMGRETVTB,
        product.EBMGNRETVTB, product.ECOF2ZENIT,
        product.EBMGVNVTB,

    ],
    ZENIT_NEW_BANK_DOCS: [
        product.EBMGZENIT,
        product.ECATFZENIT
    ],
    SKIP_SEVENTY_PLUS_VALID: [
        product.IBAP3VTB, product.IBAP5VTB,
        product.IBA2P3VTB, product.IBA2P5VTB,
        product.IBAKVP5VTB, product.IBAKVP5PEVTB,
        product.ECOFPVTB, product.EBMGVTB, product.EBMGNVTB,
        product.PREEQUITYPVTB
    ],
    IDG_RET_VTB: [
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB
    ],
    DISABLE_DECLARATION_AGREEMENT: [
        product.EBMGPB,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.EBMGZENIT
    ],
    EXCLUDE_BANK_DOCUMENT_VTB_FROM_2025_04_01: [
        product.EBMGRETVTB,
        product.EBMGNRETVTB,
        product.IDGP1VTB,
        product.IDGPN1VTB,
        product.IDGP2VTB,
        product.IDGPN2VTB,
        product.IDGP2PPVTB,
        product.IDGPN2PPVTB,
        product.IDGP3VTB,
        product.IDGPN3VTB,
        product.IDGP3PPVTB,
        product.IDGPN3PPVTB,
        product.IDGP4VTB,
        product.IDGPN4VTB,
        product.IDGP4PPVTB,
        product.IDGPN4PPVTB,
        product.IDGP5VTB,
        product.IDGPN5VTB,
        product.IDGP5PPVTB,
        product.IDGPN5PPVTB,
        product.IDGV1VTB,
        product.IDGVN1VTB,
        product.IDGV2VTB,
        product.IDGVN2VTB,
        product.IDGV2PPVTB,
        product.IDGVN2PPVTB,
        product.IDGV3VTB,
        product.IDGVN3VTB,
        product.IDGV3PPVTB,
        product.IDGVN3PPVTB,
        product.IDGV4VTB,
        product.IDGV4PPVTB,
        product.IDGVN4VTB,
        product.IDGVN4PPVTB,
        product.IDGV5VTB,
        product.IDGVN5VTB,
        product.IDGV5PPVTB,
        product.IDGVN5PPVTB,
        product.EBMGNVTB,
        product.EBMGVTB,
        product.EBMGVVTB,
        product.TERMVVTB,
        product.ECATFPVTB,
        product.ECATFVVTB,
        product.ECOFPVTB,
        product.ECOFVVTB
    ],
    SKIP_KID_QUOTE: [
        product.IDG2ZENIT,
        product.IDG1ZENIT,
        product.IDG3ZENIT,
        product.IDG5ZENIT,
        product.ECOF2ZENIT,
        product.IDG2RETVTB, product.IDG3RETVTB, product.IDG5RETVTB,
        product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB,
        product.EBMGZENIT
    ],
    ACC_SHOW_PRINT_INSURANCE_RULES: [
        product.EBMGRETVTB, product.EBMGNRETVTB, product.ECOF2ZENIT,
        product.EBMGZENIT
    ],
    OPTIMAL_CHOICE_VTB: [
        product.IOCVVTB, product.IOCPVTB
    ],
    SKIP_BANK_DOCUMENT: [
        product.EBMGRETVTB, product.EBMGNRETVTB
    ],
    IDG_EKSPO_BANK: [
        product.IDG1EKSPO
    ],
    HIDE_IS_SPECIAL_OFFER_BUTTON: [
        product.EBMGVTB
    ],
    SKIP_PREMIUM_MAX_VALID_FOR_PAPER: [
        product.IDG1ZENIT,
        product.IDG2ZENIT,
        product.IDG5ZENIT
    ],
    NO_CONFIRM_CHECKBOXES_EQUITY: [ // Отключение подтвеждающих галочек в декларациях договора ДСЖ
        product.PREEQUITYOAS
    ]
};

const efrRiskMandatory = {
    All: '1',
    AtLeastOne: '2',
    Paired: '4'
};
const periodPayment = {
    reinvest: 15
};
const giftServices = {
    MED85: "MED85",
    MED86: "MED86",
    MED87: "MED87",
    MED88: "MED88",
    MED89: "MED89",
    FIN4: "FIN4",
    MED852: "MED852",
    MED96: "MED96",
    MED97: "MED97",
};

const packageCode = {
    I46204: 'I46204',
    ECOFPVTB1: 'ECOFPVTB1',
    ECOFVVTB1: 'ECOFVVTB1',
    TERMVVTB1: 'TERMVVTB1',
    TERMVVTB2: 'TERMVVTB2'
};

const amednmentType = {
    Cancellation: 'Cancellation'
};

const newRules = {
    WCENOAS: {
        startDate: '2023-06-01'
    },
    dateForApplication: {
        date: '2023-06-06'
    }
};

const policyCreditTerms = new Map([
    [4, [12]],
    [7, [24]],
    [11, [36]],
    [15, [48]],
    [18, [60, 72, 84]]
]);

const policyCreditOpenDate = "2023-07-17";

const Note4RiskSettings = {
    DLP36904: {
        firstPeriodInMonths: 3,
        defaultPremiumCoef: 1,
        defaultPremiumCoefFrom4Month: 0.001
    },
    DNS36904: {
        firstPeriodInMonths: 3,
        defaultPremiumCoef: 0.1,
        defaultPremiumCoefFrom4Month: 0
    }
};

const CMCValidationConstants = {
    age: {
        min: 18,
        max: 70
    },
    creditSum: 1000000
};

const insuredEventType = {
    unemployment: {
        code: 500,
        description: "Безработица"
    },
    did: {
        code: 700,
        description: "ДИД"
    },
    dms: {
        code: 600,
        description: "Безработица"
    },
    survival: {
        code: 300,
        description: "Дожитие",
    },
    disease: {
        code: 200,
        description: "Заболевание",
    },
    startOfPaymentPeriod: {
        code: 400,
        description: "Начало периода выплат",
    },
    accident: {
        code: 100,
        description: "Несчастный случай",
    },
};

const mainRiskCodeConstants = {
    NO_MAIN_RISK: "NO_MAIN_RISK"
};

const didType = {
    fixed: 1,
    calculationMonthly: 2
};
const ePolicyReprintPrintoutType = ['beMillionaireBFKOPolicyPrintoutEpolicy', 'basisGarantBFKOPolicyPrintoutEpolicy', 'wcenoasSPolicyPrintoutEpolicy', 'driverGuaranteeZenithPolicyPrintoutEpolicy', 'finReservBFKOPolicyPrintoutEpolicy'];

const creditProductForPremiumForAnyTime = [product.CCP, product.CCP2, product.CCP3, product.CCP4];
const creditProductForPremiumForAfter01_04_2023 = [product.CMP, product.CMP3, product.CMP4, product.CMP5, product.CMS, product.CMS2];

const sportProducts = [product.ACCIDPC, product.ACCIDPC2];

const mediaType = {
    'application/zip': 'zip',
    'application/msword': 'doc',
    'image/jpeg': 'jpg',
    'application/vnd.ms-xpsdocument': 'xps',
    'text/html': 'html',
    'image/heic': 'heic',
    'application/vnd.collabio.xodocuments.document': 'odb',
    'application/vnd.oasis.opendocument.graphics': 'odg',
    'message/rfc822': 'eml',
    'image/tiff': 'tiff',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'multipart/related': '.part',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'application/x-ms-application': 'application',
    'text/x-dsrc': 'asm',
    'text/x-pascal': 'pas',
    'image/vnd.ms-modi': 'mdi',
    'image/png': 'png',
    'application/vnd.ms-excel': 'xls',
    'text/csv': 'csv',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/xml': 'xml',
    'application/vnd.oasis.opendocument.text': 'odt',
    'text/plain': 'txt',
    'application/vnd.ms-excel.sheet.macroEnabled.12': 'xlsm',
    'application/octet-stream': 'obj',
    'application/vnd.rar': 'rar',
    'application/x-msdownload': 'exe',
    'application/rtf': 'rtf',
    'application/x-msdos-program': 'exe',
    'application/x-zip-compressed': 'zip',
    'application/xml': 'xml',
    'application/vnd.oasis.opendocument.presentation': 'odp',
    'application/vnd.wolfram.mathematica.package': 'frame',
    'image/gif': 'gif',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'ppsx',
    'application/pdf': 'pdf',
    'image/bmp': 'bmp',
    'application/x-7z-compressed': '7z',
    'application/vnd.ms-excel.sheet.binary.macroenabled.12': 'xlsb'
};

const apiSender = {
    API_EFR: 'API_EFR'
};

const accCertificateIncomingSource = {
    Lkk: 1,
    Ui: 2,
    Import: 3,
};

const productConfigurationConst = {
    State: {
        Activated: "Activated",
    },
    minIssueDate: '2000-01-01',
    maxIssueDate: '2099-12-31',
};

const boolLogicalConsts = {
    boolTrueRus: "истина",
    boolTrueEng: "true",
    boolFalseRus: "ложь",
    boolFalseEng: "false"
};

const originatingClientIds = {
    webClientVnext: "web-client-vnext",
    configStudioClient: "config-studio-client"
};

const fundStatusConst = {
    NOT_SET: {
        CODE: 'NOT_SET',
        DESCRIPTION: '-'
    },
    CREATED_COOLING_PERIOD: {
        CODE: 'CREATED_COOLING_PERIOD',
        DESCRIPTION: 'Создан, идет период охлж.'
    },
    FORMING: {
        CODE: 'FORMING',
        DESCRIPTION: 'Формируется'
    },
    FORMED_MATCHED_DECLARATION: {
        CODE: 'FORMED_MATCHED_DECLARATION',
        DESCRIPTION: 'Сформирован, соответствует декларации'
    },
    FORMED_NOT_MATCHED_DECLARATION: {
        CODE: 'FORMED_NOT_MATCHED_DECLARATION',
        DESCRIPTION: 'Сформирован, не соответствует декларации'
    },
    DISBANDMENT: {
        CODE: 'DISBANDMENT',
        DESCRIPTION: 'Расформирование'
    },
    SOLD_OUT: {
        CODE: 'SOLD_OUT',
        DESCRIPTION: 'Распродан'
    },
    DISSOLVED: {
        CODE: 'DISSOLVED',
        DESCRIPTION: 'Расформирован'
    }
};

const preEquityMinShare = {
    value: 0.001,
    text: '0,1%'
};

const contractIncomingSource = {
    UI: '1',
    API: '2'
};

const clientIdToIncomingSourceMapping = {
    [originatingClientIds.webClientVnext]: contractIncomingSource.UI,
    [originatingClientIds.configStudioClient]: contractIncomingSource.API
};

const fundFormedStatuses = [
    fundStatusConst.FORMED_MATCHED_DECLARATION.DESCRIPTION,
    fundStatusConst.FORMED_NOT_MATCHED_DECLARATION.DESCRIPTION,
];

const coverageDuration = {
    wholeDay: {
        code: '1',
        description: '24 часа в сутки'
    },
    workExceptTransfer: {
        code: '2',
        description: 'время исполнения трудовых обязанностей, исключая время в пути'
    },
    workTransfer: {
        code: '3',
        description: 'время исполнения трудовых обязанностей и время следования к месту работы и обратно в рабочие дни'
    },
    training: {
        code: '4',
        description: 'время тренировок'
    },
    competition: {
        code: '5',
        description: 'время соревнований'
    },
    trainingCompetition: {
        code: '6',
        description: 'время тренировок и соревнований'
    },
    trainingCompetitionTransfer: {
        code: '7',
        description: 'время тренировок и соревнований и время в дороге'
    }
};

module.exports = {
    productGroup,
    productGroupCollective,
    productCode,
    productGroupToConfigurationMapping,
    universalVersionedDocument,
    universalMasterEntity,
    actor,
    paymentFrequency,
    guaranteedIncome,
    availableInsuranceTermsDays,
    currency,
    issueForm,
    endowmentPaymentVariant,
    relationType,
    quoteState,
    policyState,
    inquiryState,
    inquiryConfiguratuionName,
    contractType,
    userGroup,
    partnerCode,
    serviceCode,
    salesGroupByPartnerCode,
    salesGroupRelatedByPartnerCode,
    participantType,
    strategyDesc,
    salesSegment,
    salesSegmentRoles,
    excludeProductRoles,
    verificationConfiguratuionName,
    lifeInsuranceRequestConfigurationName,
    deduplicationDocumentConfigurationName,
    accountingCertificateConfigurationName,
    strategyConfiguration,
    product,
    productDescription,
    efrRiskMandatory,
    productGroupArray,
    giftServices,
    riskCode,
    packageCode,
    triggersInsuredSum,
    amednmentType,
    newRules,
    policyCreditTerms,
    policyCreditOpenDate,
    cnlInquiryConfiguratuionName,
    Note4RiskSettings,
    endowmentInquiryConfiguratuionName,
    CMCValidationConstants,
    policyInquiryConfiguratuionName,
    insuredEventType,
    mainRiskCodeConstants,
    productsCOF,
    productsWorthyCentury,
    didType,
    ePolicyReprintPrintoutType,
    creditProductForPremiumForAnyTime,
    creditProductForPremiumForAfter01_04_2023,
    sportProducts,
    mediaType,
    periodPayment,
    apiSender,
    daysCount,
    accCertificateIncomingSource,
    boolLogicalConsts,
    originatingClientIds,
    fundStatusConst,
    assetConfigurationName,
    quotesCode,
    entityTypes,
    productConfigurationConst,
    assetChangeAmendmentConfigurationName,
    preEquityMinShare,
    clientIdToIncomingSourceMapping,
    fundFormedStatuses,
    equityLifeInsuranceAmendments,
    coverageDuration
};
