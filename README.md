# 🏃‍♂️ Mona High School Fitness Tracker

A modern, AI-powered fitness tracking application built for Mona High School students to monitor their exercise activities, receive personalized recommendations, and analyze their fitness patterns.

![Fitness Tracker Dashboard](https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 📊 **Dashboard & Analytics**
- Interactive charts showing weekly calories burned and exercise duration
- Exercise type distribution analysis
- Weekly summary statistics
- Real-time progress tracking

### 📝 **Exercise Logging**
- Easy-to-use form for logging workouts
- Support for 12+ exercise types (Running, Swimming, Yoga, etc.)
- Intensity levels (Low, Medium, High)
- Duration and calorie tracking

### 📈 **Exercise History**
- Complete workout history with filtering
- Visual intensity indicators
- Summary statistics (total calories, duration, average performance)

### 🤖 **AI-Powered Features**
- **Smart Recommendations**: Personalized workout suggestions based on your activity patterns
- **Anomaly Detection**: Identifies unusual patterns in your exercise data
- **Performance Analysis**: AI-driven insights to optimize your fitness routine

### 👥 **Multi-Student Support**
- Switch between different student profiles
- Individual tracking and recommendations for each student

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + React-Chartjs-2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **AI Integration**: Azure Cognitive Services (Personalizer, Anomaly Detector)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mona-fitness-tracker.git
   cd mona-fitness-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Usage

### Logging Exercises
1. Navigate to the "Log Exercise" tab
2. Select your exercise type and intensity
3. Enter duration and estimated calories burned
4. Click "Log Exercise" to save

### Viewing Analytics
- **Dashboard**: Overview of your weekly performance
- **History**: Detailed list of all logged exercises
- **AI Recommendations**: Get personalized workout suggestions
- **Pattern Analysis**: Detect unusual patterns in your exercise data

### AI Features
- **Recommendations**: The AI analyzes your exercise history to suggest optimal workouts
- **Anomaly Detection**: Identifies sessions that deviate from your normal patterns
- **Confidence Scores**: Each AI recommendation includes a confidence percentage

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Dashboard.tsx    # Main dashboard with charts
│   ├── ExerciseForm.tsx # Exercise logging form
│   ├── ExerciseHistory.tsx # Exercise history display
│   ├── AIRecommendations.tsx # AI-powered recommendations
│   └── AnomalyDetection.tsx # Pattern analysis
├── services/            # API services
│   └── api.ts          # HTTP client and mock data
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Color-Coded Intensity**: Visual indicators for exercise intensity levels
- **Interactive Charts**: Hover effects and detailed tooltips

## 🔮 AI Integration

### Recommendation Engine
The AI recommendation system analyzes:
- Exercise frequency and patterns
- Intensity preferences
- Performance trends
- Recovery needs

### Anomaly Detection
Identifies unusual patterns such as:
- Sudden spikes in activity
- Unusual calorie burn rates
- Inconsistent exercise patterns
- Potential data entry errors

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Configure custom domain if needed

### Other Platforms
- **Vercel**: Connect your GitHub repository for automatic deployments
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Azure Static Web Apps**: Deploy directly from GitHub

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Mock Data
The application currently uses mock data for demonstration purposes. In a production environment, you would:
- Set up a backend API (FastAPI recommended)
- Configure Azure Cognitive Services
- Implement proper authentication
- Add data persistence

### Environment Variables
For production deployment, configure:
```env
VITE_API_BASE_URL=your-api-endpoint
VITE_AZURE_PERSONALIZER_ENDPOINT=your-personalizer-endpoint
VITE_AZURE_ANOMALY_DETECTOR_ENDPOINT=your-anomaly-detector-endpoint
```

## 📄 License

This project is licensed under the [Unlicense](LICENSE) - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Mona High School** for the project inspiration
- **Azure Cognitive Services** for AI capabilities
- **Pexels** for stock photography
- **Lucide** for beautiful icons
- **Tailwind CSS** for styling framework

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/YOUR_USERNAME/mona-fitness-tracker/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ for the Azure Community & Skill.Sch to help people achieve their fitness goals and advance AI education and training.**
