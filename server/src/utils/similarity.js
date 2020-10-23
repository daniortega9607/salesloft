const generatePatterns = (word) => {
  let currentLength = 1;
  const patterns = [];
  for (let i = 0; i < word.length; i++) {
    const key = word.slice(i, i + currentLength);
    if (!patterns[i]) {
      patterns[i] = {};
    }
    patterns[i][key] = key.length / word.length;
    if (i + currentLength === word.length) {
      i = -1;
      currentLength++;
    }
  }
  return patterns;
};

exports.similarity = (wordA, wordB) => {
  const wordToCompare = wordB.length > wordA.length ? wordA : wordB;
  const patterns = generatePatterns(wordB.length > wordA.length ? wordB : wordA);
  let currentLength = 1;
  const patternsB = [];
  for (let i = 0; i < wordToCompare.length; i++) {
    const key = wordToCompare.slice(i, i + currentLength);
    if (patterns[i][key]) {
      patternsB[i] = { key, weight: patterns[i][key] };
    } else if (patterns[i - 1] && patterns[i - 1][key]) {
      patternsB[i] = { key, weight: patterns[i - 1][key] };
    } else if (patterns[i + 1] && patterns[i + 1][key]) {
      patternsB[i] = { key, weight: patterns[i + 1][key] };
    }
    if (i + currentLength === wordToCompare.length) {
      i = -1;
      currentLength++;
    }
  }
  let weight = 0;
  for (let i = 0; i < patternsB.length; i++) {
    if (patternsB[i]) {
      weight += patternsB[i].weight;
      i += patternsB[i].key.length;
    }
  }
  return weight;
};

exports.JaroWinkler = function (s1, s2) {
  /*
    I found this algorithm implementing jaro-winkler distance,
    it's way faster and accurate than my implementation so I'll
    leave it here... just in case
    https://medium.com/@sumn2u/string-similarity-comparision-in-js-with-examples-4bae35f13968
  */
  var m = 0, i = 0, j = 0;

  // Exit early if either are empty.
  if (s1.length === 0 || s2.length === 0) {
    return 0;
  }

  // Exit early if they're an exact match.
  if (s1 === s2) {
    return 1;
  }

  var range = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1,
    s1Matches = new Array(s1.length),
    s2Matches = new Array(s2.length);

  for (i = 0; i < s1.length; i++) {
    var low = (i >= range) ? i - range : 0,
      high = (i + range <= s2.length) ? (i + range) : (s2.length - 1);

    for (j = low; j <= high; j++) {
      if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
        ++m;
        s1Matches[i] = s2Matches[j] = true;
        break;
      }
    }
  }

  // Exit early if no matches were found.
  if (m === 0) {
    return 0;
  }

  // Count the transpositions.
  var k = 0, n_trans = 0;

  for (i = 0; i < s1.length; i++) {
    if (s1Matches[i] === true) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j] === true) {
          k = j + 1;
          break;
        }
      }

      if (s1[i] !== s2[j]) {
        ++n_trans;
      }
    }
  }

  var weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3,
    l = 0,
    p = 0.1;

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l;
    }

    weight = weight + l * p * (1 - weight);
  }

  return weight;
};