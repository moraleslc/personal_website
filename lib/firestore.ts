import { db } from "./firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const getExperience = async () => {
  const q = query(collection(db, "experience"), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getSkills = async () => {
  const q = query(collection(db, "skills"), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCertifications = async () => {
  const q = query(collection(db, "certifications"), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPosts = async () => {
  const snapshot = await getDocs(collection(db, "post"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPostBySlug = async (slug: string) => {
  const q = query(collection(db, "post"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};