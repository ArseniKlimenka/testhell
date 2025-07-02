const { additionalroles, groupsDesc } = require('@config-rgsl/employee/lib/userExcelETLconst');

module.exports = {
    /**
     * @desc Helper for full name, mask fo it 2 or 3 string separate by space
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or null, if validations failed
     */
    fullNameValidation: function (fullName) {
        let result = null;

        fullName = fullName.trim();
        const count = fullName.split(/\s+/).length;

        if (count == 2 || count == 3) { result = fullName; }

        return result;
    },

    /**
     * @desc Helper for tabNumber, mask: all symbols are latin alhabet or number
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or null, if validations failed
     */
    tabNumberValidation: function (tabNumber) {
        let result = null;

        const onlyLatinAlphabet = (/^[a-zA-Z0-9]+$/).test(tabNumber);
        const email = /\S+@\S+\.\S+/.test(tabNumber);

        if (onlyLatinAlphabet || email) {
            result = tabNumber;
        }

        return result;
    },

    /**
     * @desc Helper for email, mask: *@*.*
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or null, if validations failed
     */
    emailValidation: function (email) {
        let result = null;

        const re = /\S+@\S+\.\S+/;

        if (re.test(email)) { result = email; }

        return result;
    },

    /**
     * @desc Helper for mobile telephone number, mask: all number, length 10 symbols
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or null, if validations failed
     */
    mobTelValidation: function (mobTel) {
        let result = null;

        const re = /^[\d\- ]{10}$/;

        if (re.test(mobTel)) { result = mobTel; }

        return result;
    },

    /**
     * @desc Helper for visibility, must be from handbook or null
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or null, if validations failed
     */
    visibilityTypeValidation: function (visibility) {
        let result;

        switch (visibility) {
            case 'Только свои':
                result = visibility;
                break;
            case 'Все своего подразделения':
                result = visibility;
                break;
            case 'Все своего и дочерних подразделений':
                result = visibility;
                break;
            case 'Все':
                result = visibility;
                break;
            case undefined:
                result = '';
                break;
            default:
                result = null;
                break;
        }

        return result;
    },

    /**
     * @desc Helper for groups, must be from handbook
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or from handbook
     */
    groupsValidation: function (group) {
        let result = null;

        const flag = groupsDesc.includes(group);

        if (flag) { result = group; }

        return result;
    },

    /**
     * @desc Helper for roles, must be from handbook or null
     * @param {string} string from FileDataProvider
     * @return {string or null} return itself or null, if validations failed
     */
    rolesValidation: function (roles) {
        let result;

        if (roles == undefined) {
            result = '';
        } else {
            const rolesArray = roles.split(';');
            let flag = true;

            rolesArray.forEach(element => {
                const testResult = additionalroles.some(item => item == element);
                if (testResult == false) { flag = false; }
            });

            result = flag ? roles : null;
        }

        return result;
    },

    /**
     * @desc map description for code
     * @param {string} text at ETL service
     * @return {number} return Code number
     */
    visibilityTypeMapping: function (text) {
        let result;

        switch (text) {
            case 'Только свои':
                result = 1;
                break;
            case 'Все своего подразделения':
                result = 2;
                break;
            case 'Все своего и дочерних подразделений':
                result = 3;
                break;
            case 'Все':
                result = 4;
                break;
        }

        return result;
    },

    /**
     * @desc map description of roles for GIUD
     * @param {string} rolesArray from import file
     * @param {string} contextArray from source at DB
     * @return {array} return GUID
     */
    getRoles: function (rolesArray, contextArray) {
        let result = [];

        if (rolesArray == '') {
            result = [];
        } else {
            rolesArray = rolesArray.split(';');

            rolesArray.forEach(element => {
                result.push(contextArray[element]);
            });
        }

        return result;
    },

    /**
     * @desc map description of roles for GIUD
     * @param {array} array from source at DB
     * @return {GUID}
     */
    getUserGroupId: function (UserGroupArray, groupDesc) {
        let result;

        function findId(arr, string) {

            const index = arr.findIndex(element => element.resultData.name == string);

            return arr[index].resultData.id;
        }

        switch (groupDesc) {
            case 'Продавец ПСБ':
                result = findId(UserGroupArray, 'salesPSB');
                break;
            case 'Продавец АКЦЕПТ':
                result = findId(UserGroupArray, 'salesAKCEPT');
                break;
            case 'Продавец АКБАРС':
                result = findId(UserGroupArray, 'salesAKBARS');
                break;
            case 'Продавец БФКО':
                result = findId(UserGroupArray, 'salesBFKO');
                break;
            case 'Продавец ЗЕНИТ':
                result = findId(UserGroupArray, 'salesZENIT');
                break;
            case 'Продавец БФКОАВТО':
                result = findId(UserGroupArray, 'salesBFKOAuto');
                break;
            case 'Продавец ПСБ Прайвет':
                result = findId(UserGroupArray, 'salesPSBVIP');
                break;
            case 'Продавец ОАС':
                result = findId(UserGroupArray, 'salesOAS');
                break;
            case 'Продавец МИНБАНК':
                result = findId(UserGroupArray, 'salesMINBANK');
                break;
            case 'Продавец СМП':
                result = findId(UserGroupArray, 'salesSMP');
                break;
            case 'Продавец ВТБ':
                result = findId(UserGroupArray, 'salesVTB');
                break;
            case 'Продавец ИННОВАЦИОННЫЕ РЕШЕНИЯ':
                result = findId(UserGroupArray, 'salesREINVEST');
                break;
            case 'Продавец ВТБ РОЗНИЦА':
                result = findId(UserGroupArray, 'salesVTBMass');
                break;
            case 'Продавец ЛАЙФ ИНВЕСТ':
                result = findId(UserGroupArray, 'salesLIFEINVEST');
                break;
            case 'Продавец ПОЧТА БАНК':
                result = findId(UserGroupArray, 'salesPB');
                break;
            case 'Продавец УБРИР':
                result = findId(UserGroupArray, 'salesUBRR');
                break;
            case 'Продавец ЭКСПО БАНК':
                result = findId(UserGroupArray, 'salesEKSPO');
                break;
            default:
                break;
        }

        return result;
    },

    /**
     * @desc generate password from mask: 12 symbols min 1 lowercase, 1 uppercase, 1 number, 1 special symbol
     * @return {string}
     */
    getPassword: function () {
        let result = [];

        let sum = 12;
        const typeOfSymbol = ['lowercase', 'uppercase', 'number', 'special'];
        const symbols = {
            'lowercase': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            'uppercase': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            'number': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            'special': ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '<', '>', ',', '.', '?', '/', '|', ':', ';']// нет ' и /
        };
        typeOfSymbol.forEach((item, index) => {
            let randomNumber;
            const symbolsArray = symbols[item];
            if (index == (typeOfSymbol.length - 1)) {
                randomNumber = sum;
            } else {
                randomNumber = Math.ceil(Math.random() * (sum - (3 - index)));
                sum -= randomNumber;
            }
            for (let index = 0; index < randomNumber; index++) {
                const randomIndex = Math.floor(Math.random() * symbolsArray.length);
                result.push(symbolsArray[randomIndex]);
            }
        });

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffle(result);
        result = result.join('');

        return result;
    },

    /**
     * @desc Helper for sendEmail, true if Да
     * @param {string} string from FileDataProvider
     * @return {boolean} return true if Да
     */
    sendEmailValidation: function (sendEmail) {
        let result = false;

        if (sendEmail == 'Да') {
            result = true;
        }

        return result;
    },

    AccountTypes: {
        Standard: "Standard",
        Privileged: "Privileged",
        Technology: "Technology"
    }

};
