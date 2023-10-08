import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputStyle = "text-slate-950 rounded-md py-1 px-2 focus:outline-none";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
    mobile: "",
  });

  const setDefault = ()=>{
    setFormData({
        username: "",
        email: "",
        password: "",
        comfirmPassword: "",
        mobile: "",
      });
    setLoading(false);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { comfirmPassword: comf, ...data } = formData;
    console.log(comf);
    try {
      await axios.post("/api/auth/signup", data);
      setDefault();
      navigate('/signin');
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.response.data.message.slice(6,26) || "already added");
    }
  };
  return (
    <div className="max-w-7xl mx-auto h-[90vh] ">
      <h1 className="text-center py-8 text-3xl font-semibold text-violet-200">
        JOIN WITH US NOW
      </h1>
      <form
        className="flex flex-col gap-6 mx-auto w-96 sm:w-[600px] py-8 px-4 rounded-md bg-slate-900"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="user name"
          className={inputStyle}
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className={inputStyle}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className={inputStyle}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="comfirm password"
          className={inputStyle}
          name="comfirmPassword"
          value={formData.comfirmPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="mobile"
          className={inputStyle}
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <button
          className={` bg-violet-950 cursor-pointer ${
            loading && `bg-violet-900`
          }py-2 rounded-lg smooth hover:bg-violet-800`}
        >
          {loading ? `Loading...` : `JOIN NOW`}
        </button>
        <div className="flex gap-2">
          <p>Have an account ? </p>
          <Link to={"/signin"}>
            <span className="text-violet-700">Sign In</span>
          </Link>
        </div>
        <span className={error ? `block text-red-600` : `hidden`}>{error}</span>
      </form>
    </div>
  );
}
