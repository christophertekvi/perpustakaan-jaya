// Deskripsi: Berisi kode-kode program untuk halaman katalog
"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Link from "next/link";

interface Buku {
  id_buku: string;
  namabuku: string;
  penulis: string;
  penerbit: string;
  pinjam: number;
}

const KatalogPage = () => {
  const [book, setBook] = useState<Buku[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/buku");
        setBook(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">
              List Buku
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              List buku yang ada di Perpustakaan Jaya
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Judul Buku
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Penulis
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Penerbit
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {book.map((book) => (
                      <tr key={book.id_buku}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {book.namabuku}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {book.penulis}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {book.penerbit}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={{
                              pathname: "/peminjaman",
                              query: {
                                id: book.id_buku,
                                judul: book.namabuku,
                                penulis: book.penulis,
                                penerbit: book.penerbit,
                                pinjam: book.pinjam,
                              },
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Pinjam
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KatalogPage;
function setData(data: any) {
  throw new Error("Function not implemented.");
}
