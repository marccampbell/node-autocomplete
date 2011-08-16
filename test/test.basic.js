/**
 * Module dependencies.
 */

var autocomplete = require('../'),
    sys = require('sys');

require('./common');

process.cwd().should.include.string('autocomplete');

var a = autocomplete.connectAutocomplete();

a.on('close', function() {
    process.exit(0);
});

a.on('loaded', function() {
    // Search for a prefix with multiple matches
    a.search('ap').length.should.eql(3);

    // Search for a prefix with a single match
    a.search('bana').length.should.eql(1);

    // Search for a prefix with 0 matches
    a.search('cheese').length.should.eql(0);

    // Add a result
    a.addElement('cheeseburger');
    a.search('cheeseburger').length.should.eql(1);

    // Remove a result
    a.removeElement('apple');
    a.search('app').length.should.eql(2);

    a.removeElement('banana');
    a.search('banana').length.should.eql(0);

    a.search('apple pie').length.should.eql(1);

    matches = a.search('apple');
    a.search('apple').length.should.eql('2');

    a.close();
});

a.initialize(function(onReady) {
    onReady(['fruit', 'apple', 'banana', 'orange', 'apples', 'apple pie',
             'kiwi', 'orange juice']);
});

