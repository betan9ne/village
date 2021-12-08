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
import useGetUserLoan from "../hooks/useGetUserLoan";
import useGetUserSavingsByGroup from "../hooks/useGetUserSavingsByGroup";

const ViewGroup = ({navigation, route}) => {
    let data = route.params.item
    let loanStatus = useGetUserLoan(data.id).docs
    let userId = firebase.auth().currentUser.uid
    let savings = useGetUserSavingsByGroup(data.id).docs
    let user = useGetUserProfile(firebase.auth().currentUser.uid).docs
    let groupCreator = useGetUserProfile(data.creator).docs
    let transactions = useGetTransactionHistory(data.id).docs
  
    let userBalance = 0
    const [currentMOnthDeposit, setcurrentMOnthDeposit] = useState(0)

    //console.log(loanStatus)
    useEffect(() => {
      getMOnthDeposit()
    }, [data.id])

    const getMOnthDeposit = () =>{
      firebase.firestore().collection("savings").where("groupId","==", data.id)
      .where("userId", "==", userId)
      .where("month", "==", new Date().getMonth()+1).onSnapshot((doc)=>{
        setcurrentMOnthDeposit(doc.docs.length)
      })
    }
 
    savings.map((a)=>{
      userBalance = userBalance + (a.amount +  a.amountWithInterest)
    })
 
    const copyToClipboard = (copy) => {
        Clipboard.setString(copy);
        console.log("Copied")
       // ToastAndroid.show('Bank account number copied', ToastAndroid.SHORT);
      };

      const renderItem = ({item}) =>(
   
        <View style={{marginVertical:5,  padding:15, flexDirection:"row", justifyContent:"space-between", backgroundColor:"black", borderRadius:10}} >  
          <Text>ZMW {item.amount +
          "\n" + item.amountWithInterest + " interest"
          }</Text> 
          <Text>Month {item.month}</Text>
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
            <Text size="h4" style={{marginBottom:20}}>My Savings</Text>
            <Text size="h3" fontWeight="bold">ZMW {userBalance}</Text>
            <Text size="sm" style={{color:themeColor.danger}}>{loanStatus.length === 0 ? null : "Loan Active" }</Text>
        </View>
        {data.creator === firebase.auth().currentUser.uid ? 
        <View style={{justifyContent:"space-between", marginVertical:10, flexDirection:"row"}}>
            <Text>Share Invite Code</Text>
        <View> 
            <TouchableOpacity style={{padding:10, backgroundColor:"black", borderRadius:10}}  onPress={() => {
                copyToClipboard(data.inviteCode);
              }}><MaterialIcons name="content-copy" size={24} color="white" /></TouchableOpacity>
            </View>        
        </View> : null}
          
        <View style={{flexDirection:"row", marginTop:10, justifyContent:"space-evenly"}}>
        {currentMOnthDeposit === 1 ? null : 
        <TouchableOpacity  onPress={()=>navigation.navigate("AddFunds",{data})}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons name="cash-plus" style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} size={28} color="white" />
        <Text size="sm">Save</Text>
        </View>
        </TouchableOpacity> }

        {loanStatus.length === 0 ? 
          <TouchableOpacity onPress={()=>navigation.navigate("WithdrawFunds",{data})}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons  style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} name="cash-usd-outline" size={28} color="white" />
        <Text size="sm">Get Loan</Text>
        </View>
              </TouchableOpacity> : loanStatus[0].status === 1 ? 
        <TouchableOpacity onPress={()=>navigation.navigate("PayLoan",{data, loanStatus})}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons  style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} name="cash-usd-outline" size={28} color="white" />
        <Text size="sm">Pay Loan</Text>
        </View>
              </TouchableOpacity> :
              <TouchableOpacity onPress={()=>navigation.navigate("WithdrawFunds",{data})}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons  style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} name="cash-usd-outline" size={28} color="white" />
        <Text size="sm">Get Loan</Text>
        </View>
              </TouchableOpacity>}
              {data.creator === firebase.auth().currentUser.uid ? 
              <TouchableOpacity onPress={()=>navigation.navigate("GroupSettings", {data})}>
              <View  style={{justifyContent:"center", alignItems:"center"}}>
        <Feather name="settings" size={28} color="white" style={{padding:10, backgroundColor:"black", margin:10, borderRadius:10}} />
        <Text size="sm">Settings</Text>
        </View>
       </TouchableOpacity> : null}

        <View  style={{justifyContent:"center", alignItems:"center"}}>
        <MaterialCommunityIcons name="location-exit" size={28} color="white" style={{padding:10, backgroundColor:themeColor.danger300, margin:10, borderRadius:10}} />
        <Text size="sm">Exit</Text>
        </View>
       
        </View>
        
            <View style={{marginVertical:20}}></View> 
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text size="lg">Members</Text>              
            <TouchableOpacity onPress={()=>navigation.navigate("Members",{data})}>
            <Ionicons name="ellipsis-vertical" size={28} color="white" />
            </TouchableOpacity>
        </View>
        <Text size="sm">{groupCreator.fullName} (Group Creator)</Text>

        <View style={{marginVertical:20}}></View> 
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text size="lg">Savings Tracker</Text>  
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
