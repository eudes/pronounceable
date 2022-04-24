// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

const defaultTuples = require("./data/tuples.json");
const defaultTriples = require("./data/triples.json");
const defaultThreshold = 0.001;

function hasVowels(word){
  return word.search(/[aeiouy]/) >= 0
}

/**
 * Remove any non-alphabet characters
 * and convert to lower case.
 * @param word
 * @returns {string}
 */
function clean(word) {
  return word.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

/**
 * Make a percentage.
 * @param score
 * @param count
 * @returns {number}
 */
function percent(score, count) {
  return score / count * 100;
}

/**
 * Check for undefined probabilities.
 * @param w
 * @param i
 * @param depth
 * @param probs
 * @returns {boolean|*}
 */
function undef(w, i, depth, probs) {
  if (depth <= 1) return typeof probs[w[i]] === "undefined";
  if (typeof probs[w[i]] === "undefined") return true;
  return undef(w, i + 1, depth - 1, probs[w[i]]);
}

/**
 * Extract probabilities of word tuple.
 * @param words
 * @returns {{}}
 */
function trainTuples(words) {
  const probs = {};
  let count = 0;

  words.forEach(function(w) {
    w = clean(w);

    for (let i = 0; i < w.length - 1; i++) {
      if (!probs[w[i]]) probs[w[i]] = {};
      if (!probs[w[i]][w[i + 1]]) probs[w[i]][w[i + 1]] = 1;
      else probs[w[i]][w[i + 1]]++;
      count++;
    }
  });

  Object.keys(probs).forEach(function(first) {
    Object.keys(probs[first]).forEach(function(second) {
      probs[first][second] = percent(probs[first][second], count);
    });
  });

  return probs;
}

/**
 * Extract probabilities of word triples.
 * @param words
 * @returns {{}}
 */
function trainTriples(words) {
  const probs = {};
  let count = 0;

  words.forEach(function(w) {
    w = clean(w);

    for (let i = 0; i < w.length - 2; i++) {
      if (!probs[w[i]]) probs[w[i]] = {};
      if (!probs[w[i]][w[i + 1]]) probs[w[i]][w[i + 1]] = {};
      if (!probs[w[i]][w[i + 1]][w[i + 2]]) probs[w[i]][w[i + 1]][w[i + 2]] = 1;
      else probs[w[i]][w[i + 1]][w[i + 2]]++;
      count++;
    }
  });

  Object.keys(probs).forEach(function(first) {
    Object.keys(probs[first]).forEach(function(second) {
      Object.keys(probs[first][second]).forEach(function(third) {
        probs[first][second][third] = percent(
          probs[first][second][third],
          count
        );
      });
    });
  });

  return probs;
}

class Pronounceable {
  #tuples;
  #triples;
  #threshold;

  constructor(tuples, triples, threshold){
    this.#tuples = tuples || defaultTuples;
    this.#triples = triples || defaultTriples;
    this.#threshold = threshold || defaultThreshold;
  }

  get tuples() {
    return this.#tuples;
  }

  get triples() {
    return this.#triples;
  }

  get threshold() {
    return this.#threshold;
  }

  /**
   * Check whether a word is pronounceable using
   * the word tuple probabilities.
   * @param word
   * @returns {boolean}
   */
  test(word) {
    return this.score(word) > this.threshold;
  }

  /**
   * Compute a normalised score for
   * the pronounceability of the word.
   * @param word
   * @returns {number}
   */
  score(word) {
    const w = clean(word);
    let score = 0;

    // this breaks universality, but whatever
    if(!hasVowels(w)){
      return 0
    }

    switch (w.length) {
      case 1:
        return 1;

      case 2:
        for (let i = 0; i < w.length - 1; i++) {
          if (!undef(w, i, 2, this.tuples)) {
            score += this.tuples[w[i]][w[i + 1]];
          } else {
            score -= 1
          }
        }
        break;

      default:
        for (let i = 0; i < w.length - 2; i++) {
          if (!undef(w, i, 3, this.triples)) {
            score += this.triples[w[i]][w[i + 1]][w[i + 2]];
          } else {
            score -= 1
          }
        }
    }

    if(w.length > 3) {
      score /= w.length
    }

    console.log(w, score, score / w.length, score / w.length > this.threshold)
    return score;
  }
}

/**
 * Extract probabilities of word this.tuples and this.triples
 * from a large list of words.
 * @param dataset white-space separated (CSV) list of words
 * @returns {Pronounceable}
 */
function train(dataset) {
  const words = dataset.trim().split(/\s+/);
  return new Pronounceable(trainTuples(words), trainTriples(words), defaultThreshold);
}

module.exports = {
  Pronounceable,
  train,
}
