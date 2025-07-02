const paymentCalculationType = Object.freeze({
    Account: 'Account',
    Penalty: 'Penalty',
    Buyer: 'Buyer',
    DID: 'DID',
    Tax: 'Tax'
});

const defaultPayments = Object.values(paymentCalculationType).map(type => ({
    paymentLineType: type,
    paymentLineSum: 0
}));

module.exports = {
    paymentCalculationType,
    defaultPayments
};
