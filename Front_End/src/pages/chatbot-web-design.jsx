import { useState } from "react";
import styles from "./chatbot-web-design.module.css";
import img from "../images/Frame-21.png";

// Voice input handler
const handleVoiceInput = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.querySelector(`.${styles.askMeAnythingInput}`).value = transcript;
  };

  recognition.onerror = (event) => {
    console.error('Error occurred in speech recognition:', event.error);
  };
};

// Chatbot component
const ChatbotWebDesign = () => {
  const [prompt, setPrompt] = useState(""); // Track input prompt
  const [queries, setQueries] = useState([]); // List of user queries
  const [responses, setResponses] = useState([]); // List of chatbot responses

  // Function to handle sending prompt to the Flask backend
  const handleSubmitPrompt = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // Send user prompt
      });
      const data = await res.json(); // Parse JSON response from server
      setQueries([...queries, prompt]); // Add new query to list
      setResponses([...responses, data.response]); // Add new response to list
      setPrompt(""); // Clear the input field
    } catch (error) {
      console.error("Error sending prompt to the backend:", error);
    }
  };

  return (
    <div className={styles.chatbotWebDesign}>
      <img className={styles.chatbotWebDesignChild} alt="" src={img} />
      <div className={styles.virtualLawyerParent}>
        <b className={styles.virtualLawyer}>Virtual Lawyer</b>
        <img
          className={styles.aiTechnologySparkLightbulbIcon}
          alt=""
          src="/aitechnologysparklightbulbideabrightlightingartificialintelligenceai.svg"
        />
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <b className={styles.yourHistory}>Your History</b>
      </div>
      <div className={styles.askMeAnythingParent}>
        <input
          className={styles.askMeAnythingInput}
          type="text"
          placeholder="Ask Me Anything..."
          value={prompt} // Bind input to state
          onChange={(e) => setPrompt(e.target.value)} // Update state on input change
        />
        <img
          className={styles.imgicons81}
          alt="voice-input"
          src="/imgicons8-1@2x.png"
          onClick={handleVoiceInput} // Voice input click handler
        />
        <img
          className={styles.returnIcon}
          alt="return-icon"
          src="/return.svg"
          onClick={handleSubmitPrompt} // Send prompt when return icon is clicked
        />
      </div>

      <div className={styles.historyContainer}>
        {queries.map((query, index) => (
          <div key={`query-${index}`} className={styles.rectangleContainer}>
            <div className={styles.frameInner} />
            <b className={styles.userPrompt}>User Prompt</b>
            <p className={styles.query2} >{query}</p> {/* Display user's query */}
          </div>
        ))}
        
        {responses.map((response, index) => (
          <div key={`response-${index}`} className={styles.rectangleGroup}>
            <div className={styles.frameItem} />
            <img className={styles.imgicons82} alt="" src="/imgicons8-2@2x.png" />
            <div className={styles.responseBox}>
              <b>Chatbot Response:</b>
            </div>
            { <p className={styles.hello}>{response}</p> }
          </div>
        ))}
        

      </div>
    </div>
  );
};

export default ChatbotWebDesign;
