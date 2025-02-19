import { useEffect } from "react";
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

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    // Fixed: Removed the duplicate case
    switch (pathname) {
      case "/":
        title = "Home Page"; // You can add a relevant title for this case
        metaDescription = "Welcome to the Home Page"; // You can customize the description
        break;
      case "/chatbot":
        title = "Chatbot Web Design"; // You can add a relevant title for this case
        metaDescription = "Explore our Chatbot Web Design"; // You can customize the description
        break;
      // Add other cases as needed
      default:
        title = "Default Title"; // Optional default title
        metaDescription = "Default description"; // Optional default description
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
      <Route path="/" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatbotWebDesign />} />
    </Routes>
  );
}

export default App;
