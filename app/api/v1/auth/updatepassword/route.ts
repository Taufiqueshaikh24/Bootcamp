import connectDB from "@/lib/db";
import User from "@/models/Users";
import Protected from "@/utils/Protected";





export async function POST(req:Request){
           try {
               await connectDB();


               let decode = await Protected(req);

                let {  id } = decode as { id : string};

                if(!id){
                     return new Response("You are not Authorized" , { status : 403})
                }

                const body = await req.json();

                const user = await User.findById(id).select("+password");

                // if(!(await user.matchPassword(body.currentPassword))){
                //     return new Response('Previous password is Invalid');
                // }

                const isMatched = await user.matchPassword(body.currentPassword);

                if(!isMatched){
                    return new Response("Previous password is Invalid")
                }


            //     const updatedUser = await User.findByIdAndUpdate(id , {

            //               password : body.newPassword,
                    
            // } ,{ new: true })

            user.password = body.newPassword; 
            await user.save();

                return new Response(JSON.stringify(user) , { status : 200});
           } catch (error) {
               console.log(error);
               return new Response("Something went wrong" , { status :500});
           }
}