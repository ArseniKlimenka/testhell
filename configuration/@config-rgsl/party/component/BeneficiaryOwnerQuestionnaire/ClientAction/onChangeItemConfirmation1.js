module.exports = function onChangeItemConfirmation1(input, ambientProperties) {

    const answer = input.data?.answer ?? false;
    if (!answer) {
        const q = input.componentContext.questionnaire1;
        if (q) {
            q.relationType = undefined;
            q.position = undefined;
            q.employerName = undefined;
            q.employerAddress = undefined;
        }
    }

    this.view.reevaluateRules();
};
