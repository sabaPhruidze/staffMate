import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const rows = await sql`
      SELECT id, name, email, company_name
      FROM employees
      ORDER BY id;
    `;
    return res.status(200).json(rows);
  }

  if (req.method === "POST") {
    const { name, email, company_name } = req.body ?? {};
    if (!name || !email || !company_name) {
      return res.status(400).json({ error: "name, email, company_name are required" });
    }

    const inserted = await sql`
      INSERT INTO employees (name, email, company_name)
      VALUES (${name}, ${email}, ${company_name})
      RETURNING id, name, email, company_name;
    `;

    return res.status(201).json(inserted[0]);
  }

  return res.status(405).send("Method Not Allowed");
}
