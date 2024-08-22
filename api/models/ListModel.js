import mongoose from "mongoose";


const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        propertyId: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        priceUponRequest: {
            type: Boolean,
            default: false,
        },
        regularPrice: {
            type: Number,
            required: function () {
                return !this.priceUponRequest;
            },
            default: null,
        },
        discountPrice: {
            type: Number,
            required: function () {
                return this.offer && !this.priceUponRequest;
            },
            default: null,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
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
                    return value >= 1600 && value <= currentYear;
                },
                message: props => `${props.value} is not a valid year!`,
            },
        },
        acre: {
            type: String,
            default: null,
        },
        rentDuration: {
            type: String,
            enum: ['Annual', 'Monthly', 'Weekly', 'Season', 'Other'], // Define valid options
            default: 'Annual', // Default value if needed
        },
        status: {
            type: String,
            default: 'Available',
        }
    },
    { timestamps: true }
);

listingSchema.pre('validate', function (next) {
    if (!this.propertyId) {
      this.propertyId = Math.random().toString(36).substring(2, 7).toUpperCase();
    }
    next();
});


const Listing = mongoose.model('Listing', listingSchema);

export default Listing;


