// src/utils/errorHandlers.js
export const handleApiError = (error) => {
    if (error.response) {
      // الخطأ من الخادم مع رد
      const { data, status } = error.response;
      
      if (status === 422) {
        // أخطاء التحقق
        return formatValidationErrors(data.errors);
      }
      
      if (status === 401) {
        return { auth: 'غير مصرح بالدخول' };
      }
      
      if (status === 500) {
        return { server: 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً' };
      }
    }
    
    // خطأ في الاتصال
    return { connection: 'حدث خطأ في الاتصال، يرجى التحقق من اتصالك بالإنترنت' };
  };
  
  export const formatValidationErrors = (errors) => {
    return Object.keys(errors).reduce((acc, key) => {
      acc[key] = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
      return acc;
    }, {});
  };
  
  export const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.first_name?.trim()) {
      errors.first_name = 'الاسم الأول مطلوب';
    }
    
    if (!formData.last_name?.trim()) {
      errors.last_name = 'الاسم الأخير مطلوب';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }
    
    if (!formData.password?.trim()) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = 'كلمات المرور غير متطابقة';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };