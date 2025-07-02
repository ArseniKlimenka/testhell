
/* eslint-disable */
/**
 * sumInsuredConfig (opt)
 *
 * @param  {object} input Expected input properties: productCode, riskCode
 */
module.exports = function sumInsuredConfig({
    productCode,
    riskCode
}) {
    if(productCode == "ECOFPVTB") {
        if(riskCode == "E36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DLPSS36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DAVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DNS36404") {
            return {isFixed: false, maxValue: 10500000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DTP36404") {
            return {isFixed: false, maxValue: 10500000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "CTDA36404") {
            return {isFixed: false, maxValue: 1200000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CTDA36404"};
        }
        if(riskCode == "DASS36404") {
            return {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DASS36404"};
        }
        if(riskCode == "CDVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPSS36404", "DVV36404", "DAVV36404"], premiumCalcRisk: "E36404"};
        }
        if(riskCode == "CDP36404") {
            return {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CDP36404"};
        }
        if(riskCode == "CDHR10800") {
            return {isFixed: true, maxValue: 12000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
    }
    if(productCode == "ECOFVVTB") {
        if(riskCode == "E36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DLPSS36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DAVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DNS36404") {
            return {isFixed: false, maxValue: 10500000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DTP36404") {
            return {isFixed: false, maxValue: 10500000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "CTDA36404") {
            return {isFixed: false, maxValue: 1200000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CTDA36404"};
        }
        if(riskCode == "DASS36404") {
            return {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DASS36404"};
        }
        if(riskCode == "CDVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPSS36404", "DVV36404", "DAVV36404"], premiumCalcRisk: "E36404"};
        }
        if(riskCode == "CDP36404") {
            return {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CDP36404"};
        }
        if(riskCode == "CDHR10800") {
            return {isFixed: true, maxValue: 12000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
    }
    if(productCode == "ECOF2ZENIT") {
        if(riskCode == "E36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DLPSS36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DAVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: true, returnRisks: ["E36404", "DLPSS36404"], isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DNS36404") {
            return {isFixed: false, maxValue: 10500000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "DTP36404") {
            return {isFixed: false, maxValue: 10500000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
        if(riskCode == "CTDA36404") {
            return {isFixed: false, maxValue: 1200000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CTDA36404"};
        }
        if(riskCode == "DASS36404") {
            return {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "DASS36404"};
        }
        if(riskCode == "CDVV36404") {
            return {isFixed: false, maxValue: undefined, isReturn: false, returnRisks: undefined, isWOP: true, WOPRisks: ["E36404", "DLPSS36404", "DVV36404", "DAVV36404"], premiumCalcRisk: "E36404"};
        }
        if(riskCode == "CDP36404") {
            return {isFixed: false, maxValue: 6000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "CDP36404"};
        }
        if(riskCode == "CDHR10800") {
            return {isFixed: true, maxValue: 60000000, isReturn: false, returnRisks: undefined, isWOP: false, WOPRisks: undefined, premiumCalcRisk: "E36404"};
        }
    }
};
