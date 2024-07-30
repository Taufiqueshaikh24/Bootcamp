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


        const reviews = await Review.findOne({bootcamp : params.bootcampId , user: id})


        if(reviews){
            return new Response('You have already Reviewed on this Bootcamp' , { status : 403});
        }

        // if(bootcamp.user === id){
        //      return new Response('You have Already reviewed');
        // }

        // await Review.createIndexes({ userId: 1, bootcampId: 1 });

        console.log(bootcamp);
  
        // if(bootcamp.user.toString() !== id && bootcamp.user.role !== 'publisher'){
        //      return new Response(` User ${id} has not authorized to add a course to bootcamp ${bootcamp._id}`)
        // }

        //  const BootcampReviewed = await Review.findOne({user:id})

        //  if(BootcampReviewed){
        //         return new Response("You Already reviewed on this Bootcamp");
        //  }
  
        const review = await Review.create({
                     title: body.title , 
                     text : body.text,
                     rating : body.rating,
                     bootcamp : params.bootcampId,
                     user : id 
        });
  
       return new Response(JSON.stringify(review), { status:200})
    } catch (error) {
        if(error === 11000){return new Response("User Already Reviewed for the Bootcamp")};
        return new Response("Something went wrong" , { status  : 500})
    }
  }
  