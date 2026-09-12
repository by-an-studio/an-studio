import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
const orderedTypes = [
  'home',
  'workPage',
  'project',
  'services',
  'about',
  'clientApplication',
  'shop',
  'footer',
  'privacyPolicy',
  'newsletterSubscriber',
]

export const structure: StructureResolver = (S) => {
  const orderedItems = orderedTypes.map((typeName) => S.documentTypeListItem(typeName))
  const remainingItems = S.documentTypeListItems().filter(
    (item) => !orderedTypes.includes(item.getId() as string)
  )
  return S.list()
    .title('Content')
    .items([...orderedItems, ...remainingItems])
}
