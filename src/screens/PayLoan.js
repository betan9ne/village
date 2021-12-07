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

const PayLoan = ({navigation, route}) => {
    let data = route.params.data 
    let loan = useGetUserLoan(data.id).docs[0]
    const [funds, setfunds] = useState(0)
    const [msg, setmsg] = useState("")
    console.table(loan)
    const payBackLoan = () =>{
      if(loan === undefined)
      {
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
        navigation.goBack()
      }).catch((e)=>{
        alert(e0)
      })
      // firebase.firestore().collection("loanPayment").doc(loan.id).update({amountPaid : firebase.firestore.FieldValue.increment(parseFloat(funds))}).then((doc)=>{
      //     firebase.firestore().collection("loans").doc(loan.id).get().then((doc)=>{
      //       console.log(doc.data())
      //         if(loan.totalPayment.toFixed(2) === doc.data().amountPaid.toFixed(2))
      //           {
      //             firebase.firestore().collection("loans").doc(loan.id).update({status:"closed"}).then(()=>{
      //               navigation.goBack()
      //             }).catch((e)=>{
      //               alert("Error updating status of the loan")
      //             })
      //           }
      //           else{
      //             console.log("still owing")
      //           }
      //     })

       
      // }).catch((e)=>{
      //   alert(e)
      // })
    }
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
            <Text>Amount Pending {loan.totalPayment.toFixed(2)}</Text>
            <Text>Monthly Payment ({loan.monthlyPayment})</Text>
            <Text>Total Payment ({loan.totalPayment})</Text>
            <Text>Repayment Period {loan.repaymentPeriod} month(s)</Text>
            <Text style={{color:themeColor.danger}}>{msg}</Text>
            <Button
              text={"pay Loan"}
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
