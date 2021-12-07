import React, {useState} from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  TextInput,Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase'
import { FirebaseRecaptcha } from "expo-firebase-recaptcha";

const AddFunds = ({navigation, route}) => {
    let data = route.params.data
    const [funds, setfunds] = useState(0)
    const [msg, setmsg] = useState("")


    const checkForWallet = () =>{
      firebase.firestore().collection("userWallets").where("groupId","==", data.id).where("userId", "==", firebase.auth().currentUser.uid).get().then((doc)=>{
        console.log("here", doc)
        if(doc.docs.length === 0)
        {
          firebase.firestore().collection("userWallets").add(
            {
              wallet:firebase.firestore.FieldValue.increment(parseInt(funds)),
              userId: firebase.auth().currentUser.uid,
              groupId:data.id,
              timeStamp : firebase.firestore.FieldValue.serverTimestamp()
            }
            ).then(()=>{
            navigation.goBack()
        })
        }
        else{
          firebase.firestore().collection("userWallets").doc(doc.docs[0].id).update(
            {
              wallet:firebase.firestore.FieldValue.increment(parseInt(funds)),             
              timeStamp : firebase.firestore.FieldValue.serverTimestamp()
            }
            ).then(()=>{
            navigation.goBack()
        })
        }
      })
    }
const savings = () =>{
  if(funds < data.minimumAmount)
  {
    setmsg("Amount is lower than the set minimum amount")
    return 
  }
    let data_ = {
        userId: firebase.auth().currentUser.uid,
        groupId: data.id,
        interest: data.interest,
        month:new Date().getMonth()+1,
        type: "saving",
        amount:parseFloat(funds),
        amountWithInterest: parseFloat(funds) * (data.interest/100),
        createAt : firebase.firestore.FieldValue.serverTimestamp()
    }
  
    firebase.firestore().collection("savings").add(data_).then(()=>{
        console.log("amount added")
       navigation.goBack()
    }).catch((e)=>{
        console.log(e)
    })
}

    return (
        <Layout>
        <TopNav
          middleContent="Save"
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
            flex: 1,          
            margin:20
          }}
        >
           <Text fontWeight="bold">Add Funds</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter funds to save"
              value={funds}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setfunds(text)}
            /> 
            <Text>Minimum Deposit ({data.minimumAmount})</Text>
            <Text style={{color:themeColor.danger}}>{msg}</Text>
            <Button
              text={"Save Funds"}
              onPress={() => {
                savings()
              }}
              style={{
                marginTop: 20,
              }}
             
            />
        </View>
      </Layout>
    )
}

export default AddFunds
