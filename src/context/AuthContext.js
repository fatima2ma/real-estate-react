import { useCallback, createContext } from "react";
import { db } from "../firebase.config";
import {getAuth,
        signOut, 
        updateProfile, 
        sendPasswordResetEmail, 
        signInWithEmailAndPassword, 
        createUserWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (({children}) => {
    const auth = getAuth();
    const navigate = useNavigate();

    const SigninAuth = useCallback(async(email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
            const user = userCredential.user;
            if(user) navigate('/');
        }).catch(error => {
            console.log(error.code);
            console.log(error.message);
        });
    },[]);

    const SignUpAuth = useCallback(async(username, email, password) => {
        try{
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(auth.currentUser);
                console.log(userCredential);
                await updateProfile(userCredential.user,{displayName: username});
                await setDoc(doc(db,'users', userCredential.user.uid), {
                    email: auth.currentUser.email,
                    username: auth.currentUser.displayName,
                });
                auth.currentUser && navigate('/profile');
            }catch(error) {
                console.log(error.code);
                console.log(error.message);
            }
    },[]);

    const updateAuth = useCallback(async (username) => {
        if(auth.currentUser.displayName && auth.currentUser.displayName !== username )
            await updateProfile(auth.currentUser, {displayName: username});
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {username: username});
    },[]);

    const updatePassword = useCallback(async (email) => {
        try{
            await sendPasswordResetEmail(auth, email);
        }catch(error){
            console.log(error.message);
        }
    },[]);

    const signOutAuth = useCallback(() => {
        if(auth.currentUser)
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        })
    },[]);

    return(
        <AuthContext.Provider value={{updateAuth, updatePassword, SigninAuth, signOutAuth, SignUpAuth}}>
            {children}
        </AuthContext.Provider>
    )
})

export default AuthContext;