import { resumeData } from '@/data/resumeData';
import { Mail, Github, Linkedin, MapPin, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-muted-foreground mb-2 font-mono text-sm">$ cat about.md</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          About
        </h1>
      </div>

      {/* Bio Section */}
      <section className="mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          I'm a full-stack engineer and open-source contributor with a focus on protocol engineering, 
          exchange systems, and infrastructure. Currently contributing to{' '}
          <span className="text-primary">Summer of Bitcoin</span> (Lightning Protocols),{' '}
          <span className="text-primary">Google Summer of Code</span>, and various OSS ecosystems.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          As a GoQuant Engineering Fellow and Amazon ML School participant, I work on building 
          scalable full-stack systems, ML-powered features, and production-ready architectures. 
          I'm passionate about open source, rapid prototyping, and solving challenging engineering problems.
        </p>
      </section>

      {/* Quick Info */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin size={16} />
              <span className="text-sm">Location</span>
            </div>
            <p className="text-foreground">{resumeData.personalInfo.location}</p>
          </div>
          <div className="p-4 border border-border rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <GraduationCap size={16} />
              <span className="text-sm">Education</span>
            </div>
            <p className="text-foreground text-sm">{resumeData.education.degree.split('(')[0]}</p>
          </div>
          <div className="p-4 border border-border rounded-md">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Mail size={16} />
              <span className="text-sm">Email</span>
            </div>
            <a href={`mailto:${resumeData.personalInfo.email}`} className="text-primary text-sm">
              {resumeData.personalInfo.email}
            </a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Experience</h2>
        <div className="space-y-6">
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-border pl-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-foreground">{exp.role}</h3>
                <span className="text-xs text-muted-foreground font-mono whitespace-nowrap ml-4">{exp.duration}</span>
              </div>
              <p className="text-sm text-primary mb-3">{exp.company} • {exp.location}</p>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Leadership</h2>
        <div className="space-y-6">
          {resumeData.leadership.map((role, i) => (
            <div key={i} className="border-l-2 border-border pl-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-foreground">{role.role}</h3>
                <span className="text-xs text-muted-foreground font-mono">{role.year}</span>
              </div>
              <p className="text-sm text-primary mb-3">{role.organization}</p>
              <ul className="space-y-2">
                {role.achievements.map((achievement, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {resumeData.achievements.slice(0, 8).map((achievement, i) => (
            <div key={i} className="p-3 border border-border rounded-md">
              <p className="text-sm text-muted-foreground">{achievement}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="border-t border-border pt-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Connect</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href={`https://github.com/${resumeData.personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <Mail size={16} />
            Email
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
