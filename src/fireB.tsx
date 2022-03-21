import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyDYLp96LrhQ8bwcIqYWdLR0eiDdbn4_Tkw",
    authDomain: "scheduler-43ef3.firebaseapp.com",
    projectId: "scheduler-43ef3",
    storageBucket: "scheduler-43ef3.appspot.com",
    messagingSenderId: "650831836587",
    appId: "1:650831836587:web:111e365645ac4181500eee"
  };

  export const app = initializeApp(firebaseConfig);

  export const firebaseInstance = firebase;

  export const authService = getAuth();

  export const dbService = getFirestore();

  export const storage = getStorage(app);

  