# Ultimate Step-by-Step Guide to Build Mona High School Fitness Tracker with AI in VS Code




This guide provides **every single command and configuration** needed to build the Mona High School Fitness Tracker with **AI enhancements** using **VS Code**.

---

##  Pre-Setup (One-Time)

### 1. Install Required Tools
Run these commands in **PowerShell (Windows)** or **Terminal (Mac/Linux)**:

```bash
# Install Node.js & npm (Frontend)
winget install OpenJS.NodeJS.LTS  # Windows
brew install node                 # Mac


# Install Python (Backend)
winget install Python.Python.3.10  # Windows
brew install python               # Mac


# Install Git
winget install Git.Git            # Windows
brew install git                  # Mac
```

## 2. Install VS Code Extensions

Open **Visual Studio Code** and install the following extensions:

- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) *(by Microsoft)*
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) *(by Dirk Baeumer)*
- [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) *(by Microsoft)*
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) *(by Microsoft)*
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) *(for API testing)*

> 💡 Tip: Use `Ctrl+Shift+P` and search for `Extensions: Install Extensions` to quickly open the Extensions view.
---
## Work in VS Code  

##  Step 1: Clone & Open Project in VS Code

Open a terminal and run the following commands:

```bash
git clone https://github.com/microsoft/community-content.git
cd community-content/S4-SeasonOfAgents/mona-high-school-fitness-tracker
code .  # Opens VS Code in this folder
```




## Step 2: Backend Setup (Python + FastAPI)


### 1. Create and Activate Virtual Environment

**Windows (PowerShell):**
```bash
python -m venv venv
.\venv\Scripts\activate
````

**Mac/Linux:**

```bash
python -m venv venv
source venv/bin/activate
```

---

### 2. Install Dependencies

```bash
pip install fastapi uvicorn python-dotenv azure-identity azure-keyvault-secrets pydantic azure-ai-personalizer
```

---

### 3. Create `server/recommendation.py` and Add the Following Code

```python
from fastapi import FastAPI
from pydantic import BaseModel
from azure.identity import DefaultAzureCredential
from azure.ai.personalizer import PersonalizerClient

app = FastAPI()

class Exercise(BaseModel):
    student_id: str
    exercise_name: str
    duration: float
    calories: float

# AI-Powered Recommendation Engine
def get_ai_recommendation(student_id: str):
    credential = DefaultAzureCredential()
    client = PersonalizerClient(
        endpoint="https://<your-personalizer>.cognitiveservices.azure.com",
        credential=credential
    )
    actions = [
        {"id": "running", "features": {"intensity": "high"}},
        {"id": "yoga", "features": {"intensity": "low"}}
    ]
    response = client.rank(actions=actions, context_features={"user": student_id})
    return response

@app.post("/exercise")
async def log_exercise(exercise: Exercise):
    recommendation = get_ai_recommendation(exercise.student_id)
    return {"exercise": exercise, "ai_recommendation": recommendation}

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered Recommendation API"}
```

---

### 4. Run the FastAPI Server

```bash
uvicorn recommendation:app --reload
```

Visit: [http://localhost:8000/docs](http://localhost:8000/docs) to test the API using Swagger UI.

```


```


## Step 3: Frontend Setup (React + TypeScript)

### 1. Initialize React App

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
npm install axios
npm install -g npm@latest
npm install axios @azure/msal-react @mui/material @mui/icons-material chart.js react-chartjs-2 @azure/ai-anomaly-detector
````

---

### 2. Modify `src/App.jx`

```tsx
import axios from "axios";

// Azure Anomaly Detector Configuration
const endpoint = "https://anomalyd.cognitiveservices.azure.com/anomalydetector/v1.1/timeseries/entire/detect";
const apiKey = "7F4B5pFWDbR4F3ZaBPNggAs74MqiVIU6vgeFml6Rl86t6yZzUOIFJQQJ99BFACYeBjFXJ3w3AAAEACOGFYBw";

export async function detectAnomaly(series) {
  const headers = {
    "Ocp-Apim-Subscription-Key": apiKey,
    "Content-Type": "application/json"
  };
  
  const data = {
    series: series,
    granularity: "daily",
    maxAnomalyRatio: 0.25,
    sensitivity: 95
  };

  try {
    const response = await axios.post(endpoint, data, { headers });
    return {
      isAnomaly: response.data.isAnomaly,
      severity: response.data.severity,
      expectedValues: response.data.expectedValues,
      timestamps: series.map(item => item.timestamp)
    };
  } catch (error) {
    console.error("API Error Details:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      endpoint: endpoint,
      payload: data
    });
    throw new Error(`Detection failed: ${error.response?.status || 'No status'} - ${error.response?.data?.message || error.message}`);
  }
}
```

---

### 3. Run the React App

```bash
npm start
```

> Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## Step 4: AI Integration (Azure Cognitive Services)

### 1. Set Up Azure AI Services

* Go to [Azure Portal](https://portal.azure.com)
* Navigate to: **Create Resource → AI + Machine Learning → Personalizer**
* Copy the **Endpoint** and **Key**
* Update your `main.py` backend file with these credentials

---

### 2. Add AI Anomaly Detection

Add the following to `App.css`:

```tsx

.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.detect-button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.detect-button:disabled {
  background: #cccccc;
}

.error-message {
  color: #d13438;
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #d13438;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.anomaly-row {
  background-color: #fff4ce;
}
```

---


## Step 5: Deploy to Azure

### 1. Deploy Backend (Azure App Service)

```bash
az webapp up --sku F1 --name mona-fitness-api --runtime "PYTHON:3.10"
````

### 2. Deploy Frontend (Azure Static Web Apps)

```bash
cd client
npm run build
swa deploy --app-name mona-fitness-app --env production
```

---


##  Final Checks

- **Test API:**  
  [http://<your-api>.azurewebsites.net/docs](http://<your-api>.azurewebsites.net/docs)

- **Test Frontend:**  
  [https://<your-app>.azurestaticapps.net](https://<your-app>.azurestaticapps.net)

- **Verify AI Functionality:**  
  Check backend logs for AI-generated **recommendations** and **anomaly detection results**.
  




