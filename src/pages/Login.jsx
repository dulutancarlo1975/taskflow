import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageOverview from '../components/PageOverview';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import { AuthPanel } from '../components/ui/Card';
import FormField, { TextInput } from '../components/ui/FormField';
import PageShell from '../components/ui/PageShell';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const form = e.target;
    const result = login(form.email.value, form.password.value);

    if (result.ok) {
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message);
    }
  }

  return (
    <PageShell centered>


      <section className="auth-section" aria-labelledby="login-heading">
        <AuthPanel
          headingId="login-heading"
          title="Log In"
          hint="Please enter your credentials to access your account."
        >
          <Alert variant="error">{error}</Alert>
          <form id="login-form" onSubmit={handleSubmit} noValidate>
            <FormField id="email" label="Email" required>
              <TextInput type="email" id="email" name="email" required placeholder="you@example.com" autoComplete="email" />
            </FormField>
            <FormField id="password" label="Password" required>
              <TextInput type="password" id="password" name="password" required placeholder="Your password" autoComplete="current-password" />
            </FormField>
            <Button type="submit" variant="primary" block>
              Sign In
            </Button>
          </form>
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </AuthPanel>
      </section>
    </PageShell>
  );
}
