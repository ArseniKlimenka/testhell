const legalEntity = require('./pages/parties/legal-entity-page');
const contract = require('./pages/contracts/contract-page');
const menu = require('./pages/menu');
const loginPage = require('./pages/loginPage');

const testLibs = {
    menu,
    loginPage,
    legalEntity,
    contract
};

module.exports = testLibs;
