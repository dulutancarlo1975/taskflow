import PageOverview from '../components/PageOverview';
import { ContentPanel } from '../components/ui/Card';
import PageShell from '../components/ui/PageShell';

export default function About() {
  return (
    <PageShell>
      <PageOverview
        purpose="The About Page presents project background, student information, technology stack, and the academic context of TaskFlow as an IT0043 Advanced Web Design deliverable."
        workflow="Accessible from any page via navigation, this page supports user trust and documentation requirements. It explains what TaskFlow does before users commit to Registration or Login."
        flowPath={
          <>
            <strong>Flow:</strong> Landing ↔ <em>About</em> → Register/Login → Dashboard
          </>
        }
      />

      <section className="content-section" aria-labelledby="about-heading">
        <ContentPanel>
          <h2 id="about-heading">About TaskFlow</h2>
          <p>
            TaskFlow is a transactional task manager built for IT0043 Advanced Web Design at
            FEU Institute of Technology. It demonstrates a complete web application lifecycle
            using React, REST API integration, and responsive CSS.
          </p>

          <h3>Student Information</h3>
          <ul className="info-list">
            <li><strong>Name:</strong> John Carlo R. Dulutan</li>
            <li><strong>Section:</strong> TW291</li>
            <li><strong>Course:</strong> IT0043 Advanced Web Design</li>
            <li><strong>School:</strong> FEU Institute of Technology</li>
          </ul>

          <h3>Technology Stack</h3>
          <ul className="info-list">
            <li><strong>React</strong> — component-based UI and state management</li>
            <li><strong>React Router</strong> — client-side routing across six pages</li>
            <li><strong>Vite</strong> — development server and production build tool</li>
            <li><strong>CSS3</strong> — responsive layout, design tokens, and component styling</li>
            <li><strong>JSON Server</strong> — local REST API for task persistence</li>
          </ul>

          <h3>Core Features</h3>
          <ul className="info-list">
            <li>User registration and login with session management</li>
            <li>Full CRUD operations on task transactions</li>
            <li>Priority levels and workflow status tracking</li>
            <li>Filter tasks by status and purge completed items</li>
          </ul>
        </ContentPanel>
      </section>
    </PageShell>
  );
}
