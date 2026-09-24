import { type SchemaTypeDefinition } from 'sanity'
import { localeString } from './objects/localeString'
import { localeText } from './objects/localeText'
import { richText } from './objects/richText'
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
import { newsletterSubscriber } from './documents/newsletterSubscriber'
import { shopWaitlistSubscriber } from './documents/shopWaitlistSubscriber'
import { footerLinkItem } from './objects/footerLinkItem'
import { footer } from './documents/footer'
import { privacyPolicy } from './documents/privacyPolicy'
import { home } from './documents/home'
import { workPage } from './documents/workPage'
import { seo } from './objects/seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    richText,
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
    newsletterSubscriber,
    shopWaitlistSubscriber,
    footerLinkItem,
    footer,
    privacyPolicy,
    home,
    workPage,
    seo,
  ],
}
