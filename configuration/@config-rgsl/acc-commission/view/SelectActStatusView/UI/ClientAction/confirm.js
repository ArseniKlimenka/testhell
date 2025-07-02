module.exports = function confirm(input, ambientProperties) {
    const body = input.context.Body;

    const { dialogContext } = input.context;
    dialogContext.outputContext.actStateCode = body.actStateCode;

    dialogContext.closeDialog();
};
