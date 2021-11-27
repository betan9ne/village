import React, {useState, useEffect} from 'react'
import { TouchableOpacity, View } from 'react-native'
import firebase from '../../firebase'
import {
    Layout,
    TopNav,
    Text,
    themeColor,
    TextInput,Button
  
  } from "react-native-rapi-ui";
  import {useNavigation} from '@react-navigation/native'
const GroupDetails = ({data}) => {
 let navigation = useNavigation()
const [item, setdata] = useState([])
useEffect(() => {
  data && firebase.firestore().collection("groups").doc(data.groupId).get().then((doc)=>{
        setdata(doc.data())
   })
}, [data.id])

    return ( 
      <TouchableOpacity onPress={() => {
        navigation.navigate("ViewGroup", {item});
      }}>
           <Text style={{fontSize:16}}>{item.groupName}</Text>
        </TouchableOpacity>
    )
}

export default GroupDetails
