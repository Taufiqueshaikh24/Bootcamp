import { NextResponse } from "next/server"
import connectDB from "../../../../lib/db";
import User from "@/models/Users";


export async function GET(){
    try {   
        await connectDB();

        const users = await User.find();
        

        return new  NextResponse(JSON.stringify(users) , { status : 200});
    } catch (error : any) {
         console.log(error)
        return new NextResponse("Something went wrong" , { status : 500});
    }
}







export async function POST(request : Request){
    try {
        await connectDB();


        const body = await request.json();
        

     
         


     
        // // console.log("this is the ",email);
        // console.log(body.email);



        const user = new User(
           {
            name  : body.name , 
            email : body.email , 
            password : body.password , 
            role : body.role 
           }
        );

   
        const email = await User.findOne({email:body.email});
           if(email){
              return new Response("Email Already Exists")
        }

        

        await user.save();
        return new NextResponse(JSON.stringify(user), {status: 200})
    } catch (error: any) {
        console.log(error);
        return new NextResponse("Something went wrong",  { status: 500})
    }
}