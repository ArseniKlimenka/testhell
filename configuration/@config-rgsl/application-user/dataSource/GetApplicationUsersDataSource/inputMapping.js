const { Exception } = require("handlebars");

module.exports = function (input) {

    const userRoles = this.applicationContext.user.applicationRoles;
    const isSMGO = userRoles.some(x => x == 'SMGO');
    const pageSize = input?.paging?.pageSize;
    if (!isSMGO) {
        if (!pageSize) {
            throw new Exception('Необходимо указать количество возвращаемых записей на странице!');
        }
        if (pageSize > 15) {
            throw new Exception('Превышено количество возвращаемых записей!');
        }
    }

    const output = {};
    output.parameters = {};
    output.parameters.username = null;
    output.parameters.general = null;
    output.parameters.expireDateFrom = input.data.criteria.expireDateFrom;
    output.parameters.expireDateTo = input.data.criteria.expireDateTo;
    output.parameters.userGroupCode = null;

    if (input.data.criteria.username) {
        output.parameters.username = input.data.criteria.username + '%';
    }

    if (input.data.criteria.general) {
        output.parameters.general = input.data.criteria.general + '%';
    }

    if (input.data.criteria.userGroupCode) {
        output.parameters.userGroupCode = input.data.criteria.userGroupCode;
    }

    return output;
};
