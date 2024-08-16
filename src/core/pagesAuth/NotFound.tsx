import Alert from "antd/es/alert/Alert";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export const NotFound: React.FC = () => (
  <div>
    <Alert
      description="Route not found"
      type="error"
    />
    <div className="flex items-center justify-between mt-4">
      <Link to="/" className="flex items-center space-x-2 text-sm font-medium text-purple-700 hover:text-purple-900">
        <ChevronLeftIcon className="h-5 w-5 text-purple-500" />
        <span>Back to Login</span>
      </Link>
    </div>
  </div>

);

