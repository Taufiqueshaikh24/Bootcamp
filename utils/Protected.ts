import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/Users';


export default async function Protected(req:Request){
      

    const cookieStore = cookies();

    const tokenCookie = cookieStore.get('token')

    const token = tokenCookie?.value;
      
    if(!token){
         return new Response("You are not Authorized to Access this Page" , { status:400});
    }
          let decode ; 
            try {
                 decode = jwt.verify(token , process.env.JWT_SECRET as string );
                 const { id }  = decode as { id : string } ;
                console.log("Decoded" , decode);
            } catch (error) {
                console.log(error);
            
            }



        return decode
}