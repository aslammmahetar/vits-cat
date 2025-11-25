import React, { useState } from "react";
import { cmnRegInput, cmnlabel } from "../../../common/commoncss";

const RegisterForm = ({
  handleSubmit,
  registerData,
  handleRegisterChange,
  setIsLogin,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="auth-bg-image w-full md:w-1/2 p-6 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Create an Account
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 bg-white rounded-2xl shadow-md p-6"
      >
        {/* Name & Firm */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Firm Name</label>
            <input
              type="text"
              name="firmName"
              placeholder="Enter your Firm/Shop name"
              value={registerData.firmName}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
        </div>

        {/* Mobile & Email */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Mobile No.</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter your mobile number"
              value={registerData.mobileNo}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
        </div>

        {/* Address */}
        {/* <div className="flex flex-col space-y-2">
          <label className={cmnlabel}>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your Firm/Shop Address"
            value={registerData.address}
            onChange={handleRegisterChange}
            required
            className={cmnRegInput}
          />
        </div> */}

        {/* City, State, Pincode */}
        {/* <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={registerData.city}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              value={registerData.state}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Pin Code</label>
            <input
              type="text"
              name="pincode"
              maxLength={6}
              placeholder="Enter your pincode"
              value={registerData.pincode}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
        </div> */}

        {/* Password & Confirm Password */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              className={cmnRegInput}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={cmnRegInput}
            />
          </div>
        </div>
        {/* Referral & Business Type */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Referral Code (optional)</label>
            <input
              type="text"
              name="referralCode"
              placeholder="Enter referral code"
              value={registerData.referredBy}
              onChange={handleRegisterChange}
              className={cmnRegInput}
            />
          </div>

          {/* <div className="flex flex-col flex-1 space-y-2">
            <label className={cmnlabel}>Business Type</label>
            <div className="flex gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="businessType"
                  value={1}
                  checked={registerData.businessType === 1}
                  onChange={() =>
                    handleRegisterChange({
                      target: { name: "businessType", value: 1 },
                    })
                  }
                />
                <span className={cmnlabel}>Retailer</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="businessType"
                  value={2}
                  checked={registerData.businessType === 2}
                  onChange={() =>
                    handleRegisterChange({
                      target: { name: "businessType", value: 2 },
                    })
                  }
                />
                <span className={cmnlabel}>Wholesaler</span>
              </label>
            </div>
          </div> */}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          <>
            Already have an account?{" "}
            <a
              onClick={() => setIsLogin(true)}
              href="#"
              className="text-green-700 font-semibold hover:underline"
            >
              Login
            </a>
          </>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
