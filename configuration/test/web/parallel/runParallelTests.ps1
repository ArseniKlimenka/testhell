./node_modules/.bin/cypress-parallel -s test-ui:run -t 4 -n ./node_modules/cypress-multi-reporters -d ./configuration/**/**/test/web/**/**/*.cy.js -r mochawesome -p ./configuration/test/web/parallel/reporter-config.json -m false

node ./configuration/test/web/parallel/reportParser.js

exit $LASTEXITCODE