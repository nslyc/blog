require('babel-register')({
    ignore: /node_modules\/(?!koa-*)/,
});
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views')
const favicon = require('koa-favicon');
const assetsMiddleware = require('./middleware/assetsMiddleware');
const index = require('./routes/index.js');
const chalkInfo = require('./build/chalkConfig')['chalkInfo'];

const PORT = process.env.HTTP_PORT || 8000;
const IP = process.env.HTTP_IP || undefined;
const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

const app = new Koa();

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

app.use(favicon(__dirname + '/public/favicon.ico'));
if (IS_DEV) {
    const webpack = require('webpack');
    const devMiddleware = require('./middleware/devMiddleware');
    const webpackConfig = require('./build/webpack.config');
    const compiler = webpack(webpackConfig);
    app.use(devMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
    }));
}

if (IS_PROD) {
    app.use(serve(path.resolve(__dirname, './public/')));
}

app.use(assetsMiddleware({
    env: process.env.NODE_ENV,
    manifestPath: path.join(__dirname, 'public', 'assets_map.json'),
}));

app.use(index.routes(), index.allowedMethods());

app.listen(PORT, IP, () => {
    console.log(chalkInfo(`============= [app started at http://${IP ? IP : 'localhost'}:${PORT}]============= `));
});