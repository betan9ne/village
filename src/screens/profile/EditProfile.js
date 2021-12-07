import React, {useState} from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  TextInput,Button

} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../../firebase'

const EditProfile = () => {
    return (
        <Layout>
        <TopNav
          middleContent="Edit Profile"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColor.white100}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,
          margin:20
          }}
        >
          {/* This text using ubuntu font */}
          <Text fontWeight="bold">Work in progress</Text>
        </View>
      </Layout>
    )
}

export default EditProfile
