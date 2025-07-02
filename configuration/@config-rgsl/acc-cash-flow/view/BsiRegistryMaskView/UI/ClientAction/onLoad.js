// eslint-disable-next-line import/no-unresolved
const dataSourceProxy = require('@adinsure/datasource');

module.exports = async function onLoad(input, ambientProperties) {

    const dsInput = {
        criteria: {
        }
    };

    const workUnitActor = ambientProperties.currentWorkUnitActor;
    const result = await dataSourceProxy.invoke('GetAllRegistryMaskDataSource', dsInput, workUnitActor);
    const body = input.context.Body;

    for (const element of result.data) {
        body.rules.push({
            accountNumber: element.resultData.accountNumber,
            paymentDescription: element.resultData.paymentDescription,
        });
    }
};
