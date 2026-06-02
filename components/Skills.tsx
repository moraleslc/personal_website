"use client";
import React, { useEffect, useState } from 'react';
import SkillCards, { CertMarquee } from './ui/skill-cards';
import { getSkills, getCertifications } from '@/lib/firestore';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [skillsData, certsData] = await Promise.all([
        getSkills(),
        getCertifications(),
      ]);
      setSkills(skillsData as any);
      setCerts(certsData as any);
    };
    fetchData();
  }, []);

  return (
    <div id="skills" className='relative w-screen overflow-hidden py-16'>
      <img src="https://64.media.tumblr.com/ab0679e78001ad1f498d283682a8aebc/9d09bfb6225a3eb4-2a/s400x600/51c005eecccb1d96a59d0278c259eb2f3f0f24d6.gif" className="absolute top-20 right-10" alt="" />
      <img src="https://64.media.tumblr.com/8601d51f2b524b9adf21418989e4bc8f/a07cb60dfbcf5728-eb/s1280x1920/fe807504f1faf663e4f0cfe6eedf06255df4844a.gifv" className="absolute top-10 right-70 w-100 h-100" alt="" />
      <img src="https://64.media.tumblr.com/861ff70e2d281fc64ef12ed185613e78/26fac571c504c037-08/s400x600/88556cb3213e78bd9f46dc55698825c3574eadd8.gif" className="absolute top-60 right-30" alt="" />
      <div className="px-20">
        <h2 className="h2 font-code text-left">Skills</h2>
        <SkillCards cards={skills} />
        <h3 className="font-code font-bold mb-6 text-lg">Certifications</h3>
      </div>
      <CertMarquee certs={certs} />
    </div>
  );
};

export default Skills;