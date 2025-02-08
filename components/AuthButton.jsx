const AuthButton = ({ children, isLoading }) => (
    <button 
      className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      disabled={isLoading}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  );

  export default AuthButton