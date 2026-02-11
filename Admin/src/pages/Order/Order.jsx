import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({url}) => {

  const [orders,setOrders]=useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(Array.isArray(response.data.data) ? response.data.data : []);
      } else {
        toast.error("Error Fetching Orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Fetching Orders");
    }
  };

  const statusHandler=async(event,orderId)=>{
      const response=await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
      })
      if(response.data.success){
        await fetchAllOrders();
        toast.success("Status Updated..")
      }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);


  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-item" key={order?._id || index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {(order?.items || []).map((item, itemIndex) => {
                    const text = `${item?.name || "Item"} x ${item?.quantity || 0}`;
                    return itemIndex === (order?.items?.length || 0) - 1 ? text : text + ", ";
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.street+","+order.address.state+", "+order.address.country+", "+order.address.pincode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
