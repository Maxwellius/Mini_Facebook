
--
-- Structure de la table `ecrit`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `contenu` text,
  `dateEcrit` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `idAuteur` int(11) NOT NULL,
  `idAmi` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Structure de la table `lien`
--

CREATE TABLE `lien_amis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUtilisateur1` int(11) NOT NULL,
  `idUtilisateur2` int(11) NOT NULL,
  `etat` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE `utilisateur` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `login` varchar(15) NOT NULL,
   `mdp` varchar(15) NOT NULL,
   `avatar` varchar(1500) DEFAULT NULL,
    PRIMARY KEY (`id`)
)ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


-- une donnée dans la table ecrit

INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(1, 'test', 'alors comment ca va', '2017-10-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(2, '2emeMessage', 'BONJOUR CECI EST LE DEUXIEME MESSAGE', '2012-10-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(3, '3emeMessage', 'ceci est le 3ème message', '2011-10-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(4, '4emeMessage', '4eme message', '2019-10-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(5, '5emeMessage', 'nous avons à faire à un quatrième message' '2018-07-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(6, '6emeMessage', 'en possession du sixieme', '2017-01-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(7, '7emeMessage', 'le septieme', '2016-10-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(8, '8emeMessage', 'l avant dernier qui est le 8eme', '2017-12-10 16:57:14', '', 1, 1);
INSERT INTO `message` (`id`, `titre`, `contenu`, `dateEcrit`, `image`, `idAuteur`, `idAmi`) VALUES
(9, '9emeMessage', 'the final 9eme message', '2017-04-10 16:57:14', '', 1, 1);