// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "portfolio-8ed2c.firebaseapp.com",
  projectId: "portfolio-8ed2c",
  storageBucket: "portfolio-8ed2c.firebasestorage.app",
  messagingSenderId: "995502905220",
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
let db: Firestore;

try {
  db = getFirestore(app);
  console.log("Firestore başarıyla başlatıldı");
} catch (error) {
  console.error("Firestore başlatma hatası:", error);
  throw new Error("Firestore başlatılamadı");
}

// Function to send a message to Firestore
export const sendMessage = async (messageData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    console.log("Mesaj gönderiliyor:", messageData);
    
    if (!db) {
      console.error("Firestore bağlantısı yok!");
      return { success: false, error: "Database connection not established" };
    }
    
    const messagesCollection = collection(db, "messages");
    
    // Mesajı Firestore'a ekle
    const docRef = await addDoc(messagesCollection, {
      ...messageData,
      createdAt: new Date().toISOString(),
      read: false
    });
    
    console.log("Mesaj başarıyla kaydedildi, ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    
    // Firestore kuralları hatası olabilir
    if (String(error).includes("permission-denied")) {
      return { 
        success: false, 
        error: "Firestore yazma izni reddedildi. Lütfen Firebase konsolunda kuralları kontrol edin." 
      };
    }
    
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

export { db };