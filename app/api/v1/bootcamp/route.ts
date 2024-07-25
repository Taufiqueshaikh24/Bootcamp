import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Bootcamp from "@/models/Bootcamp";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import User from "@/models/Users";
import Protected from "@/utils/Protected";
import { brotliDecompress } from "zlib";

export async function GET(request:Request){
              try {
                 await connectDB();

                 const bootcamp = await Bootcamp.find();

                 if(!bootcamp){
                    return new Response("Bootcamp not found");
                 }

                return new NextResponse(JSON.stringify(bootcamp) , { status : 200})
              } catch (error) {
                 console.log(error);

                return new NextResponse("Something went wrong" , { status  : 500})
              }
}


export async function POST(request:Request){
           try {
            await connectDB();
            const body = await request.json();


            
            
            let decode  =  await Protected(request)
            let { id } = decode as { id : string} ; 
            // to set the id which user was making the request 
            body.user = id 

            const publishedBootcamp = await Bootcamp.findOne({user : id });

            if(publishedBootcamp &&  publishedBootcamp.role !== 'admin' ){
                  return new Response(`The user with ID ${id} has already published a bootcamp`)
            }
          
             const bootcamp = await Bootcamp.create(body);

            return new NextResponse(JSON.stringify(bootcamp) , { status:200})

           } catch (error) {
                console.log(error);
                return new NextResponse(JSON.stringify(error), { status:500})
           }



}