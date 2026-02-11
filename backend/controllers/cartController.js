import userModel from "../models/UserModel.js";

const getItemId = (body) => body?.itemId ?? body?.ItemId;

//add to cart
const addToCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
        }
        const itemId = getItemId(req.body);
        if (!itemId) {
            return res.json({success:false,message:"itemId is required"});
        }

        let cartData=userData.cartData || {};
        if(!cartData[itemId]){
            cartData[itemId]=1;
        }
        else{
            cartData[itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to Cart!"});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
        
    }
}


//remove from cart
const removeFromCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
        }
        const itemId = getItemId(req.body);
        if (!itemId) {
            return res.json({success:false,message:"itemId is required"});
        }

        let cartData=userData.cartData || {};
        if((cartData[itemId] ?? 0) > 0){
            cartData[itemId]-=1; 
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from Cart!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}

//fetch cart items
const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
        }
        let cartData=userData.cartData || {};
        res.json({success:true,cartData});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}

export {addToCart,removeFromCart,getCart}