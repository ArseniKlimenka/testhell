module.exports = async function transitionCancelledToDraftOperations(input, ambientProperties) {

    this.view.makeTransition("Cancelled_to_Draft_Operations");

};
