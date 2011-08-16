# Node Autocomplete

 [Node Autocomplete](http://www.github.com/marccampbell/node-autocomplete) is an autocomplete library for [node.js](http://nodejs.org).

## Installation

```bash
$ npm install autocomplete
```

## Features

  - in memory, in process, not redis dependent
  - internal [trie](http://en.wikipedia.org/wiki/Trie) data structure to store the strings
  - super fast for adding, removing and lookups
  - performance tested for string lists of 500,000 words
  - high level of tests

## Running Tests

Install development dependencies:

```bash
$ npm install
```

Then:

```bash
$ test/run
```

Actively tested with node:

  - 0.4.9

## Authors

  * Marc Campbell

## License 

(The MIT License)

Copyright (c) 2011 Marc Campbell &lt;marc.e.campbell@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

