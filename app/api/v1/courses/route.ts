import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Protected from "@/utils/Protected";










export async function GET(req:Request){
            try {
                await connectDB()

                let decode = await Protected(req);

                let { id } = decode as { id : string }

                if(!id){
                     return new Response("You are not Authorized" , { status:403})
                }

                const courses = await Course.find();

                return new Response(JSON.stringify(courses)  ,{ status : 200})

            } catch (error) {
                 console.log(error);
                 return new Response("Something went wrong" , { status : 500})
            }
}
