var moment = require('moment')
var path = require('path')
var fs = require('fs')
var inspect = require('eyespect').inspector();
var Autocomplete = require('../index')
var should = require('should');

describe('Large', function () {
  var auto, words
  before(function () {
    var filePath = path.join(__dirname,'words.txt')
    var text = fs.readFileSync(filePath, 'utf8')
    words = text.split(/\n/);
    auto = new Autocomplete()
    auto.initialize(words)
  })

  it('should find multiple elements from a given prefix ' ,function () {
    var start = moment();
    var matches = auto.search('mon');
    var duration = moment().diff(start, 'seconds', true)
    var numWords = words.length
    inspect(duration, 'Elapsed time to search ' + numWords + ' words for 3 character prefix in seconds')
    matches.length.should.eql(663);
  })
})
