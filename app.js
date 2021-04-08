const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes/routes')
const path = require('path')
const slashes = require('connect-slashes')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/', Routes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.use(slashes(false))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zhgqg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).then(() => {
    app.listen(process.env.PORT || 5000)
    console.log("Connection successful!!")
}).catch((err) => {
    console.log(err)
})