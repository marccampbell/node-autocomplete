var Trie = require('./lib/trie').Trie

var Autocomplete = function Autocomplete(name) {
  this.trie = new Trie()
  return this
}
Autocomplete.prototype.initialize = function(elements) {
  var self = this
  elements.forEach(function(element) {
    if(typeof element === 'object') {
      var item = {}
      item.key = element[0]
      item.value = element[1]
      self.addElement(item)
    }
    else {
      self.addElement(element)
    }
  })
}

Autocomplete.prototype.addElement = function(element) {
  this.trie.addValue(element)
}


Autocomplete.prototype.removeElement = function(element) {
  this.trie.removeValue(element)
}

Autocomplete.prototype.search = function(prefix) {
  return this.trie.autoComplete(prefix)
}

module.exports = Autocomplete
