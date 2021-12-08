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
const MyBalance = ({data}) => {
    
    return (
        <View style={{padding:15, backgroundColor:"black", borderRadius:10}}>
            <Text size="sm" style={{marginBottom:10}}>Overall Savings Balance</Text>
            <Text size="h3" fontWeight="bold">ZMK {data}</Text>
        </View>
    )
}

export default MyBalance
 