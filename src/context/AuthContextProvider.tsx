import React, { createContext , ReactNode} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {auth, firebase} from '../service/firebase'
 
type User = {
  id: string;
  name: string; 
  avatar:string;
  
}

type AuthContextType={
  user: User | undefined,
  singInWithGoogle: () => Promise<void>   
  loading: boolean;
  toggleLoading(value:boolean):void

}

type AuthContextProviderProps ={
  children: ReactNode

}


export const AuthContext = createContext({} as AuthContextType)

 
const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)
 
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      setLoading(true)
      if(user){
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL){
          throw new Error(`Missing information from Google Account.`)
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
         setLoading(false)
      }

    })

    return () =>{
      unsubscribe();
    }
  },[])

  function toggleLoading(value: boolean){
    setLoading(value)
  }
 

  async function singInWithGoogle(){

    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await  auth.signInWithPopup(provider);

      if(result.user){
        const {displayName, photoURL, uid} = result.user;

        if(!displayName || !photoURL){
          throw new Error(`Missing information from Google Account.`)
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
  }  

 

  return (
    <AuthContext.Provider value={{user, singInWithGoogle,loading,toggleLoading }}>
      {props.children}
    </AuthContext.Provider>


  )
 
}

export  {AuthContextProvider};