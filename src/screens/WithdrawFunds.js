import React, {useState} from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  TextInput,Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase'
import useGetUserProfile from "../hooks/useGetUserProfile";

const WithdrawFunds = ({navigation, route})  => {
    let data = route.params.data
    let user = useGetUserProfile(firebase.auth().currentUser.uid).docs
    const [funds, setfunds] = useState("")
    const [repaymentPeriod, setrepaymentPeriod] = useState(0)
    const [monthlyPayment, setmonthlyPayment] = useState(0)
    const [totalPayment, settotalPayment] = useState(0)
    const [totalInstallment, settotalInstallment] = useState(0)

const addFundsToGroup = () =>{
    if(data.amount <= 0)
    {
        alert("no funds")
        return
    }
    if(funds >= data.amount*3)
    {
        alert("you can't withdraw more than 3 times the amount")
        return
    } 
    if (funds >= 1000 && funds <= 5000)
    {
      setrepaymentPeriod(1)
      calculateLoan(1) 
    }
    if (funds >= 5001 && funds <= 10000)
    {
      setrepaymentPeriod(2)
      calculateLoan(2)    
    }
    if (funds >= 10001)
    {
      setrepaymentPeriod(3)
      calculateLoan(3)   
    }
   
 
}


    const calculateLoan = (_repaymentPeriod) =>{
      // Turn amount into decimal and store it into variable
        const principal = parseFloat(funds);
        const calculatedInterest = parseFloat(data.interest) /100 / 12;
        const calculatedPayment =  parseInt(_repaymentPeriod);

        // Compute monthly payments
        const x = Math.pow(1 + calculatedInterest, calculatedPayment);
        const monthly = (principal * x * calculatedInterest)/(x-1);


        // Check if value is finite

        if(isFinite(monthly)){
          setmonthlyPayment(monthly.toFixed(2))
         settotalPayment((monthly * calculatedPayment).toFixed(2))
         settotalInstallment(((monthly * calculatedPayment) - principal).toFixed(2))
         console.table(monthlyPayment, totalPayment, totalInstallment)
         let data_ = {
          userId: firebase.auth().currentUser.uid,
          groupId: data.id,
          type: "loan",
          repaymentPeriod: _repaymentPeriod,
          amount:parseFloat(funds),        
          monthlyPayment:parseFloat(monthly.toFixed(2)),
          totalPayment:parseFloat((monthly * calculatedPayment).toFixed(2)),
          totalInstallment:parseFloat(((monthly * calculatedPayment) - principal).toFixed(2)),
          createAt :new Date(Date.now()).toLocaleDateString(),
          status:1
      }
      firebase.firestore().collection("loans").add(data_).then(()=>{
          console.log("amount added")
          navigation.goBack()
          // firebase.firestore().collection("groups").doc(data.id).update({amount:firebase.firestore.FieldValue.increment(-parseInt(funds))}).then(()=>{
          //     console.log("group total updated")
          // })
      }).catch((e)=>{
          console.log(e)
      })
        } else{
          console.log("Please check your numbers")
        }

         
    }
 
    return (
        <Layout>
        <TopNav
          middleContent="Get a loan"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColor.white}
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
        <View style={{flexDirection:"row",padding:15, backgroundColor:"black", borderRadius:10, justifyContent:"space-between"}}>
        <View>
        <Text size="sm">Current Balance</Text><Text size="h3"></Text>
        </View>
        <View>
        <Text size="sm">Total Loan Amount</Text><Text size="h3"></Text>
        </View>
        
        </View> 

           <Text style={{marginTop:20}}>Interest: {data.interest}%</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter funds to withdraw"
              value={funds}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setfunds(text)}
            /> 
             <Button
              text={"Get Loan"}
              onPress={() => {
                addFundsToGroup()
              }}
              style={{
                marginTop: 20,
              }}
             
            />
            <Text style={{marginTop:20}}>{totalPayment} Repayment Amount</Text>
            <Text>{totalInstallment} Total Interest Repayment</Text>
            <Text>{monthlyPayment} Monthly Payment</Text>
            <Text>{repaymentPeriod} Months Repayment Period</Text>
           
        </View>
      </Layout>
    )
}

export default WithdrawFunds
