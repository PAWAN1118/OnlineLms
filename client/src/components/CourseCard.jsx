import { Link } from 'react-router-dom';

export default function CourseCard({ course, onEnroll }) {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <Link to={`/courses/${course._id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
        {onEnroll && (
          <button onClick={() => onEnroll(course._id)} className="ml-2">
            Enroll
          </button>
        )}
      </div>
    </div>
  );
}
