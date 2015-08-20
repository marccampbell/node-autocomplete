'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Trie = require('./trie');

exports = module.exports = Autocomplete;
exports.version = '0.0.1';

exports.connectAutocomplete = function(onReady) {
    Autocomplete.singleton = new Autocomplete();

    if (onReady) onReady(Autocomplete.singleton);

    return Autocomplete.singleton;
};

function Autocomplete(name) {
    this.trie = new Trie()
    EventEmitter.call(this);
};

util.inherits(Autocomplete, EventEmitter);

Autocomplete.prototype.close = function() {
    this.emit('close');
};

Autocomplete.prototype.initialize = function(getInitialElements) {
    getInitialElements(function(elements) {
        elements.forEach(function(element) {
            if (typeof element === 'object') {
                var item = {};
                item.key = element[0];
                item.value = element[1];
                Autocomplete.singleton.addElement(item);
            } else {
                Autocomplete.singleton.addElement(element);
            };
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
