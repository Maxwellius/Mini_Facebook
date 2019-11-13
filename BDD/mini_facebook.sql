-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 13 nov. 2019 à 13:53
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mini_facebook`
--

-- --------------------------------------------------------

--
-- Structure de la table `lien_amis`
--

DROP TABLE IF EXISTS `lien_amis`;
CREATE TABLE IF NOT EXISTS `lien_amis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUtilisateur1` int(11) NOT NULL,
  `idUtilisateur2` int(11) NOT NULL,
  `etat` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `contenu` text,
  `dateEcrit` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `idAuteur` int(11) NOT NULL,
  `idAmi` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `message`
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
(9, '9emeMessage', 'the final 9eme message', '2017-04-10 16:57:14', '', 9, 3);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(15) NOT NULL,
  `mdp` varchar(15) NOT NULL,
  `avatar` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `login`, `mdp`, `avatar`) VALUES
(1, 'test', 'test', ''),
(2, 'alex', 'alex', ''),
(3, 'will', 'will', ''),
(4, 'alexandre', 'alexandre', ''),
(5, 'william', 'william', ''),
(6, 'jean', 'jean', ''),
(7, 'phillipe', 'phillipe', ''),
(8, 'francis', 'francis', ''),
(9, 'sam', 'sam', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
