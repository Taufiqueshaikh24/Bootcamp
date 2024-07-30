import connectDB from "@/lib/db";
import User from "@/models/Users";
import { sendMail } from "@/utils/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "url"







export async function POST(req: NextApiRequest,
    res: NextApiResponse){
          try {
            await connectDB();

            const body =  req.body;

            const user = await User.findOne(body.email)

            if(!user){
                return new Response('User not found' , { status : 400});
            }

            const resetToken = user.getResetPasswordToken();
            console.log(resetToken);

            // await user.save({
            //     validateBeforeSave: false 
            // })


            const { protocol, host } = parse(req.url  as string , true);
     const resetUrl = `${protocol}//${host}/api/v1/auth/resetpassword/${resetToken}`;
     
      const message  = `You are receiving this email because (you or someone else) has requested to reset a 
     password . Please make a PUT request to: \n\n ${resetUrl}`;
     const subject = 'Password reset Token from Bootcamps';
        const to = user.email;
     

      try {
        await sendMail(to ,subject,message)
      } catch (error) {
          console.log(error);

      }


     console.log(resetUrl);
           
            return new Response("Email has been Sent" , { status : 200});
          } catch (error) {
              console.log(error);
              return new Response("Something went wrong" ,{ status : 500}) 
          }
}