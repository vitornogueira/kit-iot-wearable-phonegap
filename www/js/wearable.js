var wearable = {};

//Init
wearable.initialize = function () {
  bluetoothSerial.subscribe("\n", wearable.onDeviceMessage, wearable.generateFailureFunction("Subscribe Failed"));
  bluetoothSerial.list(wearable.onDeviceList, wearable.generateFailureFunction("List Failed"));
  app.updateNode("content-status", "INICIALIZANDO");
};

//On buzzer
wearable.updateBuzzer = function (value) {
  bluetoothSerial.write("#PM" + value + "\n", {}, wearable.onWearableWriteFailure);
};

//On led
wearable.updateLed = function (led, value) {
  bluetoothSerial.write("#" + led + value + "\n", {}, wearable.onWearableWriteFailure);
};

//On led red
wearable.updateLedR = function (value) {
  wearable.updateLed("LR", value);
};

//On led green
wearable.updateLedG = function (value) {
  wearable.updateLed("LG", value);
};

//On led blue
wearable.updateLedB = function (value) {
  wearable.updateLed("LB", value);
};

//On luminosity
wearable.onLuminosityChange = function (luminosityValue) {
  app.updateNode("content-lightbulb", luminosityValue);
};

//On tempeperature
wearable.onTemperature = function (temperatureValue) {
  app.updateNode("content-temperature", temperatureValue);
};

//On accelerometer
wearable.onAccelerometer = function (value) {
  app.updateNode("content-accelerometer-x", value.x);
  app.updateNode("content-accelerometer-y", value.y);
  app.updateNode("content-accelerometer-z", value.z);
};

//On button 1 click
wearable.onButtonOne = function (bool) {
  var strBool;

  if (bool == "1") {
    strBool = "ON";
    app.updateClass("content-button-1-icon", "fa fa-circle");

  } else {
    strBool = "OFF";
    app.updateClass("content-button-1-icon", "fa fa-circle-thin");
  }

  app.updateNode("content-button-1", strBool);
};

//On button 2 click
wearable.onButtonTwo = function (bool) {
  var strBool;

  if (bool == "1") {
    strBool = "ON";
    app.updateClass("content-button-2-icon", "fa fa-circle");

  } else {
    strBool = "OFF";
    app.updateClass("content-button-2-icon", "fa fa-circle-thin");
  }

  app.updateNode("content-button-2", strBool);
};

//Parse the wearable messages
wearable.onDeviceMessage = function (msg) {
  msgCommand = msg.substr(0, 3).trim().replace(/[^\w\s\d.-]/gi, '');
  msgValue = msg.substr(3, msg.length-3).trim().replace(/[^\w\s\d.-]/gi, '');

  switch (msg.substr(0,3)) {
    case "#LI":
      wearable.onLuminosityChange(msgValue);
      break;

    case "#B1":
      wearable.onButtonOne(msgValue);
      break;

    case "#B2":
      wearable.onButtonTwo(msgValue);
      break;

    case "#AC":
      wearable.onAcelerometer(msgValue);
      break;

    case "#TE":
      wearable.onTemperature(msgValue);
      break;

    default:
      break;
  }
};

//On device list bluetooth
wearable.onDeviceList = function (devices) {
  devices.forEach(function (device) {
    regex = /wV3/i;

    if (regex.test(device.name)) {
      app.updateNode("content-status", "CONECTANDO");
      bluetoothSerial.connect(device.address, wearable.onWearableConnectSuccess, wearable.onWearableConnectFailure);
    }
  });
};

//Failure function
wearable.generateFailureFunction = function (message) {
  var func = function (reason) {
    var details = "";

    if (reason) {
      details += ": " + JSON.stringify(reason);
    }
    console.log(message + details);
  };

  return func;
};

//On connect failure
wearable.onWearableConnectFailure = function (message) {
  app.updateNode("content-status", "RECONECTANDO");

  setTimeout(function(){
    bluetoothSerial.list(wearable.onDeviceList, wearable.generateFailureFunction("List Failed"));
  }, 2000);
};

//On wearable connect
wearable.onWearableConnectSuccess = function () {
  app.updateNode("content-status", "CONECTADO");
  bluetoothSerial.subscribe("\n", wearable.onDeviceMessage, wearable.generateFailureFunction("Subscribe Failed"));

  //Set the led off
  bluetoothSerial.write("#LL0000\n", function () {
    app.updateValue("content-led-r", 0);
    app.updateValue("content-led-g", 0);
    app.updateValue("content-led-b", 0);

    //Get the accelerometr value
    bluetoothSerial.write("#AC0003\n", {}, wearable.onWearableWriteFailure);
  }, wearable.onWearableWriteFailure);

  //Interval to get the accelerometer
  setInterval(function () {
    bluetoothSerial.write("#AC0003\n", {}, wearable.onWearableWriteFailure);
  }, 1000);

  //Interval to get the luminosity
  setInterval(function () {
    bluetoothSerial.write("#LI0000\n", {}, wearable.onWearableWriteFailure);
  }, 3000);

  //Interval to get the temperature
  setInterval(function () {
    bluetoothSerial.write("#TE0000\n", {}, wearable.onWearableWriteFailure);
  }, 3000);
};
