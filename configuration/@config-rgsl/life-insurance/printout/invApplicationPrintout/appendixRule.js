'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { newRules } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {
    const products = lifeInsuranceConstants.product;
    const appendix = [];

    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueDate = input.body.basicConditions.issueDate;

    // Драйвер. Классика Премиум (3 года), Драйвер. Классика Премиум (5 лет), Драйвер. Купонный Премиум
    if (['IDCP3', 'IDCP5', 'IDCP'].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationDriverAffluent.pdf`,
        mode: 'Prepend'
    }); }

    // Драйвер. Классика (3 года), Драйвер. Классика (5 лет), Драйвер. Купонный
    if (['IDC3', 'IDC5', 'IDC'].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationDriverMass.pdf`,
        mode: 'Prepend'
    }); }

    // Базиз Инвест и Гарант ПСБ
    if ([
        'IBG3', 'IBG5', 'IBG7', 'IBG10', 'IBGP3', 'IBGP5', 'IBGP7', 'IBGP10', // Базис Гарант ПСБ
        'IBI3', 'IBI5', 'IBI10', 'IBIP3', 'IBIP5', 'IBIP10' // Базис Инвест ПСБ
    ].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationBasisPSB.pdf`,
        mode: 'Prepend'
    }); }

    // БазизГарант АКЦЕПТ
    if ([
        'IBG1AKCEPT' // Базис Гарант АКЦЕПТ
    ].includes(productCode))
    { appendix.push({
        name: `LifeInsurancePrintoutAssets/applicationBasis.pdf`,
        mode: 'Prepend'
    }); }

    // Драйвер Гарантия (2 и 3 года для Вип сегмента)
    if ([
        'IDGV2', 'IDGV3'
    ].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationBR.pdf`,
        mode: 'Prepend'
    }); }

    // Драйвер Гарантия (2 и 3 года с периодической выплатой дохода)
    if ([
        'IDGV2PP', 'IDGV3PP'
    ].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationBRPeriodPayment.pdf`,
        mode: 'Prepend'
    }); }

    // Базиз Инвест, Гарант ОАС
    if ([
        'IBI3OAS', 'IBI5OAS', // Базис Гарант ОАС
        'IBG3OAS', 'IBG3OAS' // Базис Инвест ОАС
    ].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationBasisOAS.pdf`,
        mode: 'Prepend'
    }); }


    // Заявление БФКО Акцепт Зенит СМП в зависимости от даты
    if (dateTimeUtils.isAfter(issueDate, newRules.dateForApplication.date)) {
        if ([
            'IBI3AKCEPT', 'IBI5AKCEPT', 'IBI2ZENIT', 'IBI3ZENIT', 'IBI5ZENIT', 'IBI3BFKO', 'IBI5BFKO', 'IBI3BFKO17', 'IBI5BFKO17', 'IBI3ZENIT17', 'IBI5ZENIT17', // Базис Инвеcт
            'IBG3BFKO', 'IBG5BFKO', /* 'IBG5BFKO2',*/ 'IBG3BFKO2', // Базис Гарант
            'IBA3', 'IBA5', 'IBAP3', 'IBAP3', 'IBA3SMP', 'IBA5SMP', 'IBA3BFKO', 'IBA5BFKO', // Базис Актив
            'EBMIBFKO' // Стратегия на пять инвест БФКО
        ].includes(productCode))
        { appendix.push({
            name: `LifeInsuranceAppendixImageContainer/img/applicationBasisBFKO.pdf`,
            mode: 'Prepend'
        }); }
    } else {
    // Базиз Инвест, Гарант и Актив БФКО
        if ([
            'IBG3BFKO', 'IBG5BFKO', /* 'IBG5BFKO2',*/ 'IBG3BFKO2', // Базис Гарант БФКО
            'IBI3BFKO', 'IBI5BFKO', // Базис Инвест БФКО
            'IBA3BFKO', 'IBA5BFKO', // Базис Актив БФКО
            'IBAP3VTB', 'IBAP5VTB', 'IBAV3VTB', 'IBAV5VTB', // Базис Актив ВТБ
            'IBA3SMP', 'IBA5SMP' // Базис Актив СМП
        ].includes(productCode))
        { appendix.push({
            name: `LifeInsuranceAppendixImageContainer/img/applicationBasisNew.pdf`,
            mode: 'Prepend'
        }); }

        if ([
            'IBI3AKCEPT', 'IBI5AKCEPT', // Базис Инвест АКЦЕПТ
            'IBI2ZENIT', 'IBI3ZENIT', 'IBI5ZENIT' // Базис Инвест Зенит
        ].includes(productCode))
        { appendix.push({
            name: `LifeInsurancePrintoutAssets/applicationBasis.pdf`,
            mode: 'Prepend'
        }); }

        if ([
            'IBAP3', 'IBAP5' // Базис Актив ПСБ премиум
        ].includes(productCode))
        { appendix.push({
            name: `LifeInsuranceAppendixImageContainer/img/applicationBasisActivePremiumPSB.pdf`,
            mode: 'Prepend'
        }); }

        if ([
            'IBA3', 'IBA5' // Базис Актив ПСБ
        ].includes(productCode))
        { appendix.push({
            name: `LifeInsuranceAppendixImageContainer/img/applicationBasisActivePSB.pdf`,
            mode: 'Prepend'
        }); }

        if ([
            'EBMIBFKO' // Стратегия на пять инвест БФКО
        ].includes(productCode))
        { appendix.push({
            name: `LifeInsuranceAppendixImageContainer/img/appllicationStrategyFiveInvestBFKO.pdf`,
            mode: 'Prepend'
        }); }

    }

    // НОТА СЖ 3 года
    if ([products.NOTE3BFKO].includes(productCode))
    { appendix.push({
        name: `LifeInsuranceAppendixImageContainer/img/applicationPartialNoteBFKO.pdf`,
        mode: 'Append'
    }); }

    return appendix;

};
