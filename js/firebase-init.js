/**
 * Firebase 统一初始化模块
 * 
 * 使用方法：
 * <script src="js/firebase-init.js"></script>
 * 
 * 然后直接使用全局变量：
 * - firebase (Firebase实例)
 * - auth (认证实例)
 * - db (Firestore实例)
 */

(function() {
    'use strict';
    
    // Firebase配置
    const firebaseConfig = {
        apiKey: "AIzaSyBzcAr_OJFdIMnaYXRCE7TJs2qlK_TAy9U",
        authDomain: "weekly-report-d55e9.firebaseapp.com",
        projectId: "weekly-report-d55e9",
        storageBucket: "weekly-report-d55e9.appspot.com",
        messagingSenderId: "315332641675",
        appId: "1:315332641675:web:e1b52c3d4c5fcc7b8c0de7"
    };
    
    // 初始化Firebase
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK未加载！请确保已引入Firebase脚本');
        return;
    }
    
    if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase已初始化');
    } else {
        console.log('✅ Firebase已存在，跳过初始化');
    }
    
    // 创建全局实例
    window.auth = firebase.auth();
    window.db = firebase.firestore();
    
    // 监听认证状态变化
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('✅ 用户已登录:', user.email);
            
            // 触发自定义事件，通知页面用户已登录
            window.dispatchEvent(new CustomEvent('firebaseAuthReady', {
                detail: { user: user }
            }));
        } else {
            console.log('⚠️ 用户未登录');
            
            // 如果不是登录页面，重定向到登录页
            if (!window.location.pathname.includes('login.html') && 
                !window.location.pathname.includes('index.html')) {
                console.log('🔄 重定向到登录页...');
                window.location.href = 'login.html';
            }
        }
    });
    
    console.log('🔧 Firebase初始化模块已加载');
})();
