var app = {};

//Init the app
app.initialize = function () {
  this.bindEvents();
};

//Bind events to the document
app.bindEvents = function () {
  document.addEventListener('deviceready', this.onDeviceReady, false);
};

//Update class name of an element
app.updateClass = function (elementId, newClassName) {
  try {
    document.getElementById(elementId).className = newClassName;

  } catch (e) {
    console.log("Erro atualizando " + elementId + ":");
    console.log(e);
  }
};

//Update html inside node
app.updateNode = function (elementId, htmlValue) {
  try {
    document.getElementById(elementId).innerHTML = htmlValue;

  } catch (e) {
    console.log("Erro atualizando " + elementId + ":");
    console.log(e);
  }
};

//Update element with value
app.updateValue = function (elementId, newValue) {
  try {
    document.getElementById(elementId).value = newValue;

  } catch (e) {
    console.log("Erro atualizando " + elementId + ":");
    console.log(e);
  }
};

//On device ready
app.onDeviceReady = function () {
  wearable.initialize();
};

//Init app
app.initialize();
