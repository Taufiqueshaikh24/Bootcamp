import { Schema , model , models , Document} from 'mongoose';
import slugify from 'slugify';
import geocoder from '@/utils/Geocoder';



interface BootcampDocument extends Document {
    address: string;
    location: {
      type: string;
      coordinates: [number, number];
      formattedAddress: string;
      street: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    };
  }

const bootcampSchema  = new Schema({
        name :{
             type:String, 
            //  required:[true, 'Please add a name'],
             unique : true , 
             trime : true  , 
             maxlength : [50 , 'Name cannot be more than 50 characters']

        },
        slug : String , 
        description : {
              type  :String , 
            //   required : [true , 'Plase add a description'],
              maxlength : [500 , 'Name cannot be more than 500 characters']
        },
        website: {
            type: String,
            match: [
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
              'Please use a valid URL with HTTP or HTTPS'
            ]
          },
          phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters']
          },
          email: {
            type: String,
            match: [
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              'Please add a valid email'
            ]
          },
          address: {
            type: String,
            // required: [true, 'Please add an address']
          },
          location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
              type: [Number],
              index: '2dsphere'
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String
          },
          careers: {
            // Array of strings
            type: [String],
            required: true,
            enum: [
              'Web Development',
              'Mobile Development',
              'UI/UX',
              'Data Science',
              'Business',
              'Other'
            ]
          }, 
          averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [10, 'Rating must can not be more than 10']
          },
          averageCost: Number,
          photo: {
            type: String,
            default: 'no-photo.jpg'
          },
          housing: {
            type: Boolean,
            default: false
          },
          jobAssistance: {
            type: Boolean,
            default: false
          },
          jobGuarantee: {
            type: Boolean,
            default: false
          },
          acceptGi: {
            type: Boolean,
            default: false
          },
          user:{
            type: Schema.Types.ObjectId,
            // here i was getting error because i was writing with lower casr 'user' after 'User' error solved
            ref : 'User',
            required : true
      
        }
}, {
    toJSON : { virtuals : true },
    toObject : { virtuals  : true }
})



bootcampSchema.pre('save' , async function(next){
    if(!this.name){ return }
      this.slug = slugify(this.name , {lower:true})
      next();
})



// Geocode & create location field
// bootcampSchema.pre('save', async function(next) {
//     const loc = await geocoder.geocode(this.address);
//     this.location = {
//       type: 'Point',
//       coordinates:
     
//     };
//     next();
//   });


bootcampSchema.pre<BootcampDocument>('save', async function (next) {
    if (!this.isModified('address')) { // Only geocode if address has changed
      return next();
    }
  
    try {
      const loc = await geocoder.geocode(this.address);
      if (!loc || !loc.length) {
        throw new Error('Address not found');
      }
  
      const { longitude, latitude, formattedAddress, streetName, city, stateCode, zipcode, countryCode  } = loc[0] as { longitude: number; latitude: number , formattedAddress:string , streetName :string , zipcode:string  , city:string , stateCode:string , countryCode:string  }; ; 
  
      this.location = {
        type: 'Point',
        coordinates: [longitude, latitude],
        formattedAddress,
        street:streetName,
        city,
        state:stateCode,
        zipcode,
        country:countryCode,
      };
  
    //   Optionally, remove address field from being saved
    //   delete this?.address 
    } catch (error) {
      console.error('Geocoding error:', error);
      // Handle geocoding errors appropriately, e.g., return an error or set a flag
    }
  
    next();
  });
  




const BootcampSchema = models.Bootcamp ||  model("Bootcamp" , bootcampSchema);

export default BootcampSchema ; 