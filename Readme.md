# 🛒✨ Shopzy — Modern Full Stack E-Commerce Platform

<p align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=30&duration=3000&pause=800&color=22C55E&center=true&vCenter=true&width=1000&lines=Modern+E-Commerce+Platform;Full+Stack+MERN+Shopping+Experience;Secure+Authentication+%26+Order+Management;Real-Time+Admin+Order+Updates+🚀"/>

</p>

---

<p align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,25:166534,50:22c55e,75:4ade80,100:86efac&height=180&section=header&text=Shopzy&fontSize=45&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>

</p>

---

<p align="center">

<img src="https://img.shields.io/badge/MERN-Stack-success?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Authentication-JWT-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Real--Time-Socket.IO-black?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Image%20Storage-Cloudinary-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge"/>

</p>

---

# ✨ Overview

Shopzy is a modern full-stack e-commerce platform designed to provide users with a smooth and responsive online shopping experience.

The platform allows users to browse products, search and filter collections, add products to their cart, securely manage their accounts, place orders, and track their order history.

The system also includes a dedicated admin panel for managing products, monitoring customer orders, and updating order statuses.

Shopzy is built using the **MERN Stack** and focuses on building a scalable, real-world e-commerce architecture while integrating modern features such as real-time updates and future AI-powered capabilities.

---

# 🚀 Core Features

# 👤 User Features

✅ Secure User Registration & Login

✅ JWT Authentication

✅ Browse Product Collections

✅ Product Search

✅ Product Filtering

✅ Product Sorting

✅ Add Products to Cart

✅ Update Product Quantity

✅ Remove Products from Cart

✅ Cart Total Calculation

✅ Cash on Delivery Checkout

✅ Order Placement

✅ Order History

✅ Order Status Tracking

✅ User Profile Management

✅ Edit Profile Information

✅ Responsive User Interface

---

# 🛍️ Product Features

✅ Product Collection Page

✅ Category-Based Products

✅ Search Products

✅ Filter Products

✅ Sort Products

✅ Latest Product Collection

✅ Best Seller Products

✅ Product Detail Pages

✅ Product Images via Cloudinary

---

# 🛠️ Admin Features

✅ Secure Admin Authentication

✅ Product Management

✅ Add New Products

✅ View Product List

✅ Delete Products

✅ Order Management

✅ View Customer Orders

✅ Update Order Status

✅ Monitor Order Information

---

# ⚡ Real-Time Features

Shopzy currently uses **Socket.IO** to provide real-time communication between the backend and the admin panel.

### Real-Time New Orders

When a customer successfully places an order:

```text
Customer Places Order
        ↓
Order Saved in MongoDB
        ↓
Backend Emits Socket.IO Event
        ↓
Admin Panel Receives Event
        ↓
Orders List Automatically Updates

⚡ System Workflow

flowchart TD

A[👤 User Visits Shopzy]

--> B[🔐 Login / Register]

B --> C[🛍️ Browse Products]

C --> D[🔎 Search / Filter Products]

D --> E[📦 View Product]

E --> F[🛒 Add To Cart]

F --> G[📋 Checkout]

G --> H[💰 Cash On Delivery]

H --> I[📦 Order Created]

I --> J[(MongoDB)]

J --> K[⚡ Socket.IO Event]

K --> L[🛠️ Admin Receives New Order]

L --> M[🚚 Admin Updates Order Status]

M --> N[📦 Customer Tracks Order]

🏗️ System Architecture
flowchart LR

User --> Frontend

Frontend --> Backend

Backend --> MongoDB

Backend --> Cloudinary

Backend --> SocketIO

SocketIO --> Admin

Admin --> Backend

Backend --> MongoDB