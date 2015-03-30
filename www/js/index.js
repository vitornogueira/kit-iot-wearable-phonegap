var app = {};

app.initialize = function () {
  this.bindEvents();
};

app.bindEvents = function () {
  document.addEventListener('deviceready', this.onDeviceReady, false);
};

app.updateClass = function (elementId, newClassName) {
  try {
    document.getElementById(elementId).className = newClassName;

  } catch (e) {
    console.log("Erro atualizando " + elementId + ":");
    console.log(e);
  }
};

app.updateNode = function (elementId, htmlValue) {
  try {
    document.getElementById(elementId).innerHTML = htmlValue;

  } catch (e) {
    console.log("Erro atualizando " + elementId + ":");
    console.log(e);
  }
};

app.updateValue = function (elementId, newValue) {
    try {
      document.getElementById(elementId).value = newValue;

    } catch (e) {
      console.log("Erro atualizando " + elementId + ":");
      console.log(e);
    }
};

app.onLedChangeR = function (value) {
  wearable.updateLedR(value);
};

app.onLedChangeG = function (value) {
  wearable.updateLedG(value);
};

app.onLedChangeB = function (value) {
  wearable.updateLedB(value);
};

app.onBuzzerChange = function (value) {
  wearable.updateBuzzer(value);
};

app.onDeviceReady = function () {
  app.receivedEvent('deviceready');
  app.initialize();
  wearable.initialize();
};

app.receivedEvent = function (id) {
  console.log('Received Event: ' + id);
};

