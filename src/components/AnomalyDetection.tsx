import React, { useState } from 'react';
import { AlertTriangle, Activity, Loader2, CheckCircle } from 'lucide-react';
import { Exercise, TimeSeriesData, AnomalyDetectionResult } from '../types';
import { aiAPI } from '../services/api';

interface AnomalyDetectionProps {
  exercises: Exercise[];
}

const AnomalyDetection: React.FC<AnomalyDetectionProps> = ({ exercises }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [anomalyResult, setAnomalyResult] = useState<AnomalyDetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeAnomalies = async () => {
    if (exercises.length < 5) {
      setError('Need at least 5 exercise records for anomaly detection');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert exercises to time series data
      const timeSeriesData: TimeSeriesData[] = exercises
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(exercise => ({
          timestamp: exercise.date,
          value: exercise.calories,
        }));

      const result = await aiAPI.detectAnomalies(timeSeriesData);
      setAnomalyResult(result);
    } catch (err) {
      setError('Failed to analyze anomalies. Please try again.');
      console.error('Anomaly detection error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getAnomalyCount = () => {
    if (!anomalyResult) return 0;
    return anomalyResult.isAnomaly.filter(Boolean).length;
  };

  const getAnomalyExercises = () => {
    if (!anomalyResult) return [];
    
    return exercises
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter((_, index) => anomalyResult.isAnomaly[index])
      .map((exercise, originalIndex) => ({
        ...exercise,
        severity: anomalyResult.severity[originalIndex],
        expectedValue: anomalyResult.expectedValues[originalIndex],
      }));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Anomaly Detection</h2>
        </div>
        
        <button
          onClick={analyzeAnomalies}
          disabled={isAnalyzing || exercises.length < 5}
          className="btn-primary flex items-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Activity className="h-4 w-4" />
              <span>Analyze Patterns</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {exercises.length < 5 && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-700">
              Need at least 5 exercise records for accurate anomaly detection. 
              Current records: {exercises.length}
            </span>
          </div>
        </div>
      )}

      {anomalyResult && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Normal Patterns</span>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {anomalyResult.isAnomaly.length - getAnomalyCount()}
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-600">Anomalies Detected</span>
              </div>
              <p className="text-2xl font-bold text-red-700">{getAnomalyCount()}</p>
            </div>
          </div>

          {getAnomalyCount() > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Unusual Activity Patterns</h3>
              <div className="space-y-2">
                {getAnomalyExercises().map((exercise, index) => (
                  <div key={exercise.id} className="border border-red-200 bg-red-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-red-900">{exercise.exercise_name}</span>
                        <span className="text-sm text-red-700 ml-2">
                          on {new Date(exercise.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-red-700">
                          Actual: {exercise.calories} cal
                        </div>
                        <div className="text-sm text-red-600">
                          Expected: ~{Math.round(exercise.expectedValue || 0)} cal
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Analysis Complete</h4>
                <p className="text-sm text-blue-700 mt-1">
                  {getAnomalyCount() === 0 
                    ? "Great! Your exercise patterns look consistent and healthy."
                    : `Found ${getAnomalyCount()} unusual pattern(s). Consider reviewing these sessions - they might indicate overexertion or data entry errors.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnomalyDetection;