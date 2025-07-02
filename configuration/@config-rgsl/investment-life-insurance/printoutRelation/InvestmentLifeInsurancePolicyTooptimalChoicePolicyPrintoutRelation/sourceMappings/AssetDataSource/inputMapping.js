module.exports = function mapping(input) {
    const idIsin = input.body?.basicAssetProperties?.assetProperties[0]?.asset?.idIsin;

    const output = {
        data: {
            criteria: {
                idIsin: null
            }
        }
    };

    if (idIsin) {
        output.data.criteria.idIsin = idIsin;
    }

    return output;
};
