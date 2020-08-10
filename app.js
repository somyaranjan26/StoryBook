const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.json())

// Method override for PUT and DELETE operation
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

// Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlerbars Helper
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', 
    exphbs({
        helpers: {
            formatDate,
            stripTags,
            truncate,
            editIcon,
            select,
    }, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,                  // it will not save sessioon if nothing is modified.
        saveUninitialized: false,        // it will not create any session if nothing is stored.
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Global variable
app.use( function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static Folders
app.use(express.static(path.join(__dirname, 'public')))

// Routers
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

// PORT is  specified in  config/config.env file
const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)




