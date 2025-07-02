module.exports = async function transitionDraftToIssued(input, ambientProperties) {

    await this.view.save();
    this.view.makeTransition("Draft_to_Issued");

};
