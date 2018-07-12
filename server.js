//import the express module in server.js file
var express_mod = require('express');
//call the express module 
var web_app = express_mod();
//create the web server in http
var web_server = require('http').createServer(web_app);
//import the socket module with passing the web_server variable
var soc_io = require('socket.io').listen(web_server);
//creation of empty array for web user and web connection
webusers = [];
webconnectinos = [];
//sever listen to the port number 1337 
web_server.listen(process.env.PORT || 1337 );
//you can see the message server running on port number 1337 on console direacly to Ctrl+shift+i
console.log('Server running on port number 1337 .....');
//web_app variable send the request and response argument...
web_app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
//open a connection with the socket io
soc_io.sockets.on('connection', function(websocket){
    webconnectinos.push(websocket); // add the socket in to the webconnections
    console.log('Your are Connected : %s Sockets are connected to web chat ', webconnectinos.length);
//close the connection with the socket io
websocket.on('dissconnected', function(webdata){
    webusers.splice(webusers.indexof(websocket.webusername),1)
    updateuser();
    webconnectinos.splice(webconnectinos.indexof(websocket), 1)
    console.log('You are Disconnected: %s sockets are Connected', webconnectinos.length);
    });  
//sending messageing to web chat 
websocket.on('sending messaging', function(webdata){
    soc_io.sockets.emit('sending the new message',{msgs:webdata, user:websocket.webusername})
});

// for new user server
websocket.on('new users',function(webdata,callback){
callback(true);
websocket.webusername = webdata;
webusers.push(websocket.webusername);
updateuser();
});
function updateuser(){
    soc_io.sockets.emit('get users', webusers);
    for(var i=0;i<webusers.length;i++)
{
    console.log(webusers[i]);
}
    
};

});














