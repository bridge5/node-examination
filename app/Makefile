TESTS     = $(shell find test -type f -name "*.test.js")
BIN_MOCHA = ./node_modules/.bin/mocha
BIN_NYC   = ./node_modules/.bin/nyc

RELEASE_DIR    = out/release/
RELEASE_COPY   = bin common config controller middleware model router schema service

test:
	NODE_ENV=test $(BIN_MOCHA) -R spec -t 60000 --exit -r ./test/env.js $(TESTS);

cov test-cov:
	NODE_ENV=test $(BIN_NYC) --reporter=html --reporter=text-summary $(BIN_MOCHA) -R list -t 60000 --exit -r ./test/env.js $(TESTS);
