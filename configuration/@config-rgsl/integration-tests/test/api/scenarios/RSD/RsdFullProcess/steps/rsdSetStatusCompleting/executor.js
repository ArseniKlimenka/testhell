const { VersionedDocumentBuilder } = require('@adinsure-tools/api-test-framework');
const { rsdStatusIds } = require('@config-rgsl/acc-rsd/lib/rsdConsts');

async function executor(step, context, stepContext) {

    setStatus(context.rsdNumber);
}

async function setStatus(rsdNumber) {
    const builder = new VersionedDocumentBuilder('RSD');
    const data = await builder
        .getDocumentByNumber(rsdNumber)
        .makeTransition('Draft_To_Completing', rsdStatusIds.COMPLETING)
        .build();
}

module.exports = {
    executor,
};
