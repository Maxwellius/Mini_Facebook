-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 06, 2020 at 12:37 PM
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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Invitation`
--

INSERT INTO `Invitation` (`id`, `sender`, `recipient`, `status`, `timestamp`) VALUES
(11, 1, 2, 0, '2020-01-06 12:31:30');

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

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(1, 'test', 'alors comment ca va', '2017-10-10 16:57:14', '', 1, 1),
(2, '2emeMessage', 'BONJOUR CECI EST LE DEUXIEME MESSAGE', '2012-10-10 16:57:14', '', 1, 1),
(3, '3emeMessage', 'ceci est le 3ème message', '2011-10-10 16:57:14', '', 1, 1),
(4, '4emeMessage', '4eme message', '2019-10-10 16:57:14', '', 1, 1),
(5, '5emeMessage', 'nous avons à faire à un quatrième message', '2018-07-10 16:57:14', '', 3, 2),
(6, '6emeMessage', 'en possession du sixieme', '2017-01-10 16:57:14', '', 4, 7),
(7, '7emeMessage', 'le septieme', '2016-10-10 16:57:14', '', 8, 1),
(8, '8emeMessage', 'l avant dernier qui est le 8eme', '2017-12-10 16:57:14', '', 5, 5),
(9, '9emeMessage', 'the final 9eme message', '2017-04-10 16:57:14', '', 9, 3),
(10, 'Je crée une nouvelle publication', 'Le contenu de cette publication est très intéressant\r\n', '2019-12-20 21:56:18', 'LeLienDeLimage', 1, 2),
(11, 'Nouvelle Publication', 'Texte de la nouvelle publication', '2019-12-25 17:43:30', 'LeLienDeLimage', 1, 2),
(12, 'Un titre', 'Le contenu de ma publication', '2019-12-25 21:10:12', 'LeLienDeLimage', 12, 2);

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `login` varchar(15) NOT NULL,
  `mdp` varchar(15) NOT NULL,
  `avatar` varchar(1500) DEFAULT NULL,
  `nom` varchar(15) NOT NULL,
  `prenom` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `login`, `mdp`, `avatar`, `nom`, `prenom`) VALUES
(1, 'test', 'test', '', 'Test', 'Test'),
(2, 'alex', 'alex', '', 'Alexandre', 'Alexandre'),
(3, 'will', 'will', '', 'OLAX', 'William'),
(4, 'alexandre', 'alexandre', '', 'Alex', 'Dupont'),
(5, 'william', 'william', '', 'William', 'Shakespeare'),
(6, 'jean', 'jean', '', 'Jean', 'Hubert'),
(7, 'phillipe', 'phillipe', '', 'Philippe', 'Chauvel'),
(8, 'francis', 'francis', '', 'Francis', 'Cariotte'),
(9, 'sam', 'sam', '', 'Samuel', 'Desalos'),
(10, 'gjoliveau', 'gjolicaue', '', 'Joliveau', 'Gael'),
(11, 'elodupret', 'elodupret', '', 'Eloise', 'Dupret'),
(12, 'azertyuiop', 'azertyuiop', '', 'azerty', 'azerty');

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
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Amitie`
--
ALTER TABLE `Amitie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Invitation`
--
ALTER TABLE `Invitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
