import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { LogOut, CheckCircle, LayoutDashboard, Settings, Users } from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && showWelcome) {
        setShowWelcome(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showWelcome]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // email ka pehla letter nikaal kar avatar mein dikhayenge
  const firstLetter = currentUser?.email?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-slate-900 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-white tracking-wide">MyApp</h1>
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
            {firstLetter}
          </div>
          <button
            onClick={handleLogout}
            disabled={showWelcome}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-65px)] bg-slate-900 text-slate-300">
          <nav className="flex-1 px-3 py-6 space-y-1">
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 text-sm font-medium transition cursor-pointer">
              <Users className="h-4 w-4" />
              Users
            </a>
            <a className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 text-sm font-medium transition cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h2>
          <p className="text-slate-500 mb-8">Overview of your account activity</p>

          {/* Sample stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-slate-800">1,204</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-1">Active Sessions</p>
              <p className="text-2xl font-bold text-slate-800">87</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <p className="text-sm text-slate-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-slate-800">$4,320</p>
            </div>
          </div>
        </main>
      </div>

      {/* Welcome Popup */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center text-center p-8 relative">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4">
              <CheckCircle className="h-7 w-7 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Welcome!
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              You have successfully logged in.
            </p>

            <button
              onClick={() => setShowWelcome(false)}
              autoFocus
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-8 py-2.5 rounded-lg transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}