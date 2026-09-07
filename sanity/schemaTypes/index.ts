import { type SchemaTypeDefinition } from 'sanity'
import { imageWithTags } from './objects/imageWithTags'
import { simpleImage } from './objects/simpleImage'
import { project } from './documents/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [imageWithTags, simpleImage, project],
}
