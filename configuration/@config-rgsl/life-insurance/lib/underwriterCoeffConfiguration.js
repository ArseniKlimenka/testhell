
/* eslint-disable */
/**
 * Underwriter coefficients configuration (opt)
 *
 * @param  {object} input Expected input properties: productCode, riskCode
 */
module.exports = function underwriterCoeffConfiguration({
    productCode,
    riskCode
}) {
    if(productCode == "ERCP2") {
        if(riskCode == "CD36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "HI36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "JL36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "EPGPAKBARS") {
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DDTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "JL36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "EPGPZENIT") {
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DDTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "JL36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "EFRBFKO") {
        if(riskCode == "CDHR10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "CDHW10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "CDP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "CDVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "CTDA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DASS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DAVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "EBMPYBFKO") {
        if(riskCode == "CDHR10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPVV36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "EBMPFBFKO") {
        if(riskCode == "DASI20700") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "ISI20700") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "CAPCLRELOAS") {
        if(riskCode == "CD36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "CD636404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DDTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "HI36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "IH36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "MJL36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "CAPCLCHILDOAS") {
        if(riskCode == "CD5C36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "CD636404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "DLPW36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "IH36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
        if(riskCode == "SOA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: false, showUnderwriterPremiumWithoutTariffication: false};
        }
    }
    if(productCode == "TERMVVTB") {
        if(riskCode == "DLP42204") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "D42204") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DNS42204") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DTP42204") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "I42204") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDHR10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDHW10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECATFPVTB") {
        if(riskCode == "DLPVV36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DA36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DLPDPE36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECATFVVTB") {
        if(riskCode == "DLPVV36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DA36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DLPDPE36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECOFPVTB") {
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DAVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CTDA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DASS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDHR10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECOFVVTB") {
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DAVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CTDA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DASS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDHR10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECATFZENIT") {
        if(riskCode == "DLPVV36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DA36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DLPDPE36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECATFUBRR") {
        if(riskCode == "DLPVV36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "D36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DA36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DLPDPE36404") {
            return {showUnderwriterRatio: false, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
    if(productCode == "ECOF2ZENIT") {
        if(riskCode == "DLPSS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DAVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DNS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DTP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CTDA36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "DASS36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDP36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDHR10800") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "CDVV36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: false, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
        if(riskCode == "E36404") {
            return {showUnderwriterRatio: true, showUnderwriterPremium: true, showUnderwriterRatioWithoutTariffication: true, showUnderwriterPremiumWithoutTariffication: true};
        }
    }
};
