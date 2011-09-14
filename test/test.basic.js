/**
 * Module dependencies.
 */

var autocomplete = require('../lib/autocomplete'),
    sys = require('sys');

require('./common');

process.cwd().should.include.string('autocomplete');

var a = autocomplete.connectAutocomplete(onReady);

a.on('close', function() {
    process.exit(0);
});

a.on('loaded', function() {
    // Search for a prefix with multiple matches
    var result = a.search('ap');
    console.log('\n');
    console.log('result for searching ap:\n');
    console.log(result);
    var ap = a.search('ap').length.should.eql(3);
    // Search for a prefix with a single match
    a.search('bana').length.should.eql(1);

    // Search for a prefix with 0 matches
    a.search('cheese').length.should.eql(0);

    // Add a result
    a.addElement('cheeseburger');
    a.search('cheeseburger').length.should.eql(1);

    // Remove a result
    a.removeElement('apple');
    var result = a.search('ap');
    console.log('\n');
    console.log('result for searching ap after remove apple:\n');
    console.log(result);
    a.search('app').length.should.eql(2);
    a.removeElement('banana');
    a.search('banana').length.should.eql(0);

    a.search('apple pie').length.should.eql(1);

    matches = a.search('apple');
    a.search('apple').length.should.eql('2');
    a.close();
});

function onReady(autoComplete) {
  autoComplete.initialize(function(addItem) {
    addItem(['fruit', ['apple', 'red'], 'banana', 'orange', ['apples', 'yumyum'], ['apple pie', 'tasty'],
             'kiwi', 'orange juice']);
  });
}

