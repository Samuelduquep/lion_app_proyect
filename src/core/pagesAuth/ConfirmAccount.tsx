import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Alert from "antd/es/alert/Alert";

import { useEffect, useState } from "react";

export const ConfirmAccount = () => {
  // const params = useParams();
  // const { id } = params;
  const [msgServer, setMsgServer] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        // const url = `${import.meta.env.VITE_API_URL}/users/confirm/${id}`;
        // const resp = await fetch(url);
        // const result = await resp.json();
        // result && setMsgServer(result.msg)
        setMsgServer(true)
      } catch (error) {
        console.log(error)
        setMsgServer(false)
      }
    };
    confirmAccount();
  }, []);

  return (
    <div>
      <h2>{msgServer ? (
        <Alert
          message="Account Confirmation Successful:"
          description="Your account has been successfully confirmed"
          type="success"
        />
      ) : (
        <Alert
          message="Token Error:"
          description="Token Invalid"
          type="error"
        />
      )}</h2>

      <div className="flex items-center justify-between mt-4">
        <Link to="/" className="flex items-center space-x-2 text-sm font-medium text-purple-700 hover:text-purple-900">
          <ChevronLeftIcon className="h-5 w-5 text-purple-500" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
};

