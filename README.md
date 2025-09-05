# E-commerce Backend

This project is a backend implementation of an E-commerce platform. It supports user authentication, product management, shopping carts, orders, and admin actions.

## Features

- User registration & login
- Product catalogue with categories
- Shopping cart
- Order management
- Admin actions (manage products, view/update orders)

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- dotenv

## Installation & Setup

Clone the repository, install dependencies and start the server:

    git clone https://github.com/JoyceeHUB/AXIA-ECOMMERCE-PLATFORM-PROJECT.git
    cd AXIA-ECOMMERCE-PLATFORM-PROJECT
    npm install
    npm start

For development with hot reload:

    npm run dev

## Configuration

Create a `.env` file in the root of your project and add:

    PORT=3000
    MONGO_URI=your_mongo_connection_string

Example values (do NOT commit real secrets to GitHub):

    PORT=3000
    MONGO_URI=mongodb://localhost:27017/ecommerceDB

## API Endpoints (available routes)

The server exposes the following endpoints. Prefix them with your base path (for example `/api` if you mounted routes under `/api`).

## API Endpoints (available routes)

### User

- GET /users/ → Get all users
- POST /users/register → Register new user
- POST /users/login → Login user
- PUT /users/update → Update user details
- DELETE /users/delete → Delete user

### Product

- POST /products/createproduct → Add product
- GET /products/product → Get all products
- PUT /products/updateproduct/:id → Update product by id
- DELETE /products/deleteproduct/:id → Delete product by id

### Category

- GET /categories/category → Get all categories
- POST /categories/createcategory → Create category
- PUT /categories/updatecategory/:Id → Update category by id
- DELETE /categories/deletecategory/:Id → Delete category by id

### Cart

- GET /cart/:userId → Get user cart
- POST /cart/createcart → Add product to cart
- PUT /cart/updatecart → Update cart (quantity, etc.)
- DELETE /cart/:userId/items/:productId → Remove specific product from cart
- DELETE /cart/:userId → Clear entire user cart

### Orders

- POST /orders/createorder → Create order from cart
- GET /orders/user/:userId → Get orders for a specific user
- GET /orders/admin/orders → Get all orders (admin only)
- PATCH /orders/admin/:orderId/status → Update order status (admin only)

## Testing

- Use Postman or Thunder Client.
- For all POST/PUT/PATCH requests include header:  
   Content-Type: application/json
- Sequence to test main flow:
  1. Create categories (POST /createcategory).
  2. Create products (POST /createproduct).
  3. Register a user (POST /register) or login (POST /login) to get userId.
  4. Add product(s) to user cart (POST /createcart).
  5. GET the cart to confirm items (GET /:userId).
  6. Create an order from cart (POST /orders/createorder with { "userId": "<userId>" }).
  7. Verify cart is cleared and order appears in orders collection.
  8. As admin, GET all orders (/orders/admin) and update order status (PATCH /orders/admin/:orderId/status).

## Notes & best-practices

- Do not commit `.env` with real credentials. Add `.env` to `.gitignore`.
- Ensure your Mongoose model `ref` names match when populating (e.g., ref: "product" or "Product" depending on how you registered).
- If you get CastError when calling a static route like `/admin`, check route order - place static routes before dynamic `/:param` routes.
- Consider adding simple auth middleware to protect admin routes (optional for project).

## Author

Adaugo Joy Ezimorah  
Email: ezimoradajoy@gmail.com  
GitHub: https://github.com/JoyceeHUB
# AXIA-ECOMMERCE-PLATFORM-PROJECT
