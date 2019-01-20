import firebase from 'firebase'
import config from '../config/firebase.js'

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const mediaCollection = db.collection('media')
const postsCollection = db.collection('posts')

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)


export {
  db,
  auth,
  currentUser,
  firebase,
  mediaCollection,
  postsCollection,
}
