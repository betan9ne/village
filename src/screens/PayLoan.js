import React, {useState} from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,TextInput, Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../../firebase'
import useGetUserLoan from "../hooks/useGetUserLoan";
import useGetLoanPayments from "../hooks/useGetLoanPayments";

const PayLoan = ({navigation, route}) => {
    let data = route.params.data 
    let loadId = route.params.loanStatus[0].id
    let loan = useGetUserLoan(data.id).docs[0]
    let totalPaid = 0
    const [funds, setfunds] = useState(0)
    const [msg, setmsg] = useState("")
  
   let payments = useGetLoanPayments(data.id, loadId).docs
   
    console.log(payments)

    const payBackLoan = () =>{
      if(loan === undefined)
      {
        return
      }
      let sdf = 0
      payments.map((a) =>{
        sdf = sdf + a.amountPaid
      })
      
      let asd  = sdf + parseFloat(funds)
      if(asd > loan.totalPayment)
      {
        setmsg("You have overpaid"+ sdf + " " + parseFloat(funds))
        return
      }
      firebase.firestore().collection("loanPayment").add({
          loanId : loan.id,
          userId: loan.userId,
          groupId : loan.groupId,
          amountPaid: parseFloat(funds),
          createdAt : new Date(Date.now()).toLocaleDateString(),
          month : new Date().getMonth()+1,
      }).then(()=>{
        if(sdf == loan.totalPayment)
        {
          firebase.firestore().collection("loans").doc(loan.id).update({status: 0})
          .then(()=>{
            navigation.goBack()
          })
        }
        else{
          navigation.goBack()
        }
        
      }).catch((e)=>{
        alert(e0)
      })
    }
    
    payments.map((a) =>{
      totalPaid = totalPaid + a.amountPaid
    })
    
    return (
        <Layout>
        <TopNav
          middleContent="Pay Loan"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColor.white100}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        {loan === undefined ? <Text>Loading</Text> :
        <View
          style={{
            flex: 1,
            margin:20
          }}
        >
             <Text fontWeight="bold">Repay Loan</Text>
          <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter funds to deposit"
              value={funds}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={(text) => setfunds(text)}
            /> 
            <Text>Amount Pending {loan.totalPayment.toFixed(2)-parseFloat(totalPaid).toFixed(2)}</Text>
            <Text>Monthly Payment ({loan.monthlyPayment})</Text>
            <Text>Total Payment ({loan.totalPayment})</Text>
            <Text>Repayment Period {loan.repaymentPeriod} month(s)</Text>
            <Text style={{color:themeColor.danger}}>{msg}</Text>
            <Button
              text={"Pay Loan"}
              onPress={() => {
                payBackLoan()
              }}
              style={{
                marginTop: 20,
              }}
             
            />
        </View>}
      </Layout>
    )
}

export default PayLoan
