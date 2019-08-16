const request=require('request')
const forecast = (latitude,longitude,callback)=> 
{
   const url='https://api.darksky.net/forecast/aca2adbaf964202fc8ce6524889d0c6c/'+latitude+','+longitude+'?units=si'
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('unable to connect ',undefined)
        }
        else if(response.body.error)
        { 
          
         console.log('invalid input',undefined)
        }
       else{
          
           callback(undefined,response.body.daily.data[0].summary+' It is currently '+ response.body.currently.temperature+' degrees out.There is a '+response.body.currently.precipProbability+'% chance of rain.\n Maximum temperature '+response.body.daily.data[0].temperatureMax+' . Minimum temperature '+response.body.daily.data[0].temperatureMin)
       }
    })
    
}
module.exports= forecast