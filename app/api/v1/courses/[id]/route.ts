import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Protected from "@/utils/Protected";



export async function GET(req:Request , { params}:{ params:{ id : string}}){
             try {
                await connectDB();

                let decode  = await Protected(req);

                let { id } = decode as { id : string };

                if(!id){
                     return new Response("You are not Authrized", { status : 403})
                }

                const course = await Course.findById(params.id);

                if(!course){
                      return new Response(`Course not found`);
                }

                return new Response(JSON.stringify(course) ,{ status  : 200});

                

             } catch (error) {
                console.log(error);
                return new Response("Something went wrong" ,{ status : 500});
             }
}



export async function PUT(req : Request , { params }: { params : { id : string }}){
                try {
                    await connectDB();


                    const body = await req.json();

                    let decode  = await Protected(req);

                    let { id } = decode as { id : string };
    
                    if(!id){
                         return new Response("You are not Authrized", { status : 403})
                    }
    
                    const updatedCourse = await Course.findByIdAndUpdate(params.id , {
                        "title": body.title , 
                        description : body.description, 
                        "weeks": body.week,
                        "tuition": body.tuition, 
                        "minimumSkill": body.minimumSkill, 
                        "scholarhipsAvailable": body.scholarhipsAvailable
                    }, { new: true });
           
                   if(!updatedCourse){
                       return new Response("Course not Updated Something went wrong" ,{ status : 400})
                   }

                   return new Response(JSON.stringify(updatedCourse) , { status : 200});

                } catch (error) {
                    console.log(error);
                    return new Response("Something went wrong" , { status : 500})
                }
}


export async function DELETE(req: Request , {params}: {params : { id : string }}){
             try {
                await connectDB();

                let decode = await Protected(req);

                let { id } = decode as { id : string };

                if(!id){
                     return new Response("You are not Authorized" ,{ status  : 403})
                }

                const course = await Course.findByIdAndDelete(params.id);

                return new Response(JSON.stringify(course) , { status : 200})
             } catch (error) {
                console.log(error);
                 return new Response("Something went wrong", { status : 500})
             }
}