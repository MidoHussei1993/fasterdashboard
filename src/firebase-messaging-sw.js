importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyDDrfPS6zGEXvdEySyLATwIG0iZpQO59YA",
  authDomain: "faster-5dd74.firebaseapp.com",
  databaseURL: "https://faster-5dd74.firebaseio.com",
  projectId: "faster-5dd74",
  storageBucket: "faster-5dd74.appspot.com",
  messagingSenderId: "947945457722",
  appId: "1:947945457722:web:372bfb601a2b7dd64f4d03",
  measurementId: "G-KZ12NG251T",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "🚀 ~ file: messaging.service.ts:17 ~ MessagingService ~ this.angularFireMessaging.onBackgroundMessage ~ payload:",
    payload.notification.body
  );

  // self.addEventListener("notificationclick", function (e) {
  //   const notification = e.notification;
  //   // MARK 1 -> always takes first item
  //   const clickAction = notification.click_action;
  //   const action = e.action;
  //   if (action === "close") {
  //     notification.close();
  //   } else {
  //     clients.openWindow(clickAction);
  //     notification.close();
  //   }
  // });

  console.log(this);
  console.log(self);
  // self.alert(payload.notification.body);
});

// messaging.setBackgroundMessageHandler(function (payload) {
//   console.info("SW received the message: ", payload);
//   const notification = payload.notification;

//   const notificationTitle = notification.title;
//   const notificationOptions = {
//     body: notification.body,
//     icon: notification.image,
//     vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
//     actions: [
//       // First item is always taken as click action (see comment below)
//       {
//         title: "Visit",
//         action: notification.clickPath,
//       },
//     ],
//   };
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

self.addEventListener("notificationclick", function (e) {
  const notification = e.notification;
  // MARK 1 -> always takes first item
  const clickAction = notification.click_action;
  const action = e.action;
  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow(clickAction);
    notification.close();
  }
});
