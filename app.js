require('dotenv').config()

const express = require('express')
const app = express();
const connectDB = require('./db/connect')

app.use(express.json())


const port = process.env.PORT || 3000

app.post('/', (req, res) => {
   console.log(req.body);
})


app.get('/', (req, res) => {

})
const start = async (url) => {
   try {
      // await connectDB(process.env.MONGO_URI)
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`Server is listening on Port: ${port}`));
   } catch (error) {
      console.log(error);
   }
}

start()