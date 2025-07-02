module.exports = function onChangeItemConfirmation3(input, ambientProperties) {

    const answer = input.data?.answer ?? false;
    if (!answer) {
        const q = input.componentContext.questionnaire3;
        if (q) {
            q.relationType = undefined;
            q.position = undefined;
            q.employerName = undefined;
            q.employerAddress = undefined;
        }
    }

    this.view.reevaluateRules();
};
