

const Koa = require('koa');
const app = new Koa();

import React from 'react';
import { AppRegistry } from 'react-native-web';

import ReactDOMServer from 'react-dom/server';

import { ServerContainer } from '@react-navigation/native';
import App from './navigation';



AppRegistry.registerComponent('App', () => App);



app.use(async (ctx) => {
    const location = new URL(ctx.url, 'https://example.org/');

    const { element, getStyleElement } = AppRegistry.getApplication('App');

    const html = ReactDOMServer.renderToString(
        <ServerContainer location={location}>{element}</ServerContainer>
    );

    const css = ReactDOMServer.renderToStaticMarkup(getStyleElement());

    const document = `
    <!DOCTYPE html>
    <html style="height: 100%">
    <meta charset="utf-8">
    <meta httpEquiv="X-UA-Compatible" content="IE=edge">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.00001, viewport-fit=cover"
    >
    ${css}
    <body style="min-height: 100%">
    <div id="root" style="display: flex; min-height: 100vh">
    ${html}
    </div>
`;

    ctx.body = document;
});
app.listen(3000);
