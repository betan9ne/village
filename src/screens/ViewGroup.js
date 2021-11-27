import React, {useState} from "react";
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

const ViewGroup = ({navigation, route}) => {
    let data = route.params.item
    let groupCreator = useGetUserProfile(data.creator).docs
    return (
        <Layout>
        <TopNav
          middleContent={data.groupName}
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
         <View style={{padding:15, marginBottom:20, backgroundColor:"black", borderRadius:10}}>
            <Text size="h4" style={{marginBottom:20}}>Current Balance</Text>
            <Text size="h3" fontWeight="bold">ZMK 21,876.09</Text>
        </View>
        <View style={{justifyContent:"space-between", flexDirection:"row"}}>
        <Text>Share Invite Code</Text>
        <Text>{data.inviteCode}</Text>
        </View>
        
        <Button
              text={"Withdraw"}
           
              style={{
                marginTop: 20,
              }}
             
            />
            <View style={{marginVertical:20}}></View> 
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text size="h3">Members</Text>              
            <TouchableOpacity onPress={()=>navigation.navigate("GroupSettings",{data})}>
            <Ionicons name="settings-outline" size={28} color="white" />
            </TouchableOpacity>
        </View>
        <Text>{groupCreator.fullName} (Group Creator)</Text>

        <View style={{marginVertical:20}}></View> 
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text size="h3">Transactions</Text>  
            <TouchableOpacity >
            <Ionicons name="filter-outline" size={28} color="white" />
            </TouchableOpacity>
        </View>
           
        </View>
      </Layout>
    )
}

export default ViewGroup
