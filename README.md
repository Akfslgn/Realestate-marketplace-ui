# Frontend Development Template
### Tech Stack
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![JSX](https://img.shields.io/badge/JSX-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/docs/introducing-jsx.html)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Flux](https://img.shields.io/badge/Flux-009CDC?style=for-the-badge)](https://facebook.github.io/flux/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)

This is a **template for React applications** created using [Vite](https://vitejs.dev/). It provides a fast and efficient starting point for building modern React applications with a Flux-inspired architecture and custom state management.

## Features
- ⚡ **Vite-powered**: Super-fast builds and development.
- 📦 **React**: Build modern user interfaces.
- 🔄 **Flux Architecture**: Centralized global store with a reducer to manage state.
- 🔐 **Protected Routes**: Simple utility to secure part of your routing.
- 🛠️ **Easy to Extend**: Customize, scale, and add new features with ease.

## Architecture Overview

### Flux-Inspired Global Store
- **Global Store:**  
  The app uses a Flux-inspired global store implemented in `StoreContext.jsx` and managed by a reducer (`storeReducer.js`).  
- **State Initialization:**  
  The initial state is defined in `initialStore.js`.
- **Custom Hook:**  
  The `useGlobalStore` hook (in `hooks/useGlobalStore.js`) makes accessing and updating the global state simple throughout your components.

### Routing
- **React Router:**  
  The app uses `react-router` for client-side navigation. Routes are defined in `router/routes.jsx`.
- **Protected Routes:**  
  The `ProtectedRoute.jsx` component is available to secure routes that require authentication by checking the global state.

### API Integration
- **API Helpers:**  
  Functions to fetch, add, and delete todos are encapsulated in `utils/api.js`.
- **User Account Management:**  
  A helper (`helpers.js`) is available to add any functions that can be reused and are common.

## Getting Started

Follow these steps to set up and run the project:

### 1. Create a Repository from the Template
This is a **GitHub template repository**. To create a new repository:
1. Click the **"Use this template"** button on the repository page.
2. Enter a name for your new repository and click **"Create repository from template"**.


### 2. Clone the Repository
Once your repository is created, clone it to your local machine:
```bash
git clone https://github.com/yollinfo/react-remplate-flux.git
cd react-remplate-flux
```

### 3. Install Dependencies
Install all required dependencies:
```bash
npm install
```

### 4. Start the Development Server
Run the development server:
```bash
npm run dev
```

### 5. Open in Browser
Once the server is running, open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

### `npm run dev`
Starts the development server.

### `npm run build`
Builds the app for production.

### `npm run preview`
Previews the production build locally.

## Folder Structure
```
├── src
│   ├── assets        # Static assets like images
│   ├── components    # Reusable React components (e.g., Logo)
│   ├── hooks         # Custom hooks (e.g., useGlobalStore)
│   ├── pages         # Page components (Home, Demo, About)
│   │   ├── about     # About page and styling
│   │   ├── demo      # Demo page with API integration and Flux store usage
│   │   └── home      # Home page and styling
│   ├── router        # Routing configuration (routes, RootLayout, ProtectedRoute)
│   ├── store         # Global store configuration (StoreContext, initialStore, storeReducer)
│   ├── utils         # Utility functions (API helpers and user helpers)
│   ├── App.jsx       # Main application component (if applicable)
│   └── main.jsx      # Application entry point
├── public            # Public static files
├── .gitignore        # Files to ignore for Git
├── package.json      # Project dependencies and scripts
├── vite.config.js    # Vite configuration (includes API proxy configuration)
└── README.md         # Project documentation
```

## Customization
Feel free to customize the project as per your needs:
- Add new dependencies using `npm install <package-name>`.
- Update the `vite.config.js` file for advanced configurations.
- Global Store: Expand initialStore.js and storeReducer.js to add more slices of state as needed.
- Routing: Update routes in routes.jsx or secure routes using ProtectedRoute.jsx.
- API & Helpers: Update and expand API utility functions in api.js and user management helpers in helpers.js.
- Styling: Modify or add new styles in the corresponding CSS files.

## Contributing
If you'd like to contribute to this template, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

This project has been created by **Yoll Academy**.

Happy coding! 🎉
