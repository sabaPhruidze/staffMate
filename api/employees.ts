import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).send("Method Not Allowed");

  const rows = await sql`
    SELECT id, name, email, company_name
    FROM employees
    ORDER BY id;
  `;

  return res.status(200).json(rows);
}
