import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Navigation from '../navigation'

const App = createStackNavigator();

const AppRoutes: React.FC = () => (

    <App.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' }
    }}
    >
        <App.Screen name="Navigation" component={Navigation} />
    </App.Navigator>

)

export default AppRoutes;
