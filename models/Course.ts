import { Schema , model , models} from "mongoose";
import { title } from "process";


const courseSchema = new Schema({
        title : {
               type:String , 
               trim : true , 
               required: [true , "Title is Required"]
        },
        description : {
            type:String , 
            required: [true , "Description is Required"]
        },
        weeks : {
            type:String , 
            required: [true , "Weeks is Required"]
        },
        tuition : {
              type:Number, 
              required : [true , "Please Add a tuition cost"]
        },
        minumumSkill : {
              type : String  , 
              required: [true , 'Please Add a Minimum Skill'],
              enum: ['beginner' , 'intermediate' , 'advance']
        }, 
        
})


