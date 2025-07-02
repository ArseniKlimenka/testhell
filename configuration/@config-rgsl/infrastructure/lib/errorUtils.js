const { distinct } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

function throwResponseError(err) {

    if (!err) {
        err = 'Empty exception';
    }

    const errorMessage =
        err.error?.data?.errorData?.message ??
        err.error?.Message ??
        err.message ??
        'Internal error';

    throw new MyError(errorMessage, JSON.stringify(err));
}

function highlightErrorMessage(errorMsg) {

    const terminalStart = '[/#ermsgStart/]';
    const terminalEnd = '[/#ermsgEnd/]';
    const defaultErrorMsg = 'Internal error';
    return `${terminalStart}${errorMsg ?? defaultErrorMsg}${terminalEnd}`;
}

function parseHighlightedErrorMessage(errorMsg) {

    const resultArray = errorMsg.match(/(?<=\[\/#ermsgStart\/\]).*(?=\[\/#ermsgEnd\/\])/g);

    if (resultArray && resultArray.length > 0) {
        return distinct(resultArray).join(', ');
    }

    return errorMsg;
}

class MyError extends Error {
    constructor(message, fullError) {

        super(message);
        this.stack = fullError;
    }
}

module.exports = {
    throwResponseError,
    highlightErrorMessage,
    parseHighlightedErrorMessage
};
