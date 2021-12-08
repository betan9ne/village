import React,{useState} from 'react'
 import firebase from '../../firebase'

const useGetLoanPayments = (groupId, loanId) => {
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 

        firebase.firestore().collection("loanPayment").where("groupId", "==", groupId)
        .where("userId", "==", firebase.auth().currentUser.uid).where("loanId", "==", loanId)
        .onSnapshot((snap)=>{       
            let data = [] 
              snap.docs.forEach(e=>{
                  let asd = {
                        id:e.id,
                        ...e.data()
                  }
                  data.push(asd)
              })
              setDocs(data)
          })     
        }, [])

    return {docs}
}

export default useGetLoanPayments
