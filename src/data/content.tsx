export const PROJECTS: {
  title: string;
  link: string;
  url: string;
  tags: string[];
  description: string;
  image: string;
}[] = [
  {
    title: "FreightWeb",
    link: "https://myfreightweb.com",
    url: "/work/freightweb",
    tags: ["UI Design Lead", "Front-end Development Lead"],
    description:
      "There is a lot of manual work that goes into moving freight within the logistics industry. FreightWeb set out to change that.",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/truck-on-mountain-road.jpg",
  },
  {
    title: "Princess MedallionClass",
    link: "https://www.princess.com/en-us/ships-and-experience/princess-medallionclass",
    url: "/work/princess",
    tags: ["React Development", "User Interface Design"],
    description:
      "An aging demographic and a lackluster onboard experience motivated Carnival Cruiselines to reinvigorate their Princess cruiseships in the Caribbean.",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/ocean-thumb.png",
  },
  {
    title: "Xinova",
    link: "https://xinova.com",
    url: "/work/xinova",
    tags: ["Front-end Development"],
    description:
      "With thousands of unused patents available and new problems waiting to be solved every single day, Xinova wanted to find useful applications for existing patents.",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/xinova_map.png",
  },
  // {
  //   title: "Older Work",
  //   link: "",
  //   url: "/work/collection",
  //   description:
  //     "A lot of effort has gone into projects that have long since ended. The lessons learned and the knowledge gleaned is the legacy that that work leaves behind.",
  //   image:
  //     "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/collection.png",
  // },
];

export const ARTICLE_LINKS: {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  length: string;
}[] = [
  {
    title: "Shopify React Scripts",
    description: "Bespoke Shopify/React Projects in Minutes",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/shopify-react.png",
    url: "https://medium.com/helpful-human/shopify-react-scripts-6e717791d7b4",
    length: "2 min read",
  },
  {
    title: "Improving Teamwork through Knowledge Sharing",
    description: "Internal meetings for team unity",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/tobythealien.jpg",
    url: "https://medium.com/helpful-human/improving-teamwork-through-knowledge-sharing-e3c6d53e6409",
    length: "3 min read",
  },
  {
    title: "SVG icon sets in React with Rollup",
    description: 'Follow up to "Embedded SVG icon sets and Reactjs"',
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/svg-rollup.png",
    url: "https://medium.com/helpful-human/svg-icon-sets-in-react-with-rollup-cd10be8206a5",
    length: "2 min read",
  },
  {
    title: "Improving User Consideration in Development",
    description:
      "While web designers consider end users throughout the design process, developers can get caught up in implementation details and lose focus on why they are writing code in the first place — users.",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/user-consideration.png",
    url: "https://medium.com/helpful-human/improving-user-consideration-in-development-604a4ddeb6dd",
    length: "4 min read",
  },
  {
    title: "Creating a Custom, Maintainable React-Scripts Package",
    description:
      "When Facebook released Create React App, I was excited to be able to harness their knowledge of the build process in my applications.",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/react-scripts.png",
    url: "https://medium.com/helpful-human/creating-a-custom-maintainable-react-scripts-package-db6d16501a94",
    length: "4 min read",
  },
  {
    title: "Process & Method",
    description:
      "An adaptation from the speech I gave at Phoenix Design Week’s Pecha Kucha talks.",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/icons.png",
    url: "https://medium.com/@Canfie1d/process-method-bddef9f5e47f",
    length: "6 min read",
  },
  {
    title: "Embedded SVG icon sets and Reactjs",
    description: "How I implemented icons at Synapse Studios",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/sketch.png",
    url: "https://medium.com/@Canfie1d/reactjs-and-embedded-svg-icons-1e6eed0dc16a",
    length: "4 min read",
  },
  {
    title: "SMACSS/BEM edge case naming convention",
    description:
      "What do you do in cases where BEM methodology fails? What does the fallback naming convention look like?",
    imageUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/code.png",
    url: "https://medium.com/@Canfie1d/smacss-bem-edge-case-naming-convention-73be902b1d30",
    length: "3 min read",
  },
];

export const OPEN_SOURCE: {
  title: string;
  githubUrl: string;
  npmUrl?: string;
  description?: string;
}[] = [
  {
    title: "Complete React Scripts",
    githubUrl: "http://www.github.com/canfie1d/complete-react-scripts",
    npmUrl: "https://www.npmjs.com/package/complete-react-scripts",
    description:
      "A react-scripts fork that adds routing, styling and state management and accessibility tooling out of the box.",
  },
  {
    title: "Resume React Template",
    githubUrl: "http://www.github.com/canfie1d/cra-template-resume",
    npmUrl: "https://www.npmjs.com/package/cra-template-resume",
    description:
      "A template for easily creating single page resume sites using create-react-app.",
  },
  {
    title: "Transition Switch",
    githubUrl: "http://www.github.com/canfie1d/transition-switch",
    npmUrl: "https://www.npmjs.com/package/transition-switch",
    description:
      "A React library that replaces the react-router switch to automatically animate between routes.",
  },
  {
    title: "Slack Statusbot",
    githubUrl: "https://github.com/canfie1d/statusbot",
    description:
      "A Slack bot that allows you to automatically publish your status in Slack based on your geolocation (or any other IFTTT trigger).",
  },
];

export const DEMOS: {
  title: string;
  id: string;
  image: string;
  hearts: string;
}[] = [
  {
    title: "Expanding Hamburger Button",
    id: "pvewaX",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/expanding_hamburger.png",
    hearts: "103",
  },
  {
    title: "Genie Style Hidden Navigation",
    id: "YPxxoa",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/genie_nav.png",
    hearts: "48",
  },
  {
    title: "Flipping 3d Form Switcher",
    id: "ogYrZG",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/3d_form.png",
    hearts: "50",
  },
  {
    title: "Bottom Card Navigation",
    id: "EagxGR",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/bottom_nav.png",
    hearts: "39",
  },
  {
    title: "Single Element Reusable Tooltip",
    id: "dnhBF",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/tooltip.png",
    hearts: "39",
  },
  {
    title: "Dropdown Mini Menu",
    id: "vymmZR",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/mini_menu.png",
    hearts: "5",
  },
  {
    title: "Blur Modal",
    id: "zwWOwj",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/blur_modal.png",
    hearts: "2",
  },
  {
    title: "Chat Bubbles",
    id: "GmMaVx",
    image:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/codepens/chat_bubbles.png",
    hearts: "1",
  },
];

export const RECOMMENDATIONS: {
  name: string;
  company: string;
  position: string;
  message: string[];
}[] = [
  {
    name: "Farah Ali",
    company: "FreightWeb",
    position: "CTO/Cofounder",
    message: [
      "Ryan has a true passion and eye for design. He was a unicorn find for FreightWeb at an early stage because we got a UX designer and Frontend Engineer in one. Its rare to find that combination where the frontend engineer truly understands the principles of usability and functional product design. We have had to pivot our tech focus a few times and each time we were able to get from idea to MVP to v1 in record time because of Ryan's ability to logically think through and problem solve. He is able to get his idea into a clickable demo version very quickly and from there the team iterates on the design and functionality till we get to something very close to the actual requirements. Doing it this way makes for fail fast iteration cycles and getting to a working product much faster. His work is of the highest quality with very few bugs (if any) escaping to production.",
      "It was great fun to work with Ryan on such a small and close knit team. He is a wonderful person on top of his abilities as an engineer. His natural leadership shone through best during a difficult 2020 when he partnered with me to keep the morale high on the dev team and make sure everyone was being heard. I would hire Ryan again in a heartbeat and any team would be lucky to have him!",
    ],
  },
  {
    name: "Jordan Bundy",
    company: "Xinova",
    position: "Frontend Engineering Lead",
    message: [
      "Having worked with Ryan over 3 years at two different companies, I can say without a doubt that he's one of the best UI Engineers I've had the pleasure to work with. Everyone looks to him for guidance with CSS and HTML best practices, and he's an advocate of making the web more accessible.",
      "Ryan is also a great teammate to work with. He uses his time to enable those around him to meet their deadlines, and always makes the mood enjoyable. He puts his focus into reflecting on what is going well, what isn't, and isn't afraid to speak up to improve the process for everyone. Fortunately, he couples that with an ability to listen and work with others. I would certainly recommend him to anyone!",
    ],
  },
  {
    name: "Kevin Crommelin",
    company: "Xinova",
    position: "Product Manager",
    message: [
      "Ryan is an excellent and well rounded front-end engineer that I would highly recommend working with. He joined as the first front-end engineer at Xinova and immediately went to work architecting the front-end and rapidly building out the UI catching up to a lot of back-end functionalities that were already built before he joined. He was one of the most dependable engineers I have worked with because he virtually always was successful in delivering all of his sprint commitments and would regularly set stretch goals for himself outside of the sprint commitments and would frequently complete those as well. In addition to his dependability he is great at understanding the business or user needs behind what he is building and contributing to the design at an early stage as well as suggesting more efficient ways to accomplish the objectives based on his knowledge of the codebase. Overall he has a phenomenal work ethic, is a pleasure to work with and a valuable asset to any team he is on.",
    ],
  },
  {
    name: "Clariz Mariano",
    company: "Xinova",
    position: "Software Engineer",
    message: [
      "Ryan is an incredibly driven and talented software engineer, whose focus on customer and user experience parallels no one. His domain of expertise is in creating perfect UX flows using scalable and maintainable code. He readily mentors others, not just to finish the work that needs to be done, but also so they master the code base as well. He readily shares his dev processes and tools so others can also increase their engineering velocity, and not work harder, but smarter.",
      "Even during the most demanding periods, Ryan was always a positive presence in our workplace and he truly understands how to manage a technically challenging project. I would wholeheartedly recommend him for any endeavors that come his way.",
      "He is a champion of right processes. He readily recognizes when to raise an issue to the organization when change is needed, and when the status quo isn’t being effective. He supports teammates to do whatever it takes to deliver commitments.",
    ],
  },
];

export const CONTACT_POINTS: {
  url: string;
  title: string;
  type?: string;
  icon?: string;
}[] = [
  // {
  //   url: "mailto:ryancanfield@me.com?subject=Hello from ryancanfield.me",
  //   title: "Contact Me",
  //   type: "button",
  // },
  // {
  //   url: "https://twitter.com/local__citizen",
  //   title: "Twitter",
  //   icon: "twitter",
  // },
  {
    url: "https://www.github.com/canfie1d",
    title: "Github",
    icon: "github",
  },
  {
    url: "https://www.linkedin.com/in/ryanmcanfield",
    title: "LinkedIn",
    icon: "linkedin",
  },
];

export const CLIENTS: { title: string; url?: string }[] = [
  {
    title: "FreightWeb",
    url: "https://myfreightweb.com",
  },
  {
    title: "Xinova",
    url: "https://xinova.com",
  },
  {
    title: "Carnival Cruiselines",
    url: "https://www.princess.com/en-us/ships-and-experience/princess-medallionclass",
  },
  {
    title: "eBay Enterprise",
  },
  {
    title: "Shopify",
  },
  {
    title: "Blue Cross Blue Shield",
  },
  {
    title: "Arizona State University",
    url: "http://usmexpat.com/",
  },
  {
    title: "University of Arizona",
  },
  {
    title: "Northern Arizona University",
  },
  {
    title: "Hotelogical",
    url: "https://hotelogical.com",
  },
  {
    title: "Hotels Ugogo",
    url: "http://hotelsugogo.com",
  },
  {
    title: "TruTankless",
    url: "https://trutankless.com",
  },
  {
    title: "BodeTree",
  },
  {
    title: "Beacon ID",
  },
  {
    title: "Puppies.com",
    url: "https://puppies.com",
  },
  {
    title: "High Above",
    url: "https://highabove.net",
  },
];
