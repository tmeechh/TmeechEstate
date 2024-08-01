import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
        },
        description: {
            type: String,
            required:true,
        },
        address: {
            type: String,
            required:true,
        },
        priceUponRequest: {
            type: Boolean,
            default: false,
        },
        regularPrice: {
            type: Number,
            required: function() {
              return !this.priceUponRequest;
            },
            default: null,
          },
          discountPrice: {
            type: Number,
            required: function() {
              return this.offer && !this.priceUponRequest;
            },
            default: null,
          },
        bathrooms: {
            type: Number,
            required:true,
        },
        bedrooms: {
            type: Number,
            required:true,
        },
        furnished: {
            type: Boolean,
            required:true,
        },
        parking: {
            type: Boolean,
            required:true,
        },
        type: {
            type: String,
            required:true,
        },
        offer: {
            type: Boolean,
            required:true,
        },
        imageUrls: {
            type: Array,
            required:true,
        },
        userRef: {
            type: String,
            required:true,
        },
        squareFootage: {
            type: Number,
            default: null,
        },
        yearBuilt: {
            type: Number,
            default: null,
            validate: {
                validator: function (value) {
                  if (value === null || value === undefined) return true;
                  const currentYear = new Date().getFullYear();
                  return value >= 1800 && value <= currentYear;
                },
                message: props => `${props.value} is not a valid year!`,
              },
        },
        acre:{
            type: String,
            default: null,
        },
        },
     {timestamps: true}
)


const Listing = mongoose.model('Listing', listingSchema);

export default Listing;


// validate: {
//     validator: function (value) {
//       const currentYear = new Date().getFullYear();
//       return value >= 1800 && value <= currentYear;
//     },
//     message: props => `${props.value} is not a valid year!`
//   } 