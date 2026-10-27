import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { PageInfo } from "../typings";

// Explicit projection: phoneNumber and address stay in Sanity but never reach the page props.
const query = groq`*[_type=="pageInfo"][0]{
  _id, _type, _createdAt, _updatedAt, _rev,
  name, role, email, heroImage, profilePic, backgroundInformation
}`;

export const fetchPageInfo = async () => {
  const pageInfo: PageInfo = await sanityClient.fetch(query);
  return pageInfo;
};
