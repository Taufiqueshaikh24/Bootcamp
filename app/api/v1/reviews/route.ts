import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Protected from "@/utils/Protected";






export async function GET(req: Request , {params}:{params: { bootcampId:string}}){
                      try {
                        await connectDB();

                        let decode = await Protected(req);

                        let { id } = decode as { id : string };

                        if(!id){
                            return new Response('You are not Authorized' , { status : 403})
                        }

                        const review = await Review.find();


                        if(!review){
                             return new Response('Review not found')
                        }

                        return new Response(JSON.stringify(review)  , { status : 200})

                      } catch (error) {
                          console.log(error);
                          return new Response("Something went wrong", { status : 500})
                      }
}


