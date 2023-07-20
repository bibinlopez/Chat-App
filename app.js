require('dotenv').config()
const connectDB = require('./db/connect')
const Message = require('./Model/chatSchema')

const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(express.json())


const port = process.env.PORT || 3000

// app.post('/', (req, res) => {
//    console.log(req.body);
// })


// app.get('/', (req, res) => {
//    Message.find({}).then((result) => {
//       // console.log(result);
//       res.status(200).json(result)
//    }).catch((error) => {
//       console.log(error);
//    })

// })


io.on('connection', () => {
   console.log('a user is connected')
})


const start = async (url) => {
   try {
      await connectDB(process.env.MONGO_URI);
      http.listen(port, console.log(`Server is listening on Port: ${port}`));
   } catch (error) {
      console.log(error);
   }
}

start()

