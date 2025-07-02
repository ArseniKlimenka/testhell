
/* eslint-disable */
/**
 * ePolicytConfiguration (opt)
 *
 * @param  {object} input Expected input properties: productCode, issueDate
 */
module.exports = function ePolicytConfiguration({
    productCode,
    issueDate
}) {
    if(productCode == "CACB") {
        if((issueDate >= "2022-01-01" && issueDate <= "2023-03-31")) {
            return {productDescription: "Гарант защиты", productGroupCode: "credit", policyPrintout: "cacbPolicyPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Гарант защиты", productGroupCode: "credit", policyPrintout: "cacbPolicyPrintout", kidPrintout: "KIDCreditPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "RHELIGHTOAS") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-03-31")) {
            return {productDescription: "Восстанови здоровье Лайт", productGroupCode: "med", policyPrintout: "restoreHealthPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Восстанови здоровье Лайт", productGroupCode: "med", policyPrintout: "restoreHealthPrintout", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "RHEBASEOAS") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-03-31")) {
            return {productDescription: "Восстанови здоровье вариант Базовый", productGroupCode: "med", policyPrintout: "restoreHealthPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Восстанови здоровье вариант Базовый", productGroupCode: "med", policyPrintout: "restoreHealthPrintout", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "RHEOPTIMAOAS") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-03-31")) {
            return {productDescription: "Восстанови здоровье вариант Оптима", productGroupCode: "med", policyPrintout: "restoreHealthPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Восстанови здоровье вариант Оптима", productGroupCode: "med", policyPrintout: "restoreHealthPrintout", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "PROGENTICSBFKO") {
        if((issueDate >= "2023-03-27" && issueDate <= "2023-03-31")) {
            return {productDescription: "ПРО Генетику", productGroupCode: "med", policyPrintout: "proBFKOPolicyPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MED76", "MED77", "MED78"], PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "ПРО Генетику", productGroupCode: "med", policyPrintout: "proBFKOPolicyPrintout", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MED76", "MED77", "MED78"], PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "PROHEALTHBFKO") {
        if((issueDate >= "2023-03-27" && issueDate <= "2023-03-31")) {
            return {productDescription: "ПРО Здоровье", productGroupCode: "med", policyPrintout: "proBFKOPolicyPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MED74"], PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "ПРО Здоровье", productGroupCode: "med", policyPrintout: "proBFKOPolicyPrintout", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MED74"], PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "PROZOZHBFKO") {
        if((issueDate >= "2023-03-27" && issueDate <= "2023-03-31")) {
            return {productDescription: "ПРО ЗОЖ", productGroupCode: "med", policyPrintout: "proBFKOPolicyPrintout", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MED75"], PolicyCertificate: false, ConsentEDI: false};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "ПРО ЗОЖ", productGroupCode: "med", policyPrintout: "proBFKOPolicyPrintout", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MED75"], PolicyCertificate: false, ConsentEDI: false};
        }
    }
    if(productCode == "IBG3BFKO") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-03-31")) {
            return {productDescription: "Базис Гарант (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2023-01-09")) {
            return {productDescription: "Базис Гарант (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IBG5BFKO") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-03-31")) {
            return {productDescription: "Базис Гарант (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Базис Гарант (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IBI3BFKO") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-02-27")) {
            return {productDescription: "Базис Инвест (3 года)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-02-28" && issueDate <= "2099-12-31")) {
            return {productDescription: "Базис Инвест (3 года)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicy2PrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if((issueDate >= "2022-08-01" && issueDate <= "2023-01-26")) {
        if(productCode == "IBI5BFKO") {
            return {productDescription: "Базис Инвест (5 лет)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction"], PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "EFRBFKO") {
            return {productDescription: "Финансовый резерв", productGroupCode: "endowment", policyPrintout: "finReservBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction3"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "EBMBFKO" && (issueDate >= "2022-08-01" && issueDate <= "2022-11-15")) {
        return {productDescription: "Стань миллионером", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction3"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "IBA3BFKO" && (issueDate >= "2022-08-10" && issueDate <= "2099-12-31")) {
        return {productDescription: "Базис Актив (3 года)", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "IBA5BFKO" && (issueDate >= "2022-08-10" && issueDate <= "2023-01-26")) {
        return {productDescription: "Базис Актив (5 лет)", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "EBMGBFKO" && (issueDate >= "2022-11-01" && issueDate <= "2023-01-26")) {
        return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction6"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "EBMPYBFKO" && (issueDate >= "2022-11-22" && issueDate <= "2023-01-26")) {
        return {productDescription: "Стратегия на пять. Защита для себя", productGroupCode: "endowment", policyPrintout: "ebmpyBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction6"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "EBMIBFKO" && (issueDate >= "2022-11-01" && issueDate <= "2023-01-26")) {
        return {productDescription: "Стратегия на пять. Инвест", productGroupCode: "investment", policyPrintout: "strategyFiveInvestPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction6"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "EBMPFBFKO" && (issueDate >= "2022-10-31" && issueDate <= "2023-01-26")) {
        return {productDescription: "Стратегия на пять. Защита большой семьи", productGroupCode: "endowment", policyPrintout: "ebmpfBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction6"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "WCENOAS") {
        if((issueDate >= "2022-08-01" && issueDate <= "2023-03-28")) {
            return {productDescription: "Достойный век 2.0", productGroupCode: "endowment", policyPrintout: "wcenoasSPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MedNavigator"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-03-29" && issueDate <= "2099-12-31")) {
            return {productDescription: "Достойный век 2.0", productGroupCode: "endowment", policyPrintout: "wcenoasSPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["MedNavigator"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IBI5BFKO") {
        if((issueDate >= "2023-01-27" && issueDate <= "2023-02-27")) {
            return {productDescription: "Базис Инвест (5 лет)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction7"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-02-28" && issueDate <= "2099-12-31")) {
            return {productDescription: "Базис Инвест (5 лет)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicy2PrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction7"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "EFRBFKO") {
        if((issueDate >= "2023-01-27" && issueDate <= "2023-03-31")) {
            return {productDescription: "Финансовый резерв", productGroupCode: "endowment", policyPrintout: "finReservBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Финансовый резерв", productGroupCode: "endowment", policyPrintout: "finReservBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IBA5BFKO" && (issueDate >= "2023-01-27" && issueDate <= "2099-12-31")) {
        return {productDescription: "Базис Актив (5 лет)", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction7"], PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "EBMGBFKO") {
        if((issueDate >= "2023-01-27" && issueDate <= "2023-03-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if((issueDate >= "2023-01-27" && issueDate <= "2099-12-31")) {
        if(productCode == "EBMPYBFKO") {
            return {productDescription: "Стратегия на пять. Защита для себя", productGroupCode: "endowment", policyPrintout: "ebmpyBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "EBMIBFKO") {
            return {productDescription: "Стратегия на пять. Инвест", productGroupCode: "investment", policyPrintout: "strategyFiveInvestPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "EBMPFBFKO") {
            return {productDescription: "Стратегия на пять. Защита большой семьи", productGroupCode: "endowment", policyPrintout: "ebmpfBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction8"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IDGV1BFKO" && (issueDate >= "2023-03-15" && issueDate <= "2099-12-31")) {
        return {productDescription: "Драйвер Гарантия (1 год)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
    }
    if(productCode == "IDGV2BFKO") {
        if((issueDate >= "2023-03-15" && issueDate <= "2023-03-31")) {
            return {productDescription: "Драйвер Гарантия (2 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (2 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IDGV3BFKO") {
        if((issueDate >= "2023-03-15" && issueDate <= "2023-03-31")) {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IDGV5BFKO") {
        if((issueDate >= "2023-03-15" && issueDate <= "2023-03-31")) {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IDGV3PPBFKO") {
        if((issueDate >= "2023-03-15" && issueDate <= "2023-03-31")) {
            return {productDescription: "Драйвер Гарантия (3 года) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (3 года) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IDGV5PPBFKO") {
        if((issueDate >= "2023-03-15" && issueDate <= "2023-03-31")) {
            return {productDescription: "Драйвер Гарантия (5 лет) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (5 лет) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IBG5BFKO2" && (issueDate >= "2023-05-15" && issueDate <= "2099-12-31")) {
        return {productDescription: "Базис Гарант 2.0 (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction7"], PolicyCertificate: true, ConsentEDI: true};
    }
    if((issueDate >= "2023-04-01" && issueDate <= "2099-12-31")) {
        if(productCode == "IDGV2SOVKOM") {
            return {productDescription: "Драйвер Гарантия (2 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
        if(productCode == "IDGV3SOVKOM") {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
        if(productCode == "IDGV5SOVKOM") {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
        if(productCode == "IDGV3PPSOVKOM") {
            return {productDescription: "Драйвер Гарантия (3 года) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
        if(productCode == "IDGV5PPSOVKOM") {
            return {productDescription: "Драйвер Гарантия (5 лет) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
    }
    if(productCode == "IBG3BFKO2" && (issueDate >= "2023-05-15" && issueDate <= "2099-12-31")) {
        return {productDescription: "Базис Гарант 2.0 (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
    }
    if((issueDate >= "2022-06-22" && issueDate <= "2023-07-31")) {
        if(productCode == "IBA3REINVEST") {
            return {productDescription: "Базис Актив (3 года) ренивест", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["memoPFP"], PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "IBA5REINVEST") {
            return {productDescription: "Базис Актив (5 лет) реинвест", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["memoPFP"], PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "EBMGREINVEST") {
            return {productDescription: "Стратегия на пять. Гарант реинвест", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["memoPFP"], PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "IDG3REINVEST") {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["memoPFP"], PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "IDG5REINVEST") {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["memoPFP"], PolicyCertificate: false, ConsentEDI: true};
        }
    }
    if(productCode == "IDG1REINVEST" && (issueDate >= "2022-06-22" && issueDate <= "2099-12-31")) {
        return {productDescription: "Драйвер гарантия (1 год)", productGroupCode: "investment", policyPrintout: "driverGuaranteeZenithPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: true};
    }
    if((issueDate >= "2023-06-07" && issueDate <= "2099-12-31")) {
        if(productCode == "MOPROZVBFKO") {
            return {productDescription: "Медицинские обследования вариант PRO ЗДОРОВЬЕ ", productGroupCode: "med", policyPrintout: undefined, kidPrintout: undefined, showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
        if(productCode == "MOPROCHEKVBFKO") {
            return {productDescription: "Медицинские обследования вариант вариант PRO ЧЕК-АП  ", productGroupCode: "med", policyPrintout: undefined, kidPrintout: undefined, showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: false, ContractEPolicySigned: false, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: false};
        }
    }
    if((issueDate >= "2023-08-01" && issueDate <= "2099-12-31")) {
        if(productCode == "IBA3REINVEST") {
            return {productDescription: "Базис Актив (3 года) ренивест", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction11"], PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "IBA5REINVEST") {
            return {productDescription: "Базис Актив (5 лет) реинвест", productGroupCode: "investment", policyPrintout: "basisActivePolicyPrintoutEpolicy", kidPrintout: undefined, showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction11"], PolicyCertificate: false, ConsentEDI: true};
        }
    }
    if(productCode == "EBMGREINVEST") {
        if((issueDate >= "2023-08-01" && issueDate <= "2025-05-31")) {
            return {productDescription: "Стратегия на пять. Гарант реинвест", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction11"], PolicyCertificate: false, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Стратегия на пять. Гарант реинвест", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: [ "TAX2", "MED98", "LEG15"], PolicyCertificate: false, ConsentEDI: true};
        }
    }
    if(productCode == "IDG3REINVEST") {
        if((issueDate >= "2023-08-01" && issueDate <= "2025-04-24")) {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction11"], PolicyCertificate: false, ConsentEDI: true};
        }
        if((issueDate >= "2025-04-25" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: true};
        }
    }
    if(productCode == "IDG5REINVEST") {
        if((issueDate >= "2023-08-01" && issueDate <= "2025-05-31")) {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction11"], PolicyCertificate: false, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: [ "TAX2", "MED98", "LEG15"], PolicyCertificate: false, ConsentEDI: true};
        }
    }
    if((issueDate >= "2023-08-15" && issueDate <= "2099-12-31")) {
        if(productCode == "IBI3BFKO17") {
            return {productDescription: "Базис Инвест (3 года)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicy2PrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IBI5BFKO17") {
            return {productDescription: "Базис Инвест (5 лет)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicy2PrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction7"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "IDGV2PPBFKO" && (issueDate >= "2023-08-23" && issueDate <= "2099-12-31")) {
        return {productDescription: "Драйвер Гарантия (3 года) с периодической выплатой дохода", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
    }
    if((issueDate >= "2023-11-09" && issueDate <= "2099-12-31")) {
        if(productCode == "IBI3ZENIT17") {
            return {productDescription: "Базис Инвест (3 года)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicy2PrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IBI5ZENIT17") {
            return {productDescription: "Базис Инвест (5 лет)", productGroupCode: "investment", policyPrintout: "basisInvestmentBFKOPolicy2PrintoutEpolicy", kidPrintout: undefined, showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: true, MemoCBSigned: true, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: true, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction7"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "EBMMGREINVEST" && (issueDate >= "2024-04-01" && issueDate <= "2099-12-31")) {
        return {productDescription: "Стратегия на пять. Мой гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: false, ConsentEDI: true};
    }
    if(productCode == "EBMGRETVTB") {
        if((issueDate >= "2024-04-20" && issueDate <= "2025-03-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-04-01" && issueDate <= "2025-05-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX2","LEG15","MED98"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "EBMGLIFEINVEST" && (issueDate >= "2024-04-01" && issueDate <= "2099-12-31")) {
        return {productDescription: "Стратегия на пять. Гарант реинвест", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction11"], PolicyCertificate: false, ConsentEDI: true};
    }
    if((issueDate >= "2024-04-17" && issueDate <= "2099-12-31")) {
        if(productCode == "IDG1LIFEINVEST") {
            return {productDescription: "Драйвер гарантия (1 год)", productGroupCode: "investment", policyPrintout: "driverGuaranteeZenithPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "IDG3LIFEINVEST") {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: false, ConsentEDI: true};
        }
        if(productCode == "IDG5LIFEINVEST") {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: true, applicationPrintoutReinvestSigned: true, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: false, ConsentEDI: true};
        }
    }
    if(productCode == "EBMGPB") {
        if((issueDate >= "2024-07-03" && issueDate <= "2025-05-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX2","LEG15","MED98"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "EBMGNRETVTB") {
        if((issueDate >= "2024-08-06" && issueDate <= "2025-03-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-04-01" && issueDate <= "2025-05-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: false, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: [ "TAX2", "MED98", "LEG15"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if((issueDate >= "2025-01-15" && issueDate <= "2099-12-31")) {
        if(productCode == "IDG2ZENIT") {
            return {productDescription: "Драйвер Гарантия (2 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDG1ZENIT") {
            return {productDescription: "Драйвер Гарантия (1 год)", productGroupCode: "investment", policyPrintout: "driverGuaranteeZenithPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDG3ZENIT") {
            return {productDescription: "Драйвер Гарантия (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDG5ZENIT") {
            return {productDescription: "Драйвер Гарантия (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction2"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "ECOF2ZENIT") {
        if((issueDate >= "2025-01-17" && issueDate <= "2025-05-31")) {
            return {productDescription: "Забота о семье 2.0", productGroupCode: "endowment", policyPrintout: "finReservBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX1"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Забота о семье 2.0", productGroupCode: "endowment", policyPrintout: "finReservBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TAX2","LEG15","MED98"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if((issueDate >= "2025-02-25" && issueDate <= "2099-12-31")) {
        if(productCode == "IDG2RETVTB") {
            return {productDescription: "Драйвер Гарантия  (2 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDG3RETVTB") {
            return {productDescription: "Драйвер Гарантия  (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDG5RETVTB") {
            return {productDescription: "Драйвер Гарантия  (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "EBMGZENIT") {
        if((issueDate >= "2025-03-18" && issueDate <= "2025-05-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: ["TaxDeduction2"], PolicyCertificate: true, ConsentEDI: true};
        }
        if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {productDescription: "Стратегия на пять. Гарант", productGroupCode: "endowment", policyPrintout: "beMillionaireBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: true, DocumentsBank: true, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: [ "TAX2", "MED98", "LEG15"], PolicyCertificate: true, ConsentEDI: true};
        }
    }
    if(productCode == "WCEN3OAS" && (issueDate >= "2025-04-08" && issueDate <= "2099-12-31")) {
        return {productDescription: "Достойный век 3.0", productGroupCode: "endowment", policyPrintout: "wcenoasSPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: true, ServiceMemoFIleName: [""], PolicyCertificate: true, ConsentEDI: true};
    }
    if((issueDate >= "2025-06-09" && issueDate <= "2099-12-31")) {
        if(productCode == "IDGN2RETVTB") {
            return {productDescription: "Драйвер Гарантия  (2 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDGN3RETVTB") {
            return {productDescription: "Драйвер Гарантия  (3 года)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
        if(productCode == "IDGN5RETVTB") {
            return {productDescription: "Драйвер Гарантия  (5 лет)", productGroupCode: "investment", policyPrintout: "basisGarantBFKOPolicyPrintoutEpolicy", kidPrintout: "KIDPrintout", showKIDoperations: true, applicationPrintoutReinvest: false, applicationPrintoutReinvestSigned: false, ContractEPolicy: true, ContractEPolicySigned: true, MemoCBProject: false, MemoCBSigned: false, DocumentsBankSigned: false, DocumentsBank: false, ApplicationPaymentInvestProfit: false, ServicesMemo: false, ServiceMemoFIleName: undefined, PolicyCertificate: true, ConsentEDI: true};
        }
    }
};
