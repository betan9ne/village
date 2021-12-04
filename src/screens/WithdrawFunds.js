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
import useGetUserProfile from "../hooks/useGetUserProfile";

const WithdrawFunds = ({navigation, route})  => {
    let data = route.params.data
    let user = useGetUserProfile(firebase.auth().currentUser.uid).docs

    const [funds, setfunds] = useState(0)

const addFundsToGroup = () =>{
    if(data.amount <= 0)
    {
        alert("no funds")
        return
    }
    if(funds >= data.amount)
    {
        alert("you can't withdraw more than the amount")
        return
    }
    let data_ = {
        userId: firebase.auth().currentUser.uid,
        groupId: data.id,
        type: "Withdraw",
        amount:parseInt(funds),
        createAt :new Date(Date.now()).toLocaleDateString()
    }
    firebase.firestore().collection("transactions").add(data_).then(()=>{
        console.log("amount added")
        firebase.firestore().collection("groups").doc(data.id).update({amount:firebase.firestore.FieldValue.increment(-parseInt(funds))}).then(()=>{
            console.log("group total updated")
        })
    }).catch((e)=>{
        console.log(e)
    })
}

    return (
        <Layout>
        <TopNav
          middleContent="Get a loan"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColor.white}
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
           <Text fontWeight="bold">Get a loan</Text>
           <Text>Current Balance : {user && user.wallet}</Text>
           <Text>Total Loan Amount  : {user && user.wallet * 3}</Text>
           <Text>Interest: 15%</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter funds to withdraw"
              value={funds}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setfunds(text)}
            /> 
            <Text>{(funds * 0.15) + funds} Repayment Amount</Text>
            <Button
              text={"Withdraw Funds"}
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

export default WithdrawFunds
