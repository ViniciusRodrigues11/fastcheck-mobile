import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/Login/Login'
import Register from '../screens/Register'

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  
    <Auth.Navigator screenOptions={{
      headerShown: false
    }}
    >
      <Auth.Screen name="Login" component={SignIn} />

      <Auth.Screen name="Register" component={Register} />
    </Auth.Navigator>
  
)

export default AuthRoutes;
