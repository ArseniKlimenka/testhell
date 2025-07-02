/**
 * @errorCode {errorCode} OrderNumberWrongFormat
 * @errorCode {errorCode} MvzNumberWrongFormat
 */

module.exports = function searchCriteriaValidation(input) {

    const errors = [];
    const dataPath = this.businessContext.dataPath;
    const orderNumber = input['orderNumber'];
    const mvzNumber = input['mvzNumber'];

    if (orderNumber) {

        const pattern = /^[0-9]{7}$/;
        const result = orderNumber.match(pattern);

        if (!result) {

            errors.push({
                errorCode: 'OrderNumberWrongFormat',
                errorDataPath: `${dataPath}/orderNumber`
            });
        }
    }

    if (mvzNumber) {

        const pattern = /^[0-9]{2}-[0-9]{2}-[0-9]{3}$/;
        const result = mvzNumber.match(pattern);

        if (!result) {

            errors.push({
                errorCode: 'MvzNumberWrongFormat',
                errorDataPath: `${dataPath}/mvzNumber`
            });
        }
    }

    return errors;
};
