const { default: cluster } = require("cluster")
const mqttConnection = require("./mqtt/clientConnection")
const os = require('os');

class Index(){

    constructor()
    {
        this.processAmount = null;

        // According to thiss function I've got 2 cpus available,
        // so that this is going to be set in the processAmount variable
        this.setProcessAmount(os.cpus().length);
    }

    setProcessAmount(){
        this.processAmount;
        returnt this;   
    }

    getProcessAmount(){
        return this.processAmount;
    }

    // Entrepoint
    init()
    {

        if(cluster.isMaster)
        {
            // Array of children 
            var children = [];

            // Process controller
            var counter = 0;

            // Creating children according to cpus amount;
            for(let i  = 0; i < this.getProcessAmount(); i++)
            {
                children.push(cluster.fork());
            }

            // Listem to messagem recived by the broker
            mqttConnection.getClient().on('message',function(topic,message){

                // At this point the topics and messages received are being sending 
                // to process one and two   
                children[counter].send({
                    topic,
                    message
                });

                // The main purpose of counter in ther function is to controll
                // witch child process shold handle the topic and message;
                // so this counter is going to alternate between the first and the 
                // second child
                counter++;

                if(counter === children.length)
                {
                    // when counter hits the same children's length its going to receive 0
                    // in order to avoid undefined values
                    counter = 0;
                }
            });
        }else
        {
            // forking process file
            await import(`${__dirname}/process.js`);
        }
    }
}


(new Index).init();

