let {PythonShell} = require('python-shell')
let {run}= require("./test.js")
let pyshell = new PythonShell('main.py',{mode:'json'});
pyshell.send({pid:"123456"});

pyshell.on('message', function (message) {
//    var msg = JSON.parse(message);
  console.log(message['x']);
});
var input_hex = "4D 5A 0A 9F 05 90 4C CA 00 0A 20 D2 05 90 4C CA 07 5E 96 E5"
run(input_hex);
// var jsonStr = '{"name":"jsonStr", "type":"str"}'
// var jsonObj = JSON.parse(jsonStr)
// console.log(jsonObj);