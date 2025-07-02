const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { newRules } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
module.exports = function appendixRule(input) {

    const appendix = [];

    const productCode = getValue(input, 'body.mainInsuranceConditions.insuranceProduct.productCode');
    const issueDate = getValue(input, 'body.basicConditions.issueDate');

    // Вектор здоровья Премиум
    if (['EHVP'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationHealthVector.pdf`,
            mode: 'Prepend'
        });
    }

    // Вектор здоровья Премиум 2
    if (['EHVP2'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationHealthVector2.pdf`,
            mode: 'Prepend'
        });
    }

    // Надежный выбор Премиум
    if (['ERCP'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationPremiumReliableChoise.pdf`,
            mode: 'Prepend'
        });
    }

    // Надежный выбор Премиум 2
    if (['ERCP2'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationPremiumReliableChoise2.pdf`,
            mode: 'Prepend'
        });
    }

    // Надежный выбор
    if (['ERC'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationReliableChoise.pdf`,
            mode: 'Prepend'
        });
    }

    // Надежный выбор 2
    if (['ERC2', 'ERC2SMP'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationReliableChoise2.pdf`,
            mode: 'Prepend'
        });
    }

    // Стань миллионером БФКО и АКБАРС
    if (['EBMAKBARS'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationBeMillionaire.pdf`,
            mode: 'Prepend'
        });
    }

    // Премиум Гарант Плюс ЗЕНИТ и АКБАРС
    if (['EPGPAKBARS', 'EPGPZENIT'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationpremiumGarantPlus.pdf`,
            mode: 'Prepend'
        });
    }

    // Стань миллионером ОАС
    if (['EBMOAS'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationBeMillionaireOAS.pdf`,
            mode: 'Prepend'
        });
    }

    // Финансовый резерв БФКО
    if (['EFRBFKO'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationFinReservBFKO.pdf`,
            mode: 'Prepend'
        });
    }

    // Детский капитал Классика 2.0 и Детский капитал Коробка 2.0 ОАС
    if (['CAPCLCHILDOAS', 'CAPCLCHILDBOXOAS'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/capApplicationPrintout.pdf`,
            mode: 'Prepend'
        });
    }

    // Надежный капитал Классика 2.0 и Детский капитал Коробка 2.0 ОАС
    if (['CAPCLRELOAS', 'CAPCLRELBOXOAS'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/capApplicationPrintout.pdf`,
            mode: 'Prepend'
        });
    }

    // Достойный век ОАС
    if (['WCENOAS', 'WCEN3OAS'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/capApplicationPrintout.pdf`,
            mode: 'Prepend'
        });
    }

    // Стратегия на пять. Забота о семье и  Забота о себе БФКО
    if (['EBMPYBFKO', 'EBMPFBFKO'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationEBMPFBFKOandEBMPYBFKO.pdf`,
            mode: 'Prepend'
        });
    }

    // Стратегия на пять. Гарант МИНБанк, ПСБ масс, ПСБ ОРС, Стань миллионером 2.0 ОАС, СМП Стратегия на пять. Гарант, Зенит Стратегия на пять. Гарант
    if (['EBMGMINBANK', 'EBMG', 'EBMGP', 'EBMOAS2', 'EBMOPTIMAOAS2', 'EBMGSMP', 'EBMGZENIT', 'EBMGN', 'EBMGNT'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/appllicationStrategyFiveGuarantBFKO.pdf`,
            mode: 'Prepend'
        });
    }

    if (['EBMOPTIMAOAS2'].includes(productCode)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/applicationEBMoptimaoas2.pdf`,
            mode: 'Prepend'
        });
    }

    if (dateTimeUtils.isAfter(issueDate, newRules.dateForApplication.date)) {
        if ([
            'EBMGBFKO', 'EBMIBFKO', 'EBMBFKO', // БФКО
        ].includes(productCode)) {
            appendix.push({
                name: `AccumulatedAppendixImageContainer/img/applicationStrategyFiveInvestGarant.pdf`,
                mode: 'Prepend'
            });
        }

        if ([
            'EBMZENIT', 'EBMAKCEPT', 'EBMGZENIT' // Акцепт Зенит
        ].includes(productCode)) {
            appendix.push({
                name: `AccumulatedAppendixImageContainer/img/applicationBeMillionare.pdf`,
                mode: 'Prepend'
            });
        }
    } else {
        if (['EBMAKCEPT'].includes(productCode)) {
            appendix.push({
                name: `AccumulatedAppendixImageContainer/img/applicationBeMillionaireAKCEPT.pdf`,
                mode: 'Prepend'
            });
        }

        if (['EBMZENIT', 'EBMGZENIT'].includes(productCode)) {
            appendix.push({
                name: `AccumulatedAppendixImageContainer/img/applicationBeMillionaireZENIT.pdf`,
                mode: 'Prepend'
            });
        }

        if (['EBMGBFKO', 'EBMG', 'EBMGP', 'EBMGN', 'EBMGNT'].includes(productCode)) {
            appendix.push({
                name: `AccumulatedAppendixImageContainer/img/appllicationStrategyFiveGuarantBFKO.pdf`,
                mode: 'Prepend'
            });
        }

        if (['EBMBFKO'].includes(productCode)) {
            appendix.push({
                name: `AccumulatedAppendixImageContainer/img/applicationBeMillionaire.pdf`,
                mode: 'Prepend'
            });
        }

    }

    return appendix;

};
