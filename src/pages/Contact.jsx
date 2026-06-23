import { useState } from 'react';
import PageOverview from '../components/PageOverview';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import { ContentPanel } from '../components/ui/Card';
import FormField, { TextArea, TextInput } from '../components/ui/FormField';
import PageShell from '../components/ui/PageShell';

export default function Contact() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  }

  return (
    <PageShell centered>
      <PageOverview
        purpose="The Contact Page provides a channel for users to send inquiries, feedback, or support requests related to TaskFlow through a structured contact form."
        workflow="Linked from the global navigation on every page, it serves visitors who need help before or after using the app. Successful submissions confirm receipt and can guide users back to Registration or the Dashboard."
        flowPath={
          <>
            <strong>Flow:</strong> Any Page ↔ <em>Contact</em> → Register/Login → Dashboard
          </>
        }
      />

      <section className="content-section" aria-labelledby="contact-heading">
        <ContentPanel split>
          <div>
            <h2 id="contact-heading">Get in Touch</h2>
            <p className="section-hint">Have a question about TaskFlow? Send us a message.</p>
            <ul className="info-list contact-details">
              <li><strong>Developer:</strong> John Carlo R. Dulutan</li>
              <li><strong>Course:</strong> IT0043 · TW291</li>
              <li><strong>School:</strong> FEU Institute of Technology</li>
              <li>
                <strong>Repository:</strong>{' '}
                <a href="https://github.com/dulutancarlo1975/taskflow" target="_blank" rel="noopener noreferrer">
                  github.com/dulutancarlo1975/taskflow
                </a>
              </li>
            </ul>
          </div>
          <div className="form-panel">
            <Alert variant="success">{success ? 'Thank you! Your message has been received.' : null}</Alert>
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <FormField id="contact-name" label="Name" required>
                <TextInput type="text" id="contact-name" name="name" required placeholder="Your name" />
              </FormField>
              <FormField id="contact-email" label="Email" required>
                <TextInput type="email" id="contact-email" name="email" required placeholder="you@example.com" />
              </FormField>
              <FormField id="contact-subject" label="Subject">
                <TextInput type="text" id="contact-subject" name="subject" placeholder="How can we help?" />
              </FormField>
              <FormField id="contact-message" label="Message" required>
                <TextArea id="contact-message" name="message" required placeholder="Write your message here…" />
              </FormField>
              <Button type="submit" variant="primary" block>
                Send Message
              </Button>
            </form>
          </div>
        </ContentPanel>
      </section>
    </PageShell>
  );
}
