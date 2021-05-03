/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {TextInput, Linking, View, TouchableOpacity, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import OneSignal from 'react-native-onesignal';

import {Notifications} from 'react-native-notifications';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Event = ({route, navigation}) => {
  return (
    <View
      flex={1}
      style={{
        backgroundColor: 'salmon',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Id của Event: {route?.params?.id}</Text>
    </View>
  );
};

const Home = ({navigation}) => {
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
      const notification = openedEvent?.notification;
      const ref_type = notification?.additionalData?.ref_type;
      if (ref_type === 'Event') {
        navigation.navigate({
          name: 'Event',
          params: {id: notification?.additionalData?.ref_id},
        });
      }
    });

    Linking.getInitialURL().then(url => {
      console.log('Linking url', url);
    });
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

const Stack = createStackNavigator();

const config = {
  screens: {
    Event: 'Event',
    Home: 'Home',
  },
};

const linking = {
  prefixes: ['notificationexample://'],
  config,
};
const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Event" component={Event} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
