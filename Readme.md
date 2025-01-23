# ShopFusion - Smart E-Commerce Platform

Shopfusion is a powerful e-commerce platform designed to provide a seamless online shopping experience. With secure payment options, intuitive navigation, and robust state management, ShopFusion is built to scale for modern businesses.


---
# Getting Started
Follow these instructions to set up a local development environment for the project and explore its features.

## Prequisites
Make sure you have the following installed on your machine:
- Node.js (v14+)
- npm or yarn (Package Manager)
- MongoDB (as the database)
- Git (for version control)

### Installations
1. Clone the repository:
```
git clone https://github.com/devgoel2004/e-commerce-website.git
cd e-commerce-website
```
2. Install dependencies:
```
npm install
```
or 
```
yarn install
```
3. Set up environment variables:  Create a **.env file** in the root directory and configure the following:
```
DB_URL = YOUR_MONGODB_URL
PORT= 8000
CLOUDINARY_API_KEY = YOUR_CLOUDINARY_API_KEY
CLOUDINARY_NAME = YOUR_CLOUDINARY_NAME
CLOUDINARY_API_SECRET = YOUR_CLOUDINARY_API_SECRET
CLOUDINARY_URL = YOUR_CLOUDINARY_URL
JWT_SECRET = YOUR_JWT_SECRET
JWT_EXPIRE = YOUR_JWT_EXPIRE_TIME
COOKIE_EXPIRE = YOUR_COOKIE_EXPIRE_TIME
APP_PASSWORD = YOUR_APP_PASSWORD // for sending mail
APP_EMAIL = YOUR_APP_EMAIL
APP_HOST = YOUR_APP_HOST
RAZORPAY_KEY_ID = YOUR_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET = YOUR_RAZORPAY_KEY_SECRET
```
4. Start the development server
```
npm run dev
```
or 
```
yarn dev
```
The app will be running at http://localhost:8000.
# Features
- **Secure Authentication** with JSONWebToken 
-  **Email Notifications** via Nodemailer
- **Multiple Payment Gateways** integrated with Razorpay
- **State Management** using Redux
- **Admin Dashboard** for product and order management
- **Responsive Design** optimized for mobile and desktop