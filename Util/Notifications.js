// @flow

import {Notifications, Permissions} from 'expo'
import {AsyncStorage} from "react-native";

const NotificationKey = "bradfordwagner-TrainingCards-notifications";

const createNotification = (title: string, body: string) => {
  return {
    title,
    body,
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
};

export const scheduleNotification = (title?: string = "Did you study?", body?: string = "Don't forget to study today!") => {
  AsyncStorage.getItem(NotificationKey)
    .then(JSON.parse)
    .then((data: boolean) => {
      console.info("scheduleNotification - checked storage", data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then((response: {}) => {

          /*
            ignoring status check (which seems bad) see:
            https://github.com/expo/expo/issues/366
            I could cache but seems excessive just for testing purposes
           */
          // if (status === 'granted') {
          console.info('canceling scheduled notifications');
          Notifications.cancelAllScheduledNotificationsAsync();
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(12);
          tomorrow.setMinutes(0);

          console.info("setting notification for", tomorrow.toLocaleTimeString());
          let notification = createNotification(title, body);
          Notifications.scheduleLocalNotificationAsync(
            notification,
            {
              time: tomorrow,
              repeat: 'day',
            }
          );

          flagStoreage();
          // }
        })
      }
    })
};

export const cancelNotifications = () => {
  console.info("canceling notifications");
  return AsyncStorage.removeItem(NotificationKey)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
};

const flagStoreage = () => {
  AsyncStorage.setItem(NotificationKey, 'true');
};
