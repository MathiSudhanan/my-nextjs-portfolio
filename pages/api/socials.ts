// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { SocialIconProps } from "react-social-icons";
import { sanityClient } from "../../sanity";
import { Social } from "../../typings";

type Data = {
  socials: Social[];
};

const query = groq`*[_type=="social"]`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(sanityClient.);
  const socials: Social[] = await sanityClient.fetch(query);

  console.log(socials);

  res.status(200).json({ socials });
}
