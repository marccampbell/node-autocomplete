MOCHA=node_modules/.bin/mocha
REPORTER=spec
test:
	$(MOCHA) $(shell find test -name "*test.js") --reporter $(REPORTER)
basic:
	$(MOCHA) test/basic-test.js --reporter $(REPORTER)
large:
	$(MOCHA) test/large-test.js --reporter $(REPORTER)
.PHONY: test