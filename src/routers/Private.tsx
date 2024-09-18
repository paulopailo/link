

import { ReactNode, useState, useEffect } from 'react'
import {auth} from '../services/firebaseConection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'


interface privateProps{
    children: ReactNode
}

export function Private({children}: privateProps): any{
    const [loading, setloading] = useState(true);
    const [signed, setSigned] = useState(false);
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) =>{
            if (user){
               const userData = {
                uid: user?.uid,
                email: user?.email
               }

               localStorage.setItem("@reactlinks", JSON.stringify(userData))
               setloading(false);
               setSigned(true);

            } else{
                setloading(false)
                setSigned(false)
            }
        })
        return () => {
            unsub();
        }

    }, [])

    if (loading){
        return <div>  </div>
    }

    if (!signed){
        return <Navigate to="/login"/>
    }

    return children;
}