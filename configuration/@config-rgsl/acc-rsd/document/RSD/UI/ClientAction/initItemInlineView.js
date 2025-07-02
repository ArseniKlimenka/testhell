module.exports = function initItemInlineView(input) {
    const rsdNumber = input.context.Number;

    if (rsdNumber) {
        this.getCurrentView().setSearchRequest({
            data: {
                criteria: {
                    rsdNumber,
                    groupByContract: true,
                }
            }
        });

        this.getCurrentView().setProtectedFields(['rsdNumber']);
        this.getCurrentView().search();
    }
};
