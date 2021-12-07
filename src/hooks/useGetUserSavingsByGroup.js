import React from 'react'
import firebase from '../../firebase'

const useGetUserSavingsByGroup = (groupId) => {
    let id = firebase.auth().currentUser.uid
    const[docs, setDocs] = React.useState([])

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
        setDocs(data)

  })    
}, [groupId]) 
  return {docs}
}

export default useGetUserSavingsByGroup
