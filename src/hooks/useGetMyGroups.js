import React,{useState} from 'react'
 import firebase from '../../firebase'
const useGetMyGroups = () => {

      const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 

    firebase.firestore().collection("groups").where("creator", "==", firebase.auth().currentUser.uid)
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

export default useGetMyGroups
