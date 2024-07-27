import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Protected from "@/utils/Protected";





export async function GET(req:Request , { params} : { params: { reviewId : string }}){
               try {
                await connectDB();

                let decode = await Protected(req);

                let { id } = decode as { id : string };

                if(!id){
                     return new Response('You are not Authorized' , { status : 403})
                }

                const review = await Review.findById(params.reviewId);

                if(!review){
                    return new Response(`Review With ID ${params.reviewId} is not found`);
                }

                return new Response(JSON.stringify(review)  , {  status : 200})
               } catch (error) {
                  console.log(error);
                  return  new Response('Something went wrong' , {  status : 500});
               }
}



export async function PUT(req:Request , {params}: { params  : { reviewId : string }}){
                  try {
                    await connectDB();

                    
                let decode = await Protected(req);

                let { id } = decode as { id : string };

                if(!id){
                     return new Response('You are not Authorized' , { status : 403})
                }


                const body  = await req.json();

                const updatedReview = await Review.findByIdAndUpdate(params.reviewId , {
                            title : body.title , 
                            text: body.text , 
                            rating : body.rating
                },{new:true})

                if(!updatedReview){
                     return new Response("Something went wrong Review is not Updated" , { status : 501})
                }
                    return new Response(JSON.stringify(updatedReview), { status : 200})
                  } catch (error) {
                     console.log(error);
                     return  new Response('Something went wrong' , { status : 500});
                  }
}









export async function DELETE(req:Request , {params}: { params  : { reviewId : string }}){
    try {
      await connectDB();

      
  let decode = await Protected(req);

  let { id } = decode as { id : string };

  if(!id){
       return new Response('You are not Authorized' , { status : 403})
  }


    const review  = await Review.findByIdAndDelete(params.reviewId);


  
  if(!review){
       return new Response("Something went wrong Review is not deleted" , { status : 501});
  }
      return new Response(JSON.stringify({status : 'success' , message: 'Review has been deleted'}), { status : 200})
    } catch (error) {
       console.log(error);
       return  new Response('Something went wrong' , { status : 500});
    }
}