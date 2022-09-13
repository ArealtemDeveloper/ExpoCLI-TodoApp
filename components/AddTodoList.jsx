import { View, Text,StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { colors } from '../Colors'
import { backgroundColors } from '../Colors'
import { initializeApp } from 'firebase/app'
import { firebaseConfig} from '../Fire'
import { getFirestore, addDoc, collection} from 'firebase/firestore'




const AddTodoList = ({closeModal, addList, list}) => {

    const [value, setValue] = useState('')
    const [color, setColor] = useState(backgroundColors[0])
    
   

    //Firestore
    const app = initializeApp(firebaseConfig)
    const firestore = getFirestore(app)

    const dbRef = collection(firestore, 'lists')

    const addListFirestore = async () => {
    await addDoc(dbRef, {
        id: Math.random(),
        name: value,
        color: color,
        todos: [],
    })
    setValue('')
 }

    const createTodoList = async() => {
        
        const list = {name: value, color}
        addList(list)
        addListFirestore()
        
        setValue('')
        closeModal()
    }

    const renderColors =() => {
        return backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color}
                 style={[styles.colorSelect, {backgroundColor: color}]}
                 onPress={() => setColor(color)}
                 />
            )
        })
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TouchableOpacity style={{position: 'absolute', top: 64, right: 32}} onPress={closeModal}>
                <AntDesign name='close' size={24} color={colors.black}/>
        </TouchableOpacity>

        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
            <Text style={styles.title}>Создать список</Text>
            <TextInput 
            style={styles.input} 
            placeholder='Введите название списка'
            value={value}
            onChangeText={text => setValue(text)}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                {renderColors()}
            </View>

            <TouchableOpacity 
                style={[styles.create, {backgroundColor: color}]}
                onPress={createTodoList}
                >
                <Text style={{color: colors.white, fontWeight: '600'}}>Создать</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create:{
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect:{
        width: 30,
        height: 30,
        borderRadius: 4,
    }
})


export default AddTodoList