export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'AI Engineer & ML Specialist',
  description: 'Building intelligent systems with cutting-edge AI technology',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
}

export const SKILLS = [
  { name: 'Python', level: 95, category: 'language' },
  { name: 'TensorFlow', level: 90, category: 'framework' },
  { name: 'PyTorch', level: 88, category: 'framework' },
  { name: 'JavaScript', level: 92, category: 'language' },
  { name: 'React', level: 90, category: 'framework' },
  { name: 'Node.js', level: 85, category: 'framework' },
  { name: 'Docker', level: 82, category: 'tool' },
  { name: 'Kubernetes', level: 78, category: 'tool' },
  { name: 'AWS', level: 85, category: 'cloud' },
  { name: 'Azure', level: 80, category: 'cloud' },
  { name: 'Machine Learning', level: 93, category: 'skill' },
  { name: 'Deep Learning', level: 91, category: 'skill' },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered Content Generator',
    description: 'Advanced NLP model for generating high-quality content using GPT architecture',
    image: '/projects/project1.jpg',
    tags: ['Python', 'PyTorch', 'NLP', 'Transformers'],
    link: 'https://github.com/yourusername/project1',
    featured: true,
  },
  {
    id: 2,
    title: 'Computer Vision Pipeline',
    description: 'Real-time object detection and classification system for autonomous vehicles',
    image: '/projects/project2.jpg',
    tags: ['TensorFlow', 'OpenCV', 'YOLO', 'Python'],
    link: 'https://github.com/yourusername/project2',
    featured: true,
  },
  {
    id: 3,
    title: 'Predictive Analytics Platform',
    description: 'ML-driven forecasting tool for business intelligence and decision making',
    image: '/projects/project3.jpg',
    tags: ['Scikit-learn', 'Pandas', 'React', 'FastAPI'],
    link: 'https://github.com/yourusername/project3',
    featured: true,
  },
  {
    id: 4,
    title: 'Neural Style Transfer App',
    description: 'Web application for artistic image transformation using deep learning',
    image: '/projects/project4.jpg',
    tags: ['PyTorch', 'Next.js', 'AWS', 'Docker'],
    link: 'https://github.com/yourusername/project4',
    featured: false,
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Senior AI Engineer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading AI initiatives and building ML models for production systems',
    achievements: [
      'Developed transformer-based models improving accuracy by 35%',
      'Led team of 5 engineers in ML infrastructure development',
      'Reduced model inference time by 60% through optimization',
    ],
  },
  {
    id: 2,
    role: 'Machine Learning Engineer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Built and deployed ML models for recommendation systems',
    achievements: [
      'Created recommendation engine serving 1M+ users',
      'Implemented A/B testing framework for model evaluation',
      'Improved user engagement by 45% with personalized features',
    ],
  },
  {
    id: 3,
    role: 'Data Scientist',
    company: 'Analytics Co',
    period: '2018 - 2020',
    description: 'Analyzed data and created predictive models for clients',
    achievements: [
      'Built predictive models with 90%+ accuracy',
      'Automated reporting saving 20 hours/week',
      'Delivered insights driving $2M in revenue growth',
    ],
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CTO at Tech Corp',
    content: 'Exceptional AI engineer who delivered a production-ready ML system ahead of schedule. Their expertise in deep learning and system architecture is outstanding.',
    avatar: '/testimonials/avatar1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    content: 'Working with them was a game-changer for our product. They not only built great models but also understood the business needs perfectly.',
    avatar: '/testimonials/avatar2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Senior Developer',
    content: 'Incredible technical skills combined with great communication. The AI solutions they built transformed our user experience significantly.',
    avatar: '/testimonials/avatar3.jpg',
    rating: 5,
  },
]

export const STATS = [
  { label: 'Years Experience', value: 6 },
  { label: 'Projects Completed', value: 47 },
  { label: 'AI Models Deployed', value: 23 },
  { label: 'Client Satisfaction', value: 98 },
]
