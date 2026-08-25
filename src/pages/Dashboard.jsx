import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);

    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to Dashboard 🎉</h1>

      <p>
        You are successfully logged in.
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
