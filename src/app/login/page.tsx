import React from "react";

const LoginPage: React.FC = () => {
  const handleOAuthLogin = () => {};

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <button onClick={() => handleOAuthLogin()}>Login with Google</button>
      {/* Add more OAuth providers as needed */}
    </div>
  );
};

export default LoginPage;
