const storeProd = require('./configureStore.prod');
const storeDev = require('./configureStore.dev');

if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
  module.exports = storeProd;
} else {
  module.exports = storeDev;
}
