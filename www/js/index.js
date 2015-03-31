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

app.onDeviceReady = function () {
  wearable.initialize();
};

//Init app
app.initialize();
