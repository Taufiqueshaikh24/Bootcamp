import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Bootcamp from "@/models/Bootcamp";
import { cookies } from "next/headers";

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

            // const cook = request.cookies
            // console.log(cookies);

            const body = await request.json();
             const bootcamp = await Bootcamp.create(body);

            return new NextResponse(JSON.stringify(bootcamp) , { status:200})

           } catch (error) {
                console.log(error);
                return new NextResponse('Something went wrong' , { status:500})
           }
}