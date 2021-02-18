var admin = require("firebase-admin");
var serviceAccount = require("../credentials.json");

let db;

function dbAuth(){
    if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore
    }
}
    
exports.getTasks = (req, res) => {
    dbAuth()
    db.collection('tasks').get()
        .then(collection => {
            const taskList = collection.docs.map(doc=> {
                let task = doc.data()
                task.id = doc.id
                return task
            })
            res.status(200).send('getTasks')
        })
        .catch(err=> res.status(500).send(err))
}
exports.postTask = (req, res) => {
    if(!req.body || !req.body.item || !req.body.userId){
        res.status(400).send('Invalid request')
    }
    dbAuth()
    const newTask = {
        item: req.body.item,
        done: false,
        userId: req.body.userId
    }
    db.collection('tasks').add(newTask)
        .then(() => {
            this.getTasks(req, res)
        })
        .catch(err => res.status(500).send(err))
    res.status(200).send('postTasks')
}
exports.patchTask = (req, res) => {
    dbAuth()
    res.status(200).send('patchTasks')
}
exports.deleteTask = (req, res) => {
    dbAuth()
    res.status(200).send('deleteTasks')
}