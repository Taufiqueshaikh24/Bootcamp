import connectDB from "@/lib/db";
import BootcampSchema from "@/models/Bootcamp";
import Review from "@/models/Review";
import Protected from "@/utils/Protected";





export async function POST(req:Request ,  { params}:{params:{ bootcampId:string  }}){
    try {
       await connectDB();
  
       let decode  =  await Protected(req)
        
         let { id } = decode as { id : string} ; 
         
         if(!id){
            return new Response("You are not Authorized");
        }
   
        const body = await req.json();
  
        body.bootcamp = params.bootcampId ;
  
        body.user = id ; 
  
        const bootcamp = await BootcampSchema.findById(params.bootcampId);
  
  
        if(!bootcamp){
            return new Response("Bootcamp Not found")
        }
  
        if(bootcamp.user.toString() !== id && bootcamp.user.role !== 'publisher'){
             return new Response(` User ${id} has not authorized to add a course to bootcamp ${bootcamp._id}`)
        }
  
        const review = await Review.create({
                     title: body.title , 
                     text : body.text,
                     rating : body.rating,
                     bootcamp : params.bootcampId,
                     user : id 
        });
  
       return new Response(JSON.stringify(review), { status:200})
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong" , { status  : 500})
    }
  }
  