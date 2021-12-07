import React, { useContext } from "react";
import firebase from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Loading from "../screens/utils/Loading";
// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";
import CreateGroup from "../screens/CreateGroup";
import ViewGroup from "../screens/ViewGroup";
import JoinGroup from "../screens/JoinGroup";
import GroupSettings from "../screens/GroupSettings";
import Members from "../screens/Members";
import AddFunds from "../screens/AddFunds";
import WithdrawFunds from "../screens/WithdrawFunds";
import PayLoan from "../screens/PayLoan";
import EditProfile from "../screens/profile/EditProfile";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyBlFiWnlKtm_UcyOX45Vge41Q89JloKTuw",
  authDomain: "village-9b31a.firebaseapp.com",
  projectId: "village-9b31a",
  storageBucket: "village-9b31a.appspot.com",
  messagingSenderId: "1073197668608",
  appId: "1:1073197668608:web:2d87fda9215ae18df93be5",
  measurementId: "G-J7L6GB8J8Z"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="CreateGroup" component={CreateGroup} />
      <MainStack.Screen name="ViewGroup" component={ViewGroup} />
      <MainStack.Screen name="JoinGroup" component={JoinGroup} />
      <MainStack.Screen name="GroupSettings" component={GroupSettings} />
      <MainStack.Screen name="PayLoan" component={PayLoan} />
      <MainStack.Screen name="Members" component={Members} />
      <MainStack.Screen name="EditProfile" component={EditProfile} />
      <MainStack.Screen name="AddFunds" component={AddFunds} />
      <MainStack.Screen name="WithdrawFunds" component={WithdrawFunds} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        style: {
          borderTopWidth: 1,
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="About" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      /> */}
    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
