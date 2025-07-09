// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyCiLqFf44bXijBPiW56ChRi5AtKCRkfkrQ", // Fallback (güvenlik için gerçek değeri kullanmayın)
  authDomain: "portfolio-8ed2c.firebaseapp.com",
  projectId: "portfolio-8ed2c",
  storageBucket: "portfolio-8ed2c.firebasestorage.app",
  messagingSenderId: "995502905220",
  appId: "1:995502905220:web:ee311ea61cbf9119492fd1" // Fallback (güvenlik için gerçek değeri kullanmayın)
};

// Initialize Firebase
let app;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase başarıyla başlatıldı");
  
  // Initialize Firestore
  db = getFirestore(app);
  console.log("Firestore başarıyla başlatıldı");
} catch (error) {
  console.error("Firebase/Firestore başlatma hatası:", error);
  throw new Error("Firebase başlatılamadı");
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
      read: false,
      environment: "production" 
    });
    
    console.log("Mesaj başarıyla kaydedildi, ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Firestore kuralları hatası olabilir
    if (String(error).includes("permission-denied")) {
      return { 
        success: false, 
        error: "Firestore yazma izni reddedildi. Lütfen Firebase konsolunda kuralları kontrol edin." 
      };
    }
    
    // Network hatası olabilir
    if (String(error).includes("network") || String(error).includes("fetch")) {
      return { 
        success: false, 
        error: "Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin." 
      };
    }
    
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

export { db };