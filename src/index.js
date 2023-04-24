const express = require('express');
const app = express();
app.use(express.json());

const route = require('./routes/router');
app.use('/', route);

const multer = require('multer');
app.use(multer().any());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://DipaliBohara:80761668@cluster0.4wyyohq.mongodb.net/studentMangementsystem"
, {
   useNewUrlParser: true 
}
).then( () => {console.log("MongoDb is connected")})
.catch( err => console.log(err))

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});