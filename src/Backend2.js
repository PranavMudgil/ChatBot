import firebase from 'firebase';

class Backend2 {
uid = '';
messageRef = null;

//initialize firebase Backend
 constructor() {
   this.init();
   this.observeAuth();
 }

 observeAuth = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setUid(user,this.uid);
      }else{
        firebase.auth().signInAnonymously().catch((error)=>{
          alert(error.message);
        });
      }
    });
  }
init = () => {
  try {
firebase.initializeApp({
   apiKey: "AIzaSyAVhOIUMIk8vKk9jLErcb8IGiZMBDqf6zU",
   authDomain: "chatbot-74125.firebaseapp.com",
   databaseURL: "https://chatbot-74125.firebaseio.com",
   projectId: "chatbot-74125",
   storageBucket: "chatbot-74125.appspot.com",
   messagingSenderId: "80430444139"
    });
} catch (err) {
// we skip the "already exists" message which is
// not an actual error when we're hot-reloading
if (!/already exists/.test(err.message)) {
//console.error('Firebase initialization error', err.stack);
 }
}
}

 setUid(value){
   this.uid = value;
 }
  getUid(){
    return(this.uid);
 }
  // Retrieve message from Backend
loadMessages(callback){
  this.messageRef = firebase.database().ref('messages');
  this.messageRef.off();
  const onRecieve = (data)=>{
    const message = data.val();
    callback({
      _id: data.key,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.user._id,
        name: message.user.name,
      },
    });
  };
  this.messageRef.limitToLast(20).on('child_added', onRecieve);
}
//send message to Backend
sendMessage(message){
  for(let i = 0; i <  message.length; i++){
    this.messageRef.push({
      text: message[i].text,
      user: message[i].user,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }
}
// close the connection
 closeChat(){
  if(this.messageRef){
    this.messageRef.off();
  }
 }
}

export default new Backend2();
