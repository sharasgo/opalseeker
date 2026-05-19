import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { products } from '../data/products.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, '../firebase-applet-config.json');

const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log('Seeding products...');
  for (const product of products) {
    const docRef = doc(db, 'products', product.id);
    await setDoc(docRef, {
      ...product,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    console.log(`Seeded ${product.id}`);
  }
  console.log('Done!');
  process.exit(0);
}

seed().catch(console.error);
