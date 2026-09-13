# 🧠 Mindexia — Mental Health Score Prediction

<p align="center">
  <strong>An AI-powered web application for predicting mental health scores using Machine Learning</strong>
</p>

<p align="center">
  <em>Turning behavioral, academic, lifestyle, and social-media factors into an ML-based mental health score.</em>
</p>

---

## 🌐 Overview

**Mindexia** is a full-stack Machine Learning web application designed to predict a student's **Mental Health Score** based on several academic, lifestyle, stress-related, and social-media usage factors.

The application provides an interactive assessment where users enter information such as:

- Age
- Gender
- Country
- Academic level
- Most-used social media platform
- Purpose of social media usage
- Daily social media usage
- Daily phone unlocks
- Study hours
- Physical activity
- Sleep duration
- Stress level

The collected information is sent from the React frontend to a **FastAPI backend**, where it is processed using the same preprocessing pipeline used during model training.

A trained **Random Forest Regression model** then predicts the user's mental health score, which is returned to the frontend and displayed through an interactive result page.

---

# ✨ Features

- 🧠 Machine Learning-based mental health score prediction
- 📋 Interactive multi-step assessment
- 🎨 Modern animated user interface
- ⚡ Fast and lightweight React frontend
- 🚀 FastAPI REST backend
- 🔗 Frontend-to-backend API integration
- 🌲 Random Forest Regression model
- 📊 Integrated Scikit-learn preprocessing pipeline
- 🔐 Pydantic-based request validation
- 💾 Joblib model serialization
- 📱 Responsive design
- 🔄 Assessment restart functionality
- 📈 Interactive prediction result
- 🌐 Ready for cloud deployment

---

# 🏗️ System Architecture

```text
                         ┌───────────────────────────┐
                         │        USER               │
                         │   Completes Assessment    │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │      React Frontend       │
                         │                           │
                         │  Assessment.jsx           │
                         │  Result.jsx               │
                         │  api.js                   │
                         └─────────────┬─────────────┘
                                       │
                                  HTTP POST
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │      FastAPI Backend      │
                         │                           │
                         │       /predict            │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │    ML Preprocessing       │
                         │                           │
                         │  • StandardScaler        │
                         │  • OrdinalEncoder        │
                         │  • OneHotEncoder          │
                         │  • log1p transformation   │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │  Random Forest Regressor  │
                         │                           │
                         │  n_estimators = 200       │
                         │  max_depth = 15           │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │ Predicted Mental Health   │
                         │          Score            │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │       Result.jsx          │
                         │                           │
                         │   Displays Prediction     │
                         └───────────────────────────┘
📂 Project Structure
MINDEXIA/
│
├── backend/
│   ├── main.py
│   ├── Mental_Health_Model.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── NumberField.jsx
│   │   │   ├── PlatformSelector.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── SelectField.jsx
│   │   │   ├── SliderField.jsx
│   │   │   ├── StepContainer.jsx
│   │   │   ├── StressSelector.jsx
│   │   │   └── TransitionVeil.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Welcome.jsx
│   │   │   ├── Assessment.jsx
│   │   │   └── Result.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── constants.js
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
├── .python-version
└── README.md
🤖 Machine Learning
Dataset

The Machine Learning model was trained using a dataset containing:

5,000 records
13 features

The dataset contains information related to students' social-media usage and mental health.

Dataset Features
Feature	Description
Age	Student age
Gender	Student gender
Country	Student country/group
Academic_Level	Academic level
Most_Used_Platform	Most-used social media platform
Purpose_Of_Use	Main purpose of social media usage
Avg_Daily_Usage_Hours	Average daily social media usage
Daily_Unlocks	Number of daily device unlocks
Study_Hours	Daily study hours
Physical_Activity_Hours	Physical activity hours
Sleep_Hours_Per_Night	Average sleep duration
Stress_Level	Reported stress level
Mental_Health_Score	Target variable
🎯 Prediction Target

The model predicts:

Mental_Health_Score

The model treats this as a regression problem, meaning the output is a continuous numerical score rather than a classification label.

For example:

Predicted Mental Health Score: 7.24

The exact prediction depends on the information entered by the user.

⚙️ Data Preprocessing

Different preprocessing techniques are applied according to the type of feature.

Numerical Features

The following numerical features are standardized using StandardScaler:

Age
Avg_Daily_Usage_Hours
Daily_Unlocks
Physical_Activity_Hours
Sleep_Hours_Per_Night
Study Hours Transformation

Study_Hours is transformed using a logarithmic transformation:

log1p()

and then standardized.

This transformation helps reduce the effect of skewness in the feature distribution.

Stress Level Encoding

Stress levels are ordinal and therefore encoded according to their natural order:

Low        → 0
Medium     → 1
High       → 2
Very High  → 3

This is implemented using Scikit-learn's OrdinalEncoder.

Categorical Features

The following categorical variables are processed using OneHotEncoder:

Gender
Academic_Level
Most_Used_Platform
Purpose_Of_Use
Grouped_country

Unknown categories are handled using:

OneHotEncoder(handle_unknown="ignore")
🌍 Country Grouping

The original dataset contains multiple countries.

For the Machine Learning pipeline, the major country groups used are:

India
USA
Canada
Australia
UK
Germany
Mexico
Turkey
France
Other

Countries outside the selected groups are represented by:

Other

This same set of country groups is used by the Mindexia frontend assessment.

🌲 Machine Learning Model

Mindexia uses a:

Random Forest Regressor

The trained model uses:

n_estimators = 200
max_depth = 15
random_state = 42

The complete preprocessing and Machine Learning pipeline is saved using Joblib:

joblib.dump(
    rf_best_pipeline,
    "Mental_Health_Model.pkl"
)

The FastAPI backend loads this serialized pipeline and uses it to generate predictions.

📊 Model Performance

The trained model achieved the following approximate test-set performance:

Metric	Value
R² Score	0.873
MAE	0.358
MSE	0.224
RMSE	0.473
Interpretation

An R² score of approximately 0.87 indicates that the model explains a substantial portion of the variation in the target variable within the evaluated dataset.

The MAE of approximately 0.36 means that, on average, the prediction differs from the actual target by around 0.36 score units on the evaluation data.

These metrics describe performance on the project's dataset and should not be interpreted as clinical validation.

💻 Frontend

The frontend is built using:

React
Vite
JavaScript
Tailwind CSS
Framer Motion

The application follows a multi-page assessment flow.

Main Pages
1. Welcome

Introduces the Mindexia platform and allows the user to begin the assessment.

2. Assessment

Collects the required information through a multi-step interactive form.

3. Result

Displays the predicted mental health score after receiving the response from the backend.

🔌 API Integration

The frontend communicates with the backend using a dedicated API service:

frontend/src/services/api.js

The prediction request is sent to:

POST /predict
📡 API Request
Endpoint
POST /predict
Request Body
{
  "age": 21,
  "gender": "Female",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 5,
  "daily_unlocks": 120,
  "study_hours": 4,
  "physical_activity_hours": 1.5,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}
📤 API Response

Example:

{
  "predicted_mental_health_score": 7.24
}

The actual score will vary depending on the submitted assessment data.

🛡️ Backend Validation

The FastAPI backend uses Pydantic models to validate incoming data.

Examples of validation include:

Age range validation
Numeric field validation
Allowed gender values
Allowed country values
Allowed academic levels
Allowed social media platforms
Allowed purposes
Allowed stress levels

This prevents invalid values from being passed directly to the Machine Learning model.

🔄 Application Flow
1. User opens Mindexia
          ↓
2. User starts assessment
          ↓
3. User enters personal/academic/lifestyle information
          ↓
4. React stores the assessment data
          ↓
5. api.js creates the API payload
          ↓
6. POST request is sent to FastAPI
          ↓
7. FastAPI validates the request
          ↓
8. ML preprocessing pipeline transforms the input
          ↓
9. Random Forest generates prediction
          ↓
10. FastAPI returns the predicted score
          ↓
11. React receives the response
          ↓
12. Result page displays the prediction
🛠️ Tech Stack
Frontend
Technology	Purpose
React	User Interface
Vite	Development & Build Tool
JavaScript	Application Logic
Tailwind CSS	Styling
Framer Motion	Animations
Backend
Technology	Purpose
Python 3.13.5	Backend & ML Environment
FastAPI	REST API
Uvicorn	ASGI Server
Pydantic	Data Validation
Pandas	Data Processing
Joblib	Model Loading
Machine Learning
Technology	Purpose
Scikit-learn 1.6.1	Machine Learning & Preprocessing
Random Forest Regressor	Prediction
StandardScaler	Numerical Feature Scaling
OrdinalEncoder	Stress Level Encoding
OneHotEncoder	Categorical Feature Encoding
💻 Local Installation
Prerequisites

Make sure the following are installed:

Python 3.13.5
Node.js
npm
Git
1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>

Then enter the project:

cd MINDEXIA
🐍 Backend Setup
2. Create Virtual Environment

From the project root:

Windows
py -3.13 -m venv venv

Activate it:

venv\Scripts\activate

After activation, the terminal should show:

(venv)
3. Install Backend Dependencies

Move into the backend folder:

cd backend

Install the required Python packages:

pip install -r requirements.txt
4. Start the FastAPI Server

Run:

uvicorn main:app --reload

The backend will be available at:

http://127.0.0.1:8000
5. Open FastAPI Documentation

FastAPI provides an interactive Swagger UI.

Open:

http://127.0.0.1:8000/docs

From there, the /predict endpoint can be tested directly.

⚛️ Frontend Setup

Open a new terminal while keeping the FastAPI server running.

Move to the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173
🔐 Environment Variables

The frontend supports configuring the backend API URL through:

VITE_API_BASE_URL
Local Development

Create a .env file inside:

frontend/

and add:

VITE_API_BASE_URL=http://127.0.0.1:8000
Production

For deployment, the value should point to the publicly deployed FastAPI backend.

Example:

VITE_API_BASE_URL=https://your-mindexia-api-url

Do not commit .env files containing private credentials or secrets to GitHub.

🌐 Deployment

Mindexia can be deployed using separate hosting services for the frontend and backend.

Recommended Architecture
                     GitHub Repository
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
              Vercel                 Render
                 │                     │
                 ▼                     ▼
        React Frontend          FastAPI Backend
                                       │
                                       ▼
                              ML Model Pipeline
                                       │
                                       ▼
                              Mental_Health_Model.pkl
Frontend

Recommended platform:

Vercel

Backend

Recommended platform:

Render

The frontend communicates with the deployed FastAPI backend through the VITE_API_BASE_URL environment variable.

📸 Screenshots

Add screenshots of the application here after deployment.

Landing Page
Add your landing page screenshot here.
Assessment Page
Add your assessment page screenshot here.
Result Page
Add your result page screenshot here.

Example Markdown:

![Mindexia Landing Page](screenshots/landing.png)

![Mindexia Assessment](screenshots/assessment.png)

![Mindexia Result](screenshots/result.png)
🚀 Future Improvements

The project can be extended with several additional features:

📊 More detailed prediction analytics
💡 Personalized wellness suggestions
📈 Historical prediction tracking
👤 User authentication
🗄️ Database integration
🔍 Model explainability
📚 Additional Machine Learning models
⚖️ Model comparison and benchmarking
🔄 Continuous model retraining
📱 Improved mobile experience
🔐 Production-level API security
🧪 Automated testing
🚀 CI/CD pipeline
☁️ Full cloud deployment
🧠 Important Disclaimer

Mindexia is an educational Machine Learning project and is not a medical or clinical diagnostic system.

The predicted score is generated using patterns learned from the project's dataset. It should not be interpreted as a medical diagnosis, psychological evaluation, or professional mental-health assessment.

The prediction should not be used as a substitute for professional medical or mental-health advice.

If someone is experiencing significant mental-health difficulties, they should seek support from a qualified healthcare or mental-health professional.

🎓 Academic Context

Mindexia was developed as a Machine Learning and full-stack application project to demonstrate the integration of:

Machine Learning
       +
Data Preprocessing
       +
Python
       +
FastAPI
       +
REST APIs
       +
React
       +
Modern UI/UX

The project demonstrates how a trained Machine Learning model can be transformed into an interactive web application accessible through a user-friendly interface.

👩‍💻 Author
Toa

B.Tech — Artificial Intelligence & Machine Learning

Narula Institute of Technology

⭐ Acknowledgements

This project uses the following open-source technologies:

React
Vite
Tailwind CSS
Framer Motion
FastAPI
Uvicorn
Pandas
Scikit-learn
Joblib
📄 License

This project is intended primarily for educational and portfolio purposes.

If you plan to distribute or modify this project publicly, add an appropriate open-source license such as the MIT License.
```
#   M i n d e x i a  
 