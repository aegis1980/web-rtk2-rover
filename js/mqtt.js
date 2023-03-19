
const BROKER = new URL("http://127.0.0.1:8083");

const TOPIC_STATUS = "status"
const TOPIC_NMEA = "nmea"
const TOPIC_CONTROL = "control"

// Create a client instance
client = new Paho.MQTT.Client(BROKER.hostname, Number(BROKER.port), "","clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(TOPIC_NMEA);
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = TOPIC_STATUS;
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}