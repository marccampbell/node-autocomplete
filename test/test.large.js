/**
 * Module dependencies.
 */

var autocomplete = require('../'),
    sys = require('sys'),
    fs = require('fs');

require('./common');

process.cwd().should.include.string('autocomplete');


// Read the really big data file into memory
function readLines(input, onReady) {
    var words = [];

    input.on('data', function(data) {
        words = words.concat(data.toString().split('\n'));
    });

    input.on('end', function() {
        onReady(words);
    });

};

var input = fs.createReadStream('./test/words.txt');
readLines(input, function(words) {
    var a = autocomplete.connectAutocomplete();

    a.on('close', function() {
        process.exit(0);
    });

    a.on('loaded', function() {
        var start = new Date();
        matches = a.search('mon');
        var duration = new Date() - start;
        console.log('Elapsed time to search dictionary for 3 character prefix: ' + duration + 'ms');

        matches.length.should.eql(663);
    });

    a.initialize(function(onReady) {
        console.log('\nLoading large dictionary of words (~500,000 words)');
        var start = new Date();
        onReady(words);
        var duration = new Date() - start;
        console.log('Elapsed time to load dictionary: ' + duration + 'ms');
    });
});

