module.exports = function (input) {

    if (!input?.data) {
        throw 'Input criteria was not defined!';
    }

    if (input.data.userId != this.applicationContext.user.id) {
        throw 'Insufficient privileges!';
    }

    return input.data;
};
