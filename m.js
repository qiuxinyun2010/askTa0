let {PythonShell} = require('python-shell')
let {run}= require("./test.js")
let pyshell = new PythonShell('main.py',{mode:'json'});
pyshell.send({pid:"123456"});

pyshell.on('message', function (message) {
//    var msg = JSON.parse(message);
  console.log(message['x']);
});
var input_hex = "4D 5A 88 7F 00 BE 57 C8 00 46 12 0C 00 05 E1 2C 00 00 27 10 00 0C 01 20 03 9A 01 2F 03 AC 01 3F 03 C2 01 53 03 DF 01 5D 03 F0 01 62 04 0A 01 68 04 31 01 69 04 39 01 6C 04 50 01 70 04 6F 01 80 04 8A 01 8C 04 9E 00 05 00 BE 57 C8 00 BE 57 A9"
run(input_hex);
// var jsonStr = '{"name":"jsonStr", "type":"str"}'
// var jsonObj = JSON.parse(jsonStr)
// console.log(jsonObj);