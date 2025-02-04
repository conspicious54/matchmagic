import { useAuth } from './AuthContext';

export function AuthTest() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <p className="text-gray-300">Loading authentication state...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-900/50 p-4 rounded-lg shadow-lg">
        <p className="text-green-300">✓ Authenticated as {user.email}</p>
        <p className="text-xs text-green-400 mt-1">User ID: {user.id}</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/50 p-4 rounded-lg shadow-lg">
      <p className="text-gray-300">Not authenticated</p>
    </div>
  );
}