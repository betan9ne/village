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
    let asd = {
      id:doc.id,
      ...doc.data()
    }
        setdata(asd)
   })
}, [data.id])

if(item.creator === firebase.auth().currentUser.uid)
{
  return(
    null
  )
}
else
    return ( 
     data.status === 1 ? <TouchableOpacity onPress={() => {
        navigation.navigate("ViewGroup", {item});
      }}>      
           <Text style={{fontSize:16}}>{item.groupName}</Text>
        </TouchableOpacity>
        : 
        <Text size="sm" style={{fontSize:16}}>{item.groupName}{"\n"}{data.status === 0 ? "Pending" : null}</Text>
    )
}

export default GroupDetails
