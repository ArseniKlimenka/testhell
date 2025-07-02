
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * Broker Configuration
     *
     * @param  {object} input Expected input properties: productCode, issueDate
     */
    function brokerConfiguration(input) {
        // destructure input
        const {productCode, issueDate} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: productCode == "PREEQUITYVTB" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {brokerAccountNumber: "30601810900012100523", brokerName: "в Банке ВТБ (ПАО) (ИНН 7702070139)", bankAccount: "40701810706809000003", bankFullName: "Банк ВТБ (ПАО) г. Москве (ИНН 7702070139)", insurerShareExpensesByYear_0: 0.027, insurerShareExpensesByYear_1: 0.0225, insurerShareExpensesByYear_2: 0.01, insurerShareExpensesByYear_3: 0}},
            {condition: productCode == "PREEQUITYPVTB" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {brokerAccountNumber: "30601810900012100523", brokerName: "в Банке ВТБ (ПАО) (ИНН 7702070139)", bankAccount: "40701810706809000003", bankFullName: "Банк ВТБ (ПАО) г. Москве (ИНН 7702070139)", insurerShareExpensesByYear_0: 0.027, insurerShareExpensesByYear_1: 0.0225, insurerShareExpensesByYear_2: 0.01, insurerShareExpensesByYear_3: 0}},
            {condition: productCode == "PREEQUITYOAS" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {brokerAccountNumber: "30601810900012100523", brokerName: "в Банке ВТБ (ПАО) (ИНН 7702070139)", bankAccount: "40701810706809000003", bankFullName: "Банк ВТБ (ПАО) г. Москве (ИНН 7702070139)", insurerShareExpensesByYear_0: 0.027, insurerShareExpensesByYear_1: 0.0225, insurerShareExpensesByYear_2: 0.01, insurerShareExpensesByYear_3: 0}}
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
        brokerConfiguration: brokerConfiguration
    };
})();
