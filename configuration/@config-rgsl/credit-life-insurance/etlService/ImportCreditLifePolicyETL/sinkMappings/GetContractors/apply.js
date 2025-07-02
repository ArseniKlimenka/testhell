const { Exception } = require("handlebars");

module.exports = function apply(sinkResult, sinkInput) {

    const result = JSON.parse(sinkResult);
    if (result.Reject == "true") {
        throw new Exception("Проверка КПК не пройдена для Cтрахователя: " + result.Reason);
    }
};
