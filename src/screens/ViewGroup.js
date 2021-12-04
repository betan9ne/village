import React, {useState, useEffect} from "react";
import { TouchableOpacity, ScrollView, View, FlatList } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  TextInput

} from "react-native-rapi-ui";
import * as Clipboard from 'expo-clipboard';
import { Ionicons, Feather, MaterialCommunityIcons,MaterialIcons } from "@expo/vector-icons";
import firebase from '../../firebase'
import useGetUserProfile from "../hooks/useGetUserProfile";
import useGetTransactionHistory from "../hooks/useGetTransactionHistory";

const ViewGroup = ({navigation, route}) => {
    let data = route.params.item
    let user = useGetUserProfile(firebase.auth().currentUser.uid).docs
    let groupCreator = useGetUserProfile(data.creator).docs
    let transactions = useGetTransactionHistory(data.id).docs
    const [balance, setbalance] = useState(0)

    useEffect(() => {
      firebase.firestore().collection("groups").doc(data.id).onSnapshot((doc)=>{        
        setbalance(doc.data())
    })     
    }, [])
    const copyToClipboard = (copy) => {
        Clipboard.setString(copy);
        console.log("Copied")
       // ToastAndroid.show('Bank account number copied', ToastAndroid.SHORT);
      };

      const renderItem = ({item}) =>(
   
        <View style={{marginVertical:5,  padding:15, flexDirection:"row", justifyContent:"space-between", backgroundColor:"black", borderRadius:10}} >  
          <Text>ZMW {item.amount +
          "\n" + item.type
          }</Text> 
          <Text>{item.createAt}</Text>
     </View>
      
      )
      
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
          <ScrollView>
        <View
          style={{
           margin:20
          }}
        >
         <View style={{padding:15, marginBottom:20, backgroundColor:"black", borderRadius:10}}>
            <Text size="h4" style={{marginBottom:20}}>Current Group Balance</Text>
            <Text size="h3" fontWeight="bold">ZMW {balance.amount} (ZMK {user.wallet && user.wallet})</Text>
        </View>
        <View style={{justifyContent:"space-between", marginVertical:10, flexDirection:"row"}}>
            <Text>Share Invite Code</Text>
        <View> 
            <TouchableOpacity style={{padding:10, backgroundColor:"black", borderRadius:10}}  onPress={() => {
                copyToClipboard(data.inviteCode);
              }}><MaterialIcons name="content-copy" size={24} color="white" /></TouchableOpacity>
            </View>        
        </View>
        
        <View style={{flexDirection:"row", marginTop:10, justifyContent:"space-evenly"}}>
        <TouchableOpacity  onPress={()=>navigation.navigate("AddFunds",{data})}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons name="cash-plus" style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} size={28} color="white" />
        <Text>Save</Text>
        </View>
        </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate("WithdrawFunds",{data})}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons  style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} name="cash-usd-outline" size={28} color="white" />
        <Text>Get Loan</Text>
        </View>
              </TouchableOpacity>
              {data.creator === firebase.auth().currentUser.uid ? 
              <TouchableOpacity onPress={()=>navigation.navigate("GroupSettings", {data})}>
              <View  style={{justifyContent:"center", alignItems:"center"}}>
        <Feather name="settings" size={28} color="white" style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} />
        <Text>Settings</Text>
        </View>
       </TouchableOpacity> : null}

        <View  style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons name="location-exit" size={28} color="white" style={{padding:10, backgroundColor:themeColor.danger300, margin:10, borderRadius:10}} />
        <Text>Exit Group</Text>
        </View>
       
        </View>
        
            <View style={{marginVertical:20}}></View> 
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text size="h3">Members</Text>              
            <TouchableOpacity onPress={()=>navigation.navigate("Members",{data})}>
            <Ionicons name="ellipsis-vertical" size={28} color="white" />
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
           <FlatList
            data={transactions}
            vertical
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ 
                   
                }}
            />
        </View>
        </ScrollView>
      </Layout>
  
    )
}

export default ViewGroup
