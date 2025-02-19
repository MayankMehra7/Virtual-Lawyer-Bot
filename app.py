from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from vectorstore_manager import get_or_create_vectorstore
import warnings

# Ignore certain warnings from langchain and HuggingFace
warnings.filterwarnings("ignore", category=DeprecationWarning, module='langchain')
warnings.filterwarnings("ignore", category=FutureWarning, module='huggingface_hub')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the React frontend

# Configure the Gemini API key
genai.configure(api_key='AIzaSyCAJWgPhXDT2FjTR9rB4dpLhHoZ9_F7goI')

# Load or create the vectorstore
json_file_path = r"secs.json" 
vector_file_path = r"vector_store"
vectordb = get_or_create_vectorstore(json_file_path, vector_file_path)

# Function to generate a response using the vectorstore and Generative AI
def generate_with_retrieval(prompt, vectordb):
    top_docs = vectordb.search(prompt, search_type='similarity', k=3)
    retrieved_context = " ".join([doc.page_content for doc in top_docs])
    combined_prompt = prompt + "\n" + retrieved_context

    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(combined_prompt)
    
    return response.text.strip()

# API route to handle chatbot prompt
@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.get_json()  # Get JSON data from the request
    prompt = data.get('prompt')  # Extract the prompt
    
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    
    try:
        # Generate a response using the prompt
        response_text = generate_with_retrieval(prompt, vectordb)
        return jsonify({"response": response_text})  # Return the response as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
