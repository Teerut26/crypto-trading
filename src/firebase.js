import firebase from '@firebase/app'
import '@firebase/database'

// ค่า minimum configuration คือ `apiKey` และ `databaseURL`
// const config = {
//   apiKey: 'AIzaSyBEqQBxMg3M...',
//   databaseURL: 'https://...'
// }


var firebaseConfig = {
  apiKey: "AIzaSyDoPoyT2fxA2VgGCG5d_UyzdbHvhjWKmO4",
  authDomain: "visual-trad-crypto.firebaseapp.com",
  databaseURL: "https://visual-trad-crypto-default-rtdb.firebaseio.com",
  projectId: "visual-trad-crypto",
  storageBucket: "visual-trad-crypto.appspot.com",
  messagingSenderId: "15723925147",
  appId: "1:15723925147:web:ea9d9f2a2b48ee1ec8003e"
};

// คืนค่า firebase application ที่อาจถูก instantiate แล้วหรือ instantiate ใหม่
export default firebase.apps[0] || firebase.initializeApp(firebaseConfig)