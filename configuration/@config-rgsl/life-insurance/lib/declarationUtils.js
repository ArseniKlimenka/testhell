'use strict';

const { packageCode, product, contractType, actor, quoteState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { declarationItemNumbers } = require('@config-rgsl/life-insurance/lib/declarationConstants');

module.exports = {
    /**
     * @desc Sets the product code to search for items of the declaration,
     * if the following conditions are met: product selection, matching the stowed conditions by age
     * @param {object} this context of document
     * @param {object} key key to select additional conditions
     */
    declarationFill: function (that, key) {
        const rootData = that.businessContext.rootData;
        let productCode = getValue(rootData, 'mainInsuranceConditions.insuranceProduct.productCode');
        const productGroup = getValue(rootData, 'mainInsuranceConditions.insuranceProduct.productGroup');
        const insuredPersonBirthDay = getValue(rootData, 'insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth');
        const declarationArray = getValue(rootData, `declaration${key}`);
        const issueDate = getValue(rootData, 'basicConditions.issueDate', dateHelper.newDateAsString());
        const fullYear = dateHelper.getYearDifference(insuredPersonBirthDay, issueDate);

        if (!insuredPersonBirthDay) { productCode = undefined; }
        // productCode = this.stopRepeat(declarationArray, fullYear, productCode);
        productCode = productCode ? this.ageControl(fullYear, productGroup, productCode, key) : productCode;

        return productCode;
    },
    /**
     * @desc Checking for duplicate search terms
     */
    stopRepeat: function (declarationArray, fullYear, productCode) {
        if ((declarationArray.length > 0) && (declarationArray[0].fullYear == fullYear)
            && (declarationArray[0].productCode == productCode)) {
            return undefined;
        }
        return productCode;
    },
    /**
     * @desc Checking the age of the insured to form special search conditions
     */
    ageControl: function (fullYear, productGroup, productCode, key) {
        let result = productCode;
        if (productGroup == 'investment' && key == 'Medical') {
            if (fullYear <= 75) { result = `${productCode}Y`; }
            else if (fullYear > 75 || productCode[productCode.length - 1] == 3) { result = `${productCode}O`; }
            else { result = undefined; }
        }
        return result;
    },

    applyDataTax: function(dataSourceResponse, that) {

        if (! that.businessContext.rootData?.socialTaxDeduction || that.businessContext.rootData?.socialTaxDeduction.length == 0) {
            return [
                {
                    id: dataSourceResponse.data[0]?.resultData?.id,
                    itemText: dataSourceResponse.data[0]?.resultData?.itemText,
                    isAgree: false,
                    isDenied: false,
                    isUndecided: false
                }
            ];
        }

        return [
            {
                id: that.businessContext.rootData?.socialTaxDeduction[0]?.id,
                itemText: that.businessContext.rootData?.socialTaxDeduction[0]?.itemText,
                isAgree: that.businessContext.rootData?.socialTaxDeduction[0]?.isAgree,
                isDenied: that.businessContext.rootData?.socialTaxDeduction[0]?.isDenied,
                isUndecided: that.businessContext.rootData?.socialTaxDeduction[0]?.isUndecided,
            }
        ];

    },

    /**
     * @desc Search result processing. Forming an array to form a table.
     * Checking the previous version of the table to transfer the filling result
     * @param {array} oldArray empty or old version of table
     * @param {array} dataSourceResponse result of search
     * @param {object} this context of document
     */
    applyDataMed: function (oldArray, dataSourceResponse, that) {
        const rootData = that.businessContext.rootData;
        const productCode = getValue(rootData, 'mainInsuranceConditions.insuranceProduct.productCode');
        const insuredPersonBirthDay = getValue(rootData, 'insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth');
        const issueDate = getValue(rootData, 'basicConditions.issueDate', dateHelper.newDateAsString());
        const fullYear = dateHelper.getYearDifference(insuredPersonBirthDay, issueDate);
        const creditProgramId = getValue(rootData, 'creditProgram.creditProgramId');

        let responce = dataSourceResponse.data.map(element => {
            return {
                departament: element.resultData.departament,
                itemNumber: element.resultData.itemNumber,
                itemText: element.resultData.itemText,
                itemTextID: element.resultData.itemTextID,
                agreement: true,
                fullYear,
                productCode,
            };
        }).sort((a, b) => a.itemNumber - b.itemNumber);

        if (oldArray.length > 0 && oldArray.some(elementOA => elementOA.agreement == false)) {
            responce.forEach(elementNA => {
                const flag = oldArray.findIndex(elementOA => {
                    return (elementOA.agreement == false) && (elementOA.itemTextID == elementNA.itemTextID);
                });
                if (flag != -1) {
                    elementNA.agreement = oldArray[flag].agreement;
                    elementNA.comment = oldArray[flag].comment;
                }
            });
        }

        responce = this.filterResponceMed(responce, productCode, that, fullYear, creditProgramId);

        return responce;
    },
    /**
     * @desc Search result processing. Forming an array to form a table.
     * Checking the previous version of the table to transfer the filling result
     * @param {array} oldArray empty or old version of table
     * @param {array} dataSourceResponse result of search
     * @param {object} this context of document
     */
    applyDataMain: function (oldArray, dataSourceResponse, that) {
        const rootData = that.businessContext.rootData;
        const productCode = getValue(rootData, 'mainInsuranceConditions.insuranceProduct.productCode');
        const insuredPersonBirthDay = getValue(rootData, 'insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth');
        const issueDate = getValue(rootData, 'basicConditions.issueDate', dateHelper.newDateAsString());
        const fullYear = dateHelper.getYearDifference(insuredPersonBirthDay, issueDate);
        const creditProgramId = getValue(rootData, 'creditProgram.creditProgramId');

        let responce = dataSourceResponse.data.map(element => {
            return {
                departament: element.resultData.departament,
                itemNumber: element.resultData.itemNumber,
                itemText: element.resultData.itemText,
                itemTextID: element.resultData.itemTextID,
                agreementInsuredPerson: true,
                agreementPolicyHolder: true,
                fullYear,
                productCode,
            };
        }).sort((a, b) => a.itemNumber - b.itemNumber);

        const check = oldArray.some(elementOA => {
            return (elementOA.agreementInsuredPerson == false) || (elementOA.agreementPolicyHolder == false);
        });

        if (oldArray.length > 0 && check) {
            responce.forEach(elementNA => {
                const flag = oldArray.findIndex(elementOA => {
                    return ((elementOA.agreementInsuredPerson == false) || (elementOA.agreementPolicyHolder == false)) && (elementOA.itemTextID == elementNA.itemTextID);
                });
                if (flag != -1) {
                    elementNA.agreementInsuredPerson = oldArray[flag].agreementInsuredPerson;
                    elementNA.commentInsuredPerson = oldArray[flag].commentInsuredPerson;
                    elementNA.agreementPolicyHolder = oldArray[flag].agreementPolicyHolder;
                    elementNA.commentPolicyHolder = oldArray[flag].commentPolicyHolder;
                }
            });
        }

        responce = this.filterResponceMain(responce, productCode, that, fullYear, creditProgramId);

        return responce;
    },
    /**
     * @desc Search result processing. Forming an array to form a table.
     * Checking the previous version of the table to transfer the filling result
     * @param {array} oldArray empty or old version of table
     * @param {array} dataSourceResponse result of search
     * @param {object} this context of document
     */
    applyDataSport: function (oldArray, dataSourceResponse, that) {

        const rootData = that.businessContext.rootData;
        const productCode = rootData.mainInsuranceConditions?.insuranceProduct?.productCode;

        let response = dataSourceResponse.data.map(element => {
            return {
                departament: element.resultData.departament,
                itemNumber: element.resultData.itemNumber,
                itemText: element.resultData.itemText,
                itemTextID: element.resultData.itemTextID,
                agreementInsuredPerson: true,
                agreementPolicyHolder: true,
                productCode,
            };
        }).sort((a, b) => a.itemNumber - b.itemNumber);

        const check = oldArray.some(elementOA => {
            return (elementOA.agreementInsuredPerson == false) || (elementOA.agreementPolicyHolder == false);
        });

        if (oldArray.length > 0 && check) {
            response.forEach(elementNA => {
                const flag = oldArray.findIndex(elementOA => {
                    return ((elementOA.agreementInsuredPerson == false) || (elementOA.agreementPolicyHolder == false)) && (elementOA.itemTextID == elementNA.itemTextID);
                });
                if (flag != -1) {
                    elementNA.agreementInsuredPerson = oldArray[flag].agreementInsuredPerson;
                    elementNA.commentInsuredPerson = oldArray[flag].commentInsuredPerson;
                    elementNA.agreementPolicyHolder = oldArray[flag].agreementPolicyHolder;
                    elementNA.commentPolicyHolder = oldArray[flag].commentPolicyHolder;
                }
            });
        }

        response = this.filterResponseSport(response, productCode, that);

        return response;
    },
    /**
     * @desc Checking the obligatory filling of the field before making changes to the table
     */
    agreementEmpty: function (data) {
        const { agreement } = data;
        let result = false;
        if (!agreement) { result = true; }
        return result;
    },
    /**
     * @desc Checking the obligatory filling of the field before making changes to the table
     */
    commentEmpty: function (data) {
        const { agreement, comment } = data;
        let result = false;
        if (agreement == false && !comment) { result = true; }
        return result;
    },
    /**
     * @desc Checking the obligatory filling of the field before making changes to the table
     */
    agreementEmptyMain: function (data) {
        const { agreementPolicyHolder, agreementInsuredPerson } = data;
        let result = false;
        if (!agreementPolicyHolder || !agreementInsuredPerson) { result = true; }
        return result;
    },
    /**
     * @desc Checking the obligatory filling of the field before making changes to the table
     */
    commentEmptyMain: function (data) {
        const { agreementPolicyHolder, agreementInsuredPerson, commentPolicyHolder, commentInsuredPerson } = data;
        let result = false;
        if ((agreementPolicyHolder == false && !commentPolicyHolder) || (agreementInsuredPerson == false && !commentInsuredPerson)) { result = true; }
        return result;
    },

    filterResponceMed: function (responce, productCode, that, fullYear, creditProgramId) {
        const rootData = that.businessContext.rootData;
        const risks = getValue(rootData, 'risks', []);
        const issueDate = getValue(rootData, 'basicConditions.issueDate', dateHelper.newDateAsString());

        if (productCode.indexOf('EFR') > -1) {
            const trigger = risks.some(element => ['CDHR10800', 'CDHW10800'].includes(element.risk.riskCode));

            if (trigger == false) {
                responce = responce.filter(element => element.itemNumber < 9);
            }
        }

        if ([product.EBMOAS, product.EBMZENIT, product.EBMAKBARS, product.EBMAKCEPT, product.EBMBFKO].includes(productCode)) {

            if (risks.some(x => x.risk.riskCode == 'DLPVV6536404')) {
                responce = responce.filter(element => ['2', '3', '4', '6', '8', '9', '10'].includes(element.itemNumber));
            }
            else
                if (risks.some(x => x.risk.riskCode == 'DLPVV7036404')) {
                    responce = responce.filter(element => ['2', '3', '4', '7', '8', '9', '10'].includes(element.itemNumber));
                }
                else {
                    if (fullYear <= 55) {
                        responce = responce.filter(element => ['1', '3', '4', '5', '8', '9', '10'].includes(element.itemNumber));
                    }
                    if (fullYear >= 56 && fullYear <= 65) {
                        responce = responce.filter(element => ['2', '3', '4', '6', '8', '9', '10'].includes(element.itemNumber));
                    }
                    if (fullYear >= 66) {
                        responce = responce.filter(element => ['2', '3', '4', '7', '8', '9', '10'].includes(element.itemNumber));
                    }
                }

            responce.forEach((item, idx) => item.itemNumber = (idx + 1).toString());

        }

        if (productCode.indexOf('CACB') > -1) {

            if (dateHelper.isBefore(dateHelper.formatDate(issueDate), dateHelper.formatDate('2022-10-01'))) {
                if (['РЖ12', 'РЖ15'].includes(creditProgramId)) {
                    responce = responce.filter(element => ['1', '3'].includes(element.itemNumber));
                }
                else {
                    responce = responce.filter(element => ['1', '2', '3'].includes(element.itemNumber));
                }
            }
            else {
                if (['РЖ08', 'РЖ36'].includes(creditProgramId)) {
                    responce = responce.filter(element => ['101', '102', '104', '105', '106'].includes(element.itemNumber));
                }
                else if (['РЖ12', 'РЖ15'].includes(creditProgramId)) {
                    responce = responce.filter(element => ['101', '104', '105', '106'].includes(element.itemNumber));
                }
                else {
                    responce = responce.filter(element => ['101', '103', '104', '105', '106'].includes(element.itemNumber));
                }
            }

            responce.forEach((item, idx) => item.itemNumber = (idx + 1).toString());

        }

        if ([product.TERMVVTB].includes(productCode)) {

            responce.sort((a, b) => Number(a.itemNumber) < Number(b.itemNumber) ? -1 : 1);
            const isAmateurSport = getValue(rootData, 'amateurSportCondition.amateurSportOption', false);
            const existsCDH10800 = risks.some(element => ['CDHR10800', 'CDHW10800'].includes(element.risk.riskCode));

            if (!isAmateurSport || !existsCDH10800) {

                let result = responce.filter((decl) => {
                    return (decl.itemNumber >= 0 && decl.itemNumber < 10); });

                if (isAmateurSport)
                { result = result.concat(responce.filter((decl) => {
                    return (decl.itemNumber >= 10 && decl.itemNumber < 21); })); }

                if (existsCDH10800)
                { result = result.concat(responce.filter((decl) => {
                    return (decl.itemNumber > 20 && decl.itemNumber < 31); })); }

                for (let i = 0; i < result.length; i++)
                { result[i].itemNumber = (i + 1).toString(); }

                responce = result;
            }
        }

        if ([product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(productCode)) {

            responce.sort((a, b) => Number(a.itemNumber) < Number(b.itemNumber) ? -1 : 1);
            const existsCDHR10800 = risks.some(element => ['CDHR10800'].includes(element.risk.riskCode));

            if (!existsCDHR10800) {

                let result = responce.filter((decl) => {
                    return (decl.itemNumber >= 0 && decl.itemNumber < 9); });

                result = result.concat(responce.filter((decl) => {
                    return (decl.itemNumber == 10); }));

                for (let i = 0; i < result.length; i++) {
                    result[i].itemNumber = (i + 1).toString();
                }

                responce = result;
            }
            else {
                const result = responce.filter((decl) => {
                    return (decl.itemNumber != 10); });

                for (let i = 0; i < result.length; i++) {
                    result[i].itemNumber = (i + 1).toString();
                }

                responce = result;
            }
        }

        return responce;
    },

    filterResponceMain: function (responce, productCode, that, fullYear, creditProgramId) {
        const rootData = that.businessContext.rootData;
        const issueDate = getValue(rootData, 'basicConditions.issueDate', dateHelper.newDateAsString());

        if (productCode.indexOf('CACB') > -1) {

            if (dateHelper.isBefore(dateHelper.formatDate(issueDate), dateHelper.formatDate('2022-10-01'))) {

                if (['РЖ12', 'РЖ15', 'РЖ20', 'РЖ24', 'РЖ27', 'РЖ30', 'РЖ33', 'РЖ35'].includes(creditProgramId)) {
                    responce = responce.filter(element => ['5', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].includes(element.itemNumber));
                }
                else {
                    responce = responce.filter(element => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].includes(element.itemNumber));
                }

                responce.sort((a, b) => {
                    if (a.itemNumber == '13') { return -1; }
                    if (b.itemNumber == '13') { return 1; }
                });

            }
            else {

                if (['РЖ12', 'РЖ15', 'РЖ20', 'РЖ24', 'РЖ27', 'РЖ30', 'РЖ33', 'РЖ35'].includes(creditProgramId)) {
                    responce = responce.filter(element => ['105', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122'].includes(element.itemNumber));
                }
                else {
                    responce = responce.filter(element => ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122'].includes(element.itemNumber));
                }

                responce.sort((a, b) => {
                    if (a.itemNumber == '113') { return -1; }
                    if (b.itemNumber == '113') { return 1; }
                });

            }

            responce.forEach((item, idx) => item.itemNumber = (idx + 1).toString());

        }

        return responce;
    },

    filterResponseSport: function (response, productCode, that) {
        response.sort((a, b) => Number(a.itemNumber) < Number(b.itemNumber) ? -1 : 1);
        const rootData = that.businessContext.rootData;
        const isAmateurSport = rootData.amateurSportCondition?.amateurSportOption;
        const selectedPackages = rootData.riskConditions?.risksPackages?.selectedPackages;

        if ([product.TERMVVTB].includes(productCode)) {

            if (isAmateurSport) {

                if (selectedPackages.some(pack => pack.packageCode == packageCode.TERMVVTB2)) {

                    response = response.filter(decl => declarationItemNumbers.TERMVVTB.withAmateurSport.withSecondPackage.includes(decl.itemNumber));
                    return this.renumberDeclarationItems(response);
                }

                response = response.filter(decl => declarationItemNumbers.TERMVVTB.withAmateurSport.withoutSecondPackage.includes(decl.itemNumber));
                return this.renumberDeclarationItems(response);
            }

            response = response.filter(decl => declarationItemNumbers.TERMVVTB.withoutAmateurSport.includes(decl.itemNumber));
            return this.renumberDeclarationItems(response);
        }

        return response;
    },

    renumberDeclarationItems: function (declarationItems) {
        return declarationItems.map((item, idx) => {
            item.itemNumber = (idx + 1).toString();
            return item;
        });
    },

    isManualCorrectionVisible: function (input) {
        const documentContractType = input.context.Dimensions.contractType;

        if (documentContractType != contractType.Quote) {
            return false;
        }

        const documentState = input.context.State?.Code;
        const currentActor = input.context.WorkUnitActor.CurrentActor;

        const allowedActors = [actor.Operations, actor.Underwriter];

        return documentState == quoteState.OnReview && allowedActors.includes(currentActor);
    }
};
