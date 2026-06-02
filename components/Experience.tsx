"use client";
import { useEffect, useState } from "react";
import TimelineItem, { type Experience } from "./ui/timeline-item";
import Stamps from "./ui/stamps";
import { getExperience } from "@/lib/firestore";

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getExperience();
      setExperiences(data as unknown as Experience[]);
    };
    fetch();
  }, []);

  return (
    <div id="experience" className="relative w-screen px-20 py-16">
      <h2 className="h2 font-code text-left mb-12">Experience</h2>
      <div className="flex gap-16 items-start">
        <div className="relative w-1/2">
          {experiences.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
        <div className="w-3/5 flex items-center justify-center">
          <Stamps />
        </div>
      </div>
    </div>
  );
};

export default Experience;