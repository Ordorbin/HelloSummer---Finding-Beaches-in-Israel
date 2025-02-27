# 🌞 HelloSummer - Your Ultimate Beach Guide 🌊

<p align="center">
  <img src="startpage.png" alt="Start Page" width="600">
</p>


## Overview
**HelloSummer** is an innovative **GIS-based** web application designed to help users find and explore **beaches in Israel**. Whether you're looking for a **segregated beach**, **the closest shore**, or **a beach accessible by public transportation**, this platform provides real-time location data and interactive maps.

## 🔥 Features
- 📍 **View Your Location** on an interactive map.
- 🏖️ **Find Nearby Beaches** based on your current position.
- 🚌 **Identify Beaches Accessible by Public Transport** with GovMap integration.
- ⚡ **Fast & User-Friendly Interface** with real-time search and filtering.
- 🌍 **Accurate GIS Data** using coordinate transformations and government map APIs.
- 🎨 **Modern, Responsive Design** for a seamless experience on desktop & mobile.

## 🎯 How to Use
1. **Open `index.html`** to access the main interface.
2. **Click "Start Here"** to begin exploring.
3. **Choose Your Destination:**
   - `My Location` - View your position on the map.
   - `Beaches Accessible by Transport` - Find beaches reachable via public transport.
   - `All Shores` - Explore all beaches in Israel.
   - `Who We Are?` - Learn about the project and the developer.
4. **Use the Search Bar** to filter results instantly.

## 🎥 Watch HelloSummer in Action!
Click the link below to see a full demo of the application:
[![Watch the HelloSummer Preview](start-button.png)](https://www.youtube.com/watch?v=G8on-KNgO7w)


## 📂 Project Structure
📁 HelloSummer/
- ├── 📜 index.html # Landing page
- ├── 📜 general-search.html # Search interface
- ├── 📜 my-location.html # Display user's location
- ├── 📜 accessible-beaches.html # Accessible beaches map
- ├── 📜 all-shores.html # View all shores
- ├── 📜 who-are-we.html # About page
- ├── 📷 HelloSummerLogo.png
- ├── 📷 beach-icon.png
- ├── 📷 location-icon.png
- ├── 📷 bus-icon.png
- ├── 🎨 all-shores.css
- ├── 🎨 my-location.css
- ├── 🎨 general-search.css
- ├── 🎨 accessible-beaches.css
- ├── 🎨 who-we-are.css
- ├── ⚙️ all-shores.js
- ├── ⚙️ my-location.js
- ├── ⚙️ general-search.js
- ├── ⚙️ accessible-beaches.js
- ├── ⚙️ who-we-are.js
- ├── 📜 README.md # This document

## ⚙️ Technologies Used
- **HTML5, CSS3, JavaScript** (Frontend)
- **Leaflet.js & OpenStreetMap** for map rendering
- **GovMap API** for GIS data integration
- **Proj4.js** for coordinate transformations
- **jQuery** for interactivity

## 🚀 Installation & Setup
To run HelloSummer locally:
1. **Clone the repository**
   ```sh
   git clone git@github.com:Ordorbin/HelloSummer---Finding-Beaches-in-Israel.git
2. **Navigate to the project folder**
   ```sh
   cd HelloSummer
3. **Open the HelloSummer folder in VSCode**
4. Right-click on index.html.
5.  Select "Open with Live Server".
   
The browser will open automatically, and the application will be functional.

**Important Note:** JSON files will not work correctly when opened directly in a browser due to CORS restrictions. Running the project via Live Server ensures proper loading of JSON data.

## 🛠️ Future Enhancements
- 🌐 Multi-language support (Hebrew & English)
- 📅 Real-time beach event tracking
- 🚦 Water quality & crowd levels integration

## 📌 Sources
The project uses publicly available government datasets and APIs:

* **🌍 GovMap Website** - https://www.govmap.gov.il/?c=174688.64,655996.94&z=8
* **📡 GovMap API** *(used for GIS and location-based services)* - https://api.govmap.gov.il/
* 🚌 **Bus Stop Locations Data** *(DataGov)* - https://data.gov.il/dataset/bus_stops/resource/e873e6a2-66c1-494f-a677-f5e77348edb0

## 📩 Contact
- 📧 Email: Ordorbin13@gmail.com
- 💻 GitHub: github.com/Ordorbin

  ✨ Created with love by Or Dorbin | GIS Application Development Project | 2025
