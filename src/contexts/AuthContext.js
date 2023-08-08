import React, { useContext, useEffect, useState } from "react";


import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";

import '../firebase';



const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}){

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();


    // Use effect 
    useEffect(() => {
        const auth = getAuth();
        const unscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unscribe;
    }, []);

    // Sign Up method 
    async function signup(email, password, username){

        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password);

        // Profile update 

        await updateProfile(auth.currentUser, {
            displayName:username
        });

        const user = auth.currentUser;

        setCurrentUser({
            ...user,
        });

    }


    // Login Method 
    function login(email, password){
        const auth = getAuth();
        
        return signInWithEmailAndPassword(auth, email, password);

    }


    // Logout method 
    function logout(){
        const auth = getAuth();
        return signOut(auth);
    }

    // Add value 
    const value = {
        currentUser,
        signup,
        login,
        logout,

    }



    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}