
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * riskPackagesConfiguration
     *
     * @param  {object} input Expected input properties: packageCode
     */
    function riskPackagesConfiguration(input) {
        // destructure input
        const {packageCode} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: packageCode == "EFRBFKO1", outputs: {packageName: "Пакет 1", packageRisks: ["DNS36404", "DTP36404"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "EFRBFKO2", outputs: {packageName: "Пакет 2", packageRisks: ["CTDA36404", "DASS36404"], insuredAgeOnIssueDateMax: 58, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "EFRBFKO3", outputs: {packageName: "Пакет 3", packageRisks: ["CDHR10800", "CDVV36404"], insuredAgeOnIssueDateMax: 58, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "JL36404", outputs: {packageName: "Потеря работы ОУСВ", packageRisks: ["JL36404"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: true}},
            {condition: packageCode == "DNS36404", outputs: {packageName: "Смерть НС", packageRisks: ["DNS36404"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "DDTP36404", outputs: {packageName: "Смерть ДТП", packageRisks: ["DDTP36404"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "DSS36404", outputs: {packageName: "ИЛП 1,2", packageRisks: ["DSS36404"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "CD36404", outputs: {packageName: "Критические заболевания", packageRisks: ["CD36404"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "CD636404", outputs: {packageName: "Критические заболевания ОУСВ", packageRisks: ["CD636404"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 60, phAgeOnEndDateMax: 65, isPolicyHolder: true}},
            {condition: packageCode == "HI36404", outputs: {packageName: "Тяжелая травма", packageRisks: ["HI36404"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "IH36404", outputs: {packageName: "Травма НС", packageRisks: ["IH36404"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "I46204", outputs: {packageName: "Травма Застрахованного в результате несчастного случая", packageRisks: ["I46204"], insuredAgeOnIssueDateMax: 75, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "MJL36404", outputs: {packageName: "Потеря работы ОУСВ", packageRisks: ["MJL36404"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: true}},
            {condition: packageCode == "TERMVVTB1", outputs: {packageName: "Пакет 1", packageRisks: ["DNS42204","DTP42204","I42204"], insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "TERMVVTB2", outputs: {packageName: "КЗ лечение РФ", packageRisks: ["CDHR10800"], insuredAgeOnIssueDateMax: 64, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "TERMVVTB3", outputs: {packageName: "КЗ лечение весь мир", packageRisks: ["CDHW10800"], insuredAgeOnIssueDateMax: 64, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "DLP42204", outputs: {packageName: "Смерть ЛП", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 70, isPolicyHolder: false}},
            {condition: packageCode == "D42204", outputs: {packageName: "Инвалидность 1,2 гр. ЛП", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 64, isPolicyHolder: false}},
            {condition: packageCode == "DNS42204", outputs: {packageName: "Смерть НС", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 70, isPolicyHolder: false}},
            {condition: packageCode == "DTP42204", outputs: {packageName: "Смерть ТП", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 70, isPolicyHolder: false}},
            {condition: packageCode == "I42204", outputs: {packageName: "Травма НС", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 70, isPolicyHolder: false}},
            {condition: packageCode == "CDHR10800", outputs: {packageName: "КЗ", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 64, isPolicyHolder: false}},
            {condition: packageCode == "CDHW10800", outputs: {packageName: "КЗ", packageRisks: undefined, insuredAgeOnIssueDateMax: undefined, insuredAgeOnEndDateMax: undefined, phAgeOnIssueDateMax: 18, phAgeOnEndDateMax: 64, isPolicyHolder: false}},
            {condition: packageCode == "ECOFPVTB1", outputs: {packageName: "Пакет 1", packageRisks: ["DNS36404", "DTP36404"], insuredAgeOnIssueDateMax: 65, insuredAgeOnEndDateMax: 75, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOFPVTB2", outputs: {packageName: "Пакет 2", packageRisks: ["CTDA36404", "DASS36404"], insuredAgeOnIssueDateMax: 58, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOFPVTB3", outputs: {packageName: "Пакет 3", packageRisks: ["CDP36404","CDHR10800", "CDVV36404"], insuredAgeOnIssueDateMax: 58, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOFVVTB1", outputs: {packageName: "Пакет 1", packageRisks: ["DNS36404", "DTP36404"], insuredAgeOnIssueDateMax: 65, insuredAgeOnEndDateMax: 75, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOFVVTB2", outputs: {packageName: "Пакет 2", packageRisks: ["CTDA36404", "DASS36404"], insuredAgeOnIssueDateMax: 58, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOFVVTB3", outputs: {packageName: "Пакет 3", packageRisks: ["CDP36404","CDHR10800", "CDVV36404"], insuredAgeOnIssueDateMax: 58, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOF2ZENIT1", outputs: {packageName: "Пакет 1", packageRisks: ["DNS36404", "DTP36404"], insuredAgeOnIssueDateMax: 65, insuredAgeOnEndDateMax: 75, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOF2ZENIT2", outputs: {packageName: "Пакет 2", packageRisks: ["CTDA36404", "DASS36404"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOF2ZENIT3", outputs: {packageName: "Пакет 3", packageRisks: ["CDHR10800"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: false}},
            {condition: packageCode == "ECOF2ZENIT4", outputs: {packageName: "Пакет 4", packageRisks: [ "CDVV36404"], insuredAgeOnIssueDateMax: 60, insuredAgeOnEndDateMax: 65, phAgeOnIssueDateMax: undefined, phAgeOnEndDateMax: undefined, isPolicyHolder: true}}
        ]
            .filter(r => r.condition)
            .map(r => r.outputs);

        if(allOutputs.length === 0) {
            return undefined;
        }

        // return outputs based on hit policy (UNIQUE)
        return allOutputs[0];

    }


    // exported functions
    return {
        riskPackagesConfiguration: riskPackagesConfiguration
    };
})();
