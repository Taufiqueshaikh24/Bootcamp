import { Schema , model , models} from "mongoose";


const courseSchema = new Schema({
        title : {
               type:String , 
               trim : true , 
               required: [true , "Title is Required"]
        },
        description : {
            type:String , 
            required: [true , "Description is Required"]
        },
        weeks : {
            type:String , 
            required: [true , "Weeks is Required"]
        },
        tuition : {
              type:Number, 
              required : [true , "Please Add a tuition cost"]
        },
        minimumSkill : {
              type : String  , 
              required: [true , 'Please Add a Minimum Skill'],
              enum: ['beginner' , 'intermediate' , 'advance']
        }, 
        scholarShipAvailable : {
                type:Boolean,
                default:false
        },
        bootcamp: {
            type: Schema.ObjectId,
            ref : 'Bootcamp',
            required:true,
        },
        user: {
            type: Schema.ObjectId,
            ref:'User',
            required: true
        }
        
},{ timestamps:true});




courseSchema.statics.getAverageCost = async  function(bootcampId){
    const obj = await this.aggregate([
          {
            $match:{bootcamp:bootcampId}
          },
          {
              $group: {
                    _id:'$bootcamp',
                    averageCost : { $avg : '$tuition'}

              }
          }
    ])
    console.log(obj);
    try{
        await model('Bootcamp').findByIdAndUpdate(bootcampId , {
             averageCost : Math.ceil(obj[0].averageCost / 10 ) * 10 
        });
    }catch(err){
            console.error(err);
    }
}



const Course = models.Course ||  model("Course" , courseSchema);
export default Course;



