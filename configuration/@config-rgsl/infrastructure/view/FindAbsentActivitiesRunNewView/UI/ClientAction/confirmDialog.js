module.exports = async function confirmDialog(input, ambientProperties) {

    const { dialogContext, Body } = input.context;
    dialogContext.outputContext.dateFrom = Body.dateFrom;
    dialogContext.outputContext.dateTo = Body.dateTo;
    dialogContext.outputContext.success = true;
    dialogContext.closeDialog();
};
