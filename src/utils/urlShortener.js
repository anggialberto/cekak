const createUrl = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',

  choice: function (choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
  },
  generateShortURL: function (size = 6, chars = this.lowercase + this.uppercase + this.digits) {
    let hash = '';
    for (let i = 0; i < size; i++) hash += this.choice(chars)
    return hash;
  }
}

module.exports = createUrl;