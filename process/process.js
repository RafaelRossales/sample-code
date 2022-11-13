const mongodb = require("../db/mongodb");

// This function is a childe process so that is listening to
// the massage that has beeing sending by the parent process,
// whe the function listem to the message it invoke a callback
// function that is in charge to handle the content and the topic
process.on('message',async function(topic,message){

    // Content must be converted to a string, because here I'm receiving a buffer
    const content = (message).toString(); 

    // topic
    const subject= topic;

    // this function is going to receive a package containing many messages 
    // the messages are supose to be splited and organized in a way that is
    // accepeted by the data base schema;
    //ex.:
    // {
    //     "value":"xxxxxx",
    //     "type":"xxxx",
    //     "created_at":"xxxx"
    // }
    var data = await prepare(unpack(
        content
    ));


    // This line is going to create a database to save the device data
    // according to its name;
    const db = await mongodb.connection.useDb(deviceName);

    // This line should create a collection so save the messages
    await db.collection('msg').insertMany(data);

});