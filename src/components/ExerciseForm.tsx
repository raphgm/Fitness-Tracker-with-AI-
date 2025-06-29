import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseFormProps {
  studentId: string;
  onExerciseAdded: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ studentId, onExerciseAdded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    exercise_name: '',
    duration: '',
    calories: '',
    intensity: 'medium' as 'low' | 'medium' | 'high',
  });

  const exerciseOptions = [
    'Running', 'Walking', 'Cycling', 'Swimming', 'Push-ups', 'Pull-ups',
    'Squats', 'Yoga', 'Weight Training', 'Basketball', 'Soccer', 'Tennis'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const exercise: Omit<Exercise, 'id'> = {
        student_id: studentId,
        exercise_name: formData.exercise_name,
        duration: parseInt(formData.duration),
        calories: parseInt(formData.calories),
        date: new Date().toISOString().split('T')[0],
        intensity: formData.intensity,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newExercise: Exercise = {
        id: Date.now().toString(),
        ...exercise,
      };

      onExerciseAdded(newExercise);
      
      // Reset form
      setFormData({
        exercise_name: '',
        duration: '',
        calories: '',
        intensity: 'medium',
      });
    } catch (error) {
      console.error('Error logging exercise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Plus className="h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-900">Log New Exercise</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Exercise Type</label>
            <select
              name="exercise_name"
              value={formData.exercise_name}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select an exercise</option>
              {exerciseOptions.map((exercise) => (
                <option key={exercise} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Intensity</label>
            <select
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="input-field"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="label">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              max="300"
              required
              className="input-field"
              placeholder="30"
            />
          </div>

          <div>
            <label className="label">Calories Burned</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="1"
              max="2000"
              required
              className="input-field"
              placeholder="200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Logging Exercise...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Log Exercise</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ExerciseForm;