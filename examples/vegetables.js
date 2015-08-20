/**
 * Module dependencies.
 */

var Autocomplete = require('../lib/autocomplete');

var VEGETABLES = ['arugula', 'beet', 'broccoli', 'cauliflower', 'corn', 'cabbage', 'carrot'];

// Create the autocomplete object
var autocomplete = Autocomplete.connectAutocomplete();

// Initialize the autocomplete object and define a 
// callback to populate it with data
autocomplete.initialize(function(onReady) {
    onReady(VEGETABLES);
});

// Later...  When it's time to search:
var matches = autocomplete.search('ca');
console.log(matches);

// this will print:
// ['cauliflower', 'cabbage', 'carrot']


