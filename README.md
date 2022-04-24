# pronounceable

[![Build Status](https://travis-ci.org/lukem512/pronounceable.svg?branch=master)](https://travis-ci.org/lukem512/pronounceable) ![Dependency Status](https://david-dm.org/lukem512/pronounceable.svg) [![npm](https://img.shields.io/npm/l/pronounceable.svg)](https://www.npmjs.com/package/pronounceable) [![npm](https://img.shields.io/npm/v/pronounceable.svg)](https://www.npmjs.com/package/pronounceable) [![npm](https://img.shields.io/npm/dm/pronounceable.svg)](https://www.npmjs.com/package/pronounceable)

Pronounceable is a small module that allows you to test a word for pronounceability.

To use it, simply install via NPM and include it in your project file.

```js
const {Pronounceable} = require('pronounceable');
const pronounceable = new Pronounceable();
```

Then, to test a word for pronounceability, use the `test` method.

```js
console.log(pronounceable.test('samosa')); // true
console.log(pronounceable.test('xghsii')); // false
```

You can also use the module to score a word on its pronounceability, using the `score` method. The higher the output value the more pronounceable the word.

```js
console.log(pronounceable.score('peonies')); // 0.10176356810708122
console.log(pronounceable.score('sshh')); // 0.0008556941146173743
```

To generate your own dataset use the `train` function. `dataset` must be a white-space separated string containing a list of words to train on.

```js
const {train} = require("../pronounceable");
const dataset = fs.readFileSync(path.resolve(__dirname, "../data/dictionary.txt"), "utf8");
const pronounceable = train(dataset);
pronounceable.test('goo'); // true
```
