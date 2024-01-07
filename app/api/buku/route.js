//Untuk ambil katalog buku
import { query } from "@/app/lib/db";

export async function GET(request) {
  const buku = await query({
    query: "SELECT * FROM buku WHERE pinjam = 0",
    values: [],
  });

  let data = JSON.stringify(buku);
  return new Response(data, {
    status: 200,
  });
}

// Untuk kirim data buku yang dipinjam
export async function POST(request) {
  try {
    const { id_buku, namabuku, penulis, penerbit, pinjam } =
      await request.json();
    const inputBuku = await query({
      query:
        "INSERT INTO buku (id_buku, namabuku, penulis, penerbit, pinjam) VALUES (?, ?, ?, ?, ?)",
      values: [id_buku, namabuku, penulis, penerbit, pinjam],
    });
    const result = inputBuku.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const buku = {
      id_buku: id_buku,
      namabuku: namabuku,
      penulis: penulis,
      penerbit: penerbit,
      pinjam: pinjam,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        buku: buku,
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

// Untuk update status buku yang dipinjam
export async function PUT(request) {
  try {
    const { pinjam, id_buku } = await request.json();

    const updateBuku = await query({
      query: "UPDATE buku SET pinjam = ? WHERE id_buku = ?",
      values: [pinjam, id_buku],
    });

    const result = updateBuku.affectedRows;
    let message = "";

    if (result > 0) {
      message = "success";
      const buku = {
        pinjam: pinjam,
        id_buku: id_buku,
      };
      return new Response(
        JSON.stringify({
          message: message,
          status: 200,
          buku: buku,
        })
      );
    } else {
      throw new Error("Failed to update book.");
    }
  } catch (error) {
    console.error("Error updating book:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

// export async function DELETE(request) {
//   try {
//     const { id_buku } = await request.json();
//     const deleteBuku = await query({
//       query: "DELETE FROM buku WHERE id_buku = ?",
//       values: [id_buku],
//     });
//     const result = deleteBuku.affectedRows;
//     let message = "";
//     if (result) {
//       message = "success";
//     } else {
//       message = "error";
//     }
//     const buku = {
//       id_buku: id_buku,
//     };
//     return new Response(
//       JSON.stringify({
//         message: message,
//         status: 200,
//         buku: buku,
//       })
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         status: 500,
//         error: error.message,
//       })
//     );
//   }
// }
