import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal,ActivityIndicator } from 'react-native';
import { colors } from '../Colors';
import { AntDesign } from '@expo/vector-icons';
import { tempData } from '../tempData';
import TodoList from './TodoList';
import { useEffect, useState } from 'react';
import AddTodoList from './AddTodoList';
import { initializeApp } from 'firebase/app'
import { firebaseConfig} from '../Fire'
import { getFirestore, getDocs, collection, orderBy} from 'firebase/firestore'


export default function Todo() {

  const [visible, setVisible] = useState(false)
  const [lists , setLists] = useState([])


  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)

  const dbRef = collection(firestore, 'lists')

  //Firestore
   const getListsFromFirestore = async () => {
    let array = []
    try {
        let {docs} = await getDocs(dbRef)
        docs.map(item => {
            const obj = item.data()
            array.push(obj)
            setLists([tempData[0], ...array])
        })
    } catch (e) {
        console.log(e)
    }
 }

 useEffect(() => {
     getListsFromFirestore()
 },[])

  const addTodoList =() => {
    setVisible(!visible)
  }

  const renderList = list => {
    return <TodoList list={list} updateList={updateList}/>
  }

  addList = list => {
    setLists([...lists, {...list, id: lists.length + 1 , todos: []}])
  }

  updateList = list => {
     const updatedList = lists.map(item => {
        return item.id === list.id ? list : item
     })
     setLists(updatedList)
  }


  return (

    <View style={styles.container}>
      <Modal 
      animationType='slide' 
      visible={visible}
      onRequestClose={() => addTodoList()}
      >
        <AddTodoList  closeModal={() => addTodoList()} addList={addList}/>
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider}/>
        <Text style={styles.title}> 
              Todo <Text style={{fontWeight: '300', color: colors.blue}}>Lists</Text>
        </Text>
        <View style={styles.divider}/>
      </View>
      <View style={{marginVertical:48}}>
          <TouchableOpacity style={styles.addList} onPress={() => addTodoList()}>
              <AntDesign name='plus' size={16} color={colors.blue}/>
          </TouchableOpacity>
          <Text style={styles.add}>Добавить список</Text>
      </View>
      <View style={{height: 275, paddingLeft: 32}}>
            <FlatList
            data={lists}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => renderList(item)}
            keyboardShouldPersistTaps='always'
            />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor: colors.lightBlue,
    height: 1,
    flex:1,
    alignSelf: 'center',
  },
  title:{
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList:{
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  }
});