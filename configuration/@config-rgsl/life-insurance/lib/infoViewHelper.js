const { salesGroupByPartnerCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { infoViewConfiguration } = require('@config-rgsl/life-insurance/lib/infoViewConfiguration');

module.exports = {

    /**
     * @desc Get url of item for InfoView
     * @param {object} ambientProperties ambientProperties
     * @returns {strung} url of item
     */
    getItemUrl: function (ambientProperties, itemNumber) {

        const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];

        let partnerCode;
        Object.keys(salesGroupByPartnerCode).forEach(item => {
            if (currentUserGroups.some(element => element.UserGroupName == salesGroupByPartnerCode[item]))
            { partnerCode = item; }
        });

        const infoViewConfig = partnerCode && infoViewConfiguration({ partnerCode });
        const url = infoViewConfig && infoViewConfig['text' + itemNumber + 'Url'];

        return url;

    }

};
