
/* eslint-disable */
/**
 * Tariff Constants (opt)
 *
 * @param  {object} input Expected input properties: productCode
 */
module.exports = function tariffConstants({
    productCode
}) {
    if(productCode == "ERC") {
        return {tariffCode: "ReliableChoise", mainRiskCode: "E36102"};
    }
    if(productCode == "ERCP") {
        return {tariffCode: "PremiumReliableChoise", mainRiskCode: "E36102"};
    }
    if(productCode == "EHVP") {
        return {tariffCode: "HealthVector", mainRiskCode: "E36102"};
    }
    if(productCode == "ISP") {
        return {tariffCode: "Strike", mainRiskCode: "IE36904"};
    }
    if(productCode == "IDC5") {
        return {tariffCode: "Driver", mainRiskCode: "E36904"};
    }
    if(productCode == "IDC") {
        return {tariffCode: "Driver", mainRiskCode: "E36904"};
    }
    if(productCode == "IDCP3") {
        return {tariffCode: "Driver", mainRiskCode: "E36904"};
    }
    if(productCode == "IDCP5") {
        return {tariffCode: "Driver", mainRiskCode: "E36904"};
    }
    if(productCode == "IDCP") {
        return {tariffCode: "Driver", mainRiskCode: "E36904"};
    }
    if(productCode == "ISO") {
        return {tariffCode: "Strike", mainRiskCode: "IE36904"};
    }
    if(productCode == "IDFP") {
        return {tariffCode: "DriverFixedPremium", mainRiskCode: "E36904"};
    }
    if(productCode == "IDC3") {
        return {tariffCode: "Driver", mainRiskCode: "E36904"};
    }
    if(productCode == "CCP") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CMS") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CDMS") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CCP2") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CMP") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "ERC2") {
        return {tariffCode: "ReliableChoise2", mainRiskCode: "E36404"};
    }
    if(productCode == "ERCP2") {
        return {tariffCode: "PremiumReliableChoise2", mainRiskCode: "E36404"};
    }
    if(productCode == "EHVP2") {
        return {tariffCode: "HealthVector2", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG3BFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG5BFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBI3BFKO") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5BFKO") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "EFRBFKO") {
        return {tariffCode: "FinancialReserve", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG3") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG5") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG7") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG10") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBGP3") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBGP5") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBGP7") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBGP10") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBI3") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI10") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBIP3") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBIP5") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBIP10") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "DEMOACC") {
        return {tariffCode: "DemoTariffAcc", mainRiskCode: "E36102"};
    }
    if(productCode == "DEMOINV") {
        return {tariffCode: "DemoTariffInv", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI3AKCEPT") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5AKCEPT") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBG1AKCEPT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EPGPAKBARS") {
        return {tariffCode: "PremiumGuarantPlus", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMBFKO") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IBI2ZENIT") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI3ZENIT") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5ZENIT") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IDG1ZENIT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EPCLZENIT") {
        return {tariffCode: "PremiumChoiseLight", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMZENIT") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG3") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG5") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG7") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG10") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP3") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP5") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP7") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP10") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EPGPZENIT") {
        return {tariffCode: "PremiumGuarantPlus", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "CACB") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "IBA3") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA5") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA3BFKO") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA5BFKO") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAP3") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAP5") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "EBMAKCEPT") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IBI3OAS") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5OAS") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBG3OAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBG5OAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMOAS") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG2ZENIT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMAKBARS") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "CCP3") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CMP3") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CAPCLRELOAS") {
        return {tariffCode: "ReliableCapital", mainRiskCode: "E36404"};
    }
    if(productCode == "CAPCLCHILDOAS") {
        return {tariffCode: "ChildCapital", mainRiskCode: "E36404"};
    }
    if(productCode == "CAPCLRELBOXOAS") {
        return {tariffCode: "ReliableCapital", mainRiskCode: "E36404"};
    }
    if(productCode == "CAPCLCHILDBOXOAS") {
        return {tariffCode: "ChildCapital", mainRiskCode: "E36404"};
    }
    if(productCode == "WCENOAS") {
        return {tariffCode: "WorthyCentury", mainRiskCode: "DLP46204"};
    }
    if(productCode == "EBMGBFKO") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMPYBFKO") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMIBFKO") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "IE36904"};
    }
    if(productCode == "EBMPFBFKO") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "RHELIGHTOAS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "RHEBASEOAS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "RHEOPTIMAOAS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "GENCHKSPORT") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "GENCHKTALENTS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "GENCHKHEALTH") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "IDG5ZENIT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "E703BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E703SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M701OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I516BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I575BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I575OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I568BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I568Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I568OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I568Akcept") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I497BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I423PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I425PSBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I425PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I455BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I455ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E400BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R532OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E641BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E703OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E703BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I652BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I652OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I652ZENIT") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I648BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I648ZENIT") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I648OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E580PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E638ZENIT") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E638AKBARS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E641BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "EBMGMINBANK") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "CMP4") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "EBMOAS2") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "C1SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "C1OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "C8OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E8OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "C15SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "C15OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E15OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E113SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R179UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R221UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M275SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M390SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M390OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E396BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E397BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E398BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E401BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E402BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E403BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E404BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E405BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E406BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E407BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I408ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I408BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I416OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I417BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I417OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I418BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I418OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E420Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E420Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E420UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E420BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E422PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I424ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I424PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I426BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I427BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I428BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I435PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I436PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E438PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I439BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I440BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I446BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I449RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I450RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I452RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I457BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I458BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I458BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I459BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I459OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I460BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I461UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I461UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I462UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I464OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I465OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I469BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I470BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I471BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I471OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I474OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I477BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I478BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E480Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E480Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E480BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E480SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M481OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M482OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E484ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E484Akbars") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E485ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E485Sinergiya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I498BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499PSBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499Akcept") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I500BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I500OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I501BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I501OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I501ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I502BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I503BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I503OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I504BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I504OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I511BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I513BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I514BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I514ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I515BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E519RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E519BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E519Sinergiya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I521RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I526RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I533BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I534BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I535BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I536BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I541BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I542BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E543Akcept") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I547BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E548Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E548ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I549BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I550BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I553BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M554BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I556BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I558RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I558BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I559BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E560BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I561BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I564BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I564OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I564BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I565BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I566BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I566OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I566BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I567BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I567OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I567BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I569BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I569OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I570BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I571BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I572BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I573BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I574BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I574OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I574BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I574ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E576PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I579BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E581PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E582PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I583OTP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I583PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I584PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I585BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I585ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I585Sinergiya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I585PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I586PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I587PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I588PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I591RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I592RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I593BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I594BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I595BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I596UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I596BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I597UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I597BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I598BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I599BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I601BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I602BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I603BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I604BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I605BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I606BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I606OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I607BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I607OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I608BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I610RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I610BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I612BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I613BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I614BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I614BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I614IPHalenko") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I620BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I625BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I626BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "C627SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I631BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I649BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I649Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I649OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I650Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I650BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I650OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I651BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I651OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I653BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I653Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I653OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E662Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I668BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I670BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I672BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I673BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I678Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I679Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E680OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E681OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M682OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M683OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I684BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I684OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I685BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I685OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I686BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I688BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I690BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I696Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M697OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I698BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I699BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E702OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I709BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I710BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M715OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "EBMG") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGP") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2PP") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3PP") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV1BFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2BFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3BFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5BFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3PPBFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5PPBFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "PROGENTICSBFKO") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "PROHEALTHBFKO") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "PROZOZHBFKO") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "E2SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E9SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E9OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E10OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E11SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E11OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E17OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E18SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E18OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A26SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A26OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A27SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A27OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A31SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A31OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E34OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E35OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R88OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R104OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R105OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E106UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E107UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E108UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E108UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E108OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E114SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E114OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E122UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E122UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E123UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E124UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E124UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A125UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E128UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E130UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E131UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A145SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A145OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A146SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A146OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E147UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E148UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E149UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E150UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E151UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E152UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E153UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E155UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E156UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E157UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E158UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E159UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E159UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E160UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E161UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E161UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E162UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E162UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E163UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E164UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E164UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E171OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E180UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A189RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I194OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I198OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E201RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R205OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I206OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I207OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E208SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E208RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E208BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E209RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E209BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E209RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I210BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I210RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I210PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I211BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I211RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I212BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I212RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E213OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E214OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E215OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E216OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A220UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I223BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I225RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I225BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I227BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E229Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E231UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E232UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E233UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E234UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E235UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E237UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E237OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E239UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E240UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E241UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E244UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E245UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E247UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E248UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E249UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E250UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E250UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E251UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E252UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E254UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I261UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I262OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I263OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I266RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I267RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E268Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E271BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E272Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E272BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I282BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I282BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I283BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I284BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I284OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I285BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E286Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E286BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E286RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E287SvyazBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E287Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E287BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E287BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E287PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E288BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E288RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I289BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I290BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291PSBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291OTP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291FinserviceBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291Raif") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291AbsolutPriv") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I292BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I293BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I295BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E298RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I299RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I300RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I301RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I302RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I303RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I305BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I306BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R307OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I308UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I308Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I308BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I308BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I309RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I309UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I309Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I309UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I309BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I309PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E310TKBBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I312PSBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I313BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R322OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E323OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I324BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I325BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I326BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I326IPHalenko") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I327BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I327BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I327PSBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I327ATBbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I327RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I327AbsolutPriv") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I328BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I328BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I331BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I331OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I331BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I332BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I333BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I334OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I335OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I336OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I337BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I338PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E339RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I340RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I341RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I343RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I344RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I345BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I346BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I346BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I348BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I349BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I349BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I350BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E354RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E355RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E356OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E357OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E358OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E359OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E360OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I361BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I362OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I364RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I365RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I366RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I367RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I368RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I369BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I370BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I371BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I372BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E374BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E375BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E376BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I380BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I382BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I383BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E384BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E385BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I389BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I392BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I393OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I394OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I395OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E409BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E409BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E410BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I421BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I466RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I467RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R483PochtaRossii") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I486RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I486Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I486UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I486Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I486BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I487Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I487UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I487Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I488RaifPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I488Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I488BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I488SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I489Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I489UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I489BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I489BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I489OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I489SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M490OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M491OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I522RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I525UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I525Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I525Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I525UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I525AbsolutPriv") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E530OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E531OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I589RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I590RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619Sinergiya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I664BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I664PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665Sinergiya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I666BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I666OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I667BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I667OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I713BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I713SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I716BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E238SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E641Sinergiya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I648SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I652SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663PSBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663PFAConsulting") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I666SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E703Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I709SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I711PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I721BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I726OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I726BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I727BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I728Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I732BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I736BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "C8SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E8SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E15SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R205SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M390MSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I418CUP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I500PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I561SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I614SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E638OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I420Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I420Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I420UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I420BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I480Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I480Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I480BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I480SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R627SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E310Investtorgbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "NOTEV2BFKO") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "NOTEV3BFKO") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "IBG5BFKO2") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2SOVKOM") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3SOVKOM") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5SOVKOM") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3PPSOVKOM") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5PPSOVKOM") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "CMP5") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CMS2") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "CCP4") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "IBA3SMP") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA5SMP") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "EBMGSMP") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "ERC2SMP") {
        return {tariffCode: "ReliableChoise2", mainRiskCode: "E36404"};
    }
    if(productCode == "I496BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I500SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I501SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I334SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I544BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I194SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I512BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I262SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I369BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I499SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I386BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I562SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I444PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I335SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I562BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I557BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I504CUP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I445PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I393SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I394SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I437PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I596UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I336SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E310ITBBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "DEMOEQUITY") {
        return {tariffCode: "DemoTariffEquity", mainRiskCode: "E36102"};
    }
    if(productCode == "E10SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R104SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R105SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E17SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E34SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E35SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E35RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M491SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I525BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619PFAConsulting") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R88SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4KitFiance") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E171SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I198SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I207SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I210SvyazBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I326SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I334MSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I335MSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I338SvyazBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E359MSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I395SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E45OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E257UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E43OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E9Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E11Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E18Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A26Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A145Luka") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Makarova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E15DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R88DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I561DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R627DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I666DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E11DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E114DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E18DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E208DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E113DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E703DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I648DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I652DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I709DRGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Nesterova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Nesterova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30Nesterova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Koroleva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Koroleva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R88Buival") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Buival") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Buival") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Buival") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Buival") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Sviderskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Belova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Belova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Openworld") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Openworld") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Openworld") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I194Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E17Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R205Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Tatian") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E8Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A26Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A27Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A145Gadaeva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I262Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Apacheva") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Mettus") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Mettus") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Mettus") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Mettus") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Mettus") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139SRGDLPull") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1SRGDLPull") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22SRGDLPull") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A145SRGDLPull") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144SRGDLPull") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E238SRGDLPull") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Nagornova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E18Nagornova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Nagornova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Nagornova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Nagornova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I262Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Vahitova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Tatarskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I194Tatarskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Tatarskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Tatarskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Tatarskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Vandorskih") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Markova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Markova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Markova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Markova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Markova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Markova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Starkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Starkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Starkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Starkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E18Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E11Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E17Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A30Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Tsutskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Rzhevusskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Rzhevusskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Rzhevusskaya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I394Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Burova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I262Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I194Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Chizhikova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Khusainova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R103Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M217Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Yamenskov") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Sankova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Sankova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Sankova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Sankova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Sankova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Kozlova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E1Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E17Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R205Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A144Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A138Solodukhina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E16Mirlina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E3Mirlina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Mirlina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A218Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E2Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M390Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E4Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "M491Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Nilova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R203Murzagildina") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A22Semyanova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A23Semyanova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "A139Semyanova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "DRGSLPart") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I664SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I726Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665Svc") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "NOTE2BFKO") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "NOTE3BFKO") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "IBG3BFKO2") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBA3REINVEST") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA5REINVEST") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IDG1REINVEST") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG3REINVEST") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG5REINVEST") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGREINVEST") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "NOTE1BFKO") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "MOPROZVBFKO") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "MOPROCHEKVBFKO") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "EBMGZENIT") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMOPTIMAOAS2") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "NOTE1BFKO3") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI3BFKO17") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5BFKO17") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IDGV2PPBFKO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "NOTE1BFKO4") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "CMC") {
        return {tariffCode: "CreditLife", mainRiskCode: undefined};
    }
    if(productCode == "IDGV2VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV1VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP1VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP2VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP3VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP5VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP2PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP3PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP5PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "E253UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E257UCB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I437PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I444PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I445PrimSocBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I562RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I758Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I759Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I760Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I761Pashkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I762Pashkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I771InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I779InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I703ZENITP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I619ZENITP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "R725OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I291RaifA") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665SvcR") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I724SvcR") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I713SvcR") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I386BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I451RGSBank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I496BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I512BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I544BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I557BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I731BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I752BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I758BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I765BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I768BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I771BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I779BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I785BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I776BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "EBMGVVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IBI3ZENIT17") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBI5ZENIT17") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "I782BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I782InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I739BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I726InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I736InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I735VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I787BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I787InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDGV4VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV4PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP4VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP4PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "TERMVVTB") {
        return {tariffCode: "TermLife", mainRiskCode: undefined};
    }
    if(productCode == "NOTEV1BFKO") {
        return {tariffCode: "Note", mainRiskCode: "E36904"};
    }
    if(productCode == "CRHELIGHTOAS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "CRHEBASEOAS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "CRHEOPTIMAOAS") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "EBMGBESTVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "C807SAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I780VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I793BFKOP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I793Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS373") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS391") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS311893") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS458907") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS746926") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS882248") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS67481") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS236055") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS200157") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS800") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS581581") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS63440") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS34") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "NSIBPOOLS192559") {
        return {tariffCode: "MedFixed", mainRiskCode: undefined};
    }
    if(productCode == "IDGV1ROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2ROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3ROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5ROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3PPROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5PPROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2PPROSBANK") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "I665Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I712PSB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I815VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I817InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "CorpDMS19633") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "E106UCBPrivate") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E519SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E619SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E619InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E663VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E663Pashkova") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E664RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E664BFKO") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E664OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E664PFAConsulting") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E664InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E665Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E698RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E709SMPbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E713Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724Zenit") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E738RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E807RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E665OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E721SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E726VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E726PFAConsulting") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "NSIBCHOP") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBKIDS") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBVISITORS247457") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBADULTS247457") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBKIDSA247457") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBVISITORS677") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBVISITORS192559") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBVISITORS495476") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBADULTS677") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBADULTS192559") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBADULTS495476") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBKIDSA677") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBKIDSA192559") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "NSIBKIDSA495476") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "MIXED247457") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "MIXED192559") {
        return {tariffCode: "MedFixed", mainRiskCode: "E36404"};
    }
    if(productCode == "IBAP3VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAP5VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAV3VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAV5VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "ECATFPVTB") {
        return {tariffCode: "CareAboutTheFuture", mainRiskCode: "E36404"};
    }
    if(productCode == "ECATFVVTB") {
        return {tariffCode: "CareAboutTheFuture", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGRETVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "ECOFPVTB") {
        return {tariffCode: "CareAboutTheFamily", mainRiskCode: "E36404"};
    }
    if(productCode == "ECOFVVTB") {
        return {tariffCode: "CareAboutTheFamily", mainRiskCode: "E36404"};
    }
    if(productCode == "IBA2P3") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "EBMMGREINVEST") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IBAKVP5VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAKVV5VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "EBMGLIFEINVEST") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG1LIFEINVEST") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG3LIFEINVEST") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG5LIFEINVEST") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "I562RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663Gorizont") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I664RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I664Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I698RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I716Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I716VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I738RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I794VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I807RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I807VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I808VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I820Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I827Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I828Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "EBMGPB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP2PB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGP3PB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "I665VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I736VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E792VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I796VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I796OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E818Primorye") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I823VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E825VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDGP5PB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "E519Gorizont") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I664VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E724Primorye") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E791VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I821VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E833RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDGV5OAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5PPOAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3OAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3PPOAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGN3") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGN5") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGN") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "I619VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I665PFAConsulting") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "E792RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I795OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I838VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IBA2P3VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA2P5VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA2V3VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBA2V5VTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "EBMGNRETVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGNVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN1VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN2VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN3VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN5VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN2PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN3PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN5PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN4VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGPN4PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "ECATFZENIT") {
        return {tariffCode: "CareAboutTheFuture", mainRiskCode: "E36404"};
    }
    if(productCode == "EBMGNT") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG3NT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG5NT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "E844RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDG2UBRR") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG3UBRR") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG5UBRR") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IBAKVP5PEVTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "IBAKVV5PEVTB") {
        return {tariffCode: "BasisInvest", mainRiskCode: "E36904"};
    }
    if(productCode == "ECATFUBRR") {
        return {tariffCode: "CareAboutTheFuture", mainRiskCode: "E36404"};
    }
    if(productCode == "I713VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I851VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "PREEQUITYVTB") {
        return {tariffCode: "PreEquity", mainRiskCode: "E36914"};
    }
    if(productCode == "EBMGUBRR") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "I846VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I852VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I832InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "UNIVERSAL_ENDOWMENT") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "UNIVERSAL_INVESTMENT") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "UNIVERSAL_CREDIT") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "UNIVERSAL_RISK") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "UNIVERSAL_MED") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "UNIVERSAL_EQUITY") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I855InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "ACCIDPC") {
        return {tariffCode: "AccidentFixed", mainRiskCode: undefined};
    }
    if(productCode == "I802OAS") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I886VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I866VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDG3ZENIT") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "ECOF2ZENIT") {
        return {tariffCode: "CareAboutTheFamily", mainRiskCode: "E36404"};
    }
    if(productCode == "E792DATAB") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I795VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I848VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I867InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "EBM3GUBRR") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "I799VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I726SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDG2RETVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG3RETVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG5RETVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "PREEQUITYPVTB") {
        return {tariffCode: "PreEquity", mainRiskCode: "E36914"};
    }
    if(productCode == "I619AbsolutPriv") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663SvcP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I795Primorye") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I820PFAConsulting") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I832Rosbank") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I852Gorizont") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I872VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I663ZENITP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "WCEN3OAS") {
        return {tariffCode: "WorthyCentury", mainRiskCode: "DLP46204"};
    }
    if(productCode == "IOCVVTB") {
        return {tariffCode: "OptimalChoiceUltra", mainRiskCode: "E36914"};
    }
    if(productCode == "IOCPVTB") {
        return {tariffCode: "OptimalChoiceUltra", mainRiskCode: "E36914"};
    }
    if(productCode == "EBMGVNVTB") {
        return {tariffCode: "BeMillionaire", mainRiskCode: "E36404"};
    }
    if(productCode == "I885VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "ACCIDPC2") {
        return {tariffCode: "AccidentFixed", mainRiskCode: undefined};
    }
    if(productCode == "I876InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I877InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDGVN4VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN4PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV3VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV5VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN2VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN3VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN5VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDG1EKSPO") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN1VTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN2PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN3PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGVN5PPVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "PREEQUITYOAS") {
        return {tariffCode: "PreEquity", mainRiskCode: "E36914"};
    }
    if(productCode == "IDGV2OAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGV2PPOAS") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "I619Gorizont") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I726Gorizont") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I794RGSL") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I818VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I820VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I889VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I890VTBP") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I891InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "I892InnResheniya") {
        return {tariffCode: "Migrated", mainRiskCode: undefined};
    }
    if(productCode == "IDGN2RETVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGN3RETVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
    if(productCode == "IDGN5RETVTB") {
        return {tariffCode: "BasisGuarant", mainRiskCode: "E36404"};
    }
};
