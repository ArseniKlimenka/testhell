const path = require('path');
const glob = require('glob');

const { ScenarioBase } = require('./infrastructure/lib/scenarioBase');

const ONE_MINUTE = 1000 * 60;
const TIMEOUT = ONE_MINUTE * 15;

describe('Integration tests scenarios', function () {
    if (process.env.DEBUG?.toLowerCase() === 'true') {
        this.timeout(99999999999);
    }
    else {
        this.timeout(TIMEOUT);
    }

    for (const scenario of loadScenarios(loadSuite('defaultSuite'))) {

        const folder = scenario.folder;

        it(scenarioDescription(scenario), async function() {

            const scenarioInstance = new ScenarioBase(undefined, folder);
            await scenarioInstance.execute();

        });
    }
});

function loadSuite(name, loaded = new Set()) {
    if (!name) {
        throw new Error('Suite name is not provided!');
    }

    // to avoid looping
    if (loaded.has(name)) {
        return [];
    }

    loaded.add(name);

    const suiteObj = require(combineSuitePath(name));

    if (!suiteObj) {
        throw new Error(`Suite ${name} is not found!`);
    }

    const scenarios = [];

    for (const item of suiteObj) {
        if (item.suite) {
            if (!item.skip) {
                scenarios.push(...loadSuite(item.suite, loaded));
            }
        } else if (item.scenario) {
            if (!item.skip) {
                scenarios.push({
                    code: item.scenario,
                    description: item.description
                });
            }
        } else {
            throw new Error(`Suite item is not recognized: ${item}!`);
        }
    }

    return scenarios;
}

function combineSuitePath(name) {
    return `./test-suites/${name}.json`;
}

function loadScenarios(links) {

    const scenarioMap = new Map(
        glob.sync(__dirname + '/scenarios/**/configuration.json')
            .map(c => path.dirname(c))
            .map(f => [path.basename(f), f])
    );

    const scenarios = [];

    for (const link of links) {
        const folder = scenarioMap.get(link.code);
        if (folder) {
            scenarios.push({ folder, ...link });
        }
    }

    return scenarios;
}

function scenarioDescription(scenario) {
    return `[${scenario.code}] ${scenario.description ?? ''}`;
}
