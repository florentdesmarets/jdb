import React, { useState } from 'react';
import './App.css';
import desImage from './assets/des.png';
import diceSound from './assets/629982__flem0527__dice-rolling-on-table.wav';

const initialLists = {
    Noir: [],
    Rouge: ['Cite un animal qui commence par la lettre B ou bois 3 gorgés', 'Cite un animal qui commence par la lettre D ou bois 3 gorgés', 'Cite deux animaux qui commencent par la lettre C ou bois 2 gorgés', 'Cite deux animaux qui commencent par la lettre L ou bois 2 gorgés', 'cite un animal qui commence par la lettre X (oui il y en a) ou bois 2 gorgés', 'Fais le poirier ou bois 3 gorgés', 'Fais 2 tour sur toi même à cloche pied ou bois 2 gorgés', 'Lance un DANS MA VALISE IL Y A celui qui perd bois 3 gorgés', 'Les marques de voiture - celui qui répète ou n a plus d idée bois', '(ne pas lire a voix haute) mime un rat si les autres joueurs ne trouvent pas tu bois 3 gorgés, sinon ils boivent chacun 2 gorgés ', 'les deux personnes à coté de toi doivent faire un pierre feuille ciseaux en une manche celui qui perd bois 2 gorgés', 'trouve trois pokémons de type feu ou bois 3 gorgés (évolutions interdites)', 'trouve 3 personnages célèbres de l histoire de France ou bois 3 gorgés', 'Lance un gofio celui qui perd bois 3 gorgés', 'Votez en même temps : plutôt mourir noyer ou mourir brulé. La minorité bois 2 gorgés', 'Votez en même temps : plutôt perdre un bras ou perdre une jambe. La minorité bois 3 gorgés.', 'Votez en même temps : team hiver glacial ou team été caniculaire. La minorité bois 3 gorgés'],
    Bleu: ['Le saint verre d eau : remplace ton verre d alcool par un verre d eau le temps d un tour, prend une pause.', 'Distribue 5 gorgés à ta guise.', 'Distribue 3 gorgés à ta guise.', 'Distribue 1 gorgés à ta guise', 'Lance un dés distribue le nombre de gorgés correspondantes', 'Carte sortie de prison : le joueur qui possède cette carte peut la jouer à tout moment pour sortir UNE FOIS de prison', 'Carte ptite pute (valable une fois) : quand tu veux tu peux donner tes gorgés à une autres personne', 'Carte essaye encore (valable une fois) : quand tu veux tu peux relancer ton dé', 'Carte dé pipé (valable une fois) : quand tu veux tu peux choisir le résultat de ton lancé de dé', 'Carte ptite cave (valable une fois) : tu peux choisir quand tu veux de ne pas boire tes gorgés'],
    Ascension: [],
    Violet: ['Je n ai jamais vomi en mangeant trop en une seule fois', 'Je n ai jamais fait de bain de minuit', 'Je n ai jamais prétendu être quelqu un d autre sur un profil de site de rencontre', 'Je n ai jamais été expulsé d un bar', 'Je ne suis jamais sorti avec deux personnes en même temps', 'Je n ai jamais eu peur du noir', 'Je n ai jamais menti pour échapper à un date qui s annonce pourri', 'Je n ai jamais fait le ver ou la chenille en public', 'Je n ai jamais donné mon numéro de téléphone à un ou une inconnue', 'Je n ai jamais envoyé de message risqué au mauvais destinataire', 'Je n ai jamais eu de coup d un soir', 'Je n ai jamais envoyé de messages sexuels à quelqu un', 'Je n ai jamais couché avec quelqu un qui a au moins dix ans de plus que moi', 'Je n ai jamais eu de sexfriend', 'Je n ai jamais fais de plan à trois', 'Je n ai jamais envoyé de nude à quelqu un', 'Je n ai jamais essayé les jeux de rôle coquins', 'Je ne l ai jamais fait sur la plage', 'Je ne suis jamais allé dans un club de strip tease', 'Je n ai jamais envoyé de sextos pendant une réunion', 'Je n ai jamais eu d histoire d amour au bureau', 'Je n ai jamais été amoureux de deux personnes en même temps', 'Je n ai jamais eu un crush sur quelqu un qui était déjà pris', 'Je ne me suis jamais remis avec un ex', 'Je n ai jamais eu de crush sur un prof', 'Je ne me suis jamais fait larguer par texto', 'Je n ai jamais fais de strip-tease à quelqu un.', 'Je n ai jamais fouillé dans le téléphone de quelqu un pour découvrir ses secrets.', 'Je n ai jamais enfreint la loi de quelque manière que ce soit.', 'Je n ai jamais été viré de mon travail.', 'Je n ai jamais ressenti la présence de fantômes dans un lieu particulier.', 'Je ne me suis jamais battu physiquement.', 'Je n ai jamais volé dans un magasin.', 'Je n ai jamais frôlé la mort de près.', 'Je n ai jamais maltraité un personnage des Sims.', 'Je n ai jamais fais le mur quand j étais ado', 'Je n ai jamais tenté de contacter une star via les réseaux sociaux.', 'Je n ai jamais été réputé pour troubler le sommeil des autres par mes ronflements.', 'Je n ai jamais été vu à la télé.', 'Je n ai jamais pété dans un ascenseur en présence d inconnus.', 'Je n ai jamais vécu la mésaventure de me retrouver bloqué devant ma porte.', 'Je n ai jamais trouvé le bébé d un ami moche.', 'Je n ai jamais rigolé au point de me pisser dessus.'],
    Tuyaux: ['Tu ressors par le tuyaux 1', 'Tu ressors par le tuyaux 2', 'Tu ressors par le tuyaux 3', 'Tu ressors par le tuyaux 4', 'Tu ressors par le tuyaux 5', 'Tu ressors par le tuyaux 6'],
    Prison: ['Pour sortir tu dois faire 1', 'Pour sortir tu dois faire 2', 'Pour sortir tu dois faire 3', 'Pour sortir tu dois faire 4', 'Pour sortir tu dois faire 5', 'Pour sortir tu dois faire 6'],
  };


const colors = {
  Noir: 'catBlack',
  Rouge: 'catRed',
  Bleu: 'catBlue',
  Ascension: 'catAss',
  Violet: 'catPurple',
  Tuyaux: 'catTuy',
  Prison: 'catPrison',
};

const RandomButton = () => {
  const [lists, setLists] = useState(initialLists);
  const [results, setResults] = useState({});
  const [isRolling, setIsRolling] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);


  const rollDice = (callback) => {
    if (isSoundOn) {
      const audio = new Audio(diceSound);
      audio.play();
    }
    setIsRolling(true);
    setTimeout(() => {
      callback();
      setIsRolling(false);
    }, 1000);
  };
  
  
  const handleRandom = (name) => {
    const currentList = lists[name];
    if (currentList.length === 0) {
      setResults(prev => ({ ...prev, [name]: 'Fin de la liste !' }));
      return;
    }
    const index = Math.floor(Math.random() * currentList.length);
    const item = currentList[index];
    const newList = [...currentList];
    newList.splice(index, 1);
    setLists(prev => ({ ...prev, [name]: newList }));
    setResults(prev => ({ ...prev, [name]: item }));
  };

  const handleReset = () => {
    setIsResetting(true);
    setLists(initialLists);
    setResults({});
    setIsResetting(false);
  };

  return (
    <div className="catContainer">
      {Object.keys(initialLists).map((key) => (
        <div key={key} className={colors[key]}>
          <h4>Case {key}</h4>
          <img
            className={`buttonBlack ${isRolling ? 'rolling' : ''}`}
            src={desImage}
            onClick={() => rollDice(() => handleRandom(key))}
            alt="dé"
          />
          <div className="boxContainer">
            <ul>
              <li className={results[key] ? "cardResult" : ""}>
                {results[key]}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <div className="catDes">
        <button className="resetButton" onClick={handleReset}  disabled={isResetting}>
           {isResetting ? "Réinitialisation..." : "🔄 Réinitialiser la Partie"}
        </button>
        <div className="soundToggle">
            <button className="resetButton" onClick={() => setIsSoundOn(!isSoundOn)}>
                {isSoundOn ? "🔊 Désactiver le son" : "🔇 Activer le son"}
            </button>
        </div>
        </div>
        <footer className="footer">
            <p>🎲 Jeu créé avec passion par Julie & Florent</p>
        </footer>
    </div>
  );
};


export default RandomButton;
