import PageOverview from '../components/PageOverview';
import Button from '../components/ui/Button';
import { ContentPanel, FeatureCard } from '../components/ui/Card';
import PageShell from '../components/ui/PageShell';
import desktopPreview from '../../images/Desktop.png';

export default function Landing() {
  return (
    <PageShell>
  

      <section className="hero-section landing-hero" aria-labelledby="hero-heading">
        <div className="hero-intro">
          <div className="hero-content ui-hero">
            <span className="hero-badge">Work Buddy</span>
            <h2 id="hero-heading">Your Partner in Smart Task Management</h2>
            <p className="hero-lead">
              Work Buddy helps teams and individuals organize tasks, track progress, and achieve more together.
            </p>
            <div className="hero-actions">
              <Button variant="primary" to="/register">Get Started</Button>
              <Button variant="secondary" to="/login">Learn More</Button>
            </div>
          </div>

          <div className="hero-visual" aria-label="Work Buddy illustration">
            <img src="/images/taskbg.png" alt="Work Buddy platform preview" />
          </div>
        </div>

        <div className="hero-features">
          <FeatureCard>
            <img className="feature-icon" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/list-check.svg" alt="" />
            <h3>Task Management</h3>
            <p>Create, assign, and manage tasks efficiently.</p>
          </FeatureCard>
          <FeatureCard>
            <img className="feature-icon" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/users.svg" alt="" />
            <h3>Team Collaboration</h3>
            <p>Work together and stay updated in real time.</p>
          </FeatureCard>
          <FeatureCard>
            <img className="feature-icon" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/chart-line.svg" alt="" />
            <h3>Progress Tracking</h3>
            <p>Monitor task progress and meet deadlines effectively.</p>
          </FeatureCard>
          <FeatureCard>
            <img className="feature-icon" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/bell.svg" alt="" />
            <h3>Notifications</h3>
            <p>Receive timely updates and never miss important tasks.</p>
          </FeatureCard>
        </div>
      </section>

      <section className="content-section" aria-labelledby="about-workbuddy-heading">
        <ContentPanel className="about-workbuddy-panel">
          <div className="about-workbuddy-split">
            <div className="about-workbuddy-visual">
              <img src={desktopPreview} alt="Work Buddy desktop interface preview" />
            </div>

            <div className="about-workbuddy-copy">
              <h2 id="about-workbuddy-heading">About Work Buddy</h2>
              <p>
                Work Buddy is a web-based task management system made to help users plan,
                organize, assign, and monitor tasks efficiently. It brings daily responsibilities,
                deadlines, and progress updates into one simple place so work becomes easier to manage.
              </p>
              <p>
                Whether you are handling school projects, team assignments, or personal goals,
                Work Buddy helps you stay focused, reduce missed tasks, and improve productivity
                with a clearer view of what needs attention next.
              </p>
              <ul className="about-workbuddy-list">
                <li>Keep tasks and deadlines organized in one workspace.</li>
                <li>Track progress clearly and avoid losing focus on important work.</li>
                <li>Support teamwork with a simple and dependable system.</li>
              </ul>
            </div>
          </div>
        </ContentPanel>
      </section>


      <section className="content-section" aria-labelledby="how-it-works-heading">
        <ContentPanel>
          <h2 id="how-it-works-heading">How It Works</h2>
          <ol className="steps-list">
            <li><strong>Step 1:</strong> Open Work Buddy through the website and explore its features.</li>
            <li><strong>Step 2:</strong> Sign in to your account or create a new one to access the system.</li>
            <li><strong>Step 3:</strong> Access an overview of tasks, notifications, and important updates.</li>
            <li><strong>Step 4:</strong> Create new tasks, assign responsibilities, and set deadlines.</li>
            <li><strong>Step 5:</strong> Monitor task status and update progress as work is completed.</li>
            <li><strong>Step 6:</strong> Mark tasks as completed and review finished activities.</li>
          </ol>
        </ContentPanel>
      </section>

      <section className="content-section" aria-labelledby="mission-heading">
        <ContentPanel>
          <h2 id="mission-heading">Mission Statement</h2>
          <p>
            Work Buddy aims to simplify task management by providing an organized,
            user-friendly platform that helps users stay productive, collaborate effectively,
            and accomplish goals on time.
          </p>
        </ContentPanel>
      </section>
    </PageShell>
  );
}
