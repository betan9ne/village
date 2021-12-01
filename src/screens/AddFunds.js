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

const AddFunds = ({navigation, route}) => {
    let data = route.params.data
    const [funds, setfunds] = useState(0)

const addFundsToGroup = () =>{
    let data_ = {
        userId: firebase.auth().currentUser.uid,
        groupId: data.id,
        type: "Deposit",
        amount:parseInt(funds),
        createAt :new Date(Date.now()).toLocaleDateString()
    }
    firebase.firestore().collection("transactions").add(data_).then(()=>{
        console.log("amount added")
        firebase.firestore().collection("groups").doc(data.id).update({amount:firebase.firestore.FieldValue.increment(parseInt(funds))}).then(()=>{
            console.log("group total updated")
        })
    }).catch((e)=>{
        console.log(e)
    })
}

    return (
        <Layout>
        <TopNav
          middleContent="Add Funds"
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
              placeholder="Enter funds to deposit"
              value={funds+""}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setfunds(text)}
            /> 
            <Button
              text={"Add Funds"}
              onPress={() => {
                addFundsToGroup()
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
