// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

const {Pronounceable} = require("../pronounceable");
const pronounceable = new Pronounceable();

// Scoring a word using the standard dataset.
// The output is a normalised score. The higher the number
// the more pronounceable the word.

var morePronouncable = 'peonies';
console.log(morePronouncable, pronounceable.score(morePronouncable));

var lessPronouncable = 'sshh';
console.log(lessPronouncable, pronounceable.score(lessPronouncable));
