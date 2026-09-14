'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media, mediaAssetSource} from 'sanity-plugin-media'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {previewActionEn, previewActionEs} from './sanity/actions/previewAction'

export default defineConfig({
  name: 'an-studio',
  title: 'An Studio',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [structureTool({structure}), media()],
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  document: {
    actions: (prev, context) => {
      const previewableTypes = [
        'home',
        'about',
        'services',
        'workPage',
        'shop',
        'privacyPolicy',
        'clientApplication',
        'project',
      ]
      if (!previewableTypes.includes(context.schemaType)) return prev
      return [...prev, previewActionEn, previewActionEs]
    },
  },
  form: {
    image: {
      assetSources: (previousAssetSources) =>
        previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource),
    },
    file: {
      assetSources: (previousAssetSources) =>
        previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource),
    },
  },
})
