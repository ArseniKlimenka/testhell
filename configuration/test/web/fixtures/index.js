const constants = require('./testSelectors/constantsSelectors.json');
const legalEntitySelectors = require('./testSelectors/parties/legalEntitySelectors.json');
const contractSelectors = require('./testSelectors/contracts/contractSelectors.json');
const menuSelectors = require('./testSelectors/menuSelectors.json');
const loginPageSelectorsIdentity = require('./testSelectors/loginPageSelectorsIdentity.json');
const loginPageSelectorsKeycloak = require('./testSelectors/loginPageSelectorsKeyCloak.json');

const fixtures = {
    constants,
    menuSelectors,
    loginPageSelectorsIdentity,
    loginPageSelectorsKeycloak,
    legalEntitySelectors,
    contractSelectors
};

module.exports = fixtures;
