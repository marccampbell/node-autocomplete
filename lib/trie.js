'use strict';

var sys = require('sys');

var Trie = function() {
    this.words = 0;
    this.prefixes = 0;
    this.value = "";
    this.children = [];
};

/**
 * Add a value to the trie
 *
 * @param {String} value
 * @param {Number} index (optional)
 */
Trie.prototype.addValue = function(item, index) {
    index = index || 0;

    if (item === null) return;

    var isObject = typeof item === 'object';
    
    if (isObject && !item.key.length) return;

    if (!isObject && !item.length) return;

    if ((isObject && index === item.key.length) || (!isObject && index === item.length)) {
        this.words++;
        this.value = isObject ? item.value : item;
        return;
    }

    this.prefixes++;
    var key = isObject ? item.key[index] : item[index];

    if (this.children[key] === undefined) {
        this.children[key] = new Trie();
    }

    var child = this.children[key];
    child.addValue(item, index + 1);
};

/**
 * Remove a value form the trie
 *
 * @param {String} value
 * @param {Number} index (optional)
 */
Trie.prototype.removeValue = function(item, index) {
    if (!index) {
        index = 0;
    }

    if (item.length === 0) {
        return;
    }

    if (index === item.length) {
        this.words--;
        this.value="";
    } 
    else {
        this.prefixes--;
        var key = item[index];
        var child = this.children[key];
        if(child) child.removeValue(item, index + 1);
        // to remove a node, we need remove it from parent's children array
        if(index === (item.length -1)) {
          if(Object.keys(child.children).length === 0) {// only remove when there is no children
            delete this.children[key];
          }
        }
    }
};

/** Get the count of instances of a word in the entire trie
 *
 * @param {String} word
 * @param {Number} index (optional)
 */
Trie.prototype.wordCount = function(value, index) {
    if (!index) {
        index = 0;
    }

    if (value.length === 0) {
        return 0;
    }

    if (index === value.length) {
        return this.words;
    } else {
        var key = value[index];
        var child = this.children[key];
        if (child) {
            return child.wordCount(value, index + 1);
        } else {
            return 0;
        }
    }
};

/**
 * Get the count of instances of a prefix in the enture trie
 *
 * @param {String} prefix
 * @param {Number} index
 */
Trie.prototype.prefixCount = function(prefix, index) {
    index = index || 0;

    if (!prefix.length) return 0;
    if (index === prefix.length) return this.prefixes;

    var key = prefix[index];
    var child = this.children[key];

    return child ? child.prefixCount(prefix, index + 1) : 0;
};

/**
 * Check if a word exists in the trie
 *
 * @param {String} value
 */
Trie.prototype.wordExists = function(value) {
    if (!value) {
        return false;
    }

    return this.wordCount(value) > 0;
};

/**
 * Return all words with a prefix
 *
 * @param {String} prefix
 */
Trie.prototype.allChildWords = function(prefix) {
    prefix = prefix || '';

    var words = [];
    if (this.words > 0) {
       if(this.value.lenth === 0) {
          var tmp = new Object();
          tmp.key = prefix;
          tmp.value = prefix
          words.push(tmp);
       }
       else {
          var tmp = new Object();
          tmp.key = prefix;
          tmp.value = this.value;
          words.push(tmp);
       }
    }

    for (var key in this.children) {
        var child = this.children[key];
        words = words.concat(child.allChildWords(prefix + key));
    }

    return words;
}

/**
 * Perform an autocomplete match
 *
 * @param {String} prefix
 * @param {Number} index
 */
Trie.prototype.autoComplete = function(prefix, index) {
    index = index || 0;

    if (!prefix.length) return [];

    var key = prefix[index];
    var child = this.children[key];

    if (!child) return [];
    if (index === prefix.length - 1) return child.allChildWords(prefix);

    return child.autoComplete(prefix, index + 1).map(function(element){
        return typeof element == 'object' ? element.value : element;
    });
};

module.exports = Trie;
