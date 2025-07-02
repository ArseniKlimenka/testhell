
module.exports = function initRecipientsListView(input, ambientProperties) {

    const number = input.rootContext.Number;

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                claimNumber: number
            }
        }
    });

    if (number) {

        this.getCurrentView().search();
    }
};
