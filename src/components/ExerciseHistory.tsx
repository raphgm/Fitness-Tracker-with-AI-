import React from 'react';
import { Calendar, Clock, Flame, TrendingUp } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseHistoryProps {
  exercises: Exercise[];
}

const ExerciseHistory: React.FC<ExerciseHistoryProps> = ({ exercises }) => {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCalories = exercises.reduce((sum, ex) => sum + ex.calories, 0);
  const totalDuration = exercises.reduce((sum, ex) => sum + ex.duration, 0);
  const averageCaloriesPerMinute = totalDuration > 0 ? (totalCalories / totalDuration).toFixed(1) : '0';

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Exercise History</h2>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-600">Total Calories</span>
          </div>
          <p className="text-2xl font-bold text-primary-700">{totalCalories.toLocaleString()}</p>
        </div>
        
        <div className="bg-success-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-success-600" />
            <span className="text-sm font-medium text-success-600">Total Time</span>
          </div>
          <p className="text-2xl font-bold text-success-700">{totalDuration} min</p>
        </div>
        
        <div className="bg-warning-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-warning-600" />
            <span className="text-sm font-medium text-warning-600">Avg Cal/Min</span>
          </div>
          <p className="text-2xl font-bold text-warning-700">{averageCaloriesPerMinute}</p>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {exercises.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No exercises logged yet. Start by adding your first workout!</p>
          </div>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{exercise.exercise_name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getIntensityColor(exercise.intensity)}`}>
                      {exercise.intensity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{exercise.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="h-4 w-4" />
                      <span>{exercise.calories} cal</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(exercise.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExerciseHistory;