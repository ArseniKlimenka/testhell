# Import test data

This package contains script that generates data to be inserted to AdInsure database with configurations published from this repository. It is meant to populate clean database with initial set of data. This can be used for demo, testing and development purposes after database was restored and configurations published, so that AdInsure can be used with already some business related data prepared.

Data can be created by calling `importTestData` function.

## How it works

Imports testing data to currently selected environment (specified in `.adi/cache/environment.json`), it uses test-framework, which encapsulates API calls to the server for the data import

* run in repository's root level via `yarn run import-test-data` depending on what set of data you want to be imported
* input data are modified examples used for integration/API tests
* creates simple as well as hierarchical entities by passing around values from entities they depend on (e.g. person, claim event -> policy (uses person) -> claim (uses policy, person, claim event))
* makes use of transitions, relations and enrichment to put an entity in a desirable state (e.g. activate a policy) and fill it with appropriate data
* collects full data as well as ids/codes of the entities created and outputs them to console
