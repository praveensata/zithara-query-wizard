
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

// Your Firebase configuration will go here
// You'll need to replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // You'll provide this
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const createUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document in Firestore with role
    await setDoc(doc(db, "users", userCredential.user.uid), {
      displayName,
      email,
      role: "user", // Default role
      createdAt: serverTimestamp()
    });
    
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get user role from Firestore
export const getUserRole = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};

// Set user as admin (to be used only in admin dashboard)
export const setUserAsAdmin = async (uid: string) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      role: "admin"
    });
  } catch (error) {
    console.error("Error setting user as admin:", error);
    throw error;
  }
};

// Chat messages functions
export const saveChatMessage = async (userId: string, message: string, isUser: boolean) => {
  try {
    const chatRef = await addDoc(collection(db, "chatMessages"), {
      userId,
      message,
      isUser,
      timestamp: serverTimestamp()
    });
    return chatRef.id;
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};

export const getUserChatHistory = async (userId: string) => {
  try {
    const q = query(
      collection(db, "chatMessages"), 
      where("userId", "==", userId),
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting chat history:", error);
    throw error;
  }
};

// Product info (mock data - would connect to actual API in real implementation)
export const getProductInfo = async (productId: string) => {
  try {
    const productDoc = await getDoc(doc(db, "products", productId));
    if (productDoc.exists()) {
      return productDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting product info:", error);
    throw error;
  }
};

// FAQ functions
export const getFAQs = async () => {
  try {
    const q = query(collection(db, "faqs"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting FAQs:", error);
    throw error;
  }
};

export const addFAQ = async (question: string, answer: string) => {
  try {
    const faqRef = await addDoc(collection(db, "faqs"), {
      question,
      answer,
      createdAt: serverTimestamp()
    });
    return faqRef.id;
  } catch (error) {
    console.error("Error adding FAQ:", error);
    throw error;
  }
};

export { auth, db, onAuthStateChanged };
