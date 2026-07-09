import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Menyimpan data user pertama kali setelah register
 */
export const saveUser = async (
  uid: string,
  name: string,
  email: string
) => {
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    createdAt: serverTimestamp(),
  });
};

/**
 * Mengambil data user
 */
export const getUser = async (uid: string) => {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return snapshot.data();
};

/**
 * Menyimpan progress belajar
 */
export const saveProgress = async (
  uid: string,
  lessonId: string,
  completed: boolean
) => {
  await setDoc(
    doc(db, "progress", `${uid}_${lessonId}`),
    {
      uid,
      lessonId,
      completed,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

/**
 * Mengambil progress lesson
 */
export const getProgress = async (
  uid: string,
  lessonId: string
) => {
  const snapshot = await getDoc(
    doc(db, "progress", `${uid}_${lessonId}`)
  );

  if (!snapshot.exists()) return null;

  return snapshot.data();
};

/**
 * Menyimpan hasil quiz
 */
export const saveQuizResult = async (
  uid: string,
  lessonId: string,
  score: number
) => {
  await setDoc(
    doc(db, "quiz_results", `${uid}_${lessonId}`),
    {
      uid,
      lessonId,
      score,
      completedAt: serverTimestamp(),
    },
    { merge: true }
  );
};