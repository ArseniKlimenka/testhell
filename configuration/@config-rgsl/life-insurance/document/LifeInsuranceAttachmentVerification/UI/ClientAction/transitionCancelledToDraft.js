module.exports = async function transitionCancelledToDraft(input, ambientProperties) {

    await this.view.save();
    this.view.makeTransition("Cancelled_to_Draft");

};
