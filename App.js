import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Login from './screens/Login'
import TodoApp from './screens/TodoApp'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from './Colors'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: colors.lightBlue
          }
        }}
        />
        <Stack.Screen
        name='TodoApp'
        component={TodoApp}
        options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App
