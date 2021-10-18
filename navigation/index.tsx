/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { MotiView } from 'moti'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootTabParamList } from '../types';

interface iconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  isActive: boolean;
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
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
          props.isActive && { transform: [{ translateY: -20 }], elevation: 1 }
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
          elevation: 0.5,
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

