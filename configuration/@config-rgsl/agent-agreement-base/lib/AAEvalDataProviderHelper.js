'use strict';

const baseSettings = require('@config-rgsl/agent-agreement-base/lib/AAEvalConfiguration');
const baseEvaluator = require('@config-rgsl/agent-agreement-base/lib/AAEvalBase');

function fillDataProviderParameters(parameters, context, settings) {

    parameters.selectTerms = [];
    parameters.whereTerms = [];

    if (!settings) {

        settings = baseSettings;
    }

    parameters.ruleTableAlias = settings.ruleTableAlias;

    for (const evaluator of settings.evaluators) {

        const contextProps = evaluator.contextProperties || [];
        let hasValues = isContextHasValues(contextProps, context);

        if (evaluator.isSupportsNoValue) {
            hasValues = true;
        }

        if (!hasValues && evaluator.evalInDatabase && !settings.useMassColumns) {

            continue;
        }

        const selectTerm = baseEvaluator.getSelectTerm(evaluator, settings);

        if (selectTerm) {

            parameters.selectTerms.push(selectTerm);
        }

        const whereTerm = baseEvaluator.getWhereTerm(evaluator, settings);

        if (whereTerm) {

            parameters.whereTerms.push(whereTerm);
        }
    }

    return Object.assign(parameters, context);
}

function isContextHasValues(contextProps, context) {

    let valuesAreSet = true;

    contextProps.forEach(element => {

        const value = context[element];

        if (!value) {

            valuesAreSet = false;
        }
    });

    return valuesAreSet;
}

module.exports = {
    fillDataProviderParameters
};
