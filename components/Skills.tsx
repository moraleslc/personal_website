import React from 'react'
import SkillCards from './ui/skill-cards'

const Skills = () => {
  return (
    <div id= "skills" className='relative w-screen px-20 py-16 overflow-hidden'>
      <h2 className="h2 font-code text-left">Skills</h2>
      <div className="scrolling-text">
        <div className="rail">
          <SkillCards></SkillCards>
        </div>
      </div>
    </div>
  )
}

export default Skills