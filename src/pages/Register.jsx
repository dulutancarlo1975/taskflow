import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageOverview from '../components/PageOverview';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import { AuthPanel } from '../components/ui/Card';
import FormField, { TextInput } from '../components/ui/FormField';
import PageShell from '../components/ui/PageShell';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const form = e.target;
    const result = register(
      form.name.value,
      form.email.value,
      form.password.value
    );

    if (result.ok) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  }

  return (
    <PageShell centered>
    

      <section className="auth-section" aria-labelledby="register-heading">
        <AuthPanel
          headingId="register-heading"
          title="Register"
          hint="Create an account to access the task dashboard."
        >
          <Alert variant="error">{error}</Alert>
          <form id="register-form" onSubmit={handleSubmit} noValidate>
            <FormField id="name" label="Full Name" required>
              <TextInput type="text" id="name" name="name" required placeholder="Enter your name" autoComplete="name" />
            </FormField>
            <FormField id="email" label="Email" required>
              <TextInput type="email" id="email" name="email" required placeholder="you@example.com" autoComplete="email" />
            </FormField>
            <FormField id="password" label="Password" required>
              <TextInput type="password" id="password" name="password" required minLength={6} placeholder="At least 6 characters" autoComplete="new-password" />
            </FormField>
            <Button type="submit" variant="primary" block>
              Create Account
            </Button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </AuthPanel>
      </section>
    </PageShell>
  );
}
