module.exports = function onChangeIsFixedRate(input, ambientProperties) {

    const isFixedRate = input.componentContext.isFixedRate ?? false;
    const exchangeRate = input.componentContext.exchangeRate;

    if (!isFixedRate && exchangeRate) {

        delete input.componentContext.exchangeRate;
    }

    this.rebindComponent();
};
