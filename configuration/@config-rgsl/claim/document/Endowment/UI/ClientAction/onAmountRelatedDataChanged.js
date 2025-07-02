
module.exports = async function onAmountRelatedDataChanged(input, ambientProperties) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
