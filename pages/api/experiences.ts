// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Experience } from "../../typings";

type Data = {
  experiences: Experience[];
};

const query = groq`*[_type=="experience"] | order(_createdAt desc){
  ...,
  technologies[]->
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const experiences: Experience[] = await sanityClient.fetch(query);
  res.status(200).json({ experiences });
}
