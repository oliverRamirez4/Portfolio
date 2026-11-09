export const SKILLS = [
  "Python",
  "Postgres",
  "Unix",
  "TypeScript",
  "React",
  "Next.js",
  "D3",
  "Mapbox",
  "Flask",
  "Hugging Face",
  "spaCy",
  "scikit-learn",
  "NumPy",
  "Matplotlib",
  "Java",
  "Java Swing",
  "MySQL",
  "Radon",
  "Modal",
] as const;

export type Skill = (typeof SKILLS)[number];

export interface OnSite {
  originEnv: string;
  assetPrefix: string;
}

export interface Project {
  shortName: string;
  title: string;
  summary: string;
  repositoryUrl: string;
  skills: Skill[];
  image?: string;
  externalUrl?: string;
  onSite?: OnSite;
}

export interface Rewrite {
  source: string;
  destination: string;
}

const RESERVED_SHORT_NAMES = new Set(["experience", "projects", "blog", "resume", "_next"]);

const RESERVED_SOURCES = new Set([
  "/",
  "/resume",
  "/experience",
  "/projects",
  "/blog",
  "/_next",
  "/.well-known",
  "/apps",
]);

function isHttpUrl(value: string): boolean {
  return value.startsWith("https://") || value.startsWith("http://");
}

function expectedOriginEnv(shortName: string): string {
  return `PROJECT_${shortName.replaceAll("-", "_").toUpperCase()}_ORIGIN`;
}

function assertProject(project: Project, seenNames: Set<string>, seenPrefixes: Set<string>) {
  if (!project.shortName || project.shortName !== project.shortName.toLowerCase() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.shortName)) {
    throw new Error(`shortName must be lowercase and hyphenated: ${project.shortName}`);
  }
  if (RESERVED_SHORT_NAMES.has(project.shortName)) {
    throw new Error(`shortName is reserved: ${project.shortName}`);
  }
  if (seenNames.has(project.shortName)) {
    throw new Error(`duplicate shortName: ${project.shortName}`);
  }
  seenNames.add(project.shortName);
  if (!project.title || !project.summary || !isHttpUrl(project.repositoryUrl)) {
    throw new Error(`project ${project.shortName} is missing title, summary, or repositoryUrl`);
  }
  const skills = new Set<string>();
  for (const skill of project.skills) {
    if (!SKILLS.includes(skill) || skills.has(skill)) {
      throw new Error(`invalid skills for ${project.shortName}`);
    }
    skills.add(skill);
  }
  if (project.externalUrl && !isHttpUrl(project.externalUrl)) {
    throw new Error(`externalUrl must be an absolute http(s) URL for ${project.shortName}`);
  }
  if (project.onSite) {
    const assetPrefix = `/apps/${project.shortName}-static`;
    if (project.onSite.assetPrefix !== assetPrefix) {
      throw new Error(`assetPrefix must equal ${assetPrefix}`);
    }
    if (project.onSite.originEnv !== expectedOriginEnv(project.shortName)) {
      throw new Error(`originEnv must equal ${expectedOriginEnv(project.shortName)}`);
    }
    if (seenPrefixes.has(project.onSite.assetPrefix)) {
      throw new Error(`duplicate assetPrefix: ${project.onSite.assetPrefix}`);
    }
    seenPrefixes.add(project.onSite.assetPrefix);
  }
}

function assertSource(source: string) {
  if (RESERVED_SOURCES.has(source) || source === "/apps" || source === "/apps/") {
    throw new Error(`reserved rewrite source: ${source}`);
  }
}

export function buildRewrites(projects: Project[]): Rewrite[] {
  const seenNames = new Set<string>();
  const seenPrefixes = new Set<string>();
  const rules: Rewrite[] = [];

  for (const project of projects) {
    assertProject(project, seenNames, seenPrefixes);
    if (!project.onSite) {
      continue;
    }
    const origin = process.env[project.onSite.originEnv];
    if (!origin) {
      throw new Error(`missing origin variable ${project.onSite.originEnv}`);
    }
    const base = origin.replace(/\/$/, "");
    const page = `/apps/${project.shortName}`;
    const asset = project.onSite.assetPrefix;
    for (const source of [page, `${page}/:path+`, `${asset}/:path+`]) {
      assertSource(source);
    }
    rules.push(
      { source: page, destination: `${base}${page}` },
      { source: `${page}/:path+`, destination: `${base}${page}/:path+` },
      { source: `${asset}/:path+`, destination: `${base}${asset}/:path+` },
    );
  }

  return rules;
}

export function openHref(project: Project): string | null {
  if (project.onSite) {
    return `/apps/${project.shortName}`;
  }
  if (project.externalUrl) {
    return project.externalUrl;
  }
  return null;
}

export const projects: Project[] = [
  {
    shortName: "colorado-vote",
    title: "Colorado Down Ballot Visuals",
    summary:
      "For my thesis project I worked alongside my group of 5 senior computer Science students to build a full stack application that provides a resource to Colorado journalists for visualizing down ballot election results which are smaller ballot measures at the state level. Our project was complete with iframe embed codes and a 20 year postgresql database of all ballot results.",
    repositoryUrl: "https://github.com/oliverRamirez4/coloradoVoteVisuals",
    skills: ["TypeScript", "React", "Next.js", "Postgres", "D3"],
    image: "/voteVisual.png",
    onSite: {
      originEnv: "PROJECT_COLORADO_VOTE_ORIGIN",
      assetPrefix: "/apps/colorado-vote-static",
    },
  },
  {
    shortName: "shelter-connect",
    title: "Shelter Connect",
    summary:
      "A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve.",
    repositoryUrl: "https://github.com/oliverRamirez4/COSConnect",
    skills: ["TypeScript", "React", "Next.js", "Postgres", "Mapbox"],
    onSite: {
      originEnv: "PROJECT_SHELTER_CONNECT_ORIGIN",
      assetPrefix: "/apps/shelter-connect-static",
    },
  },
  {
    shortName: "nlp-labs",
    title: "Natural Language Processing Labs",
    summary:
      "Labs I completed for the Natural Language Processing Course at Colorado College all written in python. Topics included semantic analysis, word embeddings, speech classification, and semantic similarity using cosine similarity of word embeddings. Starter code for labs was provided by Professor Blake Jackson.",
    repositoryUrl: "https://github.com/oliverRamirez4/NaturalLanguageProcessingLabs",
    skills: ["Python", "spaCy", "scikit-learn", "NumPy", "Matplotlib"],
    image: "/cosineSimilarity.png",
  },
  {
    shortName: "level-up",
    title: "Conversational AI Chat Interface",
    summary:
      "A full stack application I built which allows the user to talk with the blender AI conversational chatbot. This project acted as an introduction to full-stack applications and I was able to work with many front end technologies for the first time while gaining familiarity with Hugging Face Machine Learning Library.",
    repositoryUrl: "https://github.com/oliverRamirez4/LevelUp2024",
    skills: ["Python", "Flask", "Hugging Face"],
    image: "/levelUp.png",
  },
  {
    shortName: "osu-clone",
    title: "Osu Rhythm Game Clone",
    summary:
      "A clone of the rhythm game OSU built with Java. Implemented a music player that plays on a seperate thread, a leaderboard using SQL, and a file reading system that allows us to drop a .osu file into our game and it will automatically generate a level based on the files parameters. UI built with Java Swing library.",
    repositoryUrl: "https://github.com/oliverRamirez4/Osu-Game-Clone-Java",
    skills: ["Java", "Java Swing", "MySQL"],
    image: "/OsuGame.png",
  },
  {
    shortName: "river-permit",
    title: "River Permit API Wrapper",
    summary:
      "A Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits.",
    repositoryUrl: "https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper",
    skills: ["Python"],
  },
  {
    shortName: "swe-bench-radon",
    title: "SWE-bench Radon Metrics",
    summary:
      "A fork of SWE-bench that records Radon metrics for the repository and a summary of the model patch during Modal evaluation. The numbers are saved on the instance report so they can be compared with whether the model solves the GitHub issue.",
    repositoryUrl: "https://github.com/oliverRamirez4/SWE-bench-x-Radon-metrics",
    skills: ["Python", "Radon", "Modal"],
  },
];
