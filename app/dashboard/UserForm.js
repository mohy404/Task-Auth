import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { updateUserProfile } from '../../src/authService';


const UserForm = () => {
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    summary: '',
    national_id_file: null,
    job_title: '',
    sector: '7',
    functional_area: '62',
    educations: '61',
    years_of_experience: '5',
    experience_level: '42',
    current_monthly_salary: '5000',
    expected_monthly_salary: '6000',
    marital_statuses: '25',
    nationality: '47',
    gender: '82',
    residence_status: '28',
    national_id_text: '',
    birth_date: '',
    driving_license_type: '',
    health_issue: '69',
    jobs: '81'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        national_id_file: file
      }));
      // Clear error when file is selected
      if (errors.national_id_file) {
        setErrors(prev => ({ ...prev, national_id_file: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const submitFormData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] != null) {
        submitFormData.append(key, formData[key]);
      }
    });

    try {
      const result = await updateUserProfile(submitFormData);
      if (result.success) {
        alert('تم حفظ المعلومات بنجاح');
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      setErrors({ submit: 'حدث خطأ أثناء حفظ المعلومات' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <nav className="flex space-x-8 border-b mb-8">
        <button className="px-4 py-2 text-gray-500">CV</button>
        <button className="px-4 py-2 text-yellow-600 border-b-2 border-yellow-600 whitespace-nowrap">MY INFORMATION</button>
        <button className="px-4 py-2 text-gray-500 whitespace-nowrap">WORK EXPERIENCE</button>
        <button className="px-4 py-2 text-gray-500">EDUCATIONS</button>
        <button className="px-4 py-2 text-gray-500">LANGUAGES</button>
        <button className="px-4 py-2 text-gray-500">SKILLS</button>
      </nav>

      <form onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">SUMMARY</h2>
          <textarea 
            className={`w-full border rounded p-3 h-32 ${errors.summary ? 'border-red-500' : ''}`}
            placeholder="Type here"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">MY INFORMATION</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm mb-1">Headline</label>
              <input 
                type="text"
                className={`w-full border rounded p-2 text-gray-500 ${errors.job_title ? 'border-red-500' : ''}`}
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
              />
              {errors.job_title && (
                <p className="text-red-500 text-sm mt-1">{errors.job_title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Preferred Job Title</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.sector ? 'border-red-500' : ''}`}
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
              >
                <option value="7">Computer System</option>
              </select>
              {errors.sector && (
                <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Preferred Functional Area</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.functional_area ? 'border-red-500' : ''}`}
                name="functional_area"
                value={formData.functional_area}
                onChange={handleInputChange}
              >
                <option value="62">Information Technology</option>
              </select>
              {errors.functional_area && (
                <p className="text-red-500 text-sm mt-1">{errors.functional_area}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Highest Education</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.educations ? 'border-red-500' : ''}`}
                name="educations"
                value={formData.educations}
                onChange={handleInputChange}
              >
                <option value="61">Bachelor Degree</option>
              </select>
              {errors.educations && (
                <p className="text-red-500 text-sm mt-1">{errors.educations}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Years of Experience</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.years_of_experience ? 'border-red-500' : ''}`}
                name="years_of_experience"
                value={formData.years_of_experience}
                onChange={handleInputChange}
              >
                <option value="5">2</option>
              </select>
              {errors.years_of_experience && (
                <p className="text-red-500 text-sm mt-1">{errors.years_of_experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Experience Level</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.experience_level ? 'border-red-500' : ''}`}
                name="experience_level"
                value={formData.experience_level}
                onChange={handleInputChange}
              >
                <option value="42">Junior level</option>
              </select>
              {errors.experience_level && (
                <p className="text-red-500 text-sm mt-1">{errors.experience_level}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Current Monthly Salary (SAR)</label>
              <input 
                type="text"
                className={`w-full border rounded p-2 text-gray-500 ${errors.current_monthly_salary ? 'border-red-500' : ''}`}
                name="current_monthly_salary"
                value={formData.current_monthly_salary}
                onChange={handleInputChange}
              />
              {errors.current_monthly_salary && (
                <p className="text-red-500 text-sm mt-1">{errors.current_monthly_salary}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Expected Monthly Salary (SAR)</label>
              <input 
                type="text"
                className={`w-full border rounded p-2 text-gray-500 ${errors.expected_monthly_salary ? 'border-red-500' : ''}`}
                name="expected_monthly_salary"
                value={formData.expected_monthly_salary}
                onChange={handleInputChange}
              />
              {errors.expected_monthly_salary && (
                <p className="text-red-500 text-sm mt-1">{errors.expected_monthly_salary}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Marital Status</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.marital_statuses ? 'border-red-500' : ''}`}
                name="marital_statuses"
                value={formData.marital_statuses}
                onChange={handleInputChange}
              >
                <option value="25">Single</option>
              </select>
              {errors.marital_statuses && (
                <p className="text-red-500 text-sm mt-1">{errors.marital_statuses}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Nationality</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.nationality ? 'border-red-500' : ''}`}
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              >
                <option value="47">Saudi Arabia</option>
              </select>
              {errors.nationality && (
                <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Gender</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.gender ? 'border-red-500' : ''}`}
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="82">Male</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Residency Status</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.residence_status ? 'border-red-500' : ''}`}
                name="residence_status"
                value={formData.residence_status}
                onChange={handleInputChange}
              >
                <option value="28">Citizen</option>
              </select>
              {errors.residence_status && (
                <p className="text-red-500 text-sm mt-1">{errors.residence_status}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">National ID</label>
              <input 
                type="text"
                className={`w-full border rounded p-2 text-gray-500 ${errors.national_id_text ? 'border-red-500' : ''}`}
                name="national_id_text"
                value={formData.national_id_text}
                onChange={handleInputChange}
              />
              {errors.national_id_text && (
                <p className="text-red-500 text-sm mt-1">{errors.national_id_text}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Age</label>
              <input 
                type="date"
                className={`w-full border rounded p-2 text-gray-500 ${errors.birth_date ? 'border-red-500' : ''}`}
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
              />
              {errors.birth_date && (
                <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Health Issue</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.health_issue ? 'border-red-500' : ''}`}
                name="health_issue"
                value={formData.health_issue}
                onChange={handleInputChange}
              >
                <option value="69">No health problems</option>
              </select>
              {errors.health_issue && (
                <p className="text-red-500 text-sm mt-1">{errors.health_issue}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Driving license type</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.driving_license_type ? 'border-red-500' : ''}`}
                name="driving_license_type"
                value={formData.driving_license_type}
                onChange={handleInputChange}
              >
                <option value="">Public</option>
              </select>
              {errors.driving_license_type && (
                <p className="text-red-500 text-sm mt-1">{errors.driving_license_type}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-1">Jobs interested in</label>
              <select 
                className={`w-full border rounded p-2 text-gray-500 ${errors.jobs ? 'border-red-500' : ''}`}
                name="jobs"
                value={formData.jobs}
                onChange={handleInputChange}
              >
                <option value="81">Interested in both opportunities</option>
              </select>
              {errors.jobs && (
                <p className="text-red-500 text-sm mt-1">{errors.jobs}</p>
              )}
            </div>

            <div className="col-span-2 mt-4">
              <label className="relative w-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.png"
                />
                <div className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-yellow-600">
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="font-medium">UPLOAD NATIONAL ID</span>
                  <span className="text-sm text-gray-500">PDF, PNG</span>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              type="submit"
              className="w-52 bg-yellow-600 text-white py-2 px-4 rounded-3xl hover:bg-yellow-700"
            >
              SAVE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;