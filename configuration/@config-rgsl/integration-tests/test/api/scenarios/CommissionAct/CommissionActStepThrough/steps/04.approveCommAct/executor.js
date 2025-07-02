const { commissionActStatusCode } = require('../../../../../../../../acc-base/lib/actConsts');
const ca = require('../../../../lib/commissionAct/executor');

async function executor(step, context, stepContext) {
    const act = context.act;

    await ca.setStatus(act.number, 'Draft_To_Confirming', commissionActStatusCode.CONFIRMING, stepContext.actor);
    console.log('Act confirming');
    await ca.setStatus(act.number, 'Confirming_To_Confirmed', commissionActStatusCode.CONFIRMED, stepContext.actor);
    console.log('Act confirmed');
    await ca.setStatus(act.number, 'Confirmed_To_Approved', commissionActStatusCode.APPROVED, stepContext.actor);
    console.log('Act approved');
}

module.exports = {
    executor,
};
