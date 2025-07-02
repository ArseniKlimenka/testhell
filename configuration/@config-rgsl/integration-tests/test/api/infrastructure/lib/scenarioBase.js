const fs = require('fs');
const path = require('path');
const testUtils = require('./testUtils');
const glob = require('glob');
const childProcess = require('child_process');

class ScenarioBase {

    constructor(parentScenarioName, scenarioFolder) {
        this._load(parentScenarioName, scenarioFolder);
    }

    _resolvePath(relPath) {
        return path.resolve(this._scenarioFolder, relPath);
    }

    _loadRequestsToContext(step, context, stepCtx) {

        (step.requests ?? []).forEach(request => {

            const requestPath = this._resolvePath(request.path);
            const requestBody = JSON.parse(fs.readFileSync(requestPath, 'utf8'));

            // handle macroses in the request
            const processedRequest = testUtils.handleJsonPathMacros(requestBody, context);

            stepCtx.requests[request.code] = processedRequest;

        });
    }

    _initStepCtx(step) {
        return {
            actor: step.actor,
            requests: {},
            response: {}
        };
    }

    async _executor(step, context, stepCtx) {

        if (step.executor) {
            const executorModule = require(this._resolvePath(step.executor.module));
            const executorFunction = executorModule[step.executor.function];

            stepCtx.response = await executorFunction(step, context, stepCtx);
        }
    }

    async _doAssert(asserts, step, context, stepCtx) {

        for (const assert of asserts) {

            if (assert.expected) {

                const expectedPath = this._resolvePath(assert.expected);
                const expected = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
                stepCtx.expected = testUtils.handleJsonPathMacros(expected, context);
            }

            const assertModule = require(this._resolvePath(assert.module));
            const assertFunction = assertModule[assert.function];

            await assertFunction(step, context, stepCtx);
        }

    }

    async _assert(step, context, stepCtx) {

        if (step.assert) {

            const asserts = Array.isArray(step.assert)
                ? step.assert
                : (typeof step.assert === 'object' ? [step.assert] : null);

            if (asserts) {
                await this._doAssert(asserts, step, context, stepCtx);
            }

        }
    }

    _load(parentScenarioName, scenarioFolder) {

        // load scenario configuration
        this.config = JSON.parse(fs.readFileSync(path.resolve(scenarioFolder, 'configuration.json'), 'utf8'));

        // setup scenario folder
        this._parentScenarioName = parentScenarioName;
        this._scenarioFolder = scenarioFolder;
        this.scenarioCode = path.basename(this._scenarioFolder);
        this.scenarioDescription = this.config.description ?? this.scenarioCode;

        return this;

    }

    async _executeSteps(context, parentActor) {

        const steps = this.config.steps.filter(s => !s.skip);
        for (const step of steps) {

            const scenario = this;
            let stepName = step.description ?? step.code ?? step.$ref;
            if (this._parentScenarioName) {
                stepName = this._parentScenarioName + '->' + stepName;
            }
            if (steps.length !== 1) {
                console.log('\t\u001b[46mStep: ' + stepName + '\u001b[0m');
            }

            if (step.context) {

                // handle macroses in a new context attributes
                const processedContext = testUtils.handleJsonPathMacros(step.context, context);
                Object.assign(context, processedContext);
            }

            if (step.$ref) {
                await this._executeReferencedScenario(stepName, step.$ref, step.actor, context);
            }

            if (step.executor || step.assert) {

                if (process.env.DEBUG?.toLowerCase() === 'true') {
                    childProcess.spawnSync('pause', { shell: true, stdio: [0, 1, 2] });
                }

                // initialize step
                const stepCtx = scenario._initStepCtx(step);
                if (!context.stepContext) {
                    context.stepContext = {};
                }
                if (!stepCtx.actor) {
                    stepCtx.actor = parentActor;
                }
                context.stepContext[step.code] = stepCtx;

                // load requests
                scenario._loadRequestsToContext(step, context, stepCtx);

                // run executor
                await scenario._executor(step, context, stepCtx);

                // assert
                await scenario._assert(step, context, stepCtx);
            }

            if (step.context) {

                for (const c in step.context) {
                    context[c] = undefined;
                }
            }
        }
    }

    _initContext(context) {

        const retContext = context ?? {};

        if (this.config.initContext) {
            const initContextModule = require(this._resolvePath(this.config.initContext.module));
            const initContextFunction = initContextModule[this.config.initContext.function];

            initContextFunction(retContext);
        }

        return retContext;
    }

    async _executeReferencedScenario(scenarioDescription, scenarioRefName, parentActor, context) {

        const folders = glob
            .sync(__dirname + '/../../scenarios/**/configuration.json')
            .map(f => path.dirname(f));

        const folder = folders.find(f => path.basename(f) == scenarioRefName);

        if (!folder) {
            throw new Error(`Scenario folder ${scenarioRefName} isn't found`);
        }

        const scenarioInstance = new ScenarioBase(scenarioDescription, folder);
        scenarioInstance._executeBefore(context);
        await scenarioInstance._executeSteps(context, parentActor);
    }

    async _executeBefore(context) {

        if (this.config.executeBefore && this.config.executeBefore.length > 0) {

            const folders = glob
                .sync(__dirname + '/../../scenarios/**/configuration.json')
                .map(f => path.dirname(f));

            for (const scenarioFolder of this.config.executeBefore) {

                const folder = folders.find(f => path.basename(f) == scenarioFolder);

                if (!folder) {
                    throw new Error(`Scenario folder ${scenarioFolder} isn't found`);
                }

                const s = new ScenarioBase(folder);
                await s.execute(context);
            }
        }
    }

    async execute(ctx) {

        const context = this._initContext(ctx);

        // execute "before" scenarios
        await this._executeBefore(context);

        // execute steps
        await this._executeSteps(context);
    }

}

module.exports = {
    ScenarioBase
};
