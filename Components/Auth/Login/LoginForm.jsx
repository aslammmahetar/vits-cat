import React from "react";
import logo from "../../../app/logo.png";
import Image from "next/image";

const LoginForm = ({ handleSubmit, handleChange, loginData, setIsLogin }) => {
  return (
    <div className="auth-bg-image w-full md:w-1/2 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <Image
          src={logo}
          width={150}
          height={150}
          alt="hero image"
          className="mx-auto mb-10"
        />
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Welcome Back 👋
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          <>
            Don’t have an account?{" "}
            <a
              onClick={() => setIsLogin(false)}
              href="#"
              className="text-green-700 font-semibold hover:underline"
            >
              Register
            </a>
          </>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
