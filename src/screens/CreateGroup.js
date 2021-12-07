import React, {useState} from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  TextInput,Button

} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase'

const CreateGroup = ({navigation}) => {

    const [groupName, setgroupName] = useState("")
    const [rules, setrules] = useState("")

const createAGroup = () =>{
    let data = {
        groupName: groupName,
        groupRules: rules,
        creator: firebase.auth().currentUser.uid,
        inviteCode:Math.random().toString(20).substr(2, 8),
        createAt :new Date(Date.now()).toLocaleDateString()
    }
    firebase.firestore().collection("groups").add(data).then((doc)=>{
       firebase.firestore().collection("groupMembers").add({
         groupId : doc.id,
         userId:firebase.auth().currentUser.uid,
         status : 1
       }).then(()=>{
           
       })
   //   console.log(doc)
   navigation().goBack()
    }).catch((e)=>{
        console.log(e)
    })
}

    return (
        <Layout>
        <TopNav
          middleContent="Create a Group"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        <View
          style={{
           margin:20
          }}
        >
         
          <Text fontWeight="bold">Group Name</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your group name"
              value={groupName}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setgroupName(text)}
            /> 
              <Text fontWeight="bold" style={{marginTop:20}}>Group Rules</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your rules"
              value={rules}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setrules(text)}
            /> 
             <Button
              text={"Continue"}
              onPress={() => {
                createAGroup();
              }}
              style={{
                marginTop: 20,
              }}
             
            />
        </View>
      </Layout>
    )
}

export default CreateGroup
 
