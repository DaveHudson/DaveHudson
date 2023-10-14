/**
 * README Generator
 */
const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');

md.use(mdEmoji);

const BLOG_HOST = `https://applification.net`;

/* README Sections */
const introTitle = generateTitle(2, `Hey :wave:, I'm ${generateLink('Dave', 'https://applification.net')}`);
const introDescription = `Owner & fullstack software engineer at **${generateLink('Applification', 'https://applification.net')}** in Durham, UK.`;
const postsTitle = generateTitle(2, `:black_nib: Recent blog posts`)
const toolsTitle = generateTitle(2, `:rocket: Stack`)
const toolsIconSize = 25;

// icons todo
/**
 * 

    - Remix ♥️
    - Vite + React Router 
    - shadcn/ui
    - Tailwind UI
    - Headless UI
    - v0
- 💬 State Management
  - URL & Form State ♥️
  - XState
  - ???
- 💬 Schema / Validation
  - Zod ♥️
- 💬 Authentication
  - Auth.js
  - AWS Cognito (Amplify)
  - Clerk  
- 💬 DB
- 💬 ORM
  - Drizzle ♥️
  - Prisma
  - AWS AppSync
- 💬 Styling
  - Tailwind ♥️
  - CSS
  - CSS in JS (if I must)
- 💬 Testing
  - Cypress ♥️
    - Component Tests
    - End-to-End Tests
- 💬 Infrastructure & DevOps
  - Vercel ♥️
  - Fly.io ♥️
  - Docker
  - GitHub Actions
  - Turbo
- AI
  - Langchain
  - OpenAI
  - Vercel AI SDK
 */
const toolsConfig = [  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
    alt: 'figma',
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    alt: 'typescript',
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    alt: 'javascript',
  },  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    alt: 'react',
  },  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    alt: 'nextjs',
  },  
  {
      src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/storybook/storybook-original.svg',
      alt: 'storybook',
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
    alt: 'tailwindcss',
  },  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
    alt: 'nodejs',
  },  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    alt: 'express',
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg',
    alt: 'graphql',
  },  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    alt: 'postgresql',
  },
  {
      src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
      alt: 'mysql',
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    alt: 'mongodb',
  },  
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg',
    alt: 'jest',
  },    
  {
      src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg',
      alt: 'python',
  },
  {
      src: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/aws/aws.png',
      alt: 'aws',
  },
  {
      src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
      alt: 'Docker',
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
    alt: 'github',
  },  
];
const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

(async () => {
  // Get blog entries
  const response = await fetch(`${BLOG_HOST}/feed`);
  const postData = await response.json();
  let posts = ``;

  postData.map(post => {
      const title = post.title;
      const postDate = post.updatedAt;
      const date = new Date(Date.UTC(
        parseInt(postDate.substring(0, 4)), // year
        parseInt(postDate.substring(5, 7)) - 1, // month (0-indexed)
        parseInt(postDate.substring(8, 10)), // day
        parseInt(postDate.substring(11, 13)), // hour
        parseInt(postDate.substring(14, 16)), // minute
        parseInt(postDate.substring(17, 19)) // second
      ));
      const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)
    
      const path = post.slug;
      posts += `<li><a target="_blank" href="${BLOG_HOST}/posts/${path}">${title} — ${formattedDate}</a></li>`;
  });

  const content = `${introTitle}\n
${introDescription}\n
${postsTitle}\n
${posts}\n
${toolsTitle}\n
<p align="left">\n
  ${tools}\n
</p>\n
`;

  const markdownContent = md.render(content);

  fs.writeFile('README.md', markdownContent, (err) => {
      if (err) {
          return console.error(err);
      }
      console.info(`Writing to README.md`);
  });
})();

function generateIcon(iconConfig, toolsIconSize) {
  return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
  return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
  return `[${label}](${link})`;
}