const sortBy = (key, order = 'asc') => (a, b) => {
  return order && order.toLowerCase() === 'desc' ? b[key] - a[key] : a[key] - b[key];
};

exports.sortBy = sortBy;
exports.getCharFrequency = (items, key, order) => {
  const charMap = items.reduce((prev, next) => {
    const word = next[key] ? next[key].toString() : '';
    const charsFound = word ? word.split('') : [];
    charsFound.forEach(character => {
      if (!prev[character]) prev[character] = 0;
      prev[character]++;
    });
    return prev;
  }, {});
  return Object.keys(charMap).map(character => {
    return {
      character,
      count: charMap[character]
    };
  }).sort(sortBy('count', order));
};