import React, {useState, useEffect} from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  TextInput,Button

} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase'
import useGetUserProfile from "../hooks/useGetUserProfile";

const GroupMember = ({data}) => {

    let user = useGetUserProfile(data.userId).docs
  
  const updateStatus = (status)=>{
    firebase.firestore().collection("groupMembers").doc(data.id).update({status:status}).then(()=>{
      alert("Request has been "+status)
    }).catch((e)=>{
      alert(e)
    })
  }

   console.log(data)
    return (
        <View style={{  backgroundColor:"black", borderRadius:10,
        padding:20, marginVertical:5 }}>
           <View
          style={{
        justifyContent:"space-between", flexDirection:"row"
          }}
        ><Text size="h3">{user.fullName}</Text>
             <Text size="sm">{user.phoneNumber}</Text>
        </View>
       {data.creator === firebase.auth().currentUser.uid ? data.status === "Pending" ? 
       <View style={{flexDirection:"row",justifyContent:"space-between" }}>
       <Button text={"Accept"}
              onPress={() => {
                updateStatus("Accepted")
              }}
              style={{
                marginTop: 20, flex:1, marginRIght:5
              }}/>
               <Button text={"Decline"}
               color={themeColor.danger900}
              onPress={() => {
                updateStatus("Declined")
              }}
              style={{
                marginTop: 20, flex:1, marginLeft:5,
                
              }}/>
              </View> : null : null}
    </View>
    
    )
}

export default GroupMember
