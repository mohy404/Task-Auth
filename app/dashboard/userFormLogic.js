import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://neom-api-qc.task99.site/api/v1';

// Custom hook for form logic
export const useUserForm = () => {
  const [formData, setFormData] = useState({
    summary: '',
    preferred_job_title: '',
    preferred_sector: '',
    preferred_functional_area: '',
    highest_education: '',
    years_of_experience: '',
    experience_level: '',
    current_monthly_salary: '',
    expected_monthly_salary: '',
    marital_status: '',
    nationality_id: '',
    gender: '',
    residence_status: '',
    national_id_text: '',
    birth_date: '',
    driving_license_type: '',
    health_issue_id: '',
    jobs_interested_in: '',
    national_id_file: null,
  });

  const [terms, setTerms] = useState(null);
  const [healthIssues, setHealthIssues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch terms
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/terms?per_page=100`);
        setTerms(response.data);
      } catch (err) {
        console.error('Error fetching terms:', err);
      }
    };

    const fetchHealthIssues = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/terms/health_issues`);
        setHealthIssues(response.data);
      } catch (err) {
        console.error('Error fetching health issues:', err);
      }
    };

    fetchTerms();
    fetchHealthIssues();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          submitData.append(key, value);
        }
      });

      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(
        `${BASE_URL}/job-seeker/profile/basic-information`,
        submitData,
        config
      );

      console.log('Form submitted successfully:', response.data);
      // يمكنك إضافة معالجة النجاح هنا (مثل عرض رسالة نجاح أو إعادة التوجيه)
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting the form');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    terms,
    healthIssues,
  };
};