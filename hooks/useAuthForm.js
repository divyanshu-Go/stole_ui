// File: components/auth/authHooks.js
import { useState } from "react";

export const useAuthForm = (initialState, validateFn, submitFn) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateFn(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await submitFn(formData);
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { formData, errors, isLoading, handleChange, handleSubmit };
};