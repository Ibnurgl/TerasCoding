import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { addDoc } from "firebase/firestore";



/**
 * Menyimpan data user pertama kali setelah register
 */
export const saveUser = async (
  uid: string,
  name: string,
  email: string
) => {
  try {
    console.log("Mulai setDoc");

    await setDoc(doc(db, "users", uid), {
      name,
      email,
      createdAt: serverTimestamp(),
    });

    console.log("setDoc selesai");
  } catch (error) {
    console.error("saveUser error:", error);
    throw error;
  }
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
 * Mengambil semua lessonId yang sudah completed oleh user.
 * Digunakan oleh RoadmapSection untuk menentukan kursus mana yang sudah unlocked.
 */
export const getCompletedLessonIds = async (uid: string): Promise<Set<string>> => {
  const q = query(
    collection(db, "progress"),
    where("uid", "==", uid),
    where("completed", "==", true)
  );
  const snap = await getDocs(q);
  const ids = new Set<string>();
  snap.forEach((d) => {
    const data = d.data();
    if (data.lessonId) ids.add(data.lessonId as string);
  });
  return ids;
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