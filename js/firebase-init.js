// js/firebase-init.js
// 统一管理 Firebase 配置，修改一处即可全局生效

const firebaseConfig = {
    apiKey: "AIzaSyBzcAr_OJFdIMnaYXRCE7TJs2qlK_TAy9U",
    authDomain: "weekly-report-d55e9.firebaseapp.com",
    projectId: "weekly-report-d55e9",
    storageBucket: "weekly-report-d55e9.appspot.com",
    messagingSenderId: "315332641675",
    appId: "1:315332641675:web:e1b52c3d4c5fcc7b8c0de7"
};

// 执行初始化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();