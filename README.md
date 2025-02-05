# 🏥 CareMeds - Multi-Vendor Medicine Selling E-commerce Website  

## 🌐 Live URL  [**Visit the Live Website**](https://assignment-12-6a5e8.web.app) 

### Admin Credentials:

- **Username:** mahi1@gmail.com
- **Password:** 12345aA

---

## 🛠️ Purpose  
CareMeds is a multi-vendor e-commerce platform specializing in the sale of medicines and healthcare products. The platform provides a seamless user experience for purchasing medications, submitting queries, and receiving expert advice. This project demonstrates:  
- **User & Seller Management**  
- **Product Listing & Ordering System**  
- **Secure Payment Processing**  
- **Dynamic Data Rendering**  
- **Role-Based Authentication & Authorization**  

---  

## 🚀 Features  

### 1️⃣ **Homepage**  
- Interactive **navbar** with logo, links to Home, Shop, Cart, language selection, and user authentication options.  
- **Product Slider** featuring advertised medicines (managed by admin).  
- **Category Cards** displaying medicine categories, each leading to a categorized product listing.  
- **Discounted Products Section** using a draggable Swiper.js slider.  
- Additional sections related to healthcare services and customer support.  

### 2️⃣ **User Authentication**  
- Users can **sign up/login** using email and password.  
- **Google & GitHub login** with default role as "user."  
- Role selection during signup (**User or Seller**).  

### 3️⃣ **Shop Page**  
- Displays all medicines in a **tabular format** with sorting and filtering.  
- **View Details** button opens a modal with medicine information.  
- **Select Medicine** button adds items to the cart.  

### 4️⃣ **Category Details Page**  
- Lists medicines of a specific category (tablet, syrup, capsule, injection, etc.).  
- Each row contains a **view** and **select** button.  

### 5️⃣ **Cart Management**  
- Displays all selected medicines with details.  
- Users can **increase/decrease quantity**, **remove items**, or **clear the cart**.  
- Checkout button redirects to **payment processing**.  

### 6️⃣ **Secure Payment & Invoicing**  
- Stripe integration for secure transactions.  
- After payment, users are redirected to an **invoice page** with order details and a print/download option.  

### 7️⃣ **Admin Dashboard**  
- **User Management**: Promote/demote users (User, Seller, Admin).  
- **Category Management**: Add, update, or delete medicine categories.  
- **Payment Management**: Approve pending payments.   

### 8️⃣ **Seller Dashboard**  
- **Manage Medicines**: Add, update, and delete medicines.  
- **Payment History**: View all purchase transactions.  

### 9️⃣ **User Dashboard**  
- **Payment History**: View all past transactions with status (Paid/Pending).  

---  

## 🛠️ Technologies Used  

### **Frontend**  
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)  

### **Backend**  
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)  
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)  

### **Database**  
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)  

### **Authentication & Hosting**  
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)  
- ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white)  

### **Version Control & Deployment**  
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)  
- ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)  
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)  

---  

## 📦 npm Packages Used  

- **[axios](https://www.npmjs.com/package/axios)**: For efficient HTTP requests.  
- **[react-query](https://www.npmjs.com/package/react-query)**: Managing API state.  
- **[sweetalert2](https://www.npmjs.com/package/sweetalert2)**: Custom alert messages.  
- **[react-icons](https://www.npmjs.com/package/react-icons)**: Icon library.  
- **[react-hook-form](https://www.npmjs.com/package/react-hook-form)**: Form validation and handling.  
- **[stripe](https://www.npmjs.com/package/stripe)**: Payment integration.  
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Secure environment variable management.  

---  

## 💻 How to Run the Project  

Follow these steps to clone and run the project locally:  

### 1️⃣ Clone the Repository  
```bash  
git clone https://github.com/yourusername/CareMeds.git  
```  

### 2️⃣ Navigate to the Project Directory  
```bash  
cd CareMeds  
```  

### 3️⃣ Install Dependencies  
Make sure you have Node.js installed. Then run:  
```bash  
npm install  
```  

### 4️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and configure the necessary keys.  

### 5️⃣ Start the Development Server  
```bash  
npm start  
``` 

