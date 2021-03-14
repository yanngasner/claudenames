import { auth } from "./firebase";


export async function signUp(email : string, userName : string) {

    await auth().createUserWithEmailAndPassword(email, userName);
    await auth().currentUser?.updateProfile({
        displayName : userName
    });
}

export function signIn(email : string, userName : string) {
    return auth().signInWithEmailAndPassword(email, userName);
}