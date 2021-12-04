import React from 'react'
import firebase from '../../firebase'

const useGetGroupInfo = (id) => {

    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 
        firebase.firestore().collection("groups").doc(id).onSnapshot((doc)=>{        
          setDocs(doc.data())
      })     
    }, [])

    return {docs}
}

export default useGetGroupInfo
