"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { enAuthReqType, getGeoLocation } from "../../lib/utils";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import { AuthServices } from "../../lib/services/AuthServices";
import { toast } from "react-hot-toast";
import logo from "../../app/logo.png";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [latlng, setLatLng] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
    firmName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    businessType: 1,
    referredBy: "",
    latlng,
  });

  useEffect(() => {
    getGeoLocation()
      .then((loc) => setLatLng((prev) => (prev = `${loc.lat}, ${loc.lng}`)))
      .catch(console.error);
    if (searchParams.get("register") === "1") {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (latlng) {
      setRegisterData((prev) => ({ ...prev, latlng }));
    }
  }, [latlng]);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reqBody = isLogin ? loginData : registerData;
    const reqType = isLogin ? enAuthReqType.login : enAuthReqType.register;
    const auth = await AuthServices(reqType, "", reqBody, "");
    console.log(auth);
    if ([401, 400, 500, 404, 409].includes(auth.status)) {
      toast.error(auth.message);
      setLoading(false);
      auth.status === 409 && setIsLogin(true);
    } else {
      if (reqType === enAuthReqType.register) {
        toast.success(auth.message);
        setIsLogin(true);
        setLoading(false);
      } else {
        console.log(auth);
        toast.success(auth.message);
        localStorage.setItem("user", JSON.stringify(auth.user));
        setLoading(false);
        router.push(`/${auth.user.slug}/admin`);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-green-50 to-white">
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-green-100 p-6">
        <div className="max-w-md text-center">
          <Image
            src={logo}
            width={300}
            height={300}
            alt="hero image"
            className="mx-auto"
          />
          {/* <Image
            src=""
            alt="Vits Catalogue Illustration"
            className="rounded-2xl shadow-lg"
          /> */}
          <h2 className="text-3xl font-bold text-green-800 mt-6">
            Simplify your Product Sharing
          </h2>
          <p className="text-green-700 mt-3 text-sm">
            Create your online catalogue and share it instantly with customers —
            no more sending product photos manually!
          </p>
        </div>
      </div>
      {/* RIGHT SIDE - AUTH FORM */}
      {isLogin ? (
        <LoginForm
          handleChange={handleLoginChange}
          handleSubmit={handleSubmit}
          loginData={loginData}
          setIsLogin={setIsLogin}
        />
      ) : (
        <RegisterForm
          handleRegisterChange={handleRegisterChange}
          handleSubmit={handleSubmit}
          registerData={registerData}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
}
