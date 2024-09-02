// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from"https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {getFirestore,setDoc,doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsd1nt5W-oyH-1tUGS8JEHSIw283hCn9Y",
  authDomain: "login-page-ee8c2.firebaseapp.com",
  projectId: "login-page-ee8c2",
  storageBucket: "login-page-ee8c2.appspot.com",
  messagingSenderId: "182173989988",
  appId: "1:182173989988:web:a709e9d0c0799127f3b371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message,divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;

    },5000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;
    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email:email,
            firstName:firstName,
            lastName:lastName
        };
        showMessage('Account Created Succesfully','signUpmessage');
        const docRef=doc(db,"users",user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index1.html';
        })
        .catch((error)=>{
            console.error("error writing document",error);

        });
        
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exits !!!','signUpMessage');
        }
        else{
            showMessage('login succesfully !!!','signUpMessage');
        }

    })

});
const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is succesfully !!!','signUpmessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='homepage.html';
        
    })
    .cache((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email Or Password','signInMessage');
        }else{
            showMessage('Account Does Not Exits','signInMessage');
        }
    })
});