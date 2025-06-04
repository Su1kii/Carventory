# 🚗 Carventory

**Carventory** is a full-stack car inventory management app where users can **add, edit, view, and delete** their vehicles. It showcases my abilities in full-stack development using modern technologies like **Next.js**, **TypeScript**, **Tailwind CSS**, and **Prisma** — backed by a Neon Postgres database and Stack Auth for authentication.

---

## ✨ Features

- 🔐 **Authentication** with [Stack Auth](https://stack-auth.com)
- 🌗 **Light and Dark Mode** toggle
- 🧾 **CRUD functionality** – Add, update, and delete car listings
- 🖼️ **Live car previews** with image support
- 🔍 **Detailed view** for each car with clickable cards
- 💅 Clean UI using **shadcn/ui** and **Tailwind CSS**
- ⚡ Fast performance with **Next.js App Router**
- 🗃️ **Database** powered by **Prisma ORM** + **Neon**

---

## 🧱 Tech Stack

| Tech         | Purpose                        |
|--------------|--------------------------------|
| **Next.js**  | App routing & server-side rendering |
| **TypeScript** | Type safety                   |
| **Tailwind CSS** | Styling framework           |
| **shadcn/ui** | Reusable UI components        |
| **Prisma**   | ORM for interacting with database |
| **Neon**     | Serverless Postgres DB         |
| **Stack Auth** | Secure authentication         |

---

## 📸 Preview

![Preview](./public/Github%20Preview.png)

---

📌 Purpose
This project was built to demonstrate:
My understanding of modern full-stack development
My ability to create beautiful, responsive, and functional UIs
Experience with authentication, ORM, and cloud-based databases

Real-world CRUD functionality in a clean UI

🔗 Live Demo
👉 [carventory.vercel.app](https://carventory.vercel.app/)


## 🛠️ Running Locally

```bash
git clone https://github.com/your-username/carventory.git
cd carventory

# Install dependencies
npm install

# Create .env file and add the following
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_client_key
STACK_SECRET_SERVER_KEY=your_server_key
DATABASE_URL=your_neon_postgres_url

# Run locally
npm run dev
