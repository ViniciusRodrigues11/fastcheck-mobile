import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/Login/Login'

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  
    <Auth.Navigator screenOptions={{
      headerShown: false
    }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
    </Auth.Navigator>
  
)

export default AuthRoutes;
