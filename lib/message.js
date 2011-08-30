
exports.parse = function(request) {
   var MAXHEADERLENGTH = 100;
   //check if request header is received
   var rc = false;
   //console.log('in parser');
   if(request.headerReceived) { // to get the content then
      if(request.inBuffer.length >= (request.headerLength + request.contentLength + 4)) {
         rc = true;
         request.needRead = false;
      }
      else {
        request.needRead = true;
      }
   }
   else {
      var index = -1;
     // console.log('try to get header');
      index = request.inBuffer.indexOf("\r\n\r\n");
      if(index != -1) {
       //  console.log('header received');
         request.headerReceived = true;
         request.headerLength = index;
         var rc1 = parseHeader(request);
         // check if content is received
         if(rc1) {
         //   console.log('contentLenght=' + request.contentLength + ' requestId=' + request.requestId);
         //   console.log('total message Len:' + request.inBuffer.length + ' contentLenght=' + request.contentLength + ' requestHeaderLength=' + request.headerLength);
            if(request.inBuffer.length >= (request.headerLength + request.contentLength + 4)) {
               rc = true;
               request.needRead = false;
            }
            else {
              request.needRead = true;
            }
         }
         else { // something wrong in header
            request.needRead = false;
            rc = false;
         }
      }
      else {
         if(request.inBuffer.length > MAXHEADERLENGTH) { // must be bad request
            rc = false;
            request.needRead = false;
         }
         else {
           request.needRead = true;
         }
        // console.log('need to read more');
      }
   }
   return rc;
};

function parseHeader(request) {
   var rc = true;
   var subHeaders = request.inBuffer.split("\r\n");
   request.contentLength = getContentLength(subHeaders);
   request.requestId = getRequestId(subHeaders);
   if(request.contentLength == 0 || request.requestId == "") {
      rc = false;
   }
   return rc;
}

function getContentLength(headers) {
   var index = -1, i =0;
   var length = 0;
   for(i = 0; i < headers.length; i++) {
      if(headers[i].indexOf("Content-Length") != -1) {
         var subString = headers[i].split(":");
         if(subString.length == 2) {
            length = parseInt(subString[1]);
            if(isNaN(length)) {
               length = 0;
            }
         }
         break;
      }
   }
   //console.log('contentLength:' + length);
   return length;
}

function getRequestId(headers) {
   var i =0;
   var requestId = "";
   for(i = 0; i < headers.length; i++) {
      if(headers[i].indexOf("Request-Id") != -1) {
         var subString = headers[i].split(":");
         if(subString.length == 2) {
            //remove leading and trailing whitespace
            requestId  = subString[1].replace(/^\s+|\s+$/g, '') ;
         }
         break;
      }
   }
   //console.log('requestid:' + requestId);
   return requestId;
}


