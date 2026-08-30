# 🚑 Shopzy — AI Powered Smart Delivery Platform

<p align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=30&duration=3000&pause=800&color=00E5FF&center=true&vCenter=true&width=1000&lines=Instant+Delivery+Platform;AI+Powered+Logistics+System;Real-Time+Tracking+Platform+🚀"/>

</p>

---

<p align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,25:2563eb,50:06b6d4,75:14b8a6,100:22c55e&height=180&section=header&text=Shopzy&fontSize=45&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>

</p>

---

<p align="center">

<img src="https://img.shields.io/badge/MERN-Stack-success?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Authentication-JWT-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Maps-Leaflet-orange?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Payments-Razorpay-purple?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge"/>

</p>

---

# ✨ Overview

Shopzy is a modern full-stack e-commerce platform designed to provide users with a smooth and responsive online shopping experience.

The platform allows users to browse products, search and filter collections, add products to their cart, securely manage their accounts, place orders, and track their order history.

The system also includes a dedicated admin panel for managing products, monitoring customer orders, and updating order statuses.

Shopzy is built using the **MERN Stack** and focuses on building a scalable, real-world e-commerce architecture while integrating modern features such as real-time updates and future AI-powered capabilities.

---

# 🚀 Core Features

# 👨‍⚕️ Patient Features

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

# 🏥 Pharmacy Features

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

✅ Pharmacy Management

✅ User Management

✅ Delivery Partner Management

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