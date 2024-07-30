
import User from '@/models/Users';
import crypto from 'node:crypto';







export async function POST(req:Request , { params} : {params: { resetToken : string }}){


             try{

                 const resetPasswordToken = crypto.createHash('sha256').update(params.resetToken).digest('hex');
                 
                 const user = await User.findOne({
                     resetPasswordToken, 
                     resetPasswordExpire : { $gt : Date.now()}
                    })
                    
                    if (!user) {
                        return new Response("Invalid Token", { status  : 400});
                    }
                    
                    const body = await req.json();
                    
                    user.password = body.password 
                    user.resetPasswordToken = undefined ; 
                    user.resetPasswordExpire = undefined;
                    
                    await user.save({ validateBeforeSave: false })

                    return new Response(JSON.stringify(user) , { status : 200})
                    
                }catch(error){
                    console.log(error);
                    return new Response("Something went wrong" , { status : 500})
                }

}