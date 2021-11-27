import React from 'react';
import { View } from 'react-native';
import { Layout, Text, Button } from 'react-native-rapi-ui';
import firebase from '../../firebase'
export default function ({ navigation }) {
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
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
				<Text>This is the Profile tab</Text>
			</View>
		</Layout>
	);
}
