import { type SchemaTypeDefinition } from 'sanity'
import { imageWithTags } from './objects/imageWithTags'
import { simpleImage } from './objects/simpleImage'
import { serviceItem } from './objects/serviceItem'
import { clientColumn } from './objects/clientColumn'
import { shopProduct } from './objects/shopProduct'
import { captionedImage } from './objects/captionedImage'
import { project } from './documents/project'
import { services } from './documents/services'
import { about } from './documents/about'
import { shop } from './documents/shop'
import { clientApplication } from './documents/clientApplication'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    imageWithTags,
    simpleImage,
    serviceItem,
    clientColumn,
    shopProduct,
    captionedImage,
    project,
    services,
    about,
    shop,
    clientApplication,
  ],
}
