# Podorozhnyky 🌍

![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-v18-green)
![Next.js](https://img.shields.io/badge/next.js-15-black)

---

## Table of Contents
- [Project Title](##✨project-title)
- [About the Project](##✨-about-the-project)
- [Installation](##installation)
- [Tech Stack](##🛠️-tech-stack)
- [Features](##🚀-features)
- [Pages](##pages)
- [API Documentation](##📄-api-documentation)
- [Demo](##🎬-demo)
- [Environment Variables](#env-environment-variables)
- [Deploy](##☁️-deploy-backend-nodejs--mongodb-to-versel)
- [MongoDB Atlas](##🍃-mongodb-atlas)
- [Contributing](##🤝-contributing)

---

## ✨ Project Title
Podorozhnyky is a platform for people who live through their travels.

## ✨ About the Project 
This project is designed for travelers and anyone who wants to share their adventures.
The platform allows users to:
   Publish their own travel stories
   Browse stories from other users
   Save favorite stories
   Maintain a traveler profile
   Connect with new people and discover new destinations

### Installation
  ## Frontend (Next.js)

   # Clone the repository
     git clone <https://github.com/AlexNovickiy/nextjs-project-team-1-podorozhnyky.git>


   # Navigate to the frontend directory:
     cd nextjs-project-team-1-podorozhnyky

   # 🖥️ Running the Project (Frontend)
     ```bash
     npm install 

     npm run dev
     # or
     yarn dev
     # or
     pnpm dev
     # or
     bun dev
     ```

  ## Backend (Node.js)

   # Clone the repository
      git clone <https://github.com/AlexNovickiy/node-js-project-team-1.git>

   # Navigate to the backend directory:
      cd nodejs-hw-01

   # 🖥️ Running the Project (Backend)
    ```bash
    npm install 

    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

## 🛠️ Tech Stack
  # Frontend:
    Next.js 15 (App Router)
    React 19
    TypeScript
    TanStack React Query
    Formik + Yup
    Axios
    React Hot Toast
    TailwindCSS
    React Select
    React Icons
    use-debounce
    modern-normalize

  # Backend:
    Node.js + Express
    MongoDB + Mongoose
    JWT
    bcrypt
    Cloudinary
    Multer
    Nodemailer (Brevo)
    Google Auth Library
    dotenv
    pino-http

## 🚀 Features

  # 🔐 Authentication
    Email + password login/register
    Google OAuth
    Protected client routes
    JWT authentication
    Profile management 

  # 📝 Stories
    Create, edit, delete stories
    Photo upload via Cloudinary
    Image validation
    Pagination (server-side)
    Story details page
    Save / unsave stories
    Form validation (Formik + Yup)

   # 👤 Travelers
    List of travelers
    Pagination “Show more”
    Public traveler profile
    View their stories

## Pages
    /auth/register
    /auth/login
    /
    /stories
    /stories/[storyId]
    /stories/create
    /stories/[storyId]/edit
    /travellers
    /travellers/[travellerId]
    /profile
    /edit

## 📄 API Documentation
    OpenAPI 3.0
    Auto-generated Swagger JSON
    Preview via Redocly

## Demo 🎬-demo  (посилання сюди на версель)

## - Environment Variables
  # Backend
    PORT=
    MONGODB_USER=
    MONGODB_PASSWORD=
    MONGODB_URL=
    MONGODB_DB=

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    APP_DOMAIN=
    JWT_SECRET=

    API_BREVO_KEY=
    API_BREVO_FROM=

    GOOGLE_AUTH_CLIENT_ID=
    GOOGLE_AUTH_CLIENT_SECRET=

    NODE_BACKEND_URL=

  # frontend
    NEXT_PUBLIC_API_URL=http://localhost:3000
    NODE_BACKEND_URL=https://node-js-project-team-1.onrender.com

## ☁️ Deploy Backend (Node.js + MongoDB) to Vercel

1. Go to https://vercel.com  
2. Click **Add New → Project**  
3. Import your backend GitHub repository  
4. Set:
   - **Framework Preset:** Other  
   - **Root Directory:** /server (or project root)  
   - **Install Command:** npm install  
   - **Build Command:** —  
   - **Start Command:** npm start  
5. Add your environment variables (DATABASE_URL, JWT_SECRET, Cloudinary, etc.)  
6. Deploy  

## 🍃 MongoDB Atlas

https://cloud.mongodb.com
Create Cluster
Add user
Allow access from 0.0.0.0
Get connection string and paste into .env

## 🤝 Contributing

Contributions are welcome!
  Fork the repository
  Create a branch (git checkout -b feature-name)
  Commit your changes (git commit -m "Feature")
  Push to the branch (git push origin feature-name)
  Open a Pull Request














This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
