import { Schema , model , models } from "mongoose";
import  bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";




const UserSchema = new Schema({
       name : {
           type: String, 
           required: [true , "Name is Required"]
       }, 
       email : {
           type:String , 
           unique:true ,
            required: [true , 'Email is Required'],
       }, 
       password : {
            type: String , 
            required : [true , "Password is Required"],
            minlength: 4 , 
            select:false
       }, 
    //    resetPasswordToken :  String , 
    //    resetTokenExpire : new Date,
       role  :    {
                 type: String , 
                enum : ["publisher" , "user"] , 
                default : 'user'

       }
},{
    timestamps: true
})



UserSchema.pre('save' , async function(next){
    console.log("this is the password = ", this.password);
    if (!this.isModified('password')) {
        next();
    }
 const salt = await  bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
 
})


UserSchema.methods.signedJwtToken = function(){
    return jwt.sign({id : this._id} ,  process.env.JWT_SECRET! , {
            expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.matchPassword = async function(enteredPassword:string){
    return await compare(enteredPassword , this.password);
}




const User = models.User ||  model("User" , UserSchema);

export default User ; 