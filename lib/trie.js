var sys = require('sys');

Trie = function() {
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
};


/**
 * Add a value to the trie
 *
 * @param {String} value
 * @param {Number} index (optional)
 */
Trie.prototype.addValue = function(value, index) {
    if (!index) {
       index = 0;
    } 

    if (value.length === 0) {
          return;
    }

    if (index === value.length) {
        this.words++;
        return;
    }

    this.prefixes++;
    var key = value[index];
    if (this.children[key] === undefined) {
        this.children[key] = new Trie();
    }
    var child = this.children[key];
    child.addValue(value, index + 1);
};

/**
 * Remove a value form the trie
 *
 * @param {String} value
 * @param {Number} index (optional)
 */
Trie.prototype.removeValue = function(value, index) {
    if (!index) {
        index = 0;
    }

    if (value.length === 0) {
        return;
    }

    if (index === value.length) {
        this.words--;
    } else {
        this.prefixes--;
        var key = value[index];
        var child = this.children[key];
        child.removeValue(value, index + 1);
    }
};

/** Get the count of instances of a word in the entire trie
 *
 * @param {String} word
 * @param {Number} index (optional)
 */
Trie.prototype.wordCount = function() {
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

/** Get the count of instances of a prefix in the enture trie
 * 
 * @param {String} prefix
 * @param {Number} index
 */
Trie.prototype.prefixCount = function(prefix, index) {
    if (!index) {
        index = 0;
    }

    if (prefix.length === 0) {
        return 0;
    }

    if (index === prefix.length) {
        return this.prefixes;
    } else {
        var key = prefix[index];
        var child = this.children[key];
        if (child) {
            return child.prefixCount(prefix, index + 1);
        } else {
            return 0;
        }
    }
};

/**
 * Check if a word exists in the trie
 *
 * @param {String} value
 */
Trie.prototype.wordExists = function(value) {
    if (value.length === 0) {
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
    if (!prefix) {
        prefix = '';
    }

    var words = [];
    if (this.words > 0) {
        words.push(prefix);
    }

    for (key in this.children) {
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
    if (!index) {
        index = 0;
    }

    if (prefix.length === 0) {
        return [];
    }

    var key = prefix[index];
    var child = this.children[key];
    if (!child) {
        return [];
    } else { 
        if (index === prefix.length - 1) {
            return child.allChildWords(prefix);
        } else {
            return child.autoComplete(prefix, index + 1);
        }
    }
};

exports.Trie = Trie;

