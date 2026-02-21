// Helper for image fields shared across queries
const imageFields = `{ ..., asset-> }`

export const queries = {
  caseStudies: `
    *[_type == "caseStudy"] | order(order asc) {
      "id": id.current,
      title,
      path,
      subtitle,
      link,
      problem {
        content,
        images[] { image ${imageFields}, caption }
      },
      solution {
        content,
        images[] { image ${imageFields}, caption }
      },
      result {
        content,
        images[] { image ${imageFields}, caption }
      },
      additionalImages[] { image ${imageFields}, caption },
      videoUrl,
      videoPoster ${imageFields}
    }
  `,

  projects: `
    *[_type == "project"] | order(order asc) {
      title, link, url, tags, description,
      image ${imageFields}
    }
  `,

  articleLinks: `
    *[_type == "articleLink"] | order(order asc) {
      title, description, url, length,
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
      "resumeUrl": resumeUrl.asset->url
    }
  `,
}
