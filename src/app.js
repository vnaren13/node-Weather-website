const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./util/geocode')
const forecast=require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Node'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        info : 'I am a basic weather up trying to show exact forecast for your location.',
        name: 'Node'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Contact administrator for further queries',
        title: 'Help',
        name: 'Node'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
         return res.send({
        error: 'Provide a proper address'
            })
    }


    geocode(req.query.address,(error,data)=>
    {
        if(error)
        {
            return res.send({
                error: 'Provide a proper address'
                    })
        }
      
        forecast(data.latitude,data.longitude,(error,forecastdata)=>
    {
        if(error)
        {
            return res.send({
                error: 'Provide a proper address'
                    })
        }
        res.send({
            forecast: forecastdata,
            location: data.location,
            latitude : data.latitude,
            longitude : data.longitude,
            
            address : req.query.address
        })
    })
    })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Node',
        errorMessage: 'Help article not found.'
    })
})
app.get('/products',(req,res)=>
{
if(!req.query.name)
{
return res.send({
    error : 'enter the name'
    })
}
    console.log(req.query.name)
    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Node',
        errorMessage: 'Page not found.'
    })
})
//weather


})
app.listen(port, () => {
    console.log('Server is up on port '+port)
})