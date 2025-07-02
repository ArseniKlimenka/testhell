module.exports = function mapping(input) {

    const {
        number,
        body,
    } = input;

    return {
        'ACC_IMPL.RSD_HUB': [{
            RSD_NUMBER: number,
        }],
        'ACC_IMPL.RSD_SAT': [{
            RSD_NUMBER: number,
            CREATED_DATE: body.createdDate,
            NOTES: body.notes,
        }],
    };

};
