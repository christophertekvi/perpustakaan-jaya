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

// Untuk kirim data buku yang dipinjam
export async function POST(request) {
  try {
    const { id, namabuku, nama_peminjam, tanggal_pinjam, tanggal_kembali } =
      await request.json();
    const inputPinjam = await query({
      query:
        "INSERT INTO pinjam (id, namabuku, nama_peminjam, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?, ?)",
      values: [id, namabuku, nama_peminjam, tanggal_pinjam, tanggal_kembali],
    });
    const result = inputPinjam.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const pinjam = {
      id: id,
      namabuku: namabuku,
      nama_peminjam: nama_peminjam,
      tanggal_pinjam: tanggal_pinjam,
      tanggal_kembali: tanggal_kembali,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        pinjam: pinjam,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const deletePinjam = await query({
      query: "DELETE FROM pinjam WHERE id = ?",
      values: [id],
    });
    const result = deletePinjam.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const pinjam = {
      id: id,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        pinjam: pinjam,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}
