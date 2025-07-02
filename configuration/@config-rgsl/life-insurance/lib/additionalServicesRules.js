
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * Additional services rules
     *
     * @param  {object} input Expected input properties: productCode, issueDate, paymentFrequency, riskPremium
     */
    function additionalServicesRules(input) {
        // destructure input
        const {productCode, issueDate, paymentFrequency, riskPremium} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: productCode == "EHVP2" && (issueDate >= "2023-08-01" && issueDate <= "2024-11-30") && true && !((riskPremium >= 680000 && riskPremium <= 1600000)), outputs: {allowedServices: ["MED72"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2023-08-01" && issueDate <= "2024-11-30") && true && (riskPremium >= 680000 && riskPremium <= 1600000), outputs: {allowedServices: ["MED72", "TaxDeduction10"]}},
            {condition: productCode == "ERCP2" && (issueDate >= "2023-08-01" && issueDate <= "2024-12-15") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: ["TaxDeduction10","MED72"]}},
            {condition: productCode == "ERCP2" && (issueDate >= "2024-12-16" && issueDate <= "2025-05-31") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: ["TaxDeduction10","MED72","FIN5"]}},
            {condition: productCode == "ERCP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: [ "TAX2", "MED98","LEG15","MED72","FIN5"]}},
            {condition: productCode == "ERCP2" && (issueDate >= "2023-08-01" && issueDate <= "2024-12-15") && paymentFrequency == [1] && true, outputs: {allowedServices: ["TaxDeduction14","MED72"]}},
            {condition: productCode == "ERCP2" && (issueDate >= "2024-12-16" && issueDate <= "2025-05-31") && paymentFrequency == [1] && true, outputs: {allowedServices: ["TaxDeduction14","MED72","FIN5"]}},
            {condition: productCode == "ERCP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && true, outputs: {allowedServices: [ "TAX2", "MED98","LEG15","MED72","FIN5"]}},
            {condition: productCode == "ERC2" && (issueDate >= "2023-08-01" && issueDate <= "2024-12-15") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: ["TaxDeduction10","MED72"]}},
            {condition: productCode == "ERC2" && (issueDate >= "2024-12-16" && issueDate <= "2025-05-31") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: ["TaxDeduction10","MED72","FIN5"]}},
            {condition: productCode == "ERC2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: [ "TAX2", "MED98","LEG15","MED72","FIN5"]}},
            {condition: productCode == "ERC2" && (issueDate >= "2023-08-01" && issueDate <= "2024-12-15") && paymentFrequency == [1] && true, outputs: {allowedServices: ["TaxDeduction14","MED72"]}},
            {condition: productCode == "ERC2" && (issueDate >= "2024-12-16" && issueDate <= "2025-05-31") && paymentFrequency == [1] && true, outputs: {allowedServices: ["TaxDeduction14","MED72","FIN5"]}},
            {condition: productCode == "ERC2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && true, outputs: {allowedServices: [ "TAX2", "MED98","LEG15","MED72","FIN5"]}},
            {condition: productCode == "EBMGSMP" && (issueDate >= "2023-08-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: ["TaxDeduction2"]}},
            {condition: productCode == "EBMGSMP" && (issueDate >= "2023-08-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && true, outputs: {allowedServices: ["TaxDeduction14"]}},
            {condition: productCode == "ERC2SMP" && (issueDate >= "2023-08-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && true, outputs: {allowedServices: ["TaxDeduction10","MED72"]}},
            {condition: productCode == "ERC2SMP" && (issueDate >= "2023-08-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && true, outputs: {allowedServices: ["TaxDeduction14","MED72"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2024-12-01" && issueDate <= "2025-05-31") && !(paymentFrequency == [1]) && riskPremium == 200000, outputs: {allowedServices: ["MED51","MED24","MED38","MED41"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && riskPremium == 200000, outputs: {allowedServices: ["MED51","MED24","MED38","MED41"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2024-12-01" && issueDate <= "2025-05-31") && paymentFrequency == [1] && riskPremium == 700000, outputs: {allowedServices: ["TaxDeduction14","MED72","MED51","MED24","MED38","MED41"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && riskPremium == 700000, outputs: {allowedServices: ["TAX2", "MED98","LEG15","MED72","MED51","MED24","MED38","MED41"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2024-12-01" && issueDate <= "2025-05-31") && !(paymentFrequency == [1]) && riskPremium == 680000, outputs: {allowedServices: ["TaxDeduction10","MED72","MED51","MED24","MED39","MED42"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && riskPremium == 680000, outputs: {allowedServices: ["TAX2", "MED98","LEG15","MED72","MED51","MED24","MED39","MED42"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2024-12-01" && issueDate <= "2025-05-31") && paymentFrequency == [1] && riskPremium == 3000000, outputs: {allowedServices: ["TaxDeduction14","MED72","MED51","MED24","MED39","MED42"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && riskPremium == 3000000, outputs: {allowedServices: ["TAX2", "MED98","LEG15","MED72","MED51","MED24","MED39","MED42"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2024-12-01" && issueDate <= "2025-05-31") && !(paymentFrequency == [1]) && riskPremium == 1600000, outputs: {allowedServices: ["TaxDeduction10","MED72","MED51","MED24","MED40","MED43"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && !(paymentFrequency == [1]) && riskPremium == 1600000, outputs: {allowedServices: ["TAX2", "MED98","LEG15","MED72","MED51","MED24","MED40","MED43"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2024-12-01" && issueDate <= "2025-05-31") && paymentFrequency == [1] && riskPremium == 5000000, outputs: {allowedServices: ["TaxDeduction14","MED72","MED51","MED24","MED40","MED43"]}},
            {condition: productCode == "EHVP2" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31") && paymentFrequency == [1] && riskPremium == 5000000, outputs: {allowedServices: ["TAX2", "MED98","LEG15","MED72","MED51","MED24","MED40","MED43"]}}
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
        additionalServicesRules: additionalServicesRules
    };
})();
