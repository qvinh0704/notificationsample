/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {TextInput, Button, View, TouchableOpacity, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import OneSignal from 'react-native-onesignal';

import {Notifications} from 'react-native-notifications';

const App: () => Node = () => {
  const [externalId, setExternalId] = React.useState('');
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    OneSignal.setAppId('16394537-23d0-4405-827a-ae3a3e6bd6d4');

    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      const notification = notifReceivedEvent.getNotification();
      const privateBody = notification?.additionalData?.private_body;

      Notifications.postLocalNotification({
        body: privateBody || notification?.body,
        title: notification?.title || '',
      });
      notifReceivedEvent.complete(null);
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

  React.useEffect(() => {
    if (externalId) {
      OneSignal.setExternalUserId(externalId);
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [externalId]);

  return (
    <View
      flex={1}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        placeholder="Nhập id"
        style={{
          paddingHorizontal: 8,
          width: '50%',
          height: 50,
          borderRadius: 4,
          borderWidth: 0.8,
          borderColor: 'gray',
          marginBottom: 32,
        }}
        onChangeText={value => setText(value)}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: 16,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => setExternalId(text)}
          style={{
            padding: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#87ceeb',
            borderRadius: 8,
          }}>
          <Text>Đăng nhập với Id</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'salmon',
            borderRadius: 8,
          }}
          onPress={() => {
            setText('');
            setExternalId('');
          }}>
          <Text style={{color: 'white'}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
