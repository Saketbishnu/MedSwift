# MedSwift 🚑💊

**Instant Medicine Delivery Platform**  
*Get prescription & OTC medicines delivered to your doorstep in under 30 minutes*

![MedSwift Screenshot](screenshots/app-preview.png)  
*(Replace with actual screenshot)*

## 🌟 Features

### For Patients
- ⚡ **30-min delivery guarantee** for emergency medications
- 📲 **Prescription upload & validation** via image/Aadhaar integration
- 📍 **Real-time tracking** of delivery personnel
- 💊 **Intelligent substitutes** when exact medicine is unavailable

### For Pharmacies
- 📊 **Inventory management dashboard**
- 🚗 **Driver allocation system** with route optimization
- 📑 **Digital prescription records**
- 💸 **Integrated payments** (Razorpay, UPI, COD)

### For Delivery Partners
- 🗺️ **Turn-by-turn navigation** optimized for medicine delivery
- ⏱️ **Dynamic ETA calculator**
- 🏥 **Priority tagging** for critical medications

## 🛠️ Tech Stack

**Frontend**  
- React.js + Vite (TypeScript)
- Tailwind CSS + HeadlessUI
- React Router v6
- Redux Toolkit (State management)
- Leaflet.js (Live tracking)

**Backend**  
- Node.js + Express
- MongoDB (Medicine inventory)
- Redis (Real-time updates)
- Firebase (Prescription storage)
- Twilio (SMS alerts)

**DevOps**  
- Dockerized microservices
- GitHub Actions CI/CD
- AWS EC2 deployment
- Sentry (Error monitoring)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medswift.git
   cd medswift   

# project structure 
medswift/
├── client/           # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── assets/   # Medicine images/icons
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/    # Delivery time calculator
│   │   └── ...
│
├── server/           # Backend (Node.js)
│   ├── controllers/
│   ├── models/       # Mongoose schemas
│   ├── routes/
│   ├── services/     # Delivery algo
│   └── ...
│
├── delivery-agent/   # Driver app (React Native)
└── docs/             # API references

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
