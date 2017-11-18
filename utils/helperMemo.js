// utils/helpers.js
import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { red, orange, blue, lightPurp, pink, white } from './colors';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'UdaciFitness:notifications';

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true;
  }

  return false;
}

export function calculateDirection(heading) {
  let direction = '';

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North';
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East';
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East';
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East';
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South';
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West';
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West';
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West';
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North';
  } else {
    direction = 'Calculating';
  }

  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  }
});

export function getMetricMetaInfo(metric) {
  const info = {
    run: {
      displayName: 'Run',
      max: 50,
      unit: 'miles',
      step: 1,
      type: 'steppers', // there are buttons called steppers.
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: red }]}>
            <MaterialIcons name="directions-run" color={'white'} size={35} />
          </View>
        );
      }
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: orange }]}>
            <MaterialCommunityIcons name="bike" color={'white'} size={35} />
          </View>
        );
      }
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: blue }]}>
            <MaterialCommunityIcons name="swim" color={'white'} size={35} />
          </View>
        );
      }
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'houes',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: lightPurp }]}>
            <FontAwesome name="bed" color={'white'} size={35} />
          </View>
        );
      }
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View style={[styles.iconContainer, { backgroundColor: pink }]}>
            <MaterialCommunityIcons name="food" color={'white'} size={35} />
          </View>
        );
      }
    }
  };

  return typeof metric === 'undefined' ? info : info[metric];
}
// what these objects are going to contain is they are going to container
// any information that is going to help us build the ui for specific form.

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to log your data today!"
  };
}

export function clearlocalNotification() {
  return AsyncStorage.removeItems(NOTIFICATION_KEY).then(
    NOTIFICATION_KEY.cancelAllScheduledNotificationAsync
  );
}

function createNotification() {
  return {
    title: 'Log your stats!',
    body: '👋 don"t forget to log your stats for today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false, // we don't want to stay
      vibrate: true
    }
  };
}

// we want to check if we've already set a local notification
export function setLocalNotification() {
  // we use AsyncStorage to check getItem to see if our Notification has been set,
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then(data => {
    // if we have not set up a local notification,
    //we want yo ask for permission for notification
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        // if we get permission
        if (status === 'granted') {
          // if we've a;ready established a notification,
          // we'll clear all the local notifications just in case we don't set two
          Notifications.cancelAllScheduledNotificationAsync();

          // create data object
          let tomorrow = new Date();

          tomorrow.setDate(tomorrow.getDate() - 1);
          tomorrow.setHours(20);
          tomorrow.setMintues(0);

          Notifications.scheduleLocalNotificationsAsync(createNotification(), {
            time: tomorrow, // time we wanted to tun is tomorrow
            repeat: 'day' // we want to repeat daily
          });
          // what we want to do is we want to make sure that
          //we establish inside of AsyncStorage
          // that we have set up this local notification in local storage
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      });
    }
  });
}