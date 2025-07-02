module.exports = async function groupByContractChanged(input, ambientProperties) {
    input.context.Body.groupByContract = input.actionData.documentView.getContext().request.data.criteria.groupByContract;
};
