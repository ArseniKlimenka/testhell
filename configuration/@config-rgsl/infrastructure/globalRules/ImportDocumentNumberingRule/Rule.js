module.exports = function getnext(input) {

    // if number is already exists then do nothing
    if (input.number) {
        return {
            "number": input.number
        };
    }

    // default numbering
    return {
        "sequenceName": "IMPORT",
        "template": "IMPORT-%06d"
    };

};
