// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

const {Pronounceable} = require("../pronounceable");
let pronounceable = new Pronounceable();

// Testing a word using the standard dataset.
// The `test` method returns true is a word is pronouncable
// and false otherwise.

var yes = 'samosa';
console.log(yes, pronounceable.test(yes));

var no = 'xghsii';
console.log(no, pronounceable.test(no));
