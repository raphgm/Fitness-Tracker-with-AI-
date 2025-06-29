import React from 'react';
import { Exercise } from '../types';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement 
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  exercises: Exercise[];
}

const Dashboard: React.FC<DashboardProps> = ({ exercises }) => {
  // Prepare data for charts
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyCalories = last7Days.map(date => {
    const dayExercises = exercises.filter(ex => ex.date === date);
    return dayExercises.reduce((sum, ex) => sum + ex.calories, 0);
  });

  const dailyDuration = last7Days.map(date => {
    const dayExercises = exercises.filter(ex => ex.date === date);
    return dayExercises.reduce((sum, ex) => sum + ex.duration, 0);
  });

  const lineChartData = {
    labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Calories Burned',
        data: dailyCalories,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Exercise Duration (minutes)',
        data: dailyDuration,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Exercise type distribution
  const exerciseTypes = exercises.reduce((acc, exercise) => {
    acc[exercise.exercise_name] = (acc[exercise.exercise_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topExercises = Object.entries(exerciseTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Calories Burned</h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Exercise Duration</h3>
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Exercise Types</h3>
          <div className="space-y-3">
            {topExercises.map(([exercise, count]) => (
              <div key={exercise} className="flex items-center justify-between">
                <span className="text-gray-700">{exercise}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${(count / Math.max(...Object.values(exerciseTypes))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Workouts</span>
              <span className="font-semibold text-gray-900">{exercises.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Calories</span>
              <span className="font-semibold text-gray-900">
                {exercises.reduce((sum, ex) => sum + ex.calories, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Duration</span>
              <span className="font-semibold text-gray-900">
                {Math.round(exercises.reduce((sum, ex) => sum + ex.duration, 0) / 60 * 10) / 10} hours
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average per Session</span>
              <span className="font-semibold text-gray-900">
                {exercises.length > 0 
                  ? Math.round(exercises.reduce((sum, ex) => sum + ex.calories, 0) / exercises.length)
                  : 0
                } cal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;