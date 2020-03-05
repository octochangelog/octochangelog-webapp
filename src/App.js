import React from 'react';

const Converter = require('md-to-bemjson');
const md2Bemjson = new Converter();

const App = () => (
  <pre>{JSON.stringify(md2Bemjson.convertSync('# Hello world'), null, 2)}</pre>
);

export default App;
