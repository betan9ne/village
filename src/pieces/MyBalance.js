import React from 'react'
import {
    Layout,
    Button,
    Text,
    TopNav,
    Section,
    SectionContent,
    useTheme,
  } from "react-native-rapi-ui";
  import {View} from 'react-native'
const MyBalance = () => {
    return (
        <View style={{padding:15, backgroundColor:"black", borderRadius:10}}>
            <Text size="h4" style={{marginBottom:20}}>Current Balance</Text>
            <Text size="h3" fontWeight="bold">ZMK 21,876.09</Text>
        </View>
    )
}

export default MyBalance
 