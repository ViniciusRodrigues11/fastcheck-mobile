/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { MotiView } from 'moti'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList } from '../types';

interface iconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  isActive: boolean;
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
      <RootNavigator />
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const TabBarIcon = (props: iconProps) => {
    return (
      <MotiView
        from={{
          opacity: 1,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 1,
        }}
        
      >
        <FontAwesome
          size={props.isActive == true ? 30 : 20}
          style={[{
            width: 68,
            height: 68,
            backgroundColor: '#fff',
            textAlign: "center",
            textAlignVertical: 'center',
            borderRadius: 120,
            padding: 10,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 5,
              height: 5
            }
          },
          props.isActive && { transform: [{ translateY: -20 }], borderColor: 'transparent', borderTopColor: '#ff5566', borderBottomColor: '#ff5566', borderWidth: 1 }
          ]}
          {...props}
        />
      </MotiView>
    )
  }


  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          margin: 10,
          width: 240,
          alignSelf: "center",
          elevation: 0,
          borderColor: 'transparent',
          borderTopWidth: 0
        },
        tabBarShowLabel: false
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={() => ({
          headerShown: false,
          title: 'Tab One',
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} isActive={color == '#8E8E8F' ? false : true} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}

        options={{
          title: 'Tab Two',
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => (
              <TabBarIcon name="user" color={color} isActive={color == '#8E8E8F' ? false : true} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

