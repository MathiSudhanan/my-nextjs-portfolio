import type {StructureResolver} from 'sanity/structure'

const singleton = (
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
) => S.listItem().id(type).title(title).child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Site settings'),
      singleton(S, 'profile', 'Profile'),
      S.divider(),
      S.documentTypeListItem('caseStudy').title('Case studies'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('experience').title('Experience'),
      S.documentTypeListItem('technology').title('Technologies'),
      S.documentTypeListItem('martialArt').title('Martial arts'),
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('certification').title('Certifications'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.listItem()
        .title('Legacy (until the new site launches)')
        .child(
          S.list()
            .title('Legacy')
            .items([
              S.documentTypeListItem('pageInfo').title('Page info'),
              S.documentTypeListItem('skill').title('Skills'),
              S.documentTypeListItem('social').title('Socials'),
            ]),
        ),
    ])
