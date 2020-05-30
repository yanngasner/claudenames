import { auth } from "../services/firebase";


export async function signUp(email : string, password :string, userName : string) {

    await auth().createUserWithEmailAndPassword(email, password);
    await auth().currentUser?.updateProfile({
        displayName : userName
    });
}

export function signIn(email : string, password : string) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
    return auth().signInWithPopup(new auth.GoogleAuthProvider());
}