import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/home-page";
import ChatbotWebDesign from "./pages/chatbot-web-design";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  // Define the default chat object
  const defaultChat = {
    id: "default",
    name: "Chat 1",
    messages: [
      {
        type: "bot",
        content: "Welcome to Virtual Lawyer Chatbot! How can I assist you today?",
      },
    ],
  };

  // State to manage chats
  const [chats, setChats] = useState([defaultChat]);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home Page";
        metaDescription = "Welcome to the Home Page";
        break;
      case "/chatbot":
        title = "Chatbot Web Design";
        metaDescription = "Explore our Chatbot Web Design";
        break;
      default:
        title = "Default Title";
        metaDescription = "Default description";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage chats={chats} />} />
      <Route path="/chatbot" element={<ChatbotWebDesign chats={chats} />} />

    </Routes>

  );
  
}

export default App;
