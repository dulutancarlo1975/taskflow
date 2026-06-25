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
  

      <section className="content-section" aria-labelledby="contact-heading">
        <ContentPanel split>
          <div>
            <h2 id="contact-heading">Get in Touch</h2>
            <p className="section-hint">Have a question about WorkBuddy? Send us a message.</p>
        
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
