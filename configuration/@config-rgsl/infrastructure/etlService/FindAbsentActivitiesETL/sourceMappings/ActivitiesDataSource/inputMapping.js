module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                noCriteria: true,
                createdOnFrom: input.createdOnFrom,
                createdOnTo: input.createdOnTo,
            }
        }
    };
};
