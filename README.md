# Food Taste - Full Stack Food Delivery App

A complete food delivery platform built with modern web technologies. Users can browse food items, add them to cart, place orders with Stripe payment, and track their deliveries. Admins can manage food items and orders.

## 🚀 Features

### Customer App (Frontend)
- **User Authentication** - Register and login with secure JWT tokens
- **Food Catalog** - Browse foods by category (Salad, Rolls, Desserts, etc.)
- **Search Functionality** - Search foods by name or description
- **Shopping Cart** - Add/remove items, view cart total
- **Order Placement** - Place orders with delivery details
- **Payment Gateway** - Secure Stripe payment integration
- **Order Tracking** - View order status and history
- **Responsive Design** - Mobile-friendly interface

### Admin Panel
- **Food Management** - Add, view, and delete food items
- **Image Upload** - Upload food images with multer
- **Order Management** - View all orders and update status
- **Order Tracking** - Track food processing to delivery

### Backend
- **User Management** - Secure authentication with JWT & bcrypt
- **Cart System** - Manage user cart data in MongoDB
- **Order Processing** - Create, verify, and manage orders
- **Stripe Integration** - Secure payment processing
- **Image Serving** - Static file serving for food images

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- Stripe account
- Git


## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/food-taste.git
cd food-taste
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables:
# - JWT_SECRET: Your JWT secret key
# - STRIPE_SECRET_KEY: Your Stripe secret key
# - MONGO_URI: Your MongoDB connection string

# Start the server
npm run server
```

**Backend runs on:** `http://localhost:4000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

### 4. Admin Setup

```bash
cd Admin

# Install dependencies
npm install

# Start development server
npm run dev
```

**Admin runs on:** `http://localhost:5174`

## 🔑 Environment Variables

### Backend (.env)
```env
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=4000
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

### Admin
- **React 19** - UI library
- **React Router DOM** - Routing
- **Axios** - API calls
- **React Toastify** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Multer** - File upload

## 📡 API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user

### Food Routes
- `GET /api/food/list` - Get all foods
- `POST /api/food/add` - Add new food (Admin)
- `POST /api/food/remove` - Delete food (Admin)

### Cart Routes
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/get` - Get user's cart

### Order Routes
- `POST /api/order/place` - Place new order
- `POST /api/order/verify` - Verify payment
- `POST /api/order/userorders` - Get user's orders
- `GET /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## 🔐 Authentication

The app uses **JWT (JSON Web Tokens)** for authentication:
1. User registers/logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in request headers for protected routes
5. Backend validates token using `authMiddleware`

## 💳 Payment Flow

1. User adds items to cart and proceeds to checkout
2. Enters delivery address
3. Order created in database
4. Redirected to Stripe checkout session
5. Payment processed by Stripe
6. Verify endpoint confirms payment
7. Order marked as paid and processing begins

## 🗂️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object
}
```

### Food Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
}
```

### Order Model
```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String (default: "Food Processing"),
  date: Date,
  payment: Boolean
}
```

## 📱 Features in Detail

### Search
- Real-time food search by name or description
- Works across all categories
- Case-insensitive matching

### Categories
- Salad, Rolls, Desserts, Sandwich, Cake, Pure Veg, Pasta, Noodles

### Order Status
- Food Processing
- Out for delivery
- Delivered

## 🎨 UI/UX Highlights

- Clean and modern interface
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Toast notifications for user actions
- Loading spinner during payment verification

## 📦 Build & Deploy

### Frontend Build
```bash
cd frontend
npm run build    # Creates dist folder
npm run preview  # Preview production build
```

### Admin Build
```bash
cd Admin
npm run build    # Creates dist folder
npm run preview  # Preview production build
```

### Backend Deployment
- Use services like Heroku, Render, or AWS
- Set environment variables
- MongoDB Atlas for cloud database

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 4000
lsof -i :4000
kill -9 <PID>
```

### MongoDB Connection Error
- Verify MONGO_URI in .env
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Stripe Payment Issues
- Verify STRIPE_SECRET_KEY is correct
- Use test keys for development
- Check Stripe dashboard for test transactions

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [Your Name]

## 🙏 Acknowledgments

- [Stripe Documentation](https://stripe.com/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
