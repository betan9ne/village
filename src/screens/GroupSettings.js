import React, {useState, useEffect} from "react";
import { TouchableOpacity, View,ScrollView } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  TextInput,Button

} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase'
import useGetGroupInfo from "../hooks/useGetGroupInfo";

const GroupSettings = ({navigation, route}) => {
    let data = route.params.data
 
    let docs = useGetGroupInfo(data.id).docs
 
    const [interestRate, setinterestRate] = useState(0)
    const [StartDate, setsetStartDate] = useState("")
    const [endDate, setendDate] = useState("")
    const [miniAmount, setminiAmount] = useState(0)
    const [maxUsersPerGroup, setmaxUsersPerGroup] = useState(0)
    const [maxSavingsAmount, setmaxSavingsAmount] = useState(0)
 
    const updateINterestRate = ()=>{
      firebase.firestore().collection("groups").doc(data.id).update({interest:parseInt(interestRate)}).then(()=>{
       console.log("updated interest")
    })
    }

    const updateSavingsAmount = () =>{
      firebase.firestore().collection("groups").doc(data.id).update({maxSavingsAmount:parseInt(maxSavingsAmount)}).then(()=>{
        console.log("updated max savings")
     })
    }

    const updatemaxUsersPerGroup = () =>{
      firebase.firestore().collection("groups").doc(data.id).update({maxUsersPerGroup:parseInt(maxUsersPerGroup)}).then(()=>{
        console.log("updated max users")
     })
    }

    const updateMinimumAmount = ()=>{
      firebase.firestore().collection("groups").doc(data.id).update({minimumAmount:parseInt(miniAmount)}).then(()=>{
       console.log("updated minimum amount")
    })
    }

    function monthDiff(d1, d2) {
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      console.log(months <= 0 ? 0 : months)
  }

    const updateMaturityPeriod = ()=>{
      monthDiff( new Date(2021, 10, 4),  new Date(2022, 10, 4))
      // firebase.firestore().collection("groups").doc(data.id).update(
      //   {
      //     startDate:StartDate,
      //     endDate:endDate
      //   }
      //   ).then(()=>{
      //  console.log("updated maturity period")
   // })
    }

    return (
        <Layout>
        <TopNav
          middleContent={data.groupName +" Settings"}
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
     <ScrollView>
        <Text>Set Minimum Amount ({docs && docs.minimumAmount})</Text>
             <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter minimum amount"
              value={miniAmount}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setminiAmount(text)}
            /> 
            <Button
              text={"Set Minimum Amount"}
              onPress={() => {
                updateMinimumAmount()
              }}
              style={{
                marginTop: 20,
              }}
             
            />

             <Text style={{marginTop:10}}>Set Interest Rete ({docs && docs.interest})</Text>
             <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter interest Rate"
              value={interestRate}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setinterestRate(text)}
            /> 
            <Button
              text={"Set Interest Rate"}
              onPress={() => {
                updateINterestRate()
              }}
              style={{
                marginTop: 20,
              }}
             
            />

          <Text style={{marginTop:10}}>Set Maturity Period</Text>
          <View style={{flexDirection:"row", }}>
          <TextInput
          style={{flex:1}}
                        containerStyle={{ marginTop: 15, flex:1 }}
                        placeholder="Enter Start Date"
                        value={StartDate}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={(text) => setsetStartDate(text)}
                      /> 
                             <TextInput
                             style={{flex:1}}
                        containerStyle={{ marginTop: 15 , flex:1 }}
                        placeholder="Enter End Date"
                        value={endDate}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={(text) => setendDate(text)}
                      /> 
            
          </View>
            <Button
              text={"Set Maturity Period"}
              onPress={() => {
                updateMaturityPeriod()
              }}
              style={{
                marginTop: 20,
              }}
             
            />

<Text style={{marginTop:10}}>Set maximum users ({docs && docs.maxUsersPerGroup})</Text>
             <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter maximum number of users"
              value={maxUsersPerGroup}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setmaxUsersPerGroup(text)}
            /> 
            <Button
              text={"Set Interest Rate"}
              onPress={() => {
                updatemaxUsersPerGroup()
              }}
              style={{
                marginTop: 20,
              }}
             
            />

            
<Text style={{marginTop:10}}>Set maximum savings amount ({docs && docs.maxSavingsAmount})</Text>
             <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter maximum saving amount"
              value={maxSavingsAmount}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setmaxSavingsAmount(text)}
            /> 
            <Button
              text={"Set maximum savings amount"}
              onPress={() => {
                updateSavingsAmount()
              }}
              style={{
                marginTop: 20,
              }}
             
            />
            </ScrollView>
        </View>
        
      </Layout>
    )
}

export default GroupSettings
