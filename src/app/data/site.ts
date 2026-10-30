/**
 * All site content lives here, so most text and link changes are one-file edits.
 */

export const PROFILE = {
  name: 'Yash Bharani',
  role: 'Sr. Product Designer',
  location: 'Bengaluru, India',
  avatar: 'images/yash-avatar.webp',
  email: 'hello@yashbharani.com',
  tagline: 'I turn complex chores 🥦 into effortless journeys🍫 ... And create systems 🤖 that move metrics 📈',
  contactHeadline: "Have a chore that should feel effortless? Let's talk.",
  contactSub: 'Roles, projects, or a quick hello. I usually reply within a day.',
  // TODO: the Dropbox link from the design is a temporary download URL and will expire.
  // Put resume.pdf in /public and change this to 'resume.pdf'.
  resumeUrl: 'resume.pdf',
  skills: [
    'Product Design',
    'UX Research',
    'Interaction Design',
    'Web Developer',
    'Rapid prototyping',
    'Information Architecture',
    'Wire-framing',
    'Ideation',
  ],
};

export interface SocialLink {
  id: 'linkedin' | 'github' | 'behance';
  label: string;
  sub: string;
  href: string;
}

export const SOCIALS: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', sub: 'yash-bharani', href: 'https://www.linkedin.com/in/yash-bharani' },
  { id: 'github', label: 'GitHub', sub: 'yhbharani', href: 'https://github.com/yhbharani' },
  // TODO: the design points Behance at GitHub. Replace with the Behance profile URL.
  { id: 'behance', label: 'Behance', sub: 'Visual work', href: 'https://github.com/yhbharani' },
];

/** Logos that drop into the hero card, in order (light + dark variants). */
export const HERO_LOGOS = {
  label: 'IIT Roorkee, Petpooja, IDC IIT Bombay, D E Shaw & Co, Navi',
  seal: 'images/logo-iitr-seal.webp',
  tiles: [
    { light: 'images/logo-petpooja-light.webp', dark: 'images/logo-petpooja-dark.webp', left: 11.5, top: 21.8, width: 75.5, delay: 650 },
    { light: 'images/logo-idc-light.webp', dark: 'images/logo-idc-dark.webp', left: 3.25, top: 11.8, width: 94.25, delay: 1100 },
    { light: 'images/logo-deshaw-light.webp', dark: 'images/logo-deshaw-dark.webp', left: 0.75, top: 8, width: 98.75, delay: 1550 },
    { light: 'images/logo-navi-light.webp', dark: 'images/logo-navi-dark.webp', left: 6.5, top: 1, width: 88, delay: 2000 },
  ],
};

export interface CaseSection {
  heading: string;
  body: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Short line for cards and meta descriptions. */
  summary: string;
  tags: string[];
  /** Cover image path in /public, or null to show a placeholder. */
  cover: string | null;
  /** Featured projects appear in the home page stack, in this order. */
  featured: boolean;
  /** Use the blue tint on the home page card (project 01 in the design). */
  tint?: 'blue';
  meta: { label: string; value: string }[];
  sections: CaseSection[];
}

const PLACEHOLDER_SECTIONS: CaseSection[] = [
  { heading: 'Context', body: ['TODO: What was the product, who was it for, and what was the business goal?'] },
  { heading: 'The problem', body: ['TODO: What made the experience a chore? Add the key insight from research.'] },
  { heading: 'Process', body: ['TODO: Research, flows, explorations, testing. Add images between paragraphs.'] },
  { heading: 'Outcome', body: ['TODO: Metrics moved, what shipped, what you learned.'] },
];

// TODO: the design uses the Motor Insurance tags + description for all three cards.
// Give projects 02 and 03 their own copy.
const MOTOR_TAGS = ['Navi Super-App', '0 to 1 Product Desing', 'UX Research', 'Funnel optimisations', '7 months'];
const MOTOR_DESC =
  'Designed and scaled a 0-to-1 Motor Insurance experience inside Navi, compressing 15min. buying chore to a 3min growing sales from 0-300/day in a 3-week sprint.';

export const PROJECTS: Project[] = [
  {
    slug: 'motor-insurance',
    title: 'Building Motor Insurance',
    summary: MOTOR_DESC,
    tags: MOTOR_TAGS,
    cover: null, // e.g. 'images/cover-motor.webp' (not included in the design export)
    featured: true,
    tint: 'blue',
    meta: [
      { label: 'Company', value: 'Navi' },
      { label: 'Role', value: 'Product Designer' },
      { label: 'Timeline', value: '7 months' },
      { label: 'Impact', value: '0 → 300 sales/day' },
    ],
    sections: PLACEHOLDER_SECTIONS,
  },
  {
    slug: 'health-insurance-funnel',
    title: 'Health Insurance Funnel',
    summary: MOTOR_DESC,
    tags: MOTOR_TAGS,
    cover: null,
    featured: true,
    meta: [
      { label: 'Company', value: 'Navi' },
      { label: 'Role', value: 'TODO' },
      { label: 'Timeline', value: 'TODO' },
    ],
    sections: PLACEHOLDER_SECTIONS,
  },
  {
    slug: 'de-shaw',
    title: 'DE Shaws',
    summary: MOTOR_DESC,
    tags: MOTOR_TAGS,
    cover: null,
    featured: true,
    meta: [
      { label: 'Company', value: 'D E Shaw & Co' },
      { label: 'Role', value: 'TODO' },
      { label: 'Timeline', value: 'TODO' },
    ],
    sections: PLACEHOLDER_SECTIONS,
  },
  {
    slug: 'kharsali',
    title: 'Kharsali: ANDC trophy',
    summary: 'National level competition for village documentation and design. Published on 2019-20.',
    tags: ['Architecture', 'Village documentation', 'IIT Roorkee'],
    cover: 'images/kharsali-drawing.webp',
    featured: false,
    meta: [
      { label: 'Recognition', value: 'ANDC trophy' },
      { label: 'Published', value: '2019-20' },
    ],
    sections: PLACEHOLDER_SECTIONS,
  },
];

export const findProject = (slug: string | null | undefined) => PROJECTS.find((p) => p.slug === slug);
