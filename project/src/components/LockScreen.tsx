import React, { useState } from 'react';
import { Lock, Terminal } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Set your password here
  const correctPassword = 'uprising2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      onUnlock();
    } else {
      setError('ACCESS DENIED - Invalid credentials');
      setAttempts(prev => prev + 1);
      setPassword('');
      
      // Add a delay after failed attempts
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-sm p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Lock size={48} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-mono text-green-400 mb-2">
            SILENT_UPRISING
          </h1>
          <p className="text-sm font-mono text-gray-400">
            SECURE ACCESS REQUIRED
          </p>
          <div className="mt-4 text-xs font-mono text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <Terminal size={12} />
              <span>Unauthorized access is prohibited</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2">
              ENTER_PASSPHRASE:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-gray-900 border border-gray-600 rounded-sm px-4 py-3 text-sm font-mono text-green-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              autoFocus
              required
            />
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-sm p-3">
              <p className="text-red-400 font-mono text-xs text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-black font-mono text-sm py-3 px-4 rounded-sm transition-colors font-bold"
          >
            AUTHENTICATE
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="text-xs font-mono text-gray-500 space-y-1">
            <p>Failed attempts: {attempts}</p>
            <p className="text-gray-600">
              "The revolution will not be televised"
            </p>
          </div>
        </div>

      
      </div>
    </div>
  );
};