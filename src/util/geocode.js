const request=require('request')

const geocode= (address,callback) =>
{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmFyZW4xMyIsImEiOiJjanlqMGc3M3kwNmZlM2hyMm55N3dpYnQxIn0.HqLmu5e2pp8xvxpgZnq9qQ&limit=1'
request({url:url,json:true},(error,response)=>
{
    if(error)
    {
        callback('unable to connect ',undefined)
    }
    else if(response.body.features.length===0)
    { 
      
     console.log('invalid input',undefined)
    }
   else{
       callback(undefined,{
        latitude:response.body.features[0].center[1],
         longitude :response.body.features[0].center[0],
         location : response.body.features[0].place_name
       })
   }
})

}
module.exports = geocode