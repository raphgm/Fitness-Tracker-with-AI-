import React from 'react';
import { Activity, User } from 'lucide-react';

interface HeaderProps {
  currentStudent: string;
  onStudentChange: (studentId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentStudent, onStudentChange }) => {
  const students = [
    { id: '1', name: 'Raphael Gab-Momoh' },
    { id: '2', name: 'Imoh Etuk' },
    { id: '3', name: 'Promise Uche' },
    { id: '4', name: 'Emma Davis' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Mona High School</h1>
              <p className="text-sm text-gray-600">Fitness Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <select
                value={currentStudent}
                onChange={(e) => onStudentChange(e.target.value)}
                className="input-field max-w-xs"
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;