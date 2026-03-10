"use client";
import { useInView, motion } from "framer-motion";
import TimelineItem, { type Experience } from "./ui/timeline-item";
import Stamps from "./ui/stamps";

const experiences = [
  {
    date: "Feb 2025 – Feb 2026",
    role: "QA Automation Engineer",
    company: "C3.ai",
    description: "Worked across functional, exploratory, and automated testing, identifying and tracking 71+ defects in Jira and developing regression test scripts in JavaScript with Jasmine. Maintained test plans and documentation in Confluence and Excel, while handling builds and their triage to assess stability. Collaborated closely with developers and product stakeholders within a Scrum environment, reviewed 300+ pull requests on GitHub, and served as code owner for the project's test automation suite.",
    sticky: "Here's where I got my start into automation testing, and made many incredible connections! Shout out to Baticueva! 🦇"
  },
  {
    date: "Jun 2023 – May 2024",
    role: "SWE Intern",
    company: "Bosch",
    description: "Executed and automated tests for car safety systems using CANoe, winIDEA, vFlash, and vTESTstudio, covering requirement analysis, evaluation, and documentation in DOORS. Managed test documentation, design, and issue tracking through Jira within a Scrum workflow. Also contributed to a multicultural validation team, helping organize internal events to encourage knowledge sharing and team engagement.",
    sticky: "My first internship! I had no idea so much went into testing and cars 🚗"
  },
];

const Experience = () => {
  return (
    <div id="experience" className="relative w-screen px-20 py-16">
      <h2 className="h2 font-code text-left mb-12">Experience</h2>
      <div className="flex gap-16 items-start">
        {/* Timeline */}
        <div className="relative w-1/2">
          {experiences.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>

        {/* Stamps */}
        <div className="w-3/5 flex items-center justify-center">
          <Stamps />
        </div>
      </div>
    </div>
  );
};

export default Experience;