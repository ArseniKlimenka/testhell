const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc Validation of party phone
     * @param {object} input party phone from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    emailValidation: function (input, self) {

        const validationErrors = [];
        const viewContextBody = self.view && self.view.getContext() && self.view.getContext().Body || {};
        const body = getValue(self, 'businessContext.rootData') || viewContextBody;
        const dataPath = getValue(self, 'businessContext.dataPath');
        const emails = getValue(body, 'partyEmails');
        const email = getValue(input, 'email');

        if (!email || !email.match(/^.+@.+\..+$/)) {
            validationErrors.push({
                errorCode: "emailFormat",
                errorDataPath: dataPath + '/email'
            });
        }

        if (emails && emails.some(item => item.email === email && item !== input)) {
            validationErrors.push({
                errorCode: "emailDuplicate",
                errorDataPath: dataPath + '/email'
            });
        }

        return validationErrors;
    }
};
