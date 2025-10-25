import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import './App.css';

interface Message {
  _id: string;
  text: string;
  username: string;
  avatar: string;
  createdAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

const App: React.FC = () => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    // Check for existing token
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      const BACKEND_URL = 'https://chat-app-zfue.onrender.com';

      const newSocket = io(BACKEND_URL, {
        transports: ['websocket'], // optional but helps on Render
      });
      
      setSocket(newSocket);

      // Set up axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Load existing messages
      axios.get(`${BACKEND_URL}/api/messages`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });

      // Socket event listeners
      newSocket.on('new-message', (message: Message) => {
        setMessages(prev => [...prev, message]);
      });

      newSocket.on('user-joined', (username: string) => {
        setOnlineUsers(prev => [...prev, username]);
      });

      newSocket.on('user-left', (username: string) => {
        setOnlineUsers(prev => prev.filter(u => u !== username));
      });

      newSocket.on('error', (error: any) => {
        console.error('Socket error:', error);
      });

      // Join chat with user data
      newSocket.emit('join', {
        userId: user.id,
        username: user.username
      });

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user, token]);

  const handleAuthSuccess = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setMessages([]);
    setOnlineUsers([]);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Close socket connection
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket && user) {
      const messageData = {
        text: message,
        userId: user.id
      };

      socket.emit('send-message', messageData);
      setMessage('');
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isAuthenticated) {
    return (
      <AuthForm
        onAuthSuccess={handleAuthSuccess}
        onSwitchMode={() => setIsLogin(!isLogin)}
        isLogin={isLogin}
      />
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-info">
          <h2>💬 Neon Chat</h2>
          <div className="online-indicator">
            <div className="online-dot"></div>
            <span>{onlineUsers.length} online</span>
          </div>
        </div>
        <div className="user-info">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=random&color=fff`} 
            alt={user?.username}
            className="user-avatar"
          />
          <span className="username">{user?.username}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.username === user?.username ? 'own-message' : ''}`}>
            <div className="message-content">
              <div className="message-header">
                <img 
                  src={msg.avatar || `https://ui-avatars.com/api/?name=${msg.username}&background=random&color=fff`} 
                  alt={msg.username}
                  className="message-avatar"
                />
                <span className="message-username">{msg.username}</span>
                <span className="message-time">{formatTime(msg.createdAt)}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          maxLength={500}
        />
        <button type="submit" className="send-button">
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default App;