import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const book = await query({
      query: "SELECT * FROM buku",
      values: [],
    });

    res.status(200).json({ book: book });
  }
}
