'use strict';

module.exports = function organisationUnitLookup_convertToNodes(input) {

    const dictionaryOfNodes = {};

    input.data.forEach((element) => {
        dictionaryOfNodes[element.resultData.id] =
        {
            id: element.resultData.id,
            name: element.resultData.name,
            parentId: element.resultData.parentId,
            resultData: element.resultData,
            selected: false
        };
    });

    const nodes = [];

    for (const key in dictionaryOfNodes) {
        const node = dictionaryOfNodes[key];

        if (!dictionaryOfNodes[node.parentId]) {
            node.parentId = null;
        }

        nodes.push(node);
    }

    return nodes;

};
