export interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
}

export interface Exercise {
  id: string;
  student_id: string;
  exercise_name: string;
  duration: number; // in minutes
  calories: number;
  date: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface FitnessGoal {
  id: string;
  student_id: string;
  goal_type: 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_fitness';
  target_value: number;
  current_value: number;
  deadline: string;
  created_at: string;
}

export interface AIRecommendation {
  id: string;
  student_id: string;
  exercise_type: string;
  duration: number;
  intensity: string;
  reason: string;
  confidence_score: number;
}

export interface AnomalyDetectionResult {
  isAnomaly: boolean[];
  severity: number[];
  expectedValues: number[];
  timestamps: string[];
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}