const mqtt = require('mqtt');

class Broker{

    constructor()
    {
    
        this.connetion = null;

        this.client = null;
    }

    setClient(value){
        this.client = value;
        return this;
    }

    getClient(){
        return this.client;
    }


    conn()
    {
        // Connecting to the mosquitto broker
        const client = mqtt.connect('mqtt://localhost:9001');

        // Subscribing to all topics
        client.subscribe("#");

        // setting client
        this.setClient(client);

        return this;
    }
}

const mqttConnection = new Broker; 

// Starting the connection
mqttConnection.conn();

// exporting an instance of the mqtt connection
module.exports = mqttConnection;