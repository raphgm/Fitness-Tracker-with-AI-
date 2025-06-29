import React, { useState, useEffect } from 'react';
import { BarChart3, History, Brain, Activity, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import ExerciseForm from './components/ExerciseForm';
import ExerciseHistory from './components/ExerciseHistory';
import AIRecommendations from './components/AIRecommendations';
import AnomalyDetection from './components/AnomalyDetection';
import Dashboard from './components/Dashboard';
import { Exercise } from './types';
import { exerciseAPI } from './services/api';

type TabType = 'dashboard' | 'log' | 'history' | 'ai' | 'anomaly';

function App() {
  const [currentStudent, setCurrentStudent] = useState('1');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const data = await exerciseAPI.getExercises(currentStudent);
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [currentStudent]);

  const handleExerciseAdded = (newExercise: Exercise) => {
    setExercises(prev => [newExercise, ...prev]);
  };

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'log' as TabType, label: 'Log Exercise', icon: TrendingUp },
    { id: 'history' as TabType, label: 'History', icon: History },
    { id: 'ai' as TabType, label: 'AI Recommendations', icon: Brain },
    { id: 'anomaly' as TabType, label: 'Pattern Analysis', icon: Activity },
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard exercises={exercises} />;
      case 'log':
        return <ExerciseForm studentId={currentStudent} onExerciseAdded={handleExerciseAdded} />;
      case 'history':
        return <ExerciseHistory exercises={exercises} />;
      case 'ai':
        return <AIRecommendations studentId={currentStudent} />;
      case 'anomaly':
        return <AnomalyDetection exercises={exercises} />;
      default:
        return <Dashboard exercises={exercises} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentStudent={currentStudent} onStudentChange={setCurrentStudent} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default App;