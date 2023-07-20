require('dotenv').config()
const connectDB = require('./db/connect')
const bodyParser = require('body-parser')
const Message = require('./Model/chatSchema')

const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

app.get('/messages', (req, res) => {
   Message.find({}).then((messages) => {
      res.send(messages)
   })
})


app.get('/messages/:user', (req, res) => {
   const user = req.params.user
   Message.find({ name: user }).then((messages) => {
      res.send(messages)
   })
})


app.post('/messages', async (req, res) => {
   try {
      console.log(req.body, '@@@@');
      const message = new Message(req.body);

      await message.save()
      console.log('saved');

      var censored = await Message.findOne({ message: 'badword' });
      if (censored)
         await Message.remove({ _id: censored.id })
      else
         io.emit('message', req.body);
      res.sendStatus(200);
   }
   catch (error) {
      res.sendStatus(500);
      return console.log('error', error);
   }
   finally {
      console.log('Message Posted')
   }

})

app.post('/delete', (req, res) => {
   // console.log('this is the route for delete all chats');
   Message.deleteMany({}).then(() => console.log('deleted')).catch((error) => console.log(error))
})


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

