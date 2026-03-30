import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        ref:'User',
    },

    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],

    address:{
        fullName:String,
        phone:String,
        addressLine:String,
        city:String,
        state:String,
        pincode:String
    },

    totalAmount:{
        type:Number,
        required:true
    },

    paymentMethod:{
        type:String,
        default:"COD"
    },

    status:{
        type:String,
        default:"Placed"
    }

},{
    timestamps:true
});

export default mongoose.model('Order', orderSchema);












// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     userId:{
//        type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:'User',
//     },
//     items: [
//         {
//             productId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 required: true,
//                 ref: 'Product',        
//             },
//             quantity:Number,
//             price:Number
//         }
//     ],
//     address:{
//         fullName:String,
//         phone:String,
//         addressLine:String,
//         city:String,
//         state:String,
//         pincode:String
//     },
//     totalAmount:Number,
//     PaymentMethod : {
//         type:String,
//         default: "COD",
//     },
//     status:{
//         type:String,
//         default:'Placed',
//     },
// },
// {
//     timestamps: true
// });

// export default mongoose.model('Order', orderSchema);