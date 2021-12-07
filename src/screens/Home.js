import React from "react";
import { View, Linking, FlatList, Dimensions, TouchableOpacity } from "react-native";
import firebase from '../../firebase'
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import {AuthContext} from '../provider/AuthProvider'
import MyBalance from "../pieces/MyBalance";
import useGetMyGroups from "../hooks/useGetMyGroups";
import useGetOtherGroups from "../hooks/useGetOtherGroups";
import GroupDetails from "../pieces/GroupDetails";
export default function ({ navigation }) {

  let groups = useGetMyGroups().docs
 let invitedGroups = useGetOtherGroups().docs 
 
  const renderItem = ({item}) =>(<>
  <TouchableOpacity onPress={() => {
      navigation.navigate("ViewGroup", {item});
    }}>
    <View style={{width:150, height:150, margin:5, padding:15, backgroundColor:"black", borderRadius:10}} >      
   <Text>{item.groupName}</Text></View>
   </TouchableOpacity>
   </>
  )

  const renderInvitedItem = ({item}) =>(
   
    <View style={{width:150,  margin:5, padding:15, backgroundColor:"black", borderRadius:10}} >  
    <GroupDetails data={item}/>    
   {/* <Text size="sm" style={{marginTop:10}}>{item.status}</Text> */}
   </View>
  
  )
  
   return (
    <Layout>
      <View
        style={{
             margin: 20,
        }}
      >
 <Text size="h3" fontWeight="bold">Hello</Text>
 <View style={{marginVertical:20}}></View>
        <MyBalance />

<View style={{flexDirection:"row", justifyContent:"space-between", marginTop:40}}>
  <Text size="h3" fontWeight="bold">My Groups</Text>
  <TouchableOpacity     onPress={() => {
      navigation.navigate("CreateGroup");
    }}><Text size="sm">New Group</Text></TouchableOpacity>
</View>

<FlatList
            data={groups}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ 
                   
                }}
            />
            <View style={{marginVertical:20,}}></View>
<View style={{ justifyContent:"space-between", flexDirection:"row"}}>
    <Text size="h3" fontWeight="bold">Invited Groups</Text>
    <TouchableOpacity     onPress={() => {
      navigation.navigate("JoinGroup");
    }}><Text size="sm">Join A Group</Text></TouchableOpacity>
</View>

<FlatList
            data={invitedGroups}
            horizontal
            showsHorizontalScrollIndicator={false}               
                keyExtractor={item => `${item.id}`}
                renderItem={renderInvitedItem}
                contentContainerStyle={{ 
                   
                }}
            />
      </View>
    </Layout>
  );
}
