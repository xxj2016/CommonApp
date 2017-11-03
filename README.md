#commonApp

Ionic 2 专注于以标准的 HTML 、 CSS 和 JavaScript 来构建移动站点，并可以通过 Cordova 打包成移动 App，只需编写一次代码，就可以分别部署到 iOS 、Android 等多种移动平台上。Ionic 2 与一代相比有较大的变化，基于最新的 Angular 2 (Angular 2 比Angular 1 快5到10倍)，使用 TypeScript进行开发

## 安装Ionic2

* npm uninstall -g ionic 如果之前安装过 Ionic 2 的 beta 版本，需要先卸载掉
* npm install -g ionic@latest
* ionic -version 查看版本号

## 安装Cordova

* npm install -g cordova
* cordova -version 查看版本号

## 安装JDK

* 注意请安装最新版本的 JDK(下载8u111或8u112以上版本)，下载地址：http://www.oracle.com/technetwork/java/javase/downloads/index.html

## 安装Android SDK

## 创建项目

* ionic start 项目名称 模板名称  如：ionic start demo tabs


## 在浏览器中运行
* npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
* npm install
* ionic serve 或 ionic serve --address 192.168.10.113 --port 6228 --livereload-port 35600 --dev-logger-port 53600

## Navigation

Navigation控制App内不同的页面间进行转换。Ionic的Navigation遵循各原生平台的导航原则。Navigation是在ion-nav组件内进行处理的，像一个简单的栈，页面被push或被pop，就可以实现向前导航或历史栈的后退导航。

## 主题化

Ionic App支持主题风格。要改变主题，只需要调整src/theme/variables.scss文件中的$colors

## plugin 安装 https://cordova.apache.org/plugins/

安装cordova插件的时候用ionic cordova plugin add ...的方式添加，这样会在package.json中添加这个插件的条目，如果有人clone了你的项目想在本地运行，可以用ionic state restore它会根据cordovaPlugins条目安装对应的插件。如果直接用cordova plugin add 安装则不会更新package.json。
删除用 ionic cordova plugin remove

## platform 平台

* ionic cordova platform add android

## 移除平台

* ionic cordova platform remove android

## emulate 将Ionic项目部署到模拟器或仿真器上

emulate命令将App部署到特定的平台设备上。你也可以通过在特定的模拟器上添加--livereload选项运行live reload。live reload功能类似ionic serve，但是不是使用标准的浏览器来开发和调试，编译后的hybrid应用本身会监控任何文件改变并在需要的时候重新载入App。这降低了针对小改动需要频繁重新编译App的需求。然而任何插件的改变将导致完全的重新编译。为使live reload能够正常工作，开发机和模拟器必须在一个相同的本地网络中，并且设备必须支持web sockets。

* ionic cordova emulate android
* ionic cordova emulate android --livereload --address 192.168.56.1 --port 6228 --livereload-port 35700 --dev-logger-port 53700

## run 在连接的设备上运行Ionic项目

run命令将应用部署到指定的设备上。你可以通过添加--livereload选项在指定的平台设备上运行live reload。live reload功能类似ionic serve，但是不是使用标准的浏览器来开发和调试，编译后的hybrid应用本身会监控任何文件改变并在需要的时候重新载入App。这降低了针对小改动需要频繁重新编译App的需求。然而任何插件的改变将导致完全的重新编译。为使live reload能够正常工作，开发机和模拟器必须在一个相同的本地网络中，并且设备必须支持web sockets。

ionic cordova run android --livereload
ionic cordova run android --address 192.168.10.113 --port 6228 --livereload

## 制作签名文件(.keystore文件)
keytool -genkey -v -keystore commonApp.keystore -alias commonApp -keyalg RSA -validity 10000

## build

* 打包debug调试版（生成的apk就是debug调试版本） ionic cordova build android --prod
* 打包release发布版（release版本是必须有签名才能在手机上运行） ionic cordova build android --prod --release --buildConfig

## info

* ionic info 列出用户的Ionic运行环境信息

## 远程调试——VS Code插件

VS Code有一个专用的插件(Cordova Tools)来调试Cordova程序。这个插件在设备和调试器直接建立桥接，允许你在编辑器中直接设置断点。

## 远程调试——Android和Chrome

Chrome DevTools开发者工具是调试应用的有力工具。当你使用ionic serve命令在浏览器中运行应用的时候，DevTools可以用来检查元素，查看console日志，分析应用或其他更多功能。
DevTools除了可以在浏览器中调试应用，还可以用来远程调试物理设备甚至Genymotion模拟器中的应用。首先，我们需要安装adb。安装后一旦设备连接上，或Android模拟器运行起来的时候，你可以运行下面的命令来查看设备列表：
$ adb devices
然后在Chrome中打开chrome://inspect/#devices来查看Android设备。注意，也许需要改变设备的设置来允许USB调试。注意你可以使用Chrome来调试应用，就像在浏览器中那样！


## 使用typings
* typings search echarts
* typings install dt~echarts --global --save

## ionic2 css-utilities
* http://ionicframework.com/docs/theming/css-utilities/

# 命令行工具自动修改应用图标及添加启动画面
1. 在项目的根目录下创建resources文件夹。
2. 在文件夹中都放入icon.png（应用图标，最小192x192px，不带圆角），splash.png（启动屏幕，最小2208x2208px，中间区域1200x1200px）(可以是
    png、psd、ai)
3. 在cmd中进入项目所在文件夹执行：ionic cordova resources .执行该命令后，会自动在resources文件夹下创建已添加的平台名称的文件夹，如：android，其
    中会自动将图片进行缩放、裁剪，生成不同分辨率的图片，并在config.xml中添加相应内容。

    也可分开执行：
    * ionic cordova resources --icon
    * ionic cordova resources --splash

## 极光推送
* https://github.com/jpush/jpush-phonegap-plugin
* cordova plugin add jpush-phonegap-plugin --variable APP_KEY=your_jpush_appkey

## Ionic2/3 热更新
1. http://ionicframework.com/docs/native/code-push/



# commonApp