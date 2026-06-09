const express = require('express')
const router = express.Router()

const jobs = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$200K - $250K',
    match: 95,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    description: 'Lead engineering team building next-gen products. 5+ years experience required.',
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    salary: '$180K - $220K',
    match: 88,
    skills: ['React', 'JavaScript', 'CSS', 'GraphQL', 'Testing'],
    description: 'Build user-facing features for billions of users. Strong React skills needed.',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$170K - $210K',
    match: 82,
    skills: ['Node.js', 'Java', 'AWS', 'Microservices', 'SQL'],
    description: 'Design scalable backend systems. Experience with distributed systems required.',
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Startup XYZ',
    location: 'San Francisco, CA',
    salary: '$120K - $160K',
    match: 75,
    skills: ['React', 'Express', 'MongoDB', 'TypeScript'],
    description: 'Early-stage startup looking for generalist developers. Flexible tech stack.',
  },
  {
    id: '5',
    title: 'React Developer',
    company: 'Microsoft',
    location: 'Redmond, WA',
    salary: '$160K - $200K',
    match: 80,
    skills: ['React', 'TypeScript', 'Azure', 'Testing'],
    description: 'Build web applications for enterprise clients. 3+ years React experience.',
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    salary: '$190K - $240K',
    match: 65,
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Linux', 'Python'],
    description: 'Maintain and improve our cloud infrastructure. Automation-focused role.',
  },
]

router.get('/', (req, res) => {
  res.json({ items: jobs })
})

module.exports = router
