import React, { useState } from "react";
import "./sliderbar.css"; // Ensure the correct path to Sidebar.css

const Sidebar = ({ chats, currentChatId, onNewChat, onSelectChat, onDeleteChat, onTitleChange }) => {
  const [activeItem, setActiveItem] = useState("About Us");

  const handleMenuClick = (itemName, url) => {
    setActiveItem(itemName);
    window.open(url, "_blank");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-user">
          <span className="username">Welcome, User!</span>
        </div>
      </div>

      {/* Chat history section */}
      <div className="menu-section chat-history">
        <h3 className="menu-title">CHATS</h3>
        <div className="chat-list">
          {chats.map(chat => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === currentChatId}
              onSelect={() => onSelectChat(chat.id)}
              onDelete={() => onDeleteChat(chat.id)}
              onTitleChange={(newTitle) => onTitleChange(chat.id, newTitle)}
            />
          ))}
        </div>
      </div>

      {/* CTA button above navigation */}
      <div className="cta-button">
        <button onClick={onNewChat}>
          <img src="/images/add.png" alt="New Chat" className="cta-logo" />
          <span>New Chat</span>
        </button>
      </div>

      {/* NAVIGATION section moved to bottom */}
      <div className="menu-section navigation-section">
        <h3 className="menu-title">NAVIGATION</h3>
        <div className="menu">
          <div
            className={`menu-item ${activeItem === "About Us" ? "active" : ""}`}
            onClick={() => handleMenuClick("About Us", "https://mlsasrm.in/")}
          >
            <img src="/images/chat.png" alt="About Us" className="menu-icon" />
            <span>About Us</span>
          </div>
          <div
            className={`menu-item ${activeItem === "Team" ? "active" : ""}`}
            onClick={() => handleMenuClick("Team", "https://mlsasrm.in/team")}
          >
            <img src="/images/chat.png" alt="Team" className="menu-icon" />
            <span>Team</span>
          </div>
          <div
            className={`menu-item ${activeItem === "Contact" ? "active" : ""}`}
            onClick={() => handleMenuClick("Contact", "mailto:mlsasrm14@gmail.com")}
          >
            <img src="/images/chat.png" alt="Contact" className="menu-icon" />
            <span>Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
