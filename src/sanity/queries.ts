// Helper for image fields shared across queries
const imageFields = `{ ..., asset-> }`

export const queries = {
  caseStudies: `
    *[_type == "caseStudy"] | order(order asc) {
      id,
      title,
      subtitle,
      link,
      problem {
        content,
        images[] { src, caption }
      },
      solution {
        content,
        images[] { src, caption }
      },
      result {
        content,
        images[] { src, caption }
      },
      additionalImages[] { src, caption },
      videoUrl,
      videoPoster
    }
  `,

  projects: `
    *[_type == "project"] | order(order asc) {
      title, link, url, tags, description,
      image ${imageFields}
    }
  `,

  articleLinks: `
    *[_type == "article"] | order(order asc) {
      title, description, url, length, imageUrl,
      image ${imageFields}
    }
  `,

  openSource: `
    *[_type == "openSource"] | order(order asc) {
      title, githubUrl, npmUrl, description
    }
  `,

  demos: `
    *[_type == "demo"] | order(order asc) {
      title, "id": codepenId, hearts,
      image ${imageFields}
    }
  `,

  recommendations: `
    *[_type == "recommendation"] | order(order asc) {
      name, company, position, message
    }
  `,

  contactPoints: `
    *[_type == "contactPoint"] | order(order asc) {
      url, title, type, icon
    }
  `,

  clients: `
    *[_type == "siteClient"] | order(order asc) {
      title, url
    }
  `,

  about: `
    *[_type == "about"][0] {
      meBio,
      siteBio,
      metaText,
      metaCodeHint,
      "resumeUrl": resumeUrl.asset->url,
      tabLabelMe,
      tabLabelSite,
      lorePrompt,
      loreYes,
      loreNo
    }
  `,

  pageContent: (pageSlug: string) => `
    *[_type == "pageContent" && pageSlug == "${pageSlug}"][0] {
      _id,
      pageSlug,
      title,
      subtitle,
      icon,
      gameTitle,
      gameSubtitle,
      gameIcon,
      introText,
      sections
    }
  `,

  achievements: `
    *[_type == "achievement"] | order(order asc) {
      id,
      title,
      description,
      icon,
      order
    }
  `,

  siteSettings: `
    *[_type == "siteSettings"][0] {
      siteTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      "ogImageUrl": ogImage.asset->url,
      ogUrl,
      identityUrl
    }
  `,

  inventoryItems: `
    *[_type == "inventoryItem"] | order(order asc) {
      id,
      name,
      description,
      icon,
      useContent,
      addOnFor,
      order
    }
  `,

  themes: `
    *[_type == "theme"] | order(order asc) {
      id,
      displayName,
      backgroundColors,
      textColors,
      order,
      unlockable
    }
  `,

  uiStrings: `
    *[_type == "uiStrings"][0] {
      formLabelName,
      formLabelEmail,
      formLabelMessage,
      formButtonSend,
      formSuccessMessage,
      formGameLabelUserName,
      formGamePlaceholderName,
      formGamePlaceholderEmail,
      formGamePlaceholderMessage,
      formGameButtonSubmit,
      formGameSuccessMessage,
      formCodeButtonClear,
      settingsTitle,
      settingsSubtitle,
      settingsToggleAbout,
      settingsToggleAboutDesc,
      settingsToggleWork,
      settingsToggleWorkDesc,
      settingsToggleWriting,
      settingsToggleWritingDesc,
      settingsToggleContact,
      settingsToggleContactDesc,
      settingsToggleDelete,
      settingsToggleDeleteDesc,
      settingsButtonCancel,
      settingsButtonDelete,
      inventoryTitle,
      inventoryEmptyTitle,
      inventoryEmptyMessage,
      inventoryButtonBack,
      inventoryButtonUse,
      themeModalTitle,
      themeLockedTooltip,
      themeLockMessage,
      linkGithub,
      linkLinkedIn,
      linkThemes,
      linkInventory,
      linkSettings,
      siteName,
      notFoundMeta,
      notFoundTitle,
      notFoundMessage,
      notFoundLink,
      githubModalTitle,
      githubModalSubtitle,
      githubButtonLabel,
      githubPollKeep,
      githubPollRemove,
      cardTitleThemes,
      cardTitleAchievements,
      cardTitleLore,
      loreCountTotal,
      loadingText,
      loadingMessages,
      ariaCloseModal,
      ariaClose,
      ariaLockedTheme,
      ariaLockColor,
      ariaHome,
      ariaCodeDigitTemplate,
      caseStudyProblem,
      caseStudySolution,
      caseStudyResult,
      workSectionOpenSource,
      aboutSectionMeta,
      loginButtonGithub,
      colorCopy,
      colorLock,
      colorChooseNew,
      colorCopiedToast
    }
  `,

  journeyContent: `
    *[_type == "journeyContent"][0] {
      meta,
      title,
      introWithCode,
      introNoCode,
      enterCodePrompt,
      journeyEndsIntro,
      noCodeHint,
      rewardMessage,
      eryndorAvailableMessage,
      thanksParticipating,
      activateButton,
      switchButton,
      story,
      thanksWalking
    }
  `,
}
