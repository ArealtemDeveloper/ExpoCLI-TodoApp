import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput,Keyboard , Animated} from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { colors } from '../Colors'
import { Swipeable } from 'react-native-gesture-handler'



const TodoModal = ({list, closeModal, updateList}) => {

    const taskCount = list.todos.length
    const completedCount = list.todos.filter(todo => todo.completed).length
    
    const [value, setValue] = useState('')

    const toggleTodoCompleted = index => {
        list.todos[index].completed = !list.todos[index].completed

        updateList(list)
    }

    const addTodo = () => {
        list.todos.push({
            title: value,
            completed: false,
        })

        updateList(list)
        
        setValue('')
        Keyboard.dismiss()
    }

    const rightActions = (dragX, index) => {

        const scale = dragX.interpolate({
            inputRange: [-100,0],
            outputRange: [1, 0.9],
            extrapolate: 'clamp',
        })

        const opacity = dragX.interpolate({
            inputRange: [-100,-20,0],
            outputRange: [1,0.9,0],
            extrapolate: 'clamp',
        })

        const deleteTodo = index => {
            list.todos.splice(index, 1)

            updateList(list)
        }

        return (
            <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
                    <Animated.Text style={{color: colors.white, fontWeight: '800', transform: [{scale}]}}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    renderTodo = (todo, index) => {
        return (
            <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, index)}>
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
                    <Ionicons
                    name={todo.completed ? 'ios-square' : 'ios-square-outline'}
                    size={24}
                    color={colors.gray}
                    style={{width: 32}}/>
                </TouchableOpacity>

                <Text
                style={[styles.todo,
                {color: todo.completed ? colors.gray : colors.black, 
                textDecorationLine: todo.completed ? 'line-through' : 'none'}]}
                >
                    {todo.title}
                </Text>
            </View>
        </Swipeable>
        )
    }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        style={{position: 'absolute', top: 64, right: 32, zIndex: 10}}
        onPress={closeModal}
        >
                <AntDesign name='close' size={24} color={colors.black}/>
        </TouchableOpacity>

        <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
            <View>
                <Text style={styles.title}>{list.name}</Text>
                <Text style={styles.taskCount}>
                    {completedCount} of {taskCount} tasks
                </Text>
            </View>
        </View>

        <View style={[styles.section, {flex:3, marginVertical: 16}]}>
                <FlatList
                data={list.todos}
                renderItem={({item, index}) => renderTodo(item, index)}
                keyExtractor={item => item.title}
                showsVerticalScrollIndicator={false}
                />
        </View>

        <View style={[styles.section, styles.footer]}>
                <TextInput
                style={[styles.input, {borderColor: list.color}]}
                value={value}
                onChangeText={text => setValue(text)}/>
                <TouchableOpacity
                style={[styles.addTodo, {backgroundColor: list.color}]}
                onPress={() => addTodo()}
                >
                    <AntDesign name='plus' color={colors.white}/>
                </TouchableOpacity>
        </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16,
    },
    title:{
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo:{
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer:{
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 32,
    },
    todo:{
        color: colors.black,
        fontWeight: '700',
        fontSize: 16,
    },
    deleteButton:{
        flex:1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    }
})

export default TodoModal