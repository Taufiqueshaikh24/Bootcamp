import { Schema , model , models } from "mongoose";



const UserSchema = new Schema({
       name : {
           type: String, 
           required: [true , "Name is Required"]
       }, 
       email : {
            type:String , 
            required: [true , 'Email is Required']
       }, 
       password : {
            type: String , 
            required : [true , "Password is Required"]
       }, 
       role  :    {
                 type: String , 
                enum : ["publisher" , "user"] , 
                default : 'user'

       }
},{
    timestamps: true
})



const User = models.User ||  model("User" , UserSchema);

export default User ; 