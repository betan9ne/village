import React from 'react';
import { View } from 'react-native';
import { Layout, Text, Button, themeColor, useTheme } from 'react-native-rapi-ui';
import firebase from '../../firebase'
import useGetUserProfile from '../hooks/useGetUserProfile';
export default function ({ navigation }) {

	let user = useGetUserProfile(firebase.auth().currentUser.uid).docs
	const { isDarkmode, setTheme } = useTheme();
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					 margin:20
				}}
			>
			  <View style={{padding:15, marginBottom:40, backgroundColor:"black", borderRadius:10}}>
            
            <Text size="h3" fontWeight="bold">{user.fullName}</Text>
			<Text size="h4" style={{marginTop:5}}>{user.phoneNumber}</Text>
        </View>
		
		 
		<View style={{padding:20, marginBottom:20, backgroundColor:themeColor.info900, borderRadius:10}}>
			<Text style={{fontSize:18}} fontWeight='bold'>Edit Profile</Text>
		</View>
		<View style={{padding:20, marginBottom:20, backgroundColor:"black", borderRadius:10}}>
			<Text style={{fontSize:18}} fontWeight='bold'>Constitution</Text>
		</View>
		<View style={{padding:20, marginBottom:20, backgroundColor:"black", borderRadius:10}}>
			<Text style={{fontSize:18}} fontWeight='bold'>Documents</Text>
		</View>
		<View style={{padding:20, marginBottom:20, backgroundColor:"black", borderRadius:10}}>
			<Text style={{fontSize:18}} fontWeight='bold'>Settings</Text>
		</View>
		<View style={{padding:20,  marginBottom:20, backgroundColor:"black", borderRadius:10}}>
			<Text style={{fontSize:18}} fontWeight='bold'>About App</Text>
		</View>
		{/* <View style={{padding:20,  marginBottom:20, backgroundColor:"black", borderRadius:10}}>
		<Button
    text={isDarkmode ? "Light Mode" : "Dark Mode"}
    status={isDarkmode ? "success" : "warning"}
    onPress={() => {
      if (isDarkmode) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }}
    style={{
      marginTop: 10,
    }}
  />
		</View> */}
		<View style={{height:0.4, backgroundColor:themeColor.primary500, marginVertical:10}}></View>
			<Button
    status="danger"
    text="Logout"
    onPress={() => {
      firebase.auth().signOut();
    }}
    style={{
      marginTop: 10,
    }}
  />
			
			</View>
		</Layout>
	);
}
