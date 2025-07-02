module.exports = function onChangeItemConfirmation2(input, ambientProperties) {

    const answer = input.data?.answer ?? false;
    if (!answer) {
        const q = input.componentContext.questionnaire2;
        if (q) {
            q.relationType = undefined;
            q.position = undefined;
            q.employerName = undefined;
            q.employerAddress = undefined;
        }
    }

    this.view.reevaluateRules();
};
