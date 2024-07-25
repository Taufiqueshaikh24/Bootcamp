import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default function ResponseToken(user:any){
    const token = user.signedJwtToken();

   
    const date : Date =  new Date(Date.now() +  30 * 24 * 60 * 60 * 1000 );
    const options = {
       expires : date  , 
       httpOnly : true , 
    }

    let cookie = cookies().set("token"  , token , options);
  

    //  return new NextResponse(JSON.stringify({token : token}), { status : 200})
     return token;
};