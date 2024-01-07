-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 05:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` varchar(6) NOT NULL,
  `namabuku` varchar(255) DEFAULT NULL,
  `penulis` varchar(255) DEFAULT NULL,
  `penerbit` varchar(255) DEFAULT NULL,
  `pinjam` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `namabuku`, `penulis`, `penerbit`, `pinjam`) VALUES
('K001', 'Komik Naruto', 'Udin', 'Gramedia', '0'),
('K002', 'Komik One Piece', 'Salahudin', 'Gramedia', '0'),
('K003', 'Komik Cihuy', 'Udin Petot', 'Rexus', '0'),
('N001', 'Novel', 'Jansen', 'Gramedia', '0'),
('N002', 'Novel Tere Liye', 'Tere Liye', 'Toko Buku', '1'),
('N003', 'Novel Tere Liye', 'Tere Liye', 'Toko Buku', '0'),
('N004', 'Novel Chicken Soup', 'Dorotothy', 'Gramedia', '0'),
('R001', 'Resep Kuno', 'Bu Rudy', 'Sambel Bu Rudy', '0');

-- --------------------------------------------------------

--
-- Table structure for table `pinjam`
--

CREATE TABLE `pinjam` (
  `id` varchar(6) NOT NULL,
  `namabuku` varchar(255) NOT NULL,
  `nama_peminjam` varchar(255) NOT NULL,
  `tanggal_pinjam` varchar(255) NOT NULL,
  `tanggal_kembali` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pinjam`
--

INSERT INTO `pinjam` (`id`, `namabuku`, `nama_peminjam`, `tanggal_pinjam`, `tanggal_kembali`) VALUES
('PK003', 'Komik Cihuy', 'Udin', 'Sun Jan 07 2024', 'Sun Jan 14 2024'),
('PP001', 'Pelajaran Bahasa Indonesia', 'Sultan', 'Sun Jan 07 2024', 'Sun Jan 14 2024'),
('PP002', 'Pelajaran IPA', 'Sultan', 'Sun Jan 07 2024', 'Sun Jan 14 2024'),
('PP003', 'Pelajaran Kimia', 'Sultan', 'Sun Jan 07 2024', 'Sun Jan 14 2024'),
('PR003', 'Resep Bakso', 'Patrick', 'Sun 07 Jan 2024', 'Sun 14 Jan 2024');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `pinjam`
--
ALTER TABLE `pinjam`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
