import React from 'react'
import firebase from '../../firebase'

const useGetUserProfile  =(id) => {

    const[docs, setDocs] = React.useState([])

    React.useEffect(() => {     

      const unsub =  firebase.firestore().collection("users").doc(id).onSnapshot((doc)=>{        
          setDocs(doc.data())
      })     
    }, [])

    return {docs}
}

export default useGetUserProfile