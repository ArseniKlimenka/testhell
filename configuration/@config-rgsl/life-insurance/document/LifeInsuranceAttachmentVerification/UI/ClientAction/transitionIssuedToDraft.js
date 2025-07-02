module.exports = async function transitionIssuedToDraft(input, ambientProperties) {

    this.view.makeTransition("Issued_to_Draft");

};
