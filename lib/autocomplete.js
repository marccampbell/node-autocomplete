var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    Trie = require('./trie').Trie;

exports = module.exports = Autocomplete;
exports.version = '0.0.1';


exports.connectAutocomplete = function(getInitialElements) {
    Autocomplete.singleton  = new Autocomplete();

    return Autocomplete.singleton;
};

function Autocomplete(name) {
    this.trie = new Trie()
    EventEmitter.call(this);
}
util.inherits(Autocomplete, EventEmitter);

Autocomplete.prototype.close = function() {
    this.emit('close');
};

Autocomplete.prototype.initialize = function(getInitialElements) {
    getInitialElements(function(elements) {
        elements.forEach(function(element) {
            Autocomplete.singleton.addElement(element);
        });
        Autocomplete.singleton.emit('loaded');
    });
};

Autocomplete.prototype.addElement = function(element) {
    this.trie.addValue(element);
};


Autocomplete.prototype.removeElement = function(element) {
    this.trie.removeValue(element);
};

Autocomplete.prototype.search = function(prefix) {
    return this.trie.autoComplete(prefix);
};


