const http = require('http');
const browserify = require('browserify');
const literalify = require('literalify');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const DOM = React.DOM;
const body = DOM.body;
const div = DOM.div;
const script = DOM.script;

const mainApp = React.createFactory(require('./src/main.jsx'));

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

http.createServer((req, res) => {
  let props;
  let html;
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </script>',
        'Item <!--inject!-->',
      ],
    };

    html = ReactDOMServer.renderToStaticMarkup(body(null,
      div({ id: 'content', dangerouslySetInnerHTML: { __html:
        ReactDOMServer.renderToString(mainApp(props)),
      } }),

      script({ dangerouslySetInnerHTML: { __html:
        `var APP_PROPS = ${safeStringify(props)};`,
      } }),

      script({ src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react.min.js' }),
      script({ src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react-dom.min.js' }),

      script({ src: './build/bundle.js' })
    ));

    res.end(html);
  } else if (req.url === '/bundle.js') {
    res.setHeader('Content-Type', 'text/javascript');
    browserify()
      .add('./browser.js')
      .transform(literalify.configure({
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
      }))
      .bundle()
      .pipe(res);
  } else {
    // res.statusCode = 404;
    res.end();
  }
}).listen(3000, (err) => {
  if (err) throw err;
  // console.log('Listening on 3000...');
});
