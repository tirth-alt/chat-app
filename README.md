# 💬 Neon Chat App

A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Socket.io for real-time communication and a beautiful, responsive UI.

## ✨ Features

- **Real-time messaging** with Socket.io
- **Modern, responsive UI** with gradient backgrounds and glassmorphism effects
- **User avatars** automatically generated
- **Online user indicators**
- **Message timestamps**
- **Mobile-friendly design**
- **Smooth animations** and transitions

## 🏗️ Project Structure

```
neon-chat-app/
├── client/                 # React.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── App.tsx         # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.tsx       # React entry point
│   ├── package.json        # React dependencies
│   ├── .gitignore
│   └── env.example
├── server/                 # Express.js/Node.js Backend
│   ├── server.js           # Express server with Socket.io
│   ├── package.json        # Backend dependencies
│   ├── .gitignore
│   └── env.example
├── package.json            # Root package.json
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
  - **MongoDB Atlas** (Cloud) - [Sign up here](https://www.mongodb.com/atlas)

### MongoDB Setup

#### Option 1: Local MongoDB Installation

1. **Download and Install MongoDB Community Server**
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Download the version for your operating system
   - Follow the installation wizard

2. **Start MongoDB Service**
   
   **Windows:**
   ```bash
   # MongoDB should start automatically as a service
   # If not, start it manually:
   net start MongoDB
   ```
   
   **macOS:**
   ```bash
   brew services start mongodb-community
   ```
   
   **Linux:**
   ```bash
   sudo systemctl start mongod
   ```

3. **Verify MongoDB is running**
   ```bash
   mongosh
   # or
   mongo
   ```

#### Option 2: MongoDB Atlas (Cloud)

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a new cluster** (choose the free tier)
3. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd neon-chat-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   
   Or install manually:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```

3. **Set up environment variables**

   **Server environment** (`server/.env`):
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/neon-chat
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neon-chat
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # CORS Configuration
   CLIENT_URL=http://localhost:3000
   ```

   **Client environment** (`client/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   GENERATE_SOURCEMAP=false
   ```

### Running the Application

#### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- **Express.js/Node.js backend** on `http://localhost:5000`
- **React.js frontend** on `http://localhost:3000`

#### Manual Start

**Backend only (Express.js/Node.js):**
```bash
npm run server
```

**Frontend only (React.js):**
```bash
npm run client
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Socket.io-client** - Real-time client
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## 📱 Features in Detail

### Real-time Communication
- Instant message delivery using Socket.io
- User join/leave notifications
- Online user count display

### Modern UI/UX
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Responsive design for all devices
- Custom scrollbars
- Hover effects and transitions

### User Experience
- Simple username-based authentication
- Auto-generated avatars
- Message timestamps
- Character limits for messages
- Clean, intuitive interface

## 🔧 API Endpoints

- `GET /api/health` - Server health check
- `GET /api/messages` - Fetch all messages
- `POST /api/messages` - Create a new message

## 🚀 Deployment

### Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Other Platforms
The app can be deployed on any platform that supports Node.js:
- Vercel
- Netlify
- Railway
- DigitalOcean

## 🎨 Customization

### Styling
- Modify `client/src/App.css` to change colors, fonts, and layout
- Update gradient colors in CSS variables
- Adjust animation timings and effects

### Features
- Add user authentication with JWT
- Implement private messaging
- Add file sharing capabilities
- Include emoji reactions
- Add message editing/deletion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check that MongoDB is running
2. Verify all dependencies are installed
3. Ensure ports 3000 and 5000 are available
4. Check the console for error messages

## 🔮 Future Enhancements

- [ ] User authentication and registration
- [ ] Private messaging
- [ ] File and image sharing
- [ ] Message reactions
- [ ] Chat rooms/channels
- [ ] Message search
- [ ] Push notifications
- [ ] Dark/light theme toggle

---

**Happy Chatting! 💬✨**
