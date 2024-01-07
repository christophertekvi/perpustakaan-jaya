"use client"; // This is a custom pragma that tells Vercel to use the client-side version of React
import React, { useEffect, useState } from "react"; // Import React
import Header from "../components/Header";  // Import Header component
import { useSearchParams } from "next/navigation";  // Import useSearchParams hook
import axios from "axios";  // Import axios
import { useRouter } from "next/navigation";  

const PeminjamanPage = () => {  // Create PeminjamanPage component
  const searchParams = useSearchParams();
  const idbuku = searchParams.get("id");
  const judulbuku = searchParams.get("judul");
  const penulis = searchParams.get("penulis");
  const penerbit = searchParams.get("penerbit");
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);
  const tanggalKembali = nextWeekDate.toDateString();
  const idPinjam = "P" + idbuku;  

  const router = useRouter(); // Create router variable
  const [pinjam, setPinjam] = useState("1"); // State to hold pinjam value
  const [idBuku, setIdBuku] = useState(idbuku);   // State to hold idBuku value
  const [nama, setNama] = useState("");   // State to hold nama value

  const handleUpdateClick = async () => {
    try {
      // Send PUT request to update buku
      const putResponse = await fetch("/api/buku", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinjam, id_buku: idBuku, action: "update" }),
      });

      const putData = await putResponse.json();

      if (!putResponse.ok) {
        console.error(putData.error);
      }

      //Send POST request to create new peminjaman
      const postResponse = await fetch("/api/buku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idPinjam,
          namabuku: judulbuku,
          nama_peminjam: nama,
          tanggal_pinjam: formattedDate,
          tanggal_kembali: tanggalKembali,
          action: "insert",
        }),
      });

      const postData = await postResponse.json();

      if (!postResponse.ok) {
        console.error(postData.error);
      }

      // Check both responses and handle accordingly
      if (putResponse.ok && postResponse.ok) {
        alert("Buku berhasil dipinjam");
        router.push("/katalog");
      } else {
        // Handle errors if necessary
        console.error("One or more actions failed");
      }
    } catch (error) {
      console.error("Error executing actions:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="formpeminjaman p-4 mx-auto mt-4">
        <h1 className="text-xl text-center font-bold">
          DATA BUKU YANG DIPIJAM
        </h1>
        <p>Judul Buku: {judulbuku}</p>
        <p>Penulis: {penulis}</p>
        <p>Penerbit: {penerbit}</p>
        <p>Tanggal pinjam: {formattedDate}</p>
        <p>Tanggal kembali: {tanggalKembali}</p>
        <input // Create input field for nama
          type="text"
          placeholder="Masukkan Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button // Create button to handle update click
          onClick={handleUpdateClick}
          type="button"
          className="ml-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold mt-4 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default PeminjamanPage;
