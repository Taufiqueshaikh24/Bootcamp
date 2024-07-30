import connectDB from "@/lib/db";
import BootcampSchema from "@/models/Bootcamp";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import path from "path";


// interface MyRequest extends NextApiRequest {
//     files?: any; // Adjust the type as needed
//   }


export async function POST(req:NextApiRequest, { params}:{params : { bootcampId: string }}){
                              try {
                                await connectDB();

                                const cookieStore = cookies();

                                const tokenCookie = cookieStore.get('token')
                            
                                const token = tokenCookie?.value;
                                  
                                if(!token){
                                    return new Response("You are not Authorized to Access this Page" , { status:400});
                               }
                               
                           
                
                                     let decode = jwt.verify(token , process.env.JWT_SECRET as string );
                                             
                                             const { id }  = await decode as { id : string } ;

                                if(!id){
                                     return new Response("You are not Authorized", { status : 400})
                                }

                                let bootcamp  = await BootcampSchema.findById(params.bootcampId);

                                if(!bootcamp){
                                    return new Response(`Bootcamp not found`)
                                }

                                if (req.method !== 'POST') {
                                    return   new Response('Method Not Allowed', { status: 405 });
                                  }

                                  const body = await req.formData();
                                     const file = body.get('image') as File;
                                // let file = req.files.file;


                                // if(!file.mimetype.startWith('image')){
                                //      return new Response("Please Upload an Image" , { status : 403})
                                // }

                                // if(file.size > 1000000){
                                //     return new Response("Photo can't be more than 1MB" , { status  : 403})
                                // }


                                // file.name  = `photo${bootcamp._id}${path.parse(file.name).ext}`


                                // file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}` , async function(err: any){
                                //          if(err){
                                //             return new Response("Problem with file upload" ,{ status : 403})
                                //          }
                                // })

                                // await BootcampSchema.findByIdAndUpdate(params.bootcampId , {
                                //         photo: file.name
                                // })

                                // console.log("this is the req.files",req.files);

                                return new Response(JSON.stringify(req?.files) , { status : 200})
                              }catch (error) {
                                console.log(error);
                                return new Response('Something went wrong' , { status : 500})
                              }
}