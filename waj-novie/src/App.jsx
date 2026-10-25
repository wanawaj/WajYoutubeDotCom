import { useState } from 'react';
import './app.css';

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
}

export default function App() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', remember: true });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const isSignup = mode === 'signup';

  function changeMode(nextMode) {
    setMode(nextMode);
    setMessage('');
    setShowPassword(false);
  }

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    if (message) setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const email = form.email.trim();

    if (!email || !form.password) {
      setMessageType('error');
      setMessage('Please enter your email and password.');
      return;
    }

    if (isSignup && !form.name.trim()) {
      setMessageType('error');
      setMessage('Please enter your name.');
      return;
    }

    if (form.password.length < 8) {
      setMessageType('error');
      setMessage('Your password must be at least 8 characters long.');
      return;
    }

    if (isSignup && form.password !== form.confirmPassword) {
      setMessageType('error');
      setMessage('Your passwords do not match.');
      return;
    }

    setMessageType('success');
    setMessage(isSignup
      ? `You're all set, ${form.name.trim()}! This demo form is ready to connect to your signup API.`
      : 'Form validated! Connect this demo to your login API to authenticate your account.');
  }

  return (
    <main className="auth-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className={`auth-card ${isSignup ? 'is-signup' : ''}`} aria-label="Account access">
        <div className="auth-art" aria-hidden="true">
          <div className="sparkle sparkle-one">✦</div>
          <div className="sparkle sparkle-two">✧</div>
          <div className="art-heart">♡</div>
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-copy">
            <span className="eyebrow">A little space for you</span>
            <h2>Good things<br />start <em>here.</em></h2>
            <p>Your next chapter is just one little step away.</p>
          </div>
          <div className="art-doodle doodle-left">✿</div>
          <div className="art-doodle doodle-right">✿</div>
        </div>

        <div className="auth-content">
          <div className="brand-mark" aria-hidden="true"><span>♡</span></div>
          <p className="welcome-line">HELLO, LOVELY</p>
          <h1>{isSignup ? 'Create an account' : 'Welcome back!'}</h1>
          <p className="subtitle">{isSignup ? 'Let’s make something wonderful together.' : 'We’re so happy to see you again.'}</p>

          <div className="mode-switch" role="tablist" aria-label="Choose account action">
            <button type="button" role="tab" aria-selected={!isSignup} className={!isSignup ? 'active' : ''} onClick={() => changeMode('login')}>Log in</button>
            <button type="button" role="tab" aria-selected={isSignup} className={isSignup ? 'active' : ''} onClick={() => changeMode('signup')}>Sign up</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isSignup && (
              <label className="field">
                <span className="field-label">Your name</span>
                <span className="input-wrap"><UserIcon /><input name="name" type="text" autoComplete="name" placeholder="What should we call you?" value={form.name} onChange={updateField} required /></span>
              </label>
            )}

            <label className="field">
              <span className="field-label">Email address</span>
              <span className="input-wrap"><MailIcon /><input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={updateField} required /></span>
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <span className="input-wrap"><LockIcon /><input name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="At least 8 characters" value={form.password} onChange={updateField} minLength={8} required /><button className="show-password" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></span>
            </label>

            {isSignup ? (
              <label className="field">
                <span className="field-label">Confirm password</span>
                <span className="input-wrap"><LockIcon /><input name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Type your password again" value={form.confirmPassword} onChange={updateField} required /></span>
              </label>
            ) : (
              <div className="form-options">
                <label className="remember"><input type="checkbox" name="remember" checked={form.remember} onChange={updateField} /><span className="custom-check" />Remember me</label>
                <button type="button" className="text-button" onClick={() => { setMessageType('info'); setMessage('Password recovery would be handled by your app or backend.'); }}>Forgot password?</button>
              </div>
            )}

            {message && <div className={`form-message ${messageType}`} role="status">{message}</div>}

            <button className="submit-button" type="submit">{isSignup ? 'Create my account' : 'Log in'} <span aria-hidden="true">→</span></button>
          </form>

          <p className="switch-prompt">{isSignup ? 'Already have an account?' : 'New around here?'} <button type="button" onClick={() => changeMode(isSignup ? 'login' : 'signup')}>{isSignup ? 'Log in' : 'Create an account'}</button></p>
          <p className="fine-print">By continuing, you agree to our <button type="button" onClick={() => { setMessageType('info'); setMessage('Add your terms of service link here.'); }}>Terms</button> and <button type="button" onClick={() => { setMessageType('info'); setMessage('Add your privacy policy link here.'); }}>Privacy Policy</button>.</p>
        </div>
      </section>
      <p className="page-footer">MADE WITH A LITTLE <span>♡</span> AND LOTS OF CARE</p>
    </main>
  );
}
