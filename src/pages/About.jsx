import PageOverview from '../components/PageOverview';
import { ContentPanel } from '../components/ui/Card';
import PageShell from '../components/ui/PageShell';

export default function About() {
  return (
    <PageShell>
      

      <section className="content-section" aria-labelledby="about-heading">
        <ContentPanel>
          <div className="about-intro">
            <h2 id="about-heading">About Work Buddy</h2>
            <p>
              Work Buddy is a web-based task management system developed to help individuals and teams organize, manage, and monitor tasks efficiently. The system provides a centralized platform where users can create tasks, assign responsibilities, set deadlines, track progress, and manage workloads in a structured manner.
            </p>
            <p>
              Designed with productivity and collaboration in mind, Work Buddy simplifies daily task management by offering an intuitive and user-friendly interface. By streamlining workflows and improving task visibility, the system helps users stay organized, meet deadlines, and achieve their goals more effectively.
            </p>
            <p>
              Whether for academic projects, workplace activities, or personal task organization, Work Buddy serves as a reliable tool for planning, tracking, and completing tasks while promoting accountability and teamwork.
            </p>
          </div>

          <div className="about-highlights">
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>To enhance productivity and collaboration by providing an efficient, organized, and user-friendly task management platform.</p>
            </div>
            <div className="about-card">
              <h3>Our Vision</h3>
              <p>To become a trusted digital solution that empowers individuals and teams to manage tasks effectively and achieve greater success through organized workflows and seamless collaboration.</p>
            </div>
          </div>
        </ContentPanel>
      </section>
    </PageShell>
  );
}
