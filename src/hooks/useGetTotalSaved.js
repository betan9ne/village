import React from 'react'
import firebase from '../../firebase'

const useGetTotalSaved = (groupId) => {
    let id = firebase.auth().currentUser.uid
    const[docs, setDocs] = React.useState([])
    let overallBalance = 0

    React.useEffect(() => { 
    firebase.firestore().collection("savings").where("userId", "==", id)
    .where("groupId", "==",groupId).onSnapshot((snap)=>{        
        let data = [] 
        snap.docs.forEach(e=>{
            let asd = {
                  id:e.id,
                  ...e.data()
            }
            data.push(asd)
        })      
        data.map((a)=>{
            overallBalance = overallBalance + (a.amount +  a.amountWithInterest)
          })
          setDocs(overallBalance)
  })    
}, [groupId]) 
  return {docs}
}

export default useGetTotalSaved
