import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCSD04V81KXr8jDEA1PeRMd3TcdpCe26LQ",
  authDomain: "fir-push-notification-cce80.firebaseapp.com",
  projectId: "fir-push-notification-cce80",
  storageBucket: "fir-push-notification-cce80.appspot.com",
  messagingSenderId: "37323622118",
  appId: "1:37323622118:web:4cf361ed9a9ed8ffe5dd27"
};

console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: "BMo-h9HTAOmltCra1yj6aHIkjuzg57sonSqvO5jea_ihOppbWuQFm787T3_CtE0glxlQTdGcNBYLkKssOEH51Sg", serviceWorkerRegistration }));

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
