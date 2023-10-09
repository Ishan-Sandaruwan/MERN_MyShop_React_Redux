import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputStyle = "text-slate-950 rounded-md py-1 px-2 focus:outline-none";
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const {loading,error} = useSelector((state)=> state.user);

  const setDefault = ()=>{
    setFormData({
        email: "",
        password: ""
      });
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    dispatch(signInStart());
    e.preventDefault();
    try {
      const result = await axios.post("/api/auth/signin", formData);
      setDefault();
      dispatch(signInSuccess(result.data));
      navigate('/');
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error.response.data.message.slice(0,25) || "already added"));
    }
  };
  return (
    <div className="max-w-7xl mx-auto h-[90vh] p-6">
      <h1 className="text-center py-8 text-3xl font-semibold anim text-violet-200">
        WELCOME BACK
      </h1>
      <form
        className="flex flex-col gap-6 mx-auto w-96 sm:w-[600px] p-8 rounded-md bg-slate-900"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="email"
          className={inputStyle}
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={inputStyle}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          className={` bg-violet-950 cursor-pointer ${
            loading && `bg-violet-900`
          } rounded-lg smooth hover:bg-violet-800 py-3 anim`}
        >
          {loading ? `Loading...` : `SIGN IN`}
        </button>
        <div className="flex gap-2">
          <p> Havent an account ? </p>
          <Link to={"/signin"}>
            <span className="text-violet-700">Join Now</span>
          </Link>
        </div>
        <span className={error ? `block text-red-600` : `hidden`}>{error}</span>
      </form>
    </div>
  );
}
