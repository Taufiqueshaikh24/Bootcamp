import NodeGeocoder from "node-geocoder";


const options : NodeGeocoder.Options = {

    provider: 'mapquest',
    apiKey: process.env.GEOCODER_KEY,
    formatter: null
  }

   

  const geocoder = NodeGeocoder(options);


  export default geocoder ; 
