import { useEffect, useState } from "react";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const userId = localStorage.getItem('userId');
    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        };
        api.get(`/cart/${userId}`)
            .then((res) => setCart(res.data));

        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data);
            setSelectAddress(res.data[0]);//Default Address
        });
    }, [])

    if (!cart) {
        return <div>Loading...</div>;
    };

    const total = cart.items.reduce(
        (sum, i) => sum + i.quantity * i.productId.price, 0
    );

    const placeOrder = async () => {
    try {
        if (!selectAddress) {
            alert("Please select an address");
            return;
        }

        const res = await api.post('/order/place', {
            userId,
            items: cart.items,
            totalAmount: total,
            address: selectAddress
        });

        console.log(res.data);
        alert("Order placed successfully");
        navigate(`/order-success/${res.data.orderId}`);

    } catch (error) {
        console.log(error.response?.data);
    }
};
    



    // const placeOrder = async () => {
    //     if(!selectAddress){
    //         alert('Pleased select an Address');
    //         return;
    //     };
    //     const res = await api.post('/order/place', {
    //         userId, 
    //         address : selectAddress
    //     });
    // }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Checkout
            </h1>
            <h2 className="font-semibold mb-2">
                Select Address
            </h2>
            {
                address.map((add) => (
                    // <div 
                    // key={add._id}
                    // className="border border-gray-300 rounded p-4 mb-4"
                    // >
                    //     <p>{add.fullName}</p>
                    //     <p>{add.phone}</p>
                    //     <p>{add.addressLine}, {add.city}, {add.state} - {add.pincode}</p>
                    // </div>
                    <label
                        key={add._id}
                        className="block border p-3 rounded cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="address"
                            checked={selectAddress?._id === add._id}
                            onChange={() => setSelectAddress(add)}
                            className="mr-2"
                        />
                        <strong>
                            {add.fullName}
                        </strong>
                        <p className="text-sm">
                            {add.addressLine},
                            {add.city}, -
                            {add.pincode}
                        </p>
                        <p className="text-sm">
                            {add.phone}
                        </p>
                    </label>
                ))
            }
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <p>Total Amount : ₹{total}</p>

            <button
                className="mt-4 w-full bg-green-500 text-white p-2 rounded"
                onClick={placeOrder}
            >
                Place Order (COD)
            </button>
        </div>
    );

};