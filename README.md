# 🎬 Nexus Canon

Nexus Canon is a sleek, modern web application built with React and Vite that delivers an immersive movie and TV show browsing experience. Designed with a clean, intuitive UI enhanced by TailwindCSS animations, it provides users instant access to trailers and detailed information about their favorite films and series.

## ✨ Features

- 🎬 **Dynamic Movie & Show Discovery** – Instantly browse trending and popular titles fetched from the TMDB API with smooth transitions and vibrant visuals.
- ▶️ **Seamless Trailer Playback** – Watch trailers in modals embedded from YouTube, with smart auto-pause when the modal closes.
- 🧠 **Genre-Based Listings** – Explore content by genres with dynamic layouts — every 3rd genre section is displayed horizontally for aesthetic variation.
- 💫 **Beautiful UI & Animations** – Crafted with TailwindCSS for elegant design, hover effects, and subtle scroll animations.
- 📱 **Responsive Across Devices** – Works flawlessly on desktop, tablet, and mobile screens.
- 🌐 **Live API Integration** – Real-time data from the [TMDb API](https://www.themoviedb.org/documentation/api), showcasing the latest movies and series.
- 💡 **Watchlist (Coming Soon)** – Star-button UI is already in place as a placeholder for upcoming watchlist functionality.
- ⚛️ **Modern Stack** – Powered by React, Vite, and modular components like `MovieCard`, `TrailerModal`, and `GenreMovieList`.
- 🚀 **Fast Development Workflow** – Built with Vite for blazing-fast builds and optimized performance.

Nexus Canon is a foundation for a full-featured streaming companion app, ready to be extended with authentication, database integration, and personalized recommendations.

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/152ee8de-2c7e-42af-8751-d861833e2e5b)

## Website Link

https://nexus-canon.web.app

## 🛠️ Tech Stack

* **Frontend**: React.js, TailwindCSS
* **Icons**: React Icons
* **Data**: TMDb API
* **State & Lifecycle**: React Hooks (`useState`, `useEffect`, `useRef`)

## 🎥 Working Demo 

https://github.com/user-attachments/assets/241f83f9-2009-4153-bb65-4fdd003fb921



## 📁 Project Structure

```
./
├── README.md
├── dist/
│   ├── Favicon.png
│   ├── assets/
│   ├── index.html
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── reel.png
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── Constant/
│   │   └── GenresList.jsx
│   ├── Services/
│   │   └── GlobalAPI.jsx
│   ├── assets/
│   │   ├── Videos/
│   │   │   ├── disney.mp4
│   │   │   ├── marvel.mp4
│   │   │   ├── national-geographic.mp4
│   │   │   ├── pixar.mp4
│   │   │   └── star-wars.mp4
│   │   ├── images/
│   │   │   ├── disney.png
│   │   │   ├── logo.png
│   │   │   ├── marvel.png
│   │   │   ├── nationalG.png
│   │   │   ├── pixar.png
│   │   │   └── starwar.png
│   │   └── react.svg
│   ├── components/
│   │   ├── GenreMovieList.jsx
│   │   ├── Header.jsx
│   │   ├── HrMovieCard.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   ├── ProductionHouse.jsx
│   │   ├── SeriesTrailerPage.jsx
│   │   ├── Slider.jsx
│   │   ├── TrailerModal.jsx
│   │   └── TrailerPage.jsx
│   ├── context/
│   │   └── WatchlistContext.jsx
│   ├── index.css
│   ├── main.jsx
│   └── pages/
│       ├── MoviesPage.jsx
│       ├── SearchPage.jsx
│       ├── SeriesPage.jsx
│       └── WatchlistPage.jsx
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

* Node.js & npm installed
* TMDb API Key

### Installation Steps

1. **Clone the repo**

   ```bash
   git clone https://github.com/sujal-1245/Nexus-Canon.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` and add your TMDb key**

   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

## 👨‍💻 Author

**Sujal Bhagat**  
💼 [LinkedIn](https://www.linkedin.com/in/sujal-bhagat-sdb1245/)  
🌐 [GitHub](https://github.com/sujal-1245)

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
