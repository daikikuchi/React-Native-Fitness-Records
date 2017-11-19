# React Native Fitness Tracking


### About App
This is React Native project from Udaciy React Nanodegree course. This is Fitness-Tracking Apps for 
triathlon.

### Dependencies
- Please refer to package.json file. 

### to run this project on expo or laptop
  - Clone or download this repository 
  - Please download expo
  - Run  yarn install
  - Run  yarn start
  - To view app with live reloading, point the Expo app to QR code on terminal.
  

### if you encounter this issue
Error : 'ScrollView' has no propType for native prop 'RCTScrollView.onScrollAnimationEnd' of native type ' BOOL' 
Please follow these steps

1. Update expo in the package.json to 21.0.2
2. Update react-native in the package.json to 0.48.4
3. Remove old and install new package versions rm -r node_modules/expo/ node_modules/react-native/ && npm install
4. Set sdkVersion in app.json to 21.0.0 (even if installed version is 21.0.2)
5. Restart expo packager

