import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';

// Common Button component for auth forms
const AuthButton = ({ children, isLoading }) => (
  <button className="form-button" disabled={isLoading}>
    {isLoading ? (
      <div className="flex items-center justify-center">
        Please wait
        <span className="animate-spin">
          <LoaderCircle className="mx-2 h-3 w-3" />
        </span>
      </div>
    ) : (
      children
    )}
  </button>
);

// Input field component with validation styling
const FormInput = ({ label, type, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
  
    return (
      <div className="space-y-1">
        <div className="flex gap-3 items-center justify-between">
          <label className="form-label">{label}</label>
          {error && (
            <p className="text-xs font-medium bg-red-200 py-1 px-3 rounded text-[var(--error-color)]">
              {error}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type={isPassword && !showPassword ? "password" : "text"}
            value={value}
            onChange={onChange}
            className={`form-input pr-10 ${
              error ? "border-red-500" : "border-[var(--border-dark)]"
            }`}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 rounded-r-md p-3 flex items-center bg-black text-gray-400 hover:text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>
    );
  };
  

// Login Form Component
export const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.user.role === 'admin') {
        router.push('/admin-profile');
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <h2 className="text-4xl text-center font-bold m-4">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
        />

        {errors.submit && (
          <div className="px-3 py-2 bg-red-200 text-red-500 rounded-lg text-sm">
            {errors.submit}
          </div>
        )}

        <AuthButton isLoading={isLoading}>Log In</AuthButton>
        <p className="text-center text-sm font-normal text-[var(--secondary-fg)]">
          Don't have an account ? Please {' '}
          <Link
            href="/signup"
            className="text-[var(--accent-color)] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
