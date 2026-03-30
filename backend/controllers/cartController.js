import Cart from '../models/Cart.js';

// Add to Cart

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });
        let item;

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        } else {
            item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
        }

        await cart.save();

        res.json({
            message: "Item Added to Cart",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// export const addToCart = async (req, res) => {
//     try {
//         const {userId, productId} = req.body;

//         let cart = await Cart.findOne({userId});

//         if(!cart){
//             cart = new Cart({userId, items: [
//                 {productId, quantity: 1}
//             ]});
//         }else {
//             const item = cart.items.find(
//                 i => i.productId.toString() === productId
//             );

//             if(item) {
//                 item.quantity += 1;
//             }else{
//                cart.items.push({productId, quantity: 1});
//             };
//         }


//         await cart.save();
//             res.json({
//                 message: 'Item Added to Cart', 
//                 cart
//             });

//     } catch (error) {
//      res.status(500).json({messsage:'Server Error ', error});   
//     };
// };

// Remove Items from Cart

export const removeItem = async (req, res) => {
    try {
        const {userId, productId} = req.body;

        const cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        };

        cart.items = cart.items.filter(
            i => i.productId.toString() !== productId
        );

        await cart.save();
            res.json({
                message: 'Item Removed from Cart', 
                cart
            });

    } catch (error) {
        res.status(500).json({messsage:'Server Error ', error});  
    };
};

// Update Items quantity in cart


export const updateQuantity = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;

        const cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if(!item){
            return res.status(404).json({message:"Item Not found in Cart"});
        }

        item.quantity = quantity;

        await cart.save();

        res.json({
            message: 'Item Quantity Updated',
            cart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// export const updateQuantity = async (req, res) => {
//     try {
//         const {userId, productId, quantity} = req.body;

//         const cart = await Cart.findOne({userId});

//         if(!cart){
//             return res.status(404).json({message:"Cart not found"});
//         };

//         const item = cart.items.find(
//             i => i.productId.toString() === productId
//         );

//         if(!cart){
//             return res.status(404).json({message:"Item Not found in Cart"});
//         };

//         item.quantity = quantity;

//         await cart.save();
//             res.json({
//                 message: 'Item Quantity Updated', 
//                 cart
//             });

//     } catch (error) {
//         res.status(500).json({messsage:'Server Error ', error});  
//     };
// };

// Get Cart by User Id

export const getCart = async (req, res) => {
    try {
        const {userId} = req.params;

        const cart = await Cart.findOne({userId}).populate('items.productId');

        res.json(cart);
        
    } catch (error) {
        res.status(500).json({messsage:'Server Error ', error}); 
    };
};