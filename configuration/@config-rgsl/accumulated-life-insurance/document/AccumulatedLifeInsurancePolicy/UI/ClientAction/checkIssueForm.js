const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function checkIssueForm(input, ambientProperties) {

    const issueForm = getValue(input.context.Body, 'issueForm.code.issueFormCode');

    if (issueForm === 'ePolicy') {

        this.view.startBlockingUI();

        const infoRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetVerifiedSmsCodeInfoDataSource',
            data: {
                data: {
                    criteria: {
                        referenceNo: input.context.Number,
                    }
                }
            }
        };

        let isVerified = undefined;

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(infoRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        isVerified = result.data && result.data.length > 0;

        if (!isVerified) {

            throw 'Необходимо выполнить проверку кода подтверждения!';
        }
    }
};
