import React from 'react';
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Sign up</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent/90">
              Login
            </Link>
          </p>
        </div>
        {/* Signup form will be implemented here */}
      </div>
    </div>
  );
};

export default Signup;
