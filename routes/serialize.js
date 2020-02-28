var express = require('express');
var router = express.Router();

const msgpack = require("msgpack-lite");
const xmljs = require('xml-js');
const yaml = require('yaml');

const example = require('../sample.json');

router.get('/', function(req, res, next) {
  let data = [];
  let start = 0;
  let end = 0;
  let loop = 100;
  
  // JSON
  let json = {name: "JSON"};
  let jsonEnc = null;
  let jsonDec = null;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    jsonEnc = JSON.stringify(example);
  };
  end = process.hrtime.bigint();
  json.enc = Number(end - start)/1000000;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    jsonDec = JSON.parse(jsonEnc);
  };
  end = process.hrtime.bigint();
  json.dec = Number(end - start)/1000000;
  json.size = jsonEnc.length;
  data.push(json);
  
  // MessagePack
  let mp = {name: "MessagePack"};
  let mpEnc = null;
  let mpDec = null;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    mpEnc = msgpack.encode(example);
  };
  end = process.hrtime.bigint();
  mp.enc = Number(end - start)/1000000;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    mpDec = msgpack.decode(mpEnc);
  };
  end = process.hrtime.bigint();
  mp.dec = Number(end - start)/1000000;
  mp.size = mpEnc.length;
  data.push(mp);
  
  // XML
  let xml = {name: "XML"};
  let xmlEnc = null;
  let xmlDec = null;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    xmlEnc = xmljs.js2xml(example, {compact: true});
  };
  end = process.hrtime.bigint();
  xml.enc = Number(end - start)/1000000;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    xmlDec = xmljs.xml2js(xmlEnc);
  };
  end = process.hrtime.bigint();
  xml.dec = Number(end - start)/1000000;
  xml.size = xmlEnc.length;
  data.push(xml);
  
  // YAML
  let y = {name: "YAML"};
  let yamlEnc = null;
  let yamlDec = null;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    yamlEnc = yaml.stringify(example);
  };
  end = process.hrtime.bigint();
  y.enc = Number(end - start)/1000000;
  start = process.hrtime.bigint();
  for (let i = 0; i < loop; i++) {
    yamlDec = yaml.parse(yamlEnc);
  };
  end = process.hrtime.bigint();
  y.dec = Number(end - start)/1000000;
  y.size = yamlEnc.length;
  data.push(y);
  
  res.render('serialize', {title: 'serialize', data: JSON.stringify(data), loop: loop});
});

module.exports = router;
