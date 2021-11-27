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
import { TouchableOpacity } from "react-native-gesture-handler";

const JoinGroup = ({navigation}) => {

const [code, setcode] = useState("")
const [groups, setgroups] = useState([])
const JoinAGroup = () =>{
    firebase.firestore().collection("groups").where("inviteCode","==", code).get().then((doc)=>{
        let data = [] 
        doc.docs.forEach(e=>{
            let asd = {
                  id:e.id,
                  ...e.data()
            }
            data.push(asd)
        })
        setgroups(data)
    }).catch((e)=>{
        console.log(e)
    })
}

const sendRequest = () =>{
    let data = {
        userId: firebase.auth().currentUser.uid,
        groupId: groups[0].id,
        creator:groups[0].creator,
        status:"Pending",
        createAt :new Date(Date.now()).toLocaleDateString()
    }
    firebase.firestore().collection("groupMembers").add(data).then(()=>{
        console.log("Request sent")
    }).catch((e)=>{
        console.log(e)
    })
}

    return (
        <Layout>
        <TopNav
          middleContent="Join a Group"
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
        <Text fontWeight="bold">Invite Code</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter group invite code"
              value={code}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setcode(text)}
            /> 
            <Button
              text={"Continue"}
              onPress={() => {
                JoinAGroup();
              }}
              style={{
                marginTop: 20,
              }}
             
            />
            {groups.length === 0 ? <Text style={{marginTop:20}}>No Groups found</Text> : <View style={{padding:20, marginTop:20, backgroundColor:"black", borderRadius:10}}>
                <Text size="h3">{groups[0].groupName}</Text>
                
                <TouchableOpacity>
                <Button
              text={"Send Request"}
              onPress={() => {
                sendRequest();
              }}
              style={{
                marginTop: 20,
              }}             
            />
                </TouchableOpacity>
            </View>}
            
        </View>
      </Layout>
    )
}

export default JoinGroup
