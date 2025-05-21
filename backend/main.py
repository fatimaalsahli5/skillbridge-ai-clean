import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import openai
import docx2txt
import fitz  # PyMuPDF
from openai import OpenAI
import re
import json

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

app = FastAPI()

def extract_text_from_docx(file_path):
    return docx2txt.process(file_path)

def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def generate_ai_analysis(resume_text):
    prompt = f"""
Analyze the following resume content and return a structured JSON object with the following format:

{{
  "skills": [
    {{
      "name": "Skill name",
      "level": 1-5,
      "category": "technical" | "soft" | "language"
    }}
  ],
  "strengths_opportunities": [
    {{
      "title": "Strength or Opportunity title",
      "description": "Detailed explanation of this strength or opportunity"
    }}
  ],
  "job_suggestions": [
    {{
      "title": "Suggested Job Title",
      "matchScore": 0-100,
      "description": "Reason why this job fits the profile"
    }}
  ],
  "missing_skills": [
    "Skill 1",
    "Skill 2"
  ],
  "skill_gaps": [
    {{
      "skill": "Skill name",
      "importance": 1-5,
      "resources": [
        {{
          "title": "Resource Title",
          "url": "https://example.com",
          "platform": "Coursera" | "Udemy" | etc.
        }}
      ]
    }}
  ],
  "learning_plan": [
    {{
      "skill": "Skill name",
      "estimatedTimeWeeks": 2,
      "difficulty": "beginner" | "intermediate" | "advanced",
      "resources": [
        {{
          "title": "Learning Resource Title",
          "url": "https://example.com",
          "platform": "Udemy" | "YouTube" | etc.
        }}
      ]
    }}
  ],
  "linkedin_summary": "A professional and compelling LinkedIn summary based on the resume"
}}

Resume Content:
{resume_text}

Return **only valid JSON**. Do not include explanations or markdown. Ensure the JSON is complete and parsable.

"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=3000
    )

    result = response.choices[0].message.content
    cleaned_content = re.sub(r"```json|```", "", result).strip()
    
    try:
        result_json = json.loads(cleaned_content)
    except json.JSONDecodeError:
        result_json = {"error": "Failed to parse JSON from AI response", "raw": cleaned_content}

    return result_json


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1].lower()
    file_path = f"temp.{ext}"
    
    with open(file_path, "wb") as f:
        f.write(await file.read())

    if ext == "pdf":
        resume_text = extract_text_from_pdf(file_path)
    elif ext in ["docx", "doc"]:
        resume_text = extract_text_from_docx(file_path)
    else:
        return JSONResponse(content={"error": "Unsupported file type"}, status_code=400)

    result_json = generate_ai_analysis(resume_text)

    return result_json




from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
