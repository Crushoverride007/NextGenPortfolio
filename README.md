# NextGen Portfolio

Portfolio showcasing skills in Cybersecurity and DevOps as a modern, feature-rich website built with Gatsby.js, projecting projects, blog posts, and professional experience.

## Features

- Responsive design with smooth animations
- Content management system for:
  - Blog posts
  - Projects
  - Professional experience
- Dark/Light mode support
- SEO optimized
- Fast performance with Gatsby's static site generation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextgen-portfolio.git
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn develop
# or
npm run develop
```

## Usage

- Add new blog posts in `content/posts/`
- Add new projects in `content/projects/`
- Add job experience in `content/jobs/`
- Customize site configuration in `src/config.js`

## Project Structure

```
.
├── content/              # Content management
│   ├── featured/         # Featured projects
│   ├── jobs/             # Professional experience
│   ├── posts/            # Blog posts
│   └── projects/         # Project showcases
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/            # Page templates
│   ├── styles/           # Global styles
│   └── templates/        # Content templates
├── static/               # Static assets
│   ├── resume.pdf        # Resume
│   └── slides/           # Presentation slides
├── gatsby-*.js           # Gatsby configuration files
└── package.json          # Project dependencies
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
