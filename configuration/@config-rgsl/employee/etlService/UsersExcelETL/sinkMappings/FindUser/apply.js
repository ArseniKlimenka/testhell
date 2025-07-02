module.exports = function apply(sinkResult, sinkInput) {

    if (sinkResult.data.length > 0) { throw new Error('Пользователь с указанным логином уже существует!'); }

};
