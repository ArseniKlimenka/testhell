module.exports = async function transitionDraftToCancelled(input, ambientProperties) {

    await this.view.save();
    this.view.makeTransition("Draft_to_Cancelled");

};
