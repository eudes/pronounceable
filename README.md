# pronounceable

[![npm version](https://badge.fury.io/js/@eudes%2Fpronounceable.svg)](https://badge.fury.io/js/@eudes%2Fpronounceable)![GitHub Workflow Status](https://img.shields.io/github/workflow/status/eudes/pronounceable/Node.js%20Package)

Fork of https://github.com/lukem512/pronounceable that removes dependency on `fs` and `path` to allow using in browsers. It also refactors into a bit more modern JS style and tweaks the algorithm slightly.

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
