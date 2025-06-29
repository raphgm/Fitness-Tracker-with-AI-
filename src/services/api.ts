import axios from 'axios';
import { Exercise, AIRecommendation, TimeSeriesData, AnomalyDetectionResult } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const exerciseAPI = {
  logExercise: async (exercise: Omit<Exercise, 'id'>): Promise<Exercise> => {
    try {
      const response = await api.post('/exercise', exercise);
      return response.data;
    } catch (error) {
      // Mock response for demo
      return {
        id: Date.now().toString(),
        ...exercise,
      };
    }
  },

  getExercises: async (studentId: string): Promise<Exercise[]> => {
    try {
      const response = await api.get(`/exercises/${studentId}`);
      return response.data;
    } catch (error) {
      // Mock data for demo
      return generateMockExercises(studentId);
    }
  },
};

export const aiAPI = {
  getRecommendations: async (studentId: string): Promise<AIRecommendation[]> => {
    try {
      const response = await api.get(`/recommendations/${studentId}`);
      return response.data;
    } catch (error) {
      // Mock AI recommendations
      return generateMockRecommendations(studentId);
    }
  },

  detectAnomalies: async (data: TimeSeriesData[]): Promise<AnomalyDetectionResult> => {
    try {
      const response = await api.post('/detect-anomalies', { series: data });
      return response.data;
    } catch (error) {
      // Mock anomaly detection
      return generateMockAnomalyDetection(data);
    }
  },
};

// Mock data generators for demo purposes
function generateMockExercises(studentId: string): Exercise[] {
  const exercises = ['Running', 'Push-ups', 'Yoga', 'Swimming', 'Cycling', 'Weight Training'];
  const intensities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    student_id: studentId,
    exercise_name: exercises[Math.floor(Math.random() * exercises.length)],
    duration: Math.floor(Math.random() * 60) + 15,
    calories: Math.floor(Math.random() * 400) + 100,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    intensity: intensities[Math.floor(Math.random() * intensities.length)],
  }));
}

function generateMockRecommendations(studentId: string): AIRecommendation[] {
  const recommendations = [
    {
      exercise_type: 'Cardio',
      duration: 30,
      intensity: 'medium',
      reason: 'Based on your recent activity, cardio will help improve your endurance',
      confidence_score: 0.85,
    },
    {
      exercise_type: 'Strength Training',
      duration: 45,
      intensity: 'high',
      reason: 'Your muscle development could benefit from strength training',
      confidence_score: 0.78,
    },
    {
      exercise_type: 'Yoga',
      duration: 20,
      intensity: 'low',
      reason: 'Recovery and flexibility work recommended after intense sessions',
      confidence_score: 0.92,
    },
  ];

  return recommendations.map((rec, i) => ({
    id: (i + 1).toString(),
    student_id: studentId,
    ...rec,
  }));
}

function generateMockAnomalyDetection(data: TimeSeriesData[]): AnomalyDetectionResult {
  return {
    isAnomaly: data.map(() => Math.random() > 0.8),
    severity: data.map(() => Math.random()),
    expectedValues: data.map(d => d.value + (Math.random() - 0.5) * 50),
    timestamps: data.map(d => d.timestamp),
  };
}