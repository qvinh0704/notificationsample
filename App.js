/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import OneSignal from 'react-native-onesignal';

import {Notifications} from 'react-native-notifications';

const App: () => Node = () => {
  React.useEffect(() => {
    OneSignal.setAppId('16394537-23d0-4405-827a-ae3a3e6bd6d4');
    OneSignal.setExternalUserId('A1234');

    Notifications.android.setNotificationChannel({
      channelId: '6a381483-bf50-4e13-824b-7a1f546971e0',
      name: 'Sport newssssss',
    });

    console.log(
      'setNotificationChannel',
      Notifications.setNotificationChannel({
        channelId: '6a381483-bf50-4e13-824b-7a1f546971e0',
        name: 'Sport newssssss',
      }),
    );

    Notifications.postLocalNotification({
      body: 'Local notification!',
      title: 'Local Notification Title',
      userInfo: {},
    });

    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      Notifications.postLocalNotification({
        body: 'Local notification!',
        title: 'Local Notification Title',
        userInfo: {},
      });
      notifReceivedEvent.complete(notifReceivedEvent.getNotification());
      // const notification = notifReceivedEvent.getNotification();
      // const privateBody = notification?.additionalData?.private_body;
      // console.log('notifReceivedEvent', notifReceivedEvent);
      // console.log('privateBody', privateBody);
    });
    OneSignal.setNotificationOpenedHandler(openedEvent => {
      console.log('OneSignal: notification opened:', openedEvent);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      console.log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver(event => {
      console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver(event => {
      console.log('OneSignal: subscription changed:', event);
    });
    OneSignal.addPermissionObserver(event => {
      console.log('OneSignal: permission changed:', event);
    });
    OneSignal.promptForPushNotificationsWithUserResponse(aa => {
      console.log('OneSignal promptForPushNotificationsWithUserResponse', aa);
    });
    OneSignal.getDeviceState().then(res => console.log('DeviceState', res));
  }, []);

  return <View flex={1} style={{backgroundColor: 'blue'}}></View>;
};

export default App;
