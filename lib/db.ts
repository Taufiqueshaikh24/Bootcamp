import mongoose from "mongoose"



const connectDB = async () => {

     const connectionState = mongoose.connection.readyState; 

     if(connectionState === 1){
          console.log("Already Connected");
          return ; 
     }

    if(connectionState === 2){
          console.log("MongoDB is Connecting ...")
    }

      try {
          const connect  = await mongoose.connect(process.env.MONGO_URI! , {
                      dbName: "Bootcamps", 
                      bufferCommands: true 
          })
            console.log("Connected!")
      } catch (error) {
           console.error(error)
      }



}


export default connectDB;