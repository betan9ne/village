import React,{useState} from 'react'
 import firebase from '../../firebase'

const useGetTransactionHistory = (groupId)=> {
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 

    firebase.firestore().collection("savings")
    .where("userId", "==", firebase.auth().currentUser.uid)
    .where("groupId", "==", groupId)
    .orderBy("month", "asc")
    .limit(12)
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

export default useGetTransactionHistory
