import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { initializeApp } from 'firebase/app'
import { firebaseConfig} from '../Fire'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    
    

    const createUser = async() => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            Alert.alert('Пользователь успешно создан')
        } catch (error) {
            Alert.alert(error.message)
        }
        setEmail('')
        setPassword('')
    }

    const userLogin = async() => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            navigation.navigate('TodoApp')
        } catch (error) {
            Alert.alert(error.message)
        }
        setEmail('')
        setPassword('')
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>Todo List</Text>
        <FontAwesome5 name='user' color={colors.black} size={24}/>
        <View >
            <TextInput
            autoComplete='email'
            style={styles.input}
            placeholder='E-mail'
            value={email}
            onChangeText={text => setEmail(text)} />
            <TextInput
            style={styles.input}
            placeholder='пароль'
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}/>
        </View>
        <View>
            <TouchableOpacity
            style={[styles.btn, {backgroundColor: colors.lightBlue}]}
            onPress={userLogin}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.btn, {borderColor: colors.lightBlue, borderWidth: 1}]}
            onPress={createUser}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    wrapper:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{ 
        width: 250,
        marginVertical: 8,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    btn: {
        marginTop: 12,
        height: 50,
        width: 275,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 38,
        fontWeight: '800',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 20,
    }
})

export default Login