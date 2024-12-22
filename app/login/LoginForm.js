// src/components/LoginForm.jsx
"use client"
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { loginUser } from '../../src/authService';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { success, data, errors: apiErrors } = await loginUser({
        email: formData.email,
        password: formData.password
      });

      if (success) {
        // حفظ حالة "تذكرني" إذا كان مختاراً
        if (formData.rememberMe) {
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remember_me');
        }

        // إعادة توجيه المستخدم إلى الصفحة الرئيسية أو لوحة التحكم
        router.push('/dashboard'); 
      } else {
        setErrors(apiErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg">
      <h2 className="text-xl font-normal text-[#b89634] mb-8">LOGIN</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm mb-1 font-semibold">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@info.com"
              className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm mb-1 font-semibold">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Remember Me & Forget Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#B8860B] rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#b89634]">Remember me</span>
          </label>
          <a href="#" className="text-sm text-[#b89634] hover:underline">
            Forget Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-52 py-2 px-6 bg-[#B8860B] text-white rounded-3xl hover:bg-[#9B7300] transition-colors mx-auto block mt-10 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
      </form>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[#b89634]">Don&apos;t have an account?</p>
        <div className="mt-4 p-6 bg-gray-50 rounded flex flex-col items-center space-y-2">
          <User className="h-6 w-6 text-[#B8860B]" />
          <span className="text-[#B8860B] font-medium">JOB SEEKER</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;