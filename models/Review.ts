import { Schema , model , models } from "mongoose";

const reviewSchema =   new Schema({
     title :{
         type : String , 
         required: [true, "title is required"],
         maxlength : [100 , "title can't be more than 100 characters"],
     },
     text : {
          type: String , 
          required: [true , 'Please add some text']
     },
     rating :{
         type:Number , 
          minlength : 1 ,
          maxlength : 10,
         required: [true , 'Please add a rating between 1 and 10']
     },
     bootcamp : {
           type : Schema.Types.ObjectId , 
           ref: 'Bootcamp', 
           required : true, 

     }, 
     user : {
          type : Schema.Types.ObjectId, 
           ref : 'User' , 
           required: true 
     }
})




const Review = models.Review  || model('Review' , reviewSchema);

export default Review; 