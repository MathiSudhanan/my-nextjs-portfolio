/**
 * One cache tag per Sanity document type. Queries declare the types they read,
 * and the revalidate webhook invalidates the tag of the document that changed.
 */
export type SanityTag = `sanity:${string}`;

export function tagForType(documentType: string): SanityTag {
  return `sanity:${documentType}`;
}

const DOCUMENT_TYPE = /^[A-Za-z][A-Za-z0-9]{0,63}$/;

export function isDocumentType(value: unknown): value is string {
  return typeof value === "string" && DOCUMENT_TYPE.test(value);
}
