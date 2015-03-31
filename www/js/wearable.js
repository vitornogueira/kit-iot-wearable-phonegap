var wearable = {};

//Init
wearable.initialize = function () {
  bluetoothSerial.subscribe('\n', wearable.onDeviceMessage, wearable.generateFailureFunction("Subscribe Failed"));
  bluetoothSerial.list(wearable.onDeviceList, wearable.generateFailureFunction("List Failed"));

  app.updateNode("content-status", "INICIALIZANDO...");
};

//On buzzer
wearable.updateBuzzer = function (value) {
  bluetoothSerial.write("#PM" + value + "\n", {}, wearable.onWearableWriteFailure);
};

//Turn led off
wearable.ledOFF = function () {
  bluetoothSerial.write("#LL0000\n", {}, wearable.onWearableWriteFailure);
};

//On led
wearable.updateLed = function (led, value) {
  bluetoothSerial.write("#" + led + value + "\n", {}, wearable.onWearableWriteFailure);
};

//On luminosity
wearable.onLuminosityChange = function (value) {
  app.updateNode("content-lightbulb", value);
};

//On tempeperature
wearable.onTemperature = function (value) {
  app.updateNode("content-temperature", value);
};

//On accelerometer
wearable.onAccelerometer = function (axis, value) {
  if (axis === "AX") {
    app.updateNode("content-accelerometer-x", value);
  }
  if (axis === "AY") {
    app.updateNode("content-accelerometer-y", value);
  }
  if (axis === 'AZ') {
    app.updateNode("content-accelerometer-z", value);
  }
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

  switch (msgCommand) {
    case "LI":
      wearable.onLuminosityChange(msgValue);
      break;

    case "B1":
      wearable.onButtonOne(msgValue);
      break;

    case "B2":
      wearable.onButtonTwo(msgValue);
      break;

    case "AX":
    case "AY":
    case "AZ":
      wearable.onAccelerometer(msgCommand, msgValue);
      break;

    case "TE":
      wearable.onTemperature(msgValue);
      break;

    default:
      break;
  }
};

//On device list bluetooth
wearable.onDeviceList = function (devices) {
  var regex = /wV3/i;

  devices.forEach(function (device) {
    if (regex.test(device.name)) {
      app.updateNode("content-status", "CONECTANDO...");

      bluetoothSerial.connect(device.id, wearable.onWearableConnectSuccess, wearable.onWearableConnectFailure);
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
  app.updateNode("content-status", "BUSCANDO...");
  app.updateClass("content-status", "value");

  setTimeout(function () {
    bluetoothSerial.list(wearable.onDeviceList, wearable.generateFailureFunction("List Failed"));
  }, 2000);
};

//On wearable connect
wearable.onWearableConnectSuccess = function () {
  app.updateNode("content-status", "CONECTADO");
  app.updateClass("content-status", "value connected");

  bluetoothSerial.subscribe('\n', wearable.onDeviceMessage, wearable.generateFailureFunction("Subscribe Failed"));

  //Interval to get the luminosity
  setInterval(function () {
    bluetoothSerial.write('#LI0000\n', function () {
      bluetoothSerial.write('#TE0000\n', function () {}, wearable.onWearableWriteFailure);
    }, wearable.onWearableWriteFailure);
  }, 1000);

  setInterval(function () {
    bluetoothSerial.write('#AC0003\n', function () {}, wearable.onWearableWriteFailure);
  }, 500);
};
