import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8tzt6p0y',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
    */
    appId: 'p9whoen1i5h1ehwq405vpj9c',
    autoUpdates: true,
  }
})
