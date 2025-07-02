module.exports = function closeDialog(input) {
    const { dialogContext } = input.context;

    dialogContext.closeDialog();
};
