

const express = require('express')
const app = express();

app.use(express.json())


const port = process.env.PORT || 3000

app.post('/', (req, res) => {
   console.log(req.body);
})

const start = (url) => {
   try {
      app.listen(port, console.log(`Server is listening on Port: ${port}`));
   } catch (error) {
      console.log(error);
   }
}

start()