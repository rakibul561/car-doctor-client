import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firbase.config"
import axios from "axios";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // log out
    const logOut = () => {
        setLoading(true)
        return signOut(auth)

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user.email;
            const loggedUser = { email:  userEmail };

            setUser(currentUser);
            setLoading(false)
            // if user exits a token
            if (currentUser) {
                axios.post('http://localhost:5173/jwt',loggedUser, { linkWithCredential: true })
                    .then(res => {
                        console.log('token response',res.data);
                    })
            }
            else{
                axios.post('http://localhost:5173/logout',loggedUser,{withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }
        });


        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;