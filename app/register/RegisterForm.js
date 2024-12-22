// src/components/RegisterForm.jsx
"use client"
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { registerUser } from '../../src/authService';
import { validateForm } from '../../src/errorHandlers';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    recaptcha: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من صحة النموذج
    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { success, data, errors: apiErrors } = await registerUser(formData);
      
      if (success) {
        // نجاح التسجيل
        alert('تم التسجيل بنجاح!');
        // إعادة تعيين النموذج
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
          recaptcha: false,
        });
        setErrors({});
      } else {
        // وجود أخطاء من API
        setErrors(apiErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg">
      <h2 className="text-xl font-normal text-[#b89634] mb-8">SIGN UP</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* First and Last Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm mb-1 font-semibold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Mohammed"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.first_name ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm mb-1 font-semibold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Al-Daushan"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.last_name ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
          </div>
        </div>

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

        {/* Password and Confirmation row */}
        <div className="grid grid-cols-2 gap-4">
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

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm mb-1 font-semibold">
              Confirmation Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="••••••"
                className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none ${
                  errors.password_confirmation ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">{errors.password_confirmation}</p>
            )}
          </div>
        </div>

        {/* reCAPTCHA */}
        <div className="w-full space-y-2">
          <label className="flex items-center space-x-4">
            <input
              type="checkbox"
              name="recaptcha"
              checked={formData.recaptcha}
              onChange={handleChange}
              className="appearance-none w-6 h-6 border border-gray-300 rounded checked:bg-[#b89634]"
            />
            <span className="text-gray-600">I&apos;m not a robot</span>
          </label>
          {errors.recaptcha && <p className="text-sm text-red-500">{errors.recaptcha}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-52 py-2 px-6 bg-[#B8860B] text-white rounded-3xl hover:bg-[#9B7300] transition-colors mx-auto block mt-10 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;