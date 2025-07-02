module.exports = function initHistoryInlineView(input) {

    const documentNo = input.context.Number;

    if (documentNo) {

        this.getCurrentView().setSearchRequest({
            data: {
                criteria: {
                    documentNo,
                }
            }
        });

        this.getCurrentView().setProtectedFields(['documentNo']);
        this.getCurrentView().search();
    }
};
