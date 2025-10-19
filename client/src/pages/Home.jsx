import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-blue-50 py-20 text-center">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to SmartLMS
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Learn from the best instructors anytime, anywhere.
      </p>
      <div className="space-x-4">
        <Link to="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Explore Courses
        </Link>
        <Link to="/login" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
          Login
        </Link>
      </div>
    </div>
  );
}
