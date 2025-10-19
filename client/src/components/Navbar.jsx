import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
        Online LMS
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/courses" className="hover:text-blue-600">
          Courses
        </Link>

        {token ? (
          <>
            {role === "instructor" && (
              <Link to="/org-dashboard" className="hover:text-blue-600">
                Org Dashboard
              </Link>
            )}
            {role === "student" && (
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
