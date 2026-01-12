# 🍣 Sushi Restaurant Web App

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![AWS](https://img.shields.io/badge/AWS-S3_%26_EC2-orange)

A modern, full-stack web application for a restaurant featuring a high-performance public frontend, a secure admin dashboard, and a robust backend infrastructure. Built to demonstrate advanced Next.js patterns, GraphQL integration, and Cloud Infrastructure management.

🔗 **Live Demo:** [https://simple-restaurant-site.vercel.app](https://simple-restaurant-site.vercel.app)

---

## 📸 Screenshots

| Landing Page | Admin Dashboard |
|:---:|:---:|
| ![Landing Page](https://github.com/user-attachments/assets/24010bb9-82cc-4324-a045-39a07f92d880)) |

---

## 🛠 Tech Stack

This project uses a decoupled architecture with **Next.js** on the frontend and a **Node.js/PostgreSQL** backend, connected via **GraphQL** and hosted on **AWS**.

### **Frontend (Client)**
* **Framework:** Next.js 15/16 (App Router, Server Actions)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State/Data:** URQL (GraphQL Client), React Hook Form, Zod
* **Animations & UX:** GSAP, Lenis (Smooth Scroll)
* **Optimization:** Next.js Image, Dynamic Sitemaps, Robots.txt

### **Backend (Server)**
* **Runtime:** Node.js
* **Database:** PostgreSQL (via Prisma ORM)
* **Caching:** Redis (for session/data caching)
* **API:** GraphQL (Yoga/Apollo)
* **Containerization:** Docker & Docker Compose, Nginx (Reverse Proxy)

### **Cloud Infrastructure (AWS)**
* **Storage:** **AWS S3** (Secure storage for menu item images and assets).
* **Compute:** **AWS EC2** (Hosting for Backend API, Database, and Redis).

---

## ✨ Key Features

### 🚀 Public User Interface
* **Performance First:** Optimized with Server Components (RSC) and aggressive caching strategies.
* **Smooth Experience:** Custom smooth scrolling (Lenis) and GSAP animations.
* **SEO Ready:** Dynamic generation of `sitemap.xml` and `robots.txt` based on database content.
* **Responsive:** Mobile-first design adapted for all devices.

### 🛡️ Admin Dashboard (`/admin`)
* **Secure Authentication:** JWT-based auth (Access/Refresh tokens).
* **Menu Management:** CRUD operations with **image uploads directly to AWS S3**.
* **Blog System:** Full management of blog posts.
* **On-Demand Revalidation:** Uses `revalidateTag` to instantly update the public site cache after admin changes without rebuilding.

### ⚙️ DevOps & CI/CD
The project implements a full CI/CD pipeline using **GitHub Actions**:
1.  **Test:** Runs E2E/Integration tests.
2.  **Audit:** Runs Unlighthouse to check SEO/Accessibility scores on every deploy.
3.  **Build:** Creates Docker images for Server/Nginx and pushes to DockerHub.
4.  **Deploy Frontend:** Vercel (Auto-deploy on push to main).
5.  **Deploy Backend:** Automatic SSH connection to **AWS EC2**, pulling new Docker images and restarting containers.

---

## 🏗️ Architecture & Caching Strategy

One of the highlights of this project is the **Next.js Data Cache integration**:

1.  **Static by Default:** Public pages use `force-cache` for GraphQL queries.
2.  **Instant Updates:** When an admin modifies a dish, a **Server Action** triggers `revalidateTag('menu-data')`.
3.  **Result:** Users get the speed of static HTML, but the content is always fresh without waiting for a full rebuild.

---

## 🏃‍♂️ Getting Started

### Prerequisites
* Node.js 20+
* Docker & Docker Compose
* AWS Account (for S3 bucket)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/simple-restaurant-site.git](https://github.com/your-username/simple-restaurant-site.git)
    cd simple-restaurant-site
    ```

2.  **Setup Environment Variables**
    Create `.env` files based on `.env.example`.
    *Ensure you provide AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET_NAME.*

3.  **Run Backend (Docker)**
    ```bash
    cd server
    docker compose up -d
    npx prisma migrate dev
    ```

4.  **Run Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

---

## 🤝 Contact

**Name:** Tyshchenko Dmytro
**Role:** Full-Stack Developer
**LinkedIn:** [linkedin.com/in/dmytro-tyshchenko-152947298]
**Email:** [Tishdima1@gmail.com]

---
*This project was built for educational purposes to demonstrate full-cycle web application development using React ecosystem and Cloud Services.*
