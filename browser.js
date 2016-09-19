const React = require('react');
const ReactDOM = require('react-dom');
const mainApp = React.createFactory(require('./src/main.jsx'));

ReactDOM.render(mainApp(window.APP_PROPS), document.getElementById('content'));
