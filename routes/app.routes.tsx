import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {BottomTabNavigator} from '../navigation'

const App = createStackNavigator();

const AppRoutes: React.FC = () => (

    <App.Navigator screenOptions={{
        headerShown: false,
    }}
    >
        <App.Screen name="Navigation" component={BottomTabNavigator} />
    </App.Navigator>

)

export default AppRoutes;
