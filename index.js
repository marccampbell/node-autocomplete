var net = require('net'), sys = require('sys'), fs = require('fs'), lazy = require('lazy');
var winston = require('winston');
var parser = require("./lib/message");  
var autocomplete = require('./lib/autocomplete');
var config = require('./config');

//initialized logging (winston)
winston.add(winston.transports.File, { filename: config.logFile});
winston.remove(winston.transports.Console);
var a = autocomplete.connectAutocomplete();

initServer(config, a);

var server = net.createServer(function (stream) {
    stream.setEncoding("utf8");
    stream.on("connect", initStream);
    stream.on("data", handleReceive);
    stream.on("end", function () {
       stream.end();
       logInfo('stream end, closing');
    });
    
    stream.on("error", function(error) {
       logError(error);
       stream.end();
    });
  });
  server.listen(5050, "127.0.0.1");
//  });
  
  function handleReceive(data) {
   //  console.log('received ' + data.length + ' bytes of data');
     this.myRequest.inBuffer = this.myRequest.inBuffer + data;
    // console.log('total length=' + this.myRequest.inBuffer.length);
     for(; ;) {
        var rc = parser.parse(this.myRequest);
        if(rc) {
           logDebug('read a request, start to handle');
           // start to handle payload
           var payload = this.myRequest.inBuffer.substr(this.myRequest.headerLength+4, this.myRequest.contentLength);
           //logDebug('received content:' + payload);
           var jPayload = JSON.parse(payload);
           if(jPayload.method === 'add') {
              //handle add
              processAdd(jPayload);
           }
           else if(jPayload.method === 'remove') {
              //handle remove
              processRemove(jPayload);
           }
           else if(jPayload.method === 'search') {
              processSearch(jPayload, this);
           }
           resetStream(this.myRequest);
        }
        else if(this.myRequest.needRead) {
           break;
        }
        else {
           logError("in error, close the stream");
           this.end();
           break;
        }
     }
  }

  function initStream() {
     this.myRequest = new Object;
     this.myRequest.inBuffer = "";
     this.myRequest.contentLength = 0;
     this.myRequest.needRead = true;
     this.myRequest.headerReceived = false;
     this.myRequest.headerLength = 0;
     this.myRequest.requestId = "";
     //console.log("a new connection\n");
     // sys.puts(sys.inspect(socket, false));
  }
  
  function processAdd(data) {
    logInfo('in add operation');
    var items = data.data;
    for(var i = 0; i < items.length; i++) {
       if(items[i].key.length > 0 && items[i].value) {
    //      console.log('add item:' + items[i]);
          a.addElement(items[i]);
       }
       else if(item[i].key.length > 0 && !items[i].value) {
      //    console.log('add item:' + items[i].key);
          a.addElement(items[i].key);
       }
    }
  }

  function processRemove(data) {
    logInfo('in remove operation');
    var items = data.data;
    for(var i = 0; i < items.length; i++) {
       if(items[i].key.length > 0) {
          logInfo('remove item:' + items[i].key);
          a.removeElement(items[i].key);
       }
    }
  }

  function processSearch(data, socket ) {
    logInfo('in search operation');
    var results = [];
    var items = data.data;
    if(items.length > 0) {
      results = a.search(data.data[0].key);
    }
    // send resutls back
    var response = new Object();
    response.method = 'search';
    response.data = results;
    var jresp = JSON.stringify(response);
    var wire ='Content-Length:' + jresp.length + '\r\n';
    wire = wire + 'Request-Id:' + socket.myRequest.requestId + '\r\n\r\n' + jresp;
    socket.write(wire);
  }
  
  function resetStream(request) {
     // move remaining data to the front
     request.inBuffer = request.inBuffer.substr(request.headerLength+4 + request.contentLength);
     request.headerLength = 0;
     request.contentLength = 0;
     request.needRead = true;
     request.headerReceived = false;
     request.requestId = "";
  }

  function initServer(config, AutoComplete) {
     for(var i = 0; i < config.maxFiles; i++) {
        var fileName = config.fileLocation + config.filePrefix + i + config.fileSuffix;
     //   console.log('file name=' + fileName);
        new lazy(fs.createReadStream(fileName)) 
            .lines
            .forEach(function(line) {
               var kv = line.toString().split(':');
               //console.log('add key/value: ' + kv);
               if(kv.length > 1) {
                  var item = new Object();
                  item.key = kv[0];
                  item.value = kv[1];
                  AutoComplete.addElement(item);
               }
               else {
                  AutoComplete.addElement(kv[0]);
               }
            }
            );
     }
  }

  function logInfo(log) {
     if(config.logLevel >= 4) {
        var current = new Date();
        winston.info(current + ': ' + log);
     }
  }
  function logDebug(log) {
     if(config.logLevel >=5) {
        var current = new Date();
        winston.debug(current + ': ' + log);
     }
  }
  function logError(log) {
     if(config.logLevel >= 2) {
       var current = new Date();
       winston.error(current + ': ' + log);
     }
  }

