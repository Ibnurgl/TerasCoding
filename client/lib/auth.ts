    import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    } from "firebase/auth";
    import { auth } from "./firebase";

    /**
     * Register User
     */
    export const registerUser = async (
    name: string,
    email: string,
    password: string
    ): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(userCredential.user, {
        displayName: name,
    });

    return userCredential.user;
    };

    /**
     * Login User
     */
    export const loginUser = async (
    email: string,
    password: string
    ): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredential.user;
    };

    /**
     * Logout User
     */
    export const logoutUser = async (): Promise<void> => {
    await signOut(auth);
    };

    /**
     * Get Current User
     */
    export const getCurrentUser = (): User | null => {
    return auth.currentUser;
    };