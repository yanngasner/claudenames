import { auth } from "./firebase";

export async function anonymousSignIn(userName: string) {
    await auth().signInAnonymously();
    await auth().currentUser?.updateProfile({
        displayName : userName
    });
}