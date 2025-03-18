/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const markovChain = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i].replace(/[\W_]/g, "");
      let nextWord = this.words[i + 1]
        ? this.words[i + 1].replace(/[\W_]/g, "")
        : null;

      if (!markovChain[word]) {
        markovChain[word] = [];
      }
      markovChain[word].push(nextWord);
    }

    this.chains = markovChain;
    return markovChain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const startWords = Object.keys(this.chains);
    let currentWord = startWords[Math.floor(Math.random() * startWords.length)];
    let result = [currentWord];

    for (let i = 1; i < numWords; i++) {
      const possibleNextWords = this.chains[currentWord];

      if (!possibleNextWords || possibleNextWords.length === 0) {
        // Restart from a new random word if stuck
        currentWord = startWords[Math.floor(Math.random() * startWords.length)];
      } else {
        // Pick a random next word
        currentWord =
          possibleNextWords[
            Math.floor(Math.random() * possibleNextWords.length)
          ];
      }

      result.push(currentWord);
    }

    return result.join(" ");
  }
}

module.exports = MarkovMachine;
