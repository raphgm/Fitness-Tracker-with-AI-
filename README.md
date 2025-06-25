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

### 3. Create `server/main.py` and Add the Following Code

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
```

---

### 4. Run the FastAPI Server

```bash
uvicorn main:app --reload
```

Visit: [http://localhost:8000/docs](http://localhost:8000/docs) to test the API using Swagger UI.

```


```

Here is your full **Markdown rewrite** of the React + TypeScript frontend setup and Azure AI integration, all formatted as a clean single-sheet reference:


## Step 3: Frontend Setup (React + TypeScript)

### 1. Initialize React App

```bash
npx create-react-app client --template typescript
cd client
npm install axios @azure/msal-react @mui/material @mui/icons-material chart.js react-chartjs-2 @azure/ai-anomaly-detector
````

---

### 2. Modify `src/App.tsx`

```tsx
import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { Bar } from 'react-chartjs-2';

const FitnessTracker = () => {
  const { instance } = useMsal();
  const [exercise, setExercise] = useState({ name: "", duration: 0, calories: 0 });

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:8000/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        student_id: instance.getActiveAccount()?.username,
        ...exercise 
      })
    });
    const data = await response.json();
    console.log("AI Recommendation:", data.ai_recommendation);
  };

  return (
    <div>
      <input 
        placeholder="Exercise" 
        onChange={(e) => setExercise({...exercise, name: e.target.value})} 
      />
      <button onClick={handleSubmit}>Submit</button>
      <Bar data={{ labels: ["Calories"], datasets: [{ data: [exercise.calories] }] }} />
    </div>
  );
};

export default FitnessTracker;
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

Add the following to `App.tsx`:

```tsx
import { AnomalyDetectorClient } from "@azure/ai-anomaly-detector";
import { DefaultAzureCredential } from "@azure/identity";

const detectAnomaly = async (calories: number[]) => {
  const client = new AnomalyDetectorClient("<endpoint>", new DefaultAzureCredential());
  const response = await client.detectEntireSeries({ 
    series: calories.map(c => ({ value: c })) 
  });
  return response.isAnomaly;
};
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
  




