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

const GroupSettings = ({navigation, route}) => {
    let data = route.params.data
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
             
        </View>
      </Layout>
    )
}

export default GroupSettings
