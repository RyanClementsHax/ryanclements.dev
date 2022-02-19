import Head from 'next/head'
import { Hero } from 'components/pages/landing/sections/Hero'
import { Qualities } from 'components/pages/landing/sections/Qualities'
import {
  CubeIcon,
  PresentationChartLineIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import graphic from 'public/graphic.jpg'
import { Skills } from 'components/pages/landing/sections/Skills'
import { Title } from 'components/pages/landing/headings/Title'
import { Subtitle } from 'components/pages/landing/headings/Subtitle'
import { ProficiencyLegend } from 'components/pages/landing/sections/Skills/ProficiencyLegend'
import { SkillGroup } from 'components/pages/landing/sections/Skills/SkillGroup'
import { backendSkills, devopsSkills, frontendSkills } from 'lib/skills'

const Index = () => (
  <>
    <Head>
      <title>Ryan Clements</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Hero
      title={
        <>
          {'Hiya! 👋'}
          <br />
          {"I'm Ryan Clements"}
        </>
      }
      subtitle={
        <>
          I 💖 God, my wife and daughter&nbsp;👨‍👩‍👧, and making dope
          software&nbsp;👨‍💻
        </>
      }
    />
    <Qualities
      title="A new kind of engineer"
      subtitle="New problems need new solutions. Here's the energy I bring to the table."
      graphicSrc={graphic}
    >
      <Qualities.Quality
        Icon={<UserGroupIcon />}
        title="People first"
        description="I see people as beloved by God and worth going the extra mile for. At work, I always try to help my coworkers and solve real problems for users."
      />
      <Qualities.Quality
        Icon={<CubeIcon />}
        title="Modern"
        description="Up to date with the latest trends in industry, I synthesize custom solutions using the best of what modern software engineering has available to us."
      />
      <Qualities.Quality
        Icon={<PresentationChartLineIcon />}
        title="Always improving"
        description="“Whether you think you can, or you think you can't - you're right” - Henry Ford. I seek to always be improving in all areas of my life, at home and work, on soft and hard skills."
      />
    </Qualities>
    <Skills>
      <Skills.Header>
        <Title>A lifelong learner</Title>
        <Subtitle>Here is the tech I know and love</Subtitle>
      </Skills.Header>
      <ProficiencyLegend />
      <SkillGroup>
        <SkillGroup.Title>Frontend</SkillGroup.Title>
        <SkillGroup.Content>
          {frontendSkills.map(x => (
            <SkillGroup.Skill key={x.name} {...x} />
          ))}
        </SkillGroup.Content>
      </SkillGroup>
      <SkillGroup>
        <SkillGroup.Title>Backend</SkillGroup.Title>
        <SkillGroup.Content>
          {backendSkills.map(x => (
            <SkillGroup.Skill key={x.name} {...x} />
          ))}
        </SkillGroup.Content>
      </SkillGroup>
      <SkillGroup>
        <SkillGroup.Title>Devops</SkillGroup.Title>
        <SkillGroup.Content>
          {devopsSkills.map(x => (
            <SkillGroup.Skill key={x.name} {...x} />
          ))}
        </SkillGroup.Content>
      </SkillGroup>
    </Skills>
  </>
)

export default Index
