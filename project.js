const projects = {
  'html-css': {
    number: '01',
    title: 'HTML & CSS',
    category: 'Web foundations',
    subtitle: 'Building clear, accessible, and polished interfaces from the ground up.',
    overview: 'Thoughtful HTML and CSS are the foundation of a great website. I use semantic structure and modern styling techniques to create pages that are easy to understand, maintain, and use.',
    focus: [
      ['Semantic structure', 'Organize content with meaningful HTML so every page has a clear, accessible hierarchy.'],
      ['Responsive layouts', 'Use Flexbox, Grid, and fluid sizing to keep content comfortable across screen sizes.'],
      ['Visual consistency', 'Build reusable styles for typography, spacing, color, and interactive states.']
    ],
    process: 'I begin with the content and page structure, then build the layout from small screens up. I refine spacing and visual details as I check the experience in different browsers and viewport sizes.',
    image: 'assets/html-css.jpg',
    imageAlt: 'HTML and CSS illustration showing web layout and code symbols',
    focusImage: 'assets/focus-css.webp',
    focusImageAlt: 'CSS keyboard focus states and accessibility illustration',
    focusImageCaption: 'Keyboard focus states make interactive controls easier to see and use.',
    approachImage: 'assets/html-css-approach.jpg',
    approachImageAlt: 'The Essential Guide to CSS and HTML Web Design cover',
    approachImageCaption: 'A web design reference behind my approach to building clear, responsive pages.',
    imageCaption: 'A clear structure is the starting point for every interface.'
  },
  javascript: {
    number: '02',
    title: 'JavaScript',
    category: 'Interactive experiences',
    subtitle: 'Making interfaces feel responsive, useful, and intuitive.',
    overview: 'JavaScript adds behavior to the interface. I use it to respond to user input, validate forms, update page content, and create focused interactions that make everyday tasks easier.',
    focus: [
      ['Useful interactions', 'Connect controls and page elements to clear, predictable user actions.'],
      ['Forms and validation', 'Guide people through entering information and make validation feedback easy to understand.'],
      ['Maintainable scripts', 'Keep browser-side code organized so features are easier to test and extend.']
    ],
    process: 'I identify the interaction and its expected states first, then implement the behavior with progressive feedback. I test both the happy path and common edge cases so the interface stays understandable.',
    image: 'assets/javascript.jpg',
    imageAlt: 'JavaScript development illustration',
    focusImage: 'assets/javascript-focus.webp',
    focusImageAlt: 'Illustration of a developer working with Java code',
    focusImageCaption: 'A Java development visual showing code being written and reviewed.',
    approachImage: 'assets/javascript-approach.webp',
    approachImageAlt: 'Cover of Java How to Program: An Objects-Natural Approach, Twelfth Edition',
    approachImageCaption: 'A Java programming textbook used as a reference for the development approach.',
    approachImageClass: 'project-approach-image-small',
    imageCaption: 'JavaScript brings interface elements to life.'
  },
  'responsive-design': {
    number: '03',
    title: 'Responsive Designs',
    category: 'Multi-device layouts',
    subtitle: 'One coherent experience, from compact phones to wide screens.',
    overview: 'Responsive design adapts a website to the device and available space. I plan layouts around the content, then refine type, spacing, and navigation so each screen feels intentional.',
    focus: [
      ['Mobile-first thinking', 'Prioritize essential content and actions for smaller screens before expanding the layout.'],
      ['Flexible components', 'Use fluid grids and adaptable elements instead of relying on fixed page widths.'],
      ['Real viewport checks', 'Review navigation, imagery, and text at multiple screen sizes to catch layout issues early.']
    ],
    process: 'I start with the narrowest layout, identify where content needs more room, then introduce breakpoints only where the design benefits. I finish by checking the whole page for overflow and awkward wrapping.',
    image: 'assets/responsive.jpg',
    imageAlt: 'Responsive design illustration displayed on desktop, tablet, and phone',
    focusImage: 'assets/responsive-focus.jpg',
    focusImageAlt: 'Responsive website displayed across desktop, tablet, and mobile devices',
    focusImageCaption: 'The same website layout adapts to desktop, tablet, and mobile screens.',
    approachImage: 'assets/responsive-approach.webp',
    approachImageAlt: 'Responsive design layout shown in a website design presentation',
    approachImageCaption: 'Responsive layouts keep the experience consistent as screen sizes change.',
    imageCaption: 'Layouts adapt to the device without losing their visual hierarchy.'
  },
  'git-github': {
    number: '04',
    title: 'Git & GitHub',
    category: 'Version control',
    subtitle: 'Keeping code organized and making changes easier to track.',
    overview: 'Git records how a codebase changes over time, while GitHub makes it easier to store and collaborate on that work. I use version control to keep updates clear, reviewable, and organized.',
    focus: [
      ['Small, clear changes', 'Group related updates so the history is easy to understand and revisit.'],
      ['Branch-based work', 'Keep feature work separate until it is ready to be reviewed and integrated.'],
      ['Reliable collaboration', 'Use repository history and pull requests to discuss changes and reduce surprises.']
    ],
    process: 'I keep work in focused branches, review the changes before integrating them, and use meaningful commit messages so future updates have a clear trail.',
    image: 'assets/github.png',
    imageAlt: 'GitHub sign-in screen illustrating a code collaboration workflow',
    focusImage: 'assets/github-focus.jpg',
    focusImageAlt: 'GitHub Desktop logo and collaborative coding illustration',
    focusImageCaption: 'GitHub Desktop helps manage commits and synchronize repository changes.',
    approachImage: 'assets/github-approach.jpg',
    approachImageAlt: 'GitHub code-quality check flagging an issue before code is shipped',
    approachImageCaption: 'Automated code checks help identify issues before changes are shipped.',
    imageCaption: 'A project repository provides a shared home for code and its history.'
  }
};

const projectContent = document.getElementById('projectContent');
const project = projects[new URLSearchParams(window.location.search).get('project')];

if (projectContent && project) {
  document.title = `${project.title} — Bilal Zaib`;
  projectContent.innerHTML = `
    <div class="project-detail-container">
      <nav class="project-breadcrumbs" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <a href="index.html#work">Selected Work</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${project.title}</span>
      </nav>

      <section class="project-intro lazy-reveal">
        <div class="project-intro-copy">
          <span class="project-eyebrow"><span>${project.number}</span> ${project.category}</span>
          <h1>${project.title}</h1>
          <p class="project-subtitle">${project.subtitle}</p>
        </div>
        <a class="project-back-link" href="index.html#work">
          <span aria-hidden="true">←</span> Back to all work
        </a>
      </section>

      <section class="project-gallery lazy-reveal" aria-label="${project.title} visuals">
        <figure class="project-gallery-primary">
          <img src="${project.image}" alt="${project.imageAlt}">
          <figcaption>${project.imageCaption}</figcaption>
        </figure>
      </section>

      <section class="project-overview lazy-reveal">
        <div class="project-section-label">
          <span>OVERVIEW</span>
          <span>${project.number} / 04</span>
        </div>
        <div class="project-overview-copy">
          <h2>Good work starts with a solid foundation.</h2>
          <p>${project.overview}</p>
        </div>
      </section>

      <section class="project-focus lazy-reveal">
        <div class="project-focus-aside">
          <div class="project-section-label">
            <span>WHAT I FOCUS ON</span>
            <span>DETAILS</span>
          </div>
          ${project.focusImage ? `
            <figure class="project-focus-image">
              <img src="${project.focusImage}" alt="${project.focusImageAlt}" loading="lazy" decoding="async">
              <figcaption>${project.focusImageCaption}</figcaption>
            </figure>
          ` : ''}
        </div>
        <div class="project-focus-grid">
          ${project.focus.map(([title, detail], index) => `
            <article class="project-focus-card">
              <span class="project-focus-number">0${index + 1}</span>
              <h3>${title}</h3>
              <p>${detail}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="project-process lazy-reveal">
        <div class="project-approach-aside">
          <div class="project-section-label">
            <span>MY APPROACH</span>
            <span>PROCESS</span>
          </div>
          ${project.approachImage ? `
            <figure class="project-approach-image ${project.approachImageClass || ''}">
              <img src="${project.approachImage}" alt="${project.approachImageAlt}" loading="lazy" decoding="async">
              <figcaption>${project.approachImageCaption}</figcaption>
            </figure>
          ` : ''}
        </div>
        <div>
          <h2>Simple, considered, and made to work.</h2>
          <p>${project.process}</p>
        </div>
      </section>

      <section class="project-contact lazy-reveal">
        <div>
          <span class="project-eyebrow">HAVE A PROJECT IN MIND?</span>
          <h2>Let's make something useful.</h2>
        </div>
        <a class="btn-talk" href="index.html#contact">Get in touch</a>
      </section>
    </div>
  `;
} else if (projectContent) {
  projectContent.innerHTML = `
    <div class="project-detail-container project-not-found">
      <span class="project-eyebrow">PROJECT NOT FOUND</span>
      <h1>That project isn't available.</h1>
      <p>Choose one of the featured skills to explore its details.</p>
      <a class="btn-talk" href="index.html#work">Back to Work</a>
    </div>
  `;
}
