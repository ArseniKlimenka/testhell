'use strict';

module.exports = function riskFullDescriptionIconStyleFunction(input, ambientProperties) {

    return {
        "name": "question-circle",
        "size": "Medium",
        "color": "Primary",
        "tooltip": {
            "title": `${input.data.risk.riskFullDescription}`
        }
    };

};
