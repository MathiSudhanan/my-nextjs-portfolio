import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { isDocumentType, tagForType } from "@/lib/sanity/tags";

// Sanity webhook target. In the Sanity dashboard create a webhook that POSTs to
//   https://<site>/api/revalidate
// with a secret, the projection `{ _type }`, and "Drafts" turned off.
type WebhookBody = { _type?: unknown };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation is not configured" },
      { status: 501 },
    );
  }

  const { isValidSignature, body } = await parseBody<WebhookBody>(request, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const documentType = body?._type;
  if (!isDocumentType(documentType)) {
    return NextResponse.json({ message: "Missing document type" }, { status: 400 });
  }

  revalidateTag(tagForType(documentType), "max");
  return NextResponse.json({ revalidated: true, type: documentType });
}
