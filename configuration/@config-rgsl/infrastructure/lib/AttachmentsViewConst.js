module.exports = {

    attachment: {
        changeApplication: 'changeApplication',
        cancellationApplication: 'cancellationApplication'
    },

    ePolicyIncomingAttachmentsExclusion: [
        'memoCBDigitallySigned', // Подписанная Цифровой подписью Памятка ЦБ
        'memoCB', // Проект Памятка ЦБ
        'ePolicyDigitallySigned', // Подписанный Цифровой подписью Договор Электро
        'ePolicy' // Проект Договор Электро
    ],

    paperIncomingAttachmentsExclusion: [
        'memoCBDigitallySigned', // Подписанная Цифровой подписью Памятка ЦБ
        'memoCB', // Проект Памятка ЦБ
        'ePolicyDigitallySigned', // Подписанный Цифровой подписью Договор Электро
        'ePolicy' // Проект Договор Электро
    ],

    offerIncomingAttachmentsExclusion: [
        'offer' // Оферта
    ],

    polcyAttachmentsConfnames: [
        'AccumulatedLifeInsurancePolicy',
        'AccumulatedLifeInsuranceQuote',
        'EquityLifeInsurancePolicy',
        'EquityLifeInsuranceQuote',
        'InvestmentLifeInsurancePolicy',
        'InvestmentLifeInsuranceQuote',
        'CreditLifeInsurancePolicy',
        'CreditLifeInsuranceQuote',
        'MedLifeInsurancePolicy',
        'MedLifeInsuranceQuote',
        'RiskLifeInsurancePolicy',
        'RiskLifeInsuranceQuote',
        'AccidentLifeInsurancePolicy',
        'AccidentLifeInsuranceQuote',
    ],
};
