import connectDB from "@/lib/db";
import User from "@/models/Users";
import ResponseToken from "@/utils/ResponseToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export async  function POST(request:Request , { params}: {params : { id : string}}){
       try {
            await connectDB();

            const body = await request.json();

            const { email , password} = body ; 


            if(!email || !password){
                  return new Response("Email and Password are Required" , { status  : 403});

            }

            const user = await User.findOne({email:email}).select("+password");

            if(!user){
                  return new Response("User not found" , { status : 404})
            }
           
            const isMatched = await user.matchPassword(password);

            if(!isMatched){
                 return new Response("Invalid  Credentials"  , { status: 403})
            }
            

      //       const token = await user.signedJwtToken();

      //       const date : Date =  new Date(Date.now() +  30 * 24 * 60 * 60 * 1000 );
      //       const options = {
      //          expires : date  , 
      //          httpOnly : true , 
      //       }


      //     let cookie  =   cookies().set("token", token , options )
      //       console.log(cookie);
      

      //       return new NextResponse(JSON.stringify({token:token}), { status : 200})
              let token   = ResponseToken(user)
               console.log(token)
              return new NextResponse(JSON.stringify({token:token}), { status : 200});

       } catch (error) {
           console.log(error);
            return new Response("Something went wrong" , { status : 500} )
       }

}