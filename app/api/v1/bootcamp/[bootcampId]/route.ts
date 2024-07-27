import connectDB from "@/lib/db";
import BootcampSchema from "@/models/Bootcamp";
import Protected from "@/utils/Protected";

export async function GET(req:Request , {params}: {params:{ bootcampId: string}}){
      try {
        await connectDB();

        let decode = await Protected(req);

        const { id } = decode as { id : string};

        if(!id){
             return new Response("You are not Authorized" , { status:403})
        }

        const bootcamp  = await BootcampSchema.findById(params.bootcampId);

        return new Response(JSON.stringify(bootcamp), { status : 200})

      } catch (error) {
          console.log(error);
          return new Response('Something went wrong' , { status : 500} )
      }
}


export async function PUT(req:Request , {params}:{params:{bootcampId:string }}){
             try {
                await connectDB();

                let decode = await Protected(req);

                const { id } = decode as { id : string};
        
                if(!id){
                     return new Response("You are not Authorized" , { status:403})
                }
        
                const body = await req.json();

                const updateBootcamp = await BootcampSchema.findByIdAndUpdate(params.bootcampId , {
                         name:body.name , 
                         description : body.description, 
                         website:body.website , 
                         phone : body.phone, 
                         email : body.email , 
                         address: body.address,
                         photo : body.photo,
                         housing: body.housing,
                         jobAssistance: body.jobAssistance,
                         jobGuarantee: body.jobGuarantee,
                }, { new:true })

            if(!updateBootcamp){
                return new Response("Bootcamp Not Updated" , { status:403})
            }


              return new Response(JSON.stringify(updateBootcamp), { status: 200})

             } catch (error) {
                console.log(error);
                return new Response("Something went wrong", { status : 500})
             }
}




export async function DELETE(req:Request , {params}: {params:{ bootcampId: string}}){
    try {
      await connectDB();

      let decode = await Protected(req);

      const { id } = decode as { id : string};

      if(!id){
           return new Response("You are not Authorized" , { status:403})
      }

      const bootcamp  = await BootcampSchema.findById(params.bootcampId);

      return new Response(JSON.stringify(bootcamp), { status : 200})

    } catch (error) {
        console.log(error);
        return new Response('Something went wrong' , { status : 500} )
    }
}


