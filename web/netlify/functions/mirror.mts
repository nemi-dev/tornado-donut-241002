import type { Context } from "@netlify/functions"
export default async (req: Request, context: Context) => {
  const headerObject: [string, string][] = []
  req.headers.forEach((v, k, p) => headerObject.push([k, v]))
  return new Response(JSON.stringify(headerObject, null, 2))
  // return new Response(JSON.stringify({ req, context }, null, 2))
}
