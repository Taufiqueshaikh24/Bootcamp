import connectDB from "@/lib/db";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";




export async function GET(request : Request , { params}:{params:{ id:string  }}){
       try {
           await connectDB();

           const userId = params?.id;

           if(!userId){
               return new Response("User ID is not Valid");
           }

           const user = await User.findById(userId);


           if(!user){
                return new Response("User not Found");
           }

           return new NextResponse(JSON.stringify(user) , {status:200})




       } catch (error) {
           console.log(error)
           return new NextResponse("Something went wrong", { status:500})
       }
}



export async function PUT( request : Request , { params}:{params:{ id:string  }}){

       try {
           await connectDB();

           const body = await request.json();

           const userId  = params.id;

          if(!userId){
             return new Response('User ID not found');
          }

        //   if(body.password || body.role){
        //        return new Response("Password or Role can't be Updated");
        //   }

          const updatedUser = await User.findByIdAndUpdate(userId , {
                  name : body.name , 
                  email : body.email , 
          } ,{ new: true })

          if(!updatedUser){
             return new Response('User Not updated ')
          }


          return new NextResponse(JSON.stringify(updatedUser) , { status:200})

       } catch (error) {
          console.log(error);
           return new NextResponse("Something went wrong" ,{ status : 500})
       }

};


export async function DELETE( request : Request ,  {params}: { params: { id : string }}){
        try {
            await connectDB();

            const userId = params.id ; 

            if(!userId){
                 return new Response("User ID not found ");
            };

            const delUser  = await User.findByIdAndDelete(userId); 

            if(!delUser){
                 return new Response("User is not deleted Something went wrong" ,{ status : 500})
            }

          return new NextResponse(JSON.stringify(delUser) , { status : 200})


        } catch (error) {
              console.log(error);
              return new NextResponse("Soemthing went wrong" , { status : 503});
        }
};