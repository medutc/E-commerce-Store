# UrStore

Welcome to UrStore, a full-stack e-commerce platform. This web application provides a seamless shopping experience for customers and a comprehensive management dashboard for administrators to handle products, orders, and user data.

## 🚀 Features

*   **User Management:** Secure registration and login using JWT and bcrypt.
*   **Product Catalog:** Browse, search, and view detailed product information.
*   **Shopping Cart & Orders:** Add items to the cart and process orders seamlessly.
*   **Review System:** Customers can leave reviews on products.
*   **Admin Dashboard:** A dedicated interface (`admin.html`) to manage inventory, track orders, and oversee user accounts.

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Mongoose ORM)
*   **Authentication:** JSON Web Tokens (JWT)
*   **File Uploads:** Multer (for product images)

## 📁 Project Structure

*   `controllers/` - Contains the business logic for orders, products, reviews, and users.
*   `models/` - Mongoose database schemas (`Order.js`, `Product.js`, `Review.js`, `User.js`).
*   `middleware/` - Custom middleware for authentication (`authMiddleware.js`) and file handling (`upload.js`).
*   `images/` - Static assets and uploaded product images.
*   `admin.html` / `admin.js` / `admin.css` - Frontend files for the administrative dashboard.
*   `makeAdmin.js` - Utility script to elevate a user's privileges to admin.

## 💻 Getting Started

Follow these instructions to set up the project and run it on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) installed on your machine.
*   [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection URI.

### Installation & Setup

1.  Open your terminal inside the UrStore root directory
2. Install the backend dependencies:
Bash
   npm install
3. Configure Environment Variables:
Create a .env file in the root of your project and add the following keys. Replace the placeholder values with your actual configuration:

Extrait de code
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
4. Run the Database Migrations / Setup (Optional):
If you need to quickly set up an administrator account to access the dashboard, run the included utility script:

Bash
   node makeAdmin.js
5. Start the Server:
You can start the server normally or use nodemon for auto-reloading during development:

Bash
   # Standard start
   node index.js
   node server.js
6. Access the Application:

Main Storefront: Open your browser and go to http://localhost:3000 (or the port you defined).

Admin Dashboard: Navigate to http://localhost:3000/admin.html to manage the store.


✍️ Author
Moataz Mohamed 