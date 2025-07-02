const { Exception } = require("handlebars");

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const result = JSON.parse(sinkResult);

    if (result?.Reject == "true"
        || (result.Agreement && result.Agreement.indexOf("Контрагент входит в ЧС. Идет согласование") != -1)
        || (result.Agreement && result.Agreement.indexOf("Контрагент входит в ЧС. Действие запрещено") != -1)) {
        throw new Exception("Проверка ЧС не пройдена для Страхователя: " + result.Agreement);
    }
};
