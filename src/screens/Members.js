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
import GroupMember from "../pieces/GroupMember";
const Members = ({navigation, route}) => {
    let data = route.params.data
    const [docs, setdocs] = useState([])

    useEffect(() => {
        firebase.firestore().collection("groupMembers").where("groupId","==",data.id).onSnapshot((doc)=>{
            let data = [] 
            doc.docs.forEach(e=>{
                let asd = {
                      id:e.id,
                      ...e.data()
                }
                data.push(asd)
            })
            setdocs(data)
          
        })
    }, [])
//console.log(data)

    return (
        <Layout>
        <TopNav
          middleContent={data.groupName +" Members"}
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
          {docs.map((a, index)=>(
              <GroupMember key={index} data={a} />
          ))}
        </View>
      </Layout>
    )
}

export default Members
