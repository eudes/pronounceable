// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

const {train} = require("../pronounceable");
const fs = require('fs');
const path = require('path');

// Training probabilites using a word list.
// The training method returns a new trained instance of Pronounceable
const dataset = fs.readFileSync(path.resolve(__dirname, "../data/dictionary.txt"), "utf8");
const pronounceable = train(dataset);
pronounceable.test('goo'); // true

// You can access the calculated probability scores for letter tuples and triples
console.log(pronounceable.tuples())
console.log(pronounceable.triples())
