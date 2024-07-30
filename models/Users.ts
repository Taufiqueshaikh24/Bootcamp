import { Schema , model , models } from "mongoose";
import  bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'node:crypto';




const UserSchema = new Schema({
       name : {
           type: String, 
           required: [true , "Name is Required"]
       }, 
       email : {
           type:String , 
           required: [true , 'Email is Required'],
           unique:true ,
       }, 
       password : {
            type: String , 
            required : [true , "Password is Required"],
            minlength: 4 , 
            select:false
       }, 
       resetPasswordToken :  String , 
       resetTokenExpire : {
                type:Date,
                default:Date.now      
       },
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


UserSchema.methods.getResetPasswordToken = function(){
        // Generate the reset password token
        const resetToken = crypto.randomBytes(20).toString('hex');
        // Hash token and set to reset password field
        this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        // set the expire date with in 10 min 
        this.resetTokenExpire =  Date.now() + 10 * 600 * 1000


        return resetToken ; 

}




const User = models.User ||  model("User" , UserSchema);

export default User ; 