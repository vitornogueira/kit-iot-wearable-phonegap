# Kit IoT Wearable Phonegap App
This is the **HTML5** / **CSS** / **JS** app for the [Kit IoT Wearable](http://iot.telefonicabeta.com/kit-iot-wearable) from Telefonica VIVO.


## How to run

### You hsould have [phonegap](https://www.npmjs.com/package/phonegap) instaled using NodeJS.

```
$ npm install phonegap -g
```


### After cloning the project add the plataform(s) you want to run.

To create the **Android** app.

```
$ phonegap platform add android
```

To crete the **iOS** app.

```
$ phonegap platform add ios
```

### To run in the simulator or in your device

#### Run in Android

To run in Android make sure you have [ant](http://ant.apache.org/) installed in you computer.

```
$ brew install ant
```

Then run it

```
$ phonegap run android
```

#### Run in iOS

To run in iOS make sure you have the [ios-deploy](https://www.npmjs.com/package/ios-deploy) NodeJS module installed.

```
$ npm install -g ios-deploy
```

Then run it.

```
$ phonegap run ios
```
