-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 14, 2020 at 12:13 PM
-- Server version: 8.0.17
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_facebook`
--

-- --------------------------------------------------------

--
-- Table structure for table `Amitie`
--

CREATE TABLE `Amitie` (
  `id` int(11) NOT NULL,
  `idUtilisateur1` int(11) NOT NULL,
  `idUtilisateur2` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Invitation`
--

CREATE TABLE `Invitation` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `recipient` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1; 

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text,
  `dateEcrit` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `idAuteur` int(11) NOT NULL,
  `idAmi` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `id` int(11) NOT NULL,
  `login` varchar(15) NOT NULL,
  `mdp` varchar(15) NOT NULL,
  `avatar` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `nom` varchar(15) NOT NULL,
  `prenom` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Utilisateur`
--

INSERT INTO `Utilisateur` (`id`, `login`, `mdp`, `avatar`, `nom`, `prenom`) VALUES
(23, 'jon', 'jon', NULL, 'Rettinger', 'Jon'),
(20, 'leo', 'leo', NULL, 'Duff', 'Léo'),
(19, 'dave', 'dave', NULL, 'Lee', 'Dave'),
(18, 'austin ', 'austin', NULL, 'Evans', 'Austin'),
(17, 'wallace', 'wallace', NULL, 'Dangelo', 'Wallace'),
(16, 'marques', 'marques', NULL, 'Brownlee', 'Marques'),
(21, 'rene', 'rene', NULL, 'Ritchie', 'René'),
(22, 'drew', 'drew', NULL, 'Gooden', 'Drew'),
(14, 'jarvis', 'jarvis', '', 'Johnson', 'Jarvis'),
(13, 'dannygonzalez', 'dannygonzalez', '', 'Gonzalez', 'Danny');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Amitie`
--
ALTER TABLE `Amitie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Invitation`
--
ALTER TABLE `Invitation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Amitie`
--
ALTER TABLE `Amitie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Invitation`
--
ALTER TABLE `Invitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
