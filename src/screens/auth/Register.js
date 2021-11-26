import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import firebase from '../../../firebase'

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const[result, setResult] = useState()
  const[code, setVerificationCode] = useState()
  const recaptchaVerifier = React.useRef(null);
  const attemptInvisibleVerification = false;

  const firebaseConfig = {
    apiKey: "AIzaSyBlFiWnlKtm_UcyOX45Vge41Q89JloKTuw",
    authDomain: "village-9b31a.firebaseapp.com",
    projectId: "village-9b31a",
    storageBucket: "village-9b31a.appspot.com",
    messagingSenderId: "1073197668608",
    appId: "1:1073197668608:web:2d87fda9215ae18df93be5",
    measurementId: "G-J7L6GB8J8Z"
  };
  
  async function register() {
    setLoading(true);
    await firebase
      .auth()
      .signInWithPhoneNumber("+26"+phoneNumber, recaptchaVerifier.current)
      .then(confirmResult => {
        setResult(confirmResult)
        console.log(confirmResult)
      })
      .catch(error => {                
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        setLoading(false);
        alert(errorMessage);
      })
 
  }

  const handleVerifyCode = () => {
       if (code.length == 6) {
      result
        .confirm(code)
        .then(user => {
          firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
              fullName: fullName, phoneNumber: phoneNumber, createdAt : new Date(Date.now()).toLocaleDateString()
          })
         console.log(user)
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  const renderVerificationCode = () =>{
    return(
      <>
         <Text style={{ marginTop: 15 }}>OTP</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your OTP"
              value={code}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={false}
              onChangeText={(text) => setVerificationCode(text)}
            />
               <Button
              text={"Verify OTP & Login"}
              onPress={() => {
                handleVerifyCode();
              }}
              style={{
                marginTop: 20,
              }}
             
            />

      </>
    )
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
     <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/register.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Register
            </Text>
            <Text>Full Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your full name"
              value={fullName}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setFullName(text)}
            />

            <Text style={{ marginTop: 15 }}>Phone Number</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your phone number"
              value={phoneNumber}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={false}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <Button
              text={loading ? "Loading" : "Create an account"}
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

{result ? renderVerificationCode() : null}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
