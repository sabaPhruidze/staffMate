import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "DELETE") return res.status(405).send("Method Not Allowed");

  const id = Number(req.query.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  await sql`DELETE FROM employees WHERE id = ${id};`;
  return res.status(200).json({ ok: true });
}
