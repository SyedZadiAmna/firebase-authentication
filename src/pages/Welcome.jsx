import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { CheckCircle } from "lucide-react";

export default function Welcome() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(timer); // agar component hat jaye to timer cancel ho jaye
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="text-center animate-pulse">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {currentUser?.email}!
        </h1>
        <p className="text-gray-500">Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}