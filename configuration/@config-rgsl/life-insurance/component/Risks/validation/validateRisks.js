'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

/**
 * @errorCode {errorCode} existsIncorrectPremium
 * @errorCode {errorCode} existsIncorrectInsuredSum
 * @errorCode {errorCode} riskPremiumIsNotEqualToRiskPremiumSum
 * @errorCode {errorCode} riskInsuredSumCACB
 * @errorCode {errorCode} riskInsuredSumCAPCLCHILDOASIH36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASDLP36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASDNS36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASDDTP36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASDSS36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASCD36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASHI36404
 * @errorCode {errorCode} riskInsuredSumCAPCLRELOASIH36404
 * @errorCode {errorCode} riskInsuredSumECATFPVTBDLPDPE36404
 * @errorCode {errorCode} riskInsuredSumECATFPVTBD36404
 * @errorCode {errorCode} riskInsuredSumECATFPVTBDA36404
 */

module.exports = function validateRisks(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const productCode = input?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input?.basicConditions?.issueDate;
    const productConf = input?.productConfiguration || {};
    const risks = input?.risks ?? [];

    // riskPremiumSum calculation with exclusion of interchangeable risks
    const specialProductCodes = ["ECATFPVTB", "ECATFVVTB"];
    const interChangeableRisks = ["D36404", "DA36404"];
    const riskCodes = risks.map(r => r?.risk?.riskCode);
    let riskPremiumSum = risks.reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0);

    if (specialProductCodes.includes(productCode) && riskCodes.filter(rc => interChangeableRisks.includes(rc)).length === interChangeableRisks.length) {
        const interChangeableRiskPremium = risks.find(r => interChangeableRisks.includes(r?.risk?.riskCode))?.riskPremium;
        if (interChangeableRiskPremium) { riskPremiumSum -= interChangeableRiskPremium * (interChangeableRisks.length - 1); }
    }

    const riskPremium = input?.basicConditions?.riskPremium;
    const manualCorrection = input?.risksCorrection?.manualCorrection ?? false;

    const existsIncorrectPremium = risks.some(item => (item.riskPremium < 0));
    const existsIncorrectInsuredSum = risks.some(item => (item.riskInsuredSum < 0));
    const riskPremiumIsNotEqualToRiskPremiumSum = round(riskPremium, 2) != round(riskPremiumSum, 2);

    if (manualCorrection) {
        if (existsIncorrectPremium) {
            validationErrors.push({
                errorCode: "existsIncorrectPremium",
                errorDataPath: dataPath
            });
        }

        if (existsIncorrectInsuredSum) {
            validationErrors.push({
                errorCode: "existsIncorrectInsuredSum",
                errorDataPath: dataPath
            });
        }

        if (riskPremium && riskPremiumIsNotEqualToRiskPremiumSum) {
            validationErrors.push({
                errorCode: "riskPremiumIsNotEqualToRiskPremiumSum",
                errorDataPath: dataPath
            });
        }

    }

    if (productCode == 'CACB') {

        const maxInsuredSumMainRisk = productConf.maxInsuredSumMainRisk;
        const riskDLP42204 = risks.find(item => item.risk.riskCode == 'DLP42204');
        const riskDNS42204 = risks.find(item => item.risk.riskCode == 'DNS42204');

        if ((riskDLP42204 && riskDLP42204.riskInsuredSum > maxInsuredSumMainRisk)
            ||
            (riskDNS42204 && riskDNS42204.riskInsuredSum > maxInsuredSumMainRisk)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCACB",
                errorDataPath: dataPath
            });
        }

    }

    if (productCode == 'EBMPFBFKO') {

        const maxInsuredSumMainRisk = productConf.maxInsuredSumMainRisk;
        const riskDLP36404 = risks.find(item => item.risk.riskCode == 'DLP36404');

        if ((riskDLP36404 && riskDLP36404.riskInsuredSum > maxInsuredSumMainRisk)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCACB",
                errorDataPath: dataPath
            });
        }

    }

    if (productCode == 'CAPCLCHILDOAS') {

        const minInsuredSumIH36404 = 90000;
        const riskIH36404 = risks.find(item => item.risk.riskCode == 'IH36404');

        if ((riskIH36404 && riskIH36404.riskInsuredSum < minInsuredSumIH36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLCHILDOASIH36404",
                errorDataPath: dataPath
            });
        }

    }

    if (productCode == 'CAPCLRELOAS' || productCode == 'CAPCLRELBOXOAS') {

        const minInsuredSumDNS36404 = 90000;
        const riskDNS36404 = risks.find(item => item.risk.riskCode == 'DNS36404');
        if ((riskDNS36404 && riskDNS36404.riskInsuredSum < minInsuredSumDNS36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLRELOASDNS36404",
                errorDataPath: dataPath
            });
        }

        const minInsuredSumDDTP36404 = 90000;
        const riskDDTP36404 = risks.find(item => item.risk.riskCode == 'DDTP36404');
        if ((riskDDTP36404 && riskDDTP36404.riskInsuredSum < minInsuredSumDDTP36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLRELOASDDTP36404",
                errorDataPath: dataPath
            });
        }

        const minInsuredSumDSS36404 = 90000;
        const riskDSS36404 = risks.find(item => item.risk.riskCode == 'DSS36404');
        if ((riskDSS36404 && riskDSS36404.riskInsuredSum < minInsuredSumDSS36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLRELOASDSS36404",
                errorDataPath: dataPath
            });
        }

        const minInsuredSumCD36404 = 90000;
        const riskCD36404 = risks.find(item => item.risk.riskCode == 'CD36404');
        if ((riskCD36404 && riskCD36404.riskInsuredSum < minInsuredSumCD36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLRELOASCD36404",
                errorDataPath: dataPath
            });
        }

        const minInsuredSumHI36404 = 90000;
        const riskHI36404 = risks.find(item => item.risk.riskCode == 'HI36404');
        if ((riskHI36404 && riskHI36404.riskInsuredSum < minInsuredSumHI36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLRELOASHI36404",
                errorDataPath: dataPath
            });
        }

        const minInsuredSumIH36404 = 90000;
        const riskIH36404 = risks.find(item => item.risk.riskCode == 'IH36404');
        if ((riskIH36404 && riskIH36404.riskInsuredSum < minInsuredSumIH36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumCAPCLRELOASIH36404",
                errorDataPath: dataPath
            });
        }

    }

    /*
    if (productCode == 'ECATFPVTB' || productCode == 'ECATFVVTB') {

        const maxInsuredSumDLPDPE36404 = 5000000;
        const riskDLPDPE36404 = risks.find(item => item.risk.riskCode == 'DLPDPE36404');
        if ((riskDLPDPE36404 && riskDLPDPE36404.riskInsuredSum > maxInsuredSumDLPDPE36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumECATFPVTBDLPDPE36404",
                errorDataPath: dataPath
            });
        }

        const maxInsuredSumD36404 = 5000000;
        const riskD36404 = risks.find(item => item.risk.riskCode == 'D36404');
        if ((riskD36404 && riskD36404.riskInsuredSum > maxInsuredSumD36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumECATFPVTBD36404",
                errorDataPath: dataPath
            });
        }

        const maxInsuredSumDA36404 = 5000000;
        const riskDA36404 = risks.find(item => item.risk.riskCode == 'DA36404');
        if ((riskDA36404 && riskDA36404.riskInsuredSum > maxInsuredSumDA36404)) {
            validationErrors.push({
                errorCode: "riskInsuredSumECATFPVTBDA36404",
                errorDataPath: dataPath
            });
        }

    }
    */

    return validationErrors;

};
