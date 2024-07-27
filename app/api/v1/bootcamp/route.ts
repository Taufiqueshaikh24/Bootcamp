import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Bootcamp from "@/models/Bootcamp";
import Protected from "@/utils/Protected";
import BootcampSchema from "@/models/Bootcamp";

export async function GET(req:Request){
   try {
      await connectDB();

      let decode = await Protected(req);

      const { id } = decode as { id : string };

      if(!id){
          return new Response("You are not Authorizded" , { status : 403});
      }

      const bootcamp = await BootcampSchema.find();
   
      return new Response(JSON.stringify(bootcamp), { status  : 200});

   } catch (error) {
        console.log(error);
        return new Response("Something went wrong" , { status  : 500});
   }
}



export async function POST(request:Request){
           try {
            await connectDB();
            const body = await request.json();


            
            
            let decode  =  await Protected(request)
           
            let { id } = decode as { id : string} ; 
            
            if(!id){
               return new Response("You are not Authorized");
           }
           
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