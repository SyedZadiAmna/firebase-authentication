import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContextObject";

export function AuthProvider({ children }) {
  const [currentUser, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}