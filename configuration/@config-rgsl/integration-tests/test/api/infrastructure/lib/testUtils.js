const jsonPath = require('jsonpath');

function handleJsonPathMacros(request, context) {
    let requestTxt = JSON.stringify(request);

    for (const macros of (requestTxt.match(/"\{{2}[a-z|A-Z|$|.|0-9|[|\]]*?\}{2}"/g) || [])) {

        const jsonPathExpr = macros.slice(3, -3);

        const value = retrieve(context, jsonPathExpr);

        if (value) {
            switch (typeof value) {
                case 'undefined':
                    requestTxt = undefined;
                    break;
                case 'string':
                    requestTxt = requestTxt.replace(macros, '"' + value + '"');
                    break;
                default:
                    requestTxt = requestTxt.replace(macros, value);
                    break;
            }
        }
    }

    for (const macros of (requestTxt.match(/\{{2}[a-z|A-Z|$|.|0-9|[|\]]*?\}{2}/g) || [])) {

        const jsonPathExpr = macros.slice(2, -2);

        const value = retrieve(context, jsonPathExpr);

        if (value) {
            requestTxt = requestTxt.replace(macros, value);
        }

    }

    return JSON.parse(requestTxt);

}

function retrieve(context, jsonPathExpr) {

    const matches = jsonPath.query(context, jsonPathExpr);

    return matches ? matches[0] : undefined;

}

module.exports = {
    handleJsonPathMacros,
    retrieve
};
