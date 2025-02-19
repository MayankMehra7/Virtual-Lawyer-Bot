from langchain_community.vectorstores import Chroma  # Updated import
from langchain_community.embeddings import HuggingFaceEmbeddings  # Updated import
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import json 
import warnings
from langchain.schema import Document  # Import Document from langchain.schema

json_file_path = r"secs.json"
vector_db_dir = r"vector_store"
vector_db_path = os.path.join(vector_db_dir, "vector_store.db")

os.makedirs(vector_db_dir, exist_ok=True)

warnings.filterwarnings("ignore", category=DeprecationWarning, module='langchain_community')
warnings.filterwarnings("ignore", category=FutureWarning, module='huggingface_hub')

def process_json_file(json_file_path):
    with open(json_file_path, "r", encoding='utf-8') as f:  # Added encoding
        data = json.load(f)

    documents = []
    for i, doc in enumerate(data):
        if isinstance(doc, str):
            title = doc
            description = ""
        elif isinstance(doc, dict):
            title = doc.get("title", "")  # Added default value
            description = doc.get("description", "")  # Added default value
        else:
            print(f"Skipping item {i} due to unexpected format: {doc}")
            continue

        content = f"{title}\n{description}" if title and description else title  # Fixed newline character
        document_obj = Document(page_content=content, metadata={"id": title})
        documents.append(document_obj)

    return documents

def get_or_create_vectorstore(json_file_path, vector_db_path):
    documents = process_json_file(json_file_path)
    
    if not documents:  # Check if documents list is empty
        raise ValueError("No documents were processed from the JSON file")
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
    all_splits = text_splitter.split_documents(documents)
    
    model_name = "sentence-transformers/all-mpnet-base-v2"
    embeddings = HuggingFaceEmbeddings(model_name=model_name)
    
    try:
        if os.path.exists(vector_db_path):
            vectordb = Chroma(persist_directory=vector_db_path, embedding_function=embeddings)
            print(f"Loaded existing vector store from {vector_db_path}.")
        else:
            vectordb = Chroma.from_documents(documents=all_splits, embedding_function=embeddings, persist_directory=vector_db_path)
            vectordb.persist()  # Explicitly persist the database
            print(f"Created new vector store at {vector_db_path}.")
        
        return vectordb
    
    except Exception as e:
        print(f"Error creating/loading vector store: {str(e)}")
        raise

if __name__ == "__main__":
    try:
        vectordb = get_or_create_vectorstore(json_file_path, vector_db_path)
    except Exception as e:
        print(f"Application error: {str(e)}")