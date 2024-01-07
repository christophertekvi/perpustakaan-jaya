//Untuk ambil data buku yang sudah dipinjam
import { query } from "@/app/lib/db";

export async function GET(request) {
  const users = await query({
    query: "SELECT * FROM pinjam",
    values: [],
  });

  let data = JSON.stringify(users);
  return new Response(data, {
    status: 200,
  });
}

