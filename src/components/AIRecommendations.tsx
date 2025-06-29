import React, { useState, useEffect } from 'react';
import { Brain, Star, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { AIRecommendation } from '../types';
import { aiAPI } from '../services/api';

interface AIRecommendationsProps {
  studentId: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ studentId }) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const data = await aiAPI.getRecommendations(studentId);
        setRecommendations(data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [studentId]);

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'high': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case 'low': return <TrendingUp className="h-4 w-4 text-green-500" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Generating AI recommendations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">AI-Powered Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900">{rec.exercise_type}</h3>
                  {getIntensityIcon(rec.intensity)}
                  <span className="text-sm text-gray-600">({rec.intensity} intensity)</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{rec.duration} minutes</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700">{rec.reason}</p>
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(rec.confidence_score)}`}>
                  {Math.round(rec.confidence_score * 100)}%
                </span>
              </div>
            </div>
            
            <button className="btn-primary text-sm">
              Add to Workout Plan
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">How AI Recommendations Work</h4>
            <p className="text-sm text-blue-700 mt-1">
              Our AI analyzes your exercise history, performance patterns, and fitness goals to suggest 
              personalized workouts that will help you achieve optimal results while preventing overtraining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;