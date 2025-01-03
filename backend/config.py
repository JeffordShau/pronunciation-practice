# Description: Configuration file for the backend
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    AZURE_SPEECH_KEY = os.getenv('AZURE_SPEECH_KEY')
    AZURE_SPEECH_REGION = os.getenv('AZURE_SPEECH_REGION')