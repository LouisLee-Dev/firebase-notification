importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCSD04V81KXr8jDEA1PeRMd3TcdpCe26LQ",
  authDomain: "fir-push-notification-cce80.firebaseapp.com",
  projectId: "fir-push-notification-cce80",
  storageBucket: "fir-push-notification-cce80.appspot.com",
  messagingSenderId: "37323622118",
  appId: "1:37323622118:web:4cf361ed9a9ed8ffe5dd27"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
