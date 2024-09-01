const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const path=require('path')
//connect database
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const db= process.env.DB_URL

const connectDB = async() => {
    try{

        await mongoose.connect(db,{ useNewUrlParser: true })
        console.log('MongoDB connected')

    } catch(err){
        console.log(err.message)
        //exit process with failure
        process.exit(1)
    }
}
connectDB()

//init middleware
app.use(express.json({ extended: false }))
//app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())
app.use(fileUpload()); 

//routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 6000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))