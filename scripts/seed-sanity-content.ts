/**
 * Seed script for Sanity content migration.
 * Run with: npx tsx scripts/seed-sanity-content.ts
 *
 * Prerequisites:
 * - VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION in .env
 * - Sanity CLI: pnpm exec sanity dataset create production (if needed)
 * - Sanity client token with write access
 */

import "dotenv/config";
import { createClient } from "@sanity/client";
import { ACHIEVEMENTS } from "../src/data/achievements";
import { INVENTORY_ITEMS } from "../src/data/inventory";
import { themeConfig, unlockableThemeConfig } from "../src/data/themeConfig";

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET ?? "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION ?? "2024-01-01";
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN ?? "";

if (!projectId) {
  console.error("Missing VITE_SANITY_PROJECT_ID. Set it in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: SANITY_API_TOKEN,
});

interface PageContentSeed {
  _type: "pageContent";
  pageSlug: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  gameTitle?: string;
  gameSubtitle?: string;
  gameIcon?: string;
  introText?: string;
}

const PAGE_CONTENT: PageContentSeed[] = [
  {
    _type: "pageContent",
    pageSlug: "about",
    title: "about",
    subtitle: "",
    icon: "signs",
    gameTitle: "welcome to Eryndor",
    gameSubtitle: "",
    gameIcon: "map",
  },
  {
    _type: "pageContent",
    pageSlug: "work",
    title: "work",
    subtitle: "case studies",
    icon: "apps",
    gameTitle: "the hall of triumphs",
    gameSubtitle: "",
    gameIcon: "hall",
    introText: `Portfolio sites often showcase the work that was performed without providing additional context for the thinking that led to that outcome. These case studies break down my understanding of the problem that the software should attempt to solve, how I think about turning business objectives into user value, and the result of that work.

While most of my work is either behind a login or under NDA, I do have a few case studies available. I've also included a few open source projects that I created and maintain, or have in the past.`,
  },
  {
    _type: "pageContent",
    pageSlug: "writing",
    title: "writing",
    subtitle: "selected articles",
    icon: "writing",
    gameTitle: "battle log",
    gameSubtitle: "",
    gameIcon: "bow",
    introText:
      "Although I don't have as many opportunities to write as I'd like these days, I do have a few articles that I've written that I'm proud of. Here are a few of my favorites:",
  },
  {
    _type: "pageContent",
    pageSlug: "contact",
    title: "contact",
    subtitle: "get in touch",
    icon: "satellite",
    gameTitle: "send word back home",
    gameSubtitle: "",
    gameIcon: "scroll",
    introText:
      "I'm not seeking opportunites but I always like hearing from new (and familiar) people!",
  },
  {
    _type: "pageContent",
    pageSlug: "aboutGame",
    title: "welcome to Eryndor",
    subtitle: "a guide for the curious",
    icon: "map",
    introText:
      "This site has a game layered on top of it. You're looking at one of its pages right now.\n\nExplore to collect achievements — they unlock automatically as you do things around the site. Visit pages, mess with the theme panel, open the console, find the things that aren't obviously labeled.\n\nYour inventory holds items you discover along the way. Some are found by exploring. Some require a bit more digging.\n\nThemes can be selected or created in the theme panel. There's at least one that can only be unlocked, not chosen.\n\nGame modes (like this one) swap out page content with alternate versions. Each page has one. You can toggle them individually in settings.\n\nThat's roughly the shape of it. The rest is for you to find.",
  },
  {
    _type: "pageContent",
    pageSlug: "contactGame",
    introText:
      "If you encounter any issues with the game or have feedback, I'd love to hear about it! It's valuable to me because it helps me improve the game and provide a better experience for other players. Thank you for the support!",
  },
];

async function seedPageContent() {
  for (const doc of PAGE_CONTENT) {
    const existing = await client.fetch(
      `*[_type == "pageContent" && pageSlug == $slug][0]._id`,
      { slug: doc.pageSlug }
    );
    if (existing) {
      await client.createOrReplace({ ...doc, _id: existing });
    } else {
      await client.create(doc);
    }
  }
}

async function seedAchievements() {
  for (let i = 0; i < ACHIEVEMENTS.length; i++) {
    const a = ACHIEVEMENTS[i];
    const doc = {
      _type: "achievement",
      id: a.id,
      title: a.title,
      description: a.description,
      icon: a.icon,
      order: i,
    };
    const existing = await client.fetch(
      `*[_type == "achievement" && id == $id][0]._id`,
      { id: a.id }
    );
    if (existing) {
      await client.createOrReplace({ ...doc, _id: existing });
    } else {
      await client.create(doc);
    }
  }
}

async function seedInventoryItems() {
  const items = [
    { id: "note", ...INVENTORY_ITEMS.note, order: 0 },
    { id: "key", ...INVENTORY_ITEMS.key, order: 1 },
    { id: "code", ...INVENTORY_ITEMS.code, order: 2 },
    { id: "jewel-about", ...INVENTORY_ITEMS["jewel-about"], order: 3 },
    { id: "jewel-work", ...INVENTORY_ITEMS["jewel-work"], order: 4 },
    { id: "jewel-writing", ...INVENTORY_ITEMS["jewel-writing"], order: 5 },
    { id: "jewel-contact", ...INVENTORY_ITEMS["jewel-contact"], order: 6 },
    { id: "sword", ...INVENTORY_ITEMS.sword, order: 7 },
    {
      id: "sword-jewel",
      ...INVENTORY_ITEMS["sword-jewel"],
      addOnFor: "sword" as const,
      order: 8,
    },
  ];
  for (const item of items) {
    const doc = { _type: "inventoryItem", ...item };
    const existing = await client.fetch(
      `*[_type == "inventoryItem" && id == $id][0]._id`,
      { id: item.id }
    );
    if (existing) {
      await client.createOrReplace({ ...doc, _id: existing });
    } else {
      await client.create(doc);
    }
  }
}

async function seedThemes() {
  const themes = [
    ...themeConfig.map((t, i) => ({
      _type: "theme" as const,
      id: t.name,
      displayName: t.name,
      backgroundColors: t.backgroundColors,
      textColors: t.textColors,
      order: i,
      unlockable: false,
    })),
    ...unlockableThemeConfig.map((t, i) => ({
      _type: "theme" as const,
      id: t.name,
      displayName: t.name,
      backgroundColors: t.backgroundColors,
      textColors: t.textColors,
      order: themeConfig.length + i,
      unlockable: true,
    })),
  ];
  for (const theme of themes) {
    const existing = await client.fetch(
      `*[_type == "theme" && id == $id][0]._id`,
      { id: theme.id }
    );
    if (existing) {
      await client.createOrReplace({ ...theme, _id: existing });
    } else {
      await client.create(theme);
    }
  }
}

const UI_STRINGS = {
  _type: "uiStrings" as const,
  formLabelName: "Name",
  formLabelEmail: "Email Address",
  formLabelMessage: "Message",
  formButtonSend: "Send",
  formSuccessMessage:
    "Thanks for reaching out! I'll get back to you as soon as possible.",
  formGameLabelUserName: "User Name",
  formGamePlaceholderName: "Your name",
  formGamePlaceholderEmail: "you@example.com",
  formGamePlaceholderMessage: "Your message",
  formGameButtonSubmit: "Submit",
  formGameSuccessMessage:
    "Thanks for the feedback! If applicable, I'll get back to you pretty soon-ish.",
  formCodeButtonClear: "Clear",
  settingsTitle: "settings",
  settingsSubtitle: "Game modes",
  settingsToggleAbout: "About Page Game Mode",
  settingsToggleAboutDesc: "Replaces the about content with character GUI",
  settingsToggleWork: "Work Page Game Mode",
  settingsToggleWorkDesc: "Replaces the work content with achievements GUI",
  settingsToggleWriting: "Writing Page Game Mode",
  settingsToggleWritingDesc:
    "Replaces the writing content with progress/activity log GUI",
  settingsToggleContact: "Contact Page Game Mode",
  settingsToggleContactDesc:
    "Replaces the contact content with feedback/bug report GUI",
  settingsToggleDelete: "Delete All Progress",
  settingsToggleDeleteDesc: "Deletes all achievements and progress",
  settingsButtonCancel: "Cancel",
  settingsButtonDelete: "Delete",
  inventoryTitle: "inventory",
  inventoryEmptyTitle: "Your pockets are empty. For now.",
  inventoryEmptyMessage:
    "Explore the site and the console. Some items await discovery.",
  inventoryButtonBack: "Back",
  inventoryButtonUse: "Use",
  themeModalTitle: "themes",
  themeLockedTooltip: "There's something hidden here...",
  themeLockMessage:
    "To change your theme unlock one color at minimum.",
  linkGithub: "Website's Github Profile",
  linkLinkedIn: "LinkedIn Profile",
  linkThemes: "Themes",
  linkInventory: "Inventory",
  linkSettings: "Settings",
  siteName: "ryan canfield",
  notFoundMeta: "④⓪④",
  notFoundTitle: "404",
  notFoundMessage:
    "Oops! The page you're looking for doesn't exist (on this site anyway).",
  notFoundLink: "Go back to the home page",
  githubModalTitle: "Github Contributions per day",
  githubModalSubtitle: "current to 2012",
  githubButtonLabel: "Github Contribution Graph",
  githubPollKeep: "Yeah? Ok- I'll keep it. Thanks for the feedback.",
  githubPollRemove:
    "You're probably right. I'll remove it. Thanks for the feedback.",
  cardTitleThemes: "Themes",
  cardTitleAchievements: "Achievements",
  cardTitleLore: "Lore",
  loreCountTotal: 4,
  loadingText: "Loading...",
  loadingMessages: [
    "Fetching data...",
    "Almost there...",
    "Hmmmmm...",
    "Ut oh..",
    "..🫠",
  ],
  ariaCloseModal: "Close modal",
  ariaClose: "Close",
  ariaLockedTheme: "Locked theme",
  ariaLockColor: "Lock color",
  ariaHome: "Home",
  ariaCodeDigitTemplate: "Code Digit {n}",
  caseStudyProblem: "Problem Analysis",
  caseStudySolution: "Solution",
  caseStudyResult: "Result",
  workSectionOpenSource: "open source",
  aboutSectionMeta: "meta",
  loginButtonGithub: "Log in with Github",
  colorCopy: "Copy color",
  colorLock: "Lock color",
  colorChooseNew: "Choose new color",
  colorCopiedToast: "Color copied!",
};

async function seedUiStrings() {
  const existing = await client.fetch(`*[_type == "uiStrings"][0]._id`);
  if (existing) {
    await client.createOrReplace({ ...UI_STRINGS, _id: existing });
  } else {
    await client.create(UI_STRINGS);
  }
}

const JOURNEY_STORY_BLOCKS = [
  {
    _type: "block",
    _key: "story-1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "There are a few things hidden in this site. A code, some clues — nothing that was easy to find.",
      },
    ],
  },
  {
    _type: "block",
    _key: "story-2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s2",
        text: "You tracked them down anyway.",
      },
    ],
  },
  {
    _type: "block",
    _key: "story-3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s3",
        text: "The theme you just unlocked is called Eryndor. Thanks for going this far.",
      },
    ],
  },
];

async function seedJourneyContent() {
  const doc = {
    _type: "journeyContent",
    meta: "﹖﹖﹖﹖",
    title: "Journey's End",
    introWithCode:
      "You actually did it. You followed the clues, found the code, and made it all the way here. I genuinely didn't expect everyone to go this far — but here you are.",
    introNoCode:
      "You got here fast. Maybe you knew where you were going, or maybe you were just wandering and got lucky. Either way — welcome.",
    enterCodePrompt:
      "If you've found the code along your travels, enter it here to claim your reward.",
    journeyEndsIntro: "This is where your journey ends.",
    noCodeHint:
      "I see, however, that you have no code. You definitely know where to look but you're digging too deep.",
    rewardMessage:
      "Your determination has been rewarded.\nA shiny new theme is available for your collection!",
    eryndorAvailableMessage:
      "Eryndor is available in the theme menu.\nI hope you had as much fun finding this as I had hiding it.",
    thanksParticipating: "Thanks for participating.",
    activateButton: "Activate Eryndor",
    switchButton: "Switch to Eryndor",
    story: JOURNEY_STORY_BLOCKS,
    thanksWalking: "Thanks for walking the road.\n— Ryan",
  };
  const existing = await client.fetch(`*[_type == "journeyContent"][0]._id`);
  if (existing) {
    await client.createOrReplace({ ...doc, _id: existing });
  } else {
    await client.create(doc);
  }
}

const ARTICLE_LINKS = [
  {
    title: "Shopify React Scripts",
    description: "Bespoke Shopify/React Projects in Minutes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/shopify-react.png",
    url: "https://medium.com/helpful-human/shopify-react-scripts-6e717791d7b4",
    length: "2 min read",
    order: 0,
  },
  {
    title: "Improving Teamwork through Knowledge Sharing",
    description: "Internal meetings for team unity",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/tobythealien.jpg",
    url: "https://medium.com/helpful-human/improving-teamwork-through-knowledge-sharing-e3c6d53e6409",
    length: "3 min read",
    order: 1,
  },
  {
    title: "SVG icon sets in React with Rollup",
    description: 'Follow up to "Embedded SVG icon sets and Reactjs"',
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/svg-rollup.png",
    url: "https://medium.com/helpful-human/svg-icon-sets-in-react-with-rollup-cd10be8206a5",
    length: "2 min read",
    order: 2,
  },
  {
    title: "Improving User Consideration in Development",
    description:
      "While web designers consider end users throughout the design process, developers can get caught up in implementation details and lose focus on why they are writing code in the first place — users.",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/user-consideration.png",
    url: "https://medium.com/helpful-human/improving-user-consideration-in-development-604a4ddeb6dd",
    length: "4 min read",
    order: 3,
  },
  {
    title: "Creating a Custom, Maintainable React-Scripts Package",
    description:
      "When Facebook released Create React App, I was excited to be able to harness their knowledge of the build process in my applications.",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/react-scripts.png",
    url: "https://medium.com/helpful-human/creating-a-custom-maintainable-react-scripts-package-db6d16501a94",
    length: "4 min read",
    order: 4,
  },
  {
    title: "Process & Method",
    description:
      "An adaptation from the speech I gave at Phoenix Design Week's Pecha Kucha talks.",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/icons.png",
    url: "https://medium.com/@Canfie1d/process-method-bddef9f5e47f",
    length: "6 min read",
    order: 5,
  },
  {
    title: "Embedded SVG icon sets and Reactjs",
    description: "How I implemented icons at Synapse Studios",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/sketch.png",
    url: "https://medium.com/@Canfie1d/reactjs-and-embedded-svg-icons-1e6eed0dc16a",
    length: "4 min read",
    order: 6,
  },
  {
    title: "SMACSS/BEM edge case naming convention",
    description:
      "What do you do in cases where BEM methodology fails? What does the fallback naming convention look like?",
    imageUrl: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Link+Images/code.png",
    url: "https://medium.com/@Canfie1d/smacss-bem-edge-case-naming-convention-73be902b1d30",
    length: "3 min read",
    order: 7,
  },
];

async function seedArticleLinks() {
  for (const article of ARTICLE_LINKS) {
    const doc = { _type: "article", ...article };
    const existing = await client.fetch(
      `*[_type == "article" && title == $title][0]._id`,
      { title: article.title }
    );
    if (existing) {
      await client.createOrReplace({ ...doc, _id: existing });
    } else {
      await client.create(doc);
    }
  }
}

const GITHUB_README_URL =
  "https://github.com/canfie1d/ryancanfield.me-2024/blob/main/README.md";
const LORE_YES_CORRECT = `Oh good, I was afraid you'd say no.

${GITHUB_README_URL}`;

async function seedAboutLoreFix() {
  const about = await client.fetch<{ _id: string; loreYes?: string }>(
    `*[_type == "about"][0]{ _id, loreYes }`
  );
  if (!about?._id) return;

  const current = about.loreYes ?? "";
  const needsFix =
    current.includes("nhttps") || !current.includes(GITHUB_README_URL);

  if (needsFix) {
    await client
      .patch(about._id)
      .set({ loreYes: LORE_YES_CORRECT })
      .commit();
    console.log("Fixed about.loreYes (broken nhttps link)");
  }
}

async function seedSiteSettings() {
  const doc = {
    _type: "siteSettings",
    siteTitle: "Ryan Canfield — Seattle-based software engineering leader",
    metaDescription:
      "Seattle-based software engineering leader at ASMBL, specializing in impactful solutions with a focus on equity, accessibility, and sustainability. Beyond the code, interests include skateboarding, woodworking, and creative tinkering.",
    ogTitle: "Ryan Canfield",
    ogDescription:
      "Seattle-based software engineering leader at ASMBL, specializing in impactful solutions with a focus on equity, accessibility, and sustainability.",
    ogUrl: "https://ryancanfield.me",
    identityUrl: "https://ryancanfield.netlify.app",
  };
  const existing = await client.fetch(
    `*[_type == "siteSettings"][0]._id`
  );
  if (existing) {
    await client.createOrReplace({ ...doc, _id: existing });
  } else {
    await client.create(doc);
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    process.exit(1);
  }
  await seedPageContent();
  await seedAchievements();
  await seedInventoryItems();
  await seedThemes();
  await seedUiStrings();
  await seedJourneyContent();
  await seedAboutLoreFix();
  await seedSiteSettings();
  await seedArticleLinks();
}

main().catch(console.error);
