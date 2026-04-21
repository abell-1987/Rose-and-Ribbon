# 🌹 The Rose & Ribbon Tea Parlor

**Regency class meets modern sass.**

The Rose & Ribbon Tea Parlor is a themed event planning and menu management web application designed to streamline the creation and customization of elegant, immersive tea party experiences.

This app allows users to explore curated event menus, view categorized offerings, and dynamically render themed experiences such as Christmas, Halloween, Pride, and more — all powered by a scalable, data-driven architecture.

---

## ✨ Features

- 🎀 **Themed Event Pages**  
  Fully styled experiences (e.g., Christmas, Halloween, Pride) with unique branding and UI

- 🍰 **Dynamic Menu Rendering**  
  Menu items are fetched from an API and organized by category

- 💰 **Pricing Integration**  
  Each item includes pricing displayed alongside descriptions

- 🧩 **Category-Based Organization**  
  Items are grouped into structured sections (teas, cocktails, desserts, etc.)

- 🎨 **Custom UI/UX Design**  
  Regency-inspired aesthetic with modern, playful elements

- 🎉 **Interactive Enhancements**  
  Seasonal effects like animated confetti (JS + CSS)

---

## 🧠 Tech Stack

**Frontend:**
- React
- JavaScript (ES6+)
- CSS (custom styling, animations)

**Routing:**
- React Router (`useParams` for dynamic routes)

**State & Hooks:**
- `useState`
- `useEffect`
- `useMemo`
- `useRef`

**Backend (assumed based on usage):**
- REST API (menu service)

---

## 🏗 Architecture Overview

This application follows a clean separation of concerns:

- **React Router** handles navigation and dynamic URL parameters  
- **Components** manage UI rendering  
- **Hooks** manage state, lifecycle, and performance optimization  
- **Services** handle data fetching from the backend  

### Key Concepts

- **State-driven UI** → Components re-render based on data changes  
- **Route-driven data** → URLs determine what content loads  
- **Derived data** → UI structure is computed from state using `useMemo`  
- **DOM isolation** → Animations use `useRef` to avoid interfering with layout  

---

## 📁 Project Structure (Simplified)
src/
│
├── components/
│ └── auth/
│ └── Holidays/
│ ├── Christmas.jsx
│ ├── Christmas.css
│ └── ...
│
├── services/
│ └── menuService.js
│
├── assets/
│ └── christmasConfetti.js
│
└── App.jsx

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:abell-1987/Rose-and-Ribbon.git
cd rose-ribbon

2. Install dependencies
npm install

3. Start API
cd rose-ribbon
cd Database
json-server -p 8088 database.json -w

4. Start the development server
npm run dev

🎯 Problem This App Solves

Planning themed events — especially detailed ones like tea parties — is often manual, scattered, and difficult to scale.

This app centralizes:

Menu organization
Pricing
Themed presentation

into a single system, making event planning more efficient, customizable, and scalable.

📈 Scalability

The app is designed to grow easily:
- Add new themes without restructuring components
- Add new menu categories dynamically
- Support larger datasets without UI changes
- Extend to bookings, users, or multiple locations

🔮 Future Improvements

- User authentication & accounts
- Event booking system
- Admin dashboard for menu management
- Database integration (if not already connected)
- Mobile responsiveness enhancements
- Payment integration

👩‍💻 Author

Created by Ashley Bell
Software Developer Apprentice @ Nashville Software School

💖 Aesthetic Inspiration

- Regency-era elegance
- Vintage tea culture
- Modern playful UI design