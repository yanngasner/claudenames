import React, {FC} from "react";
import './RulesComponent.css'

const RulesComponent: FC<{ isVisible: boolean }> = ({isVisible}) => {

    const getRulesText = () =>
        <div className={'rules-inner-component'}>
            <title>ClaudeNames</title>
            <br/>
            <h1>Jeu online inspiré de la version équipe du jeu CodeNames</h1>
            <br/>
            <h4>Organiser une partie</h4>
            <p>Il faut être au minimum 4 joueurs (2 par équipe), et avoir un moyen de communication accessible entre
                joueurs (visio, téléphone, en direct) pour les propositions de mots et les discussions. Par exemple,
                vous pouvez patager votre écran verticalement entre claudenames et une fenêtre de visio.</p>
            <br/>
            <h4>Avant de jouer</h4>
            <p>Avant de jouer, il est nécessaire de vous logger au jeu avec un simple nom d'utilisateur.</p>
            <p>Une fois loggé, vous pouvez via le menu rejoindre une partie déjà créée, ou en créer une
                nouvelle.</p>
            <br/>
            <h4>Description du plateau de jeu</h4>
            <li>un menu et les règles sont accessibles via les bulles en haut à gauche et à droite</li>
            <li>la partie haute du plateau regroupe les détails des tours, les boutons de jeu, et les choix d'équipes
            </li>
            <li>la partie basse du plateau permet de visualiser les mots, et de sélectionner pour le leader
                les mots choisis par l'équipe
            </li>
            <br/>
            <h4>Choix des rôles</h4>
            <p>Vous choisissez si vous êtes dans l'équipe vert ou rouge</p>
            <p>Une personne par équipe décide de prendre le lead : c'est le joueur qui fera deviner les mots à
                son équipe.</p>
            <p>Une fois les 2 leaders déclarés, la partie commence.</p>
            <p>Les leaders voient apparaitre les couleurs des cartes, tandis qu'elles restent masquées pour les
                autres joueurs.</p>
            <p>Le leader qui a un mot de plus a faire deviner (il y en a 9 contre 8) sera le premier à jouer. Il
                voit les boutons de jeu apparaitre.</p>
            <br/>
            <h4>Déroulement</h4>
            <p>Lorsque c'est à son tour de jouer, le leader va chercher,
                à faire deviner à l'ensemble des joueurs de son équipe des mots de sa couleur.</p>
            <p>Pour y parvenir, il doit proposer un mot qui, par association d'idées doit aiguiller l'équipe
                sur un ensemble des mots de la couleur de l'équipe. Le leader communique également le nombre
                de mots qu'il s'attend à ce que l'équipe découvre à partir de sa proposition.</p>
            <p>Une fois le mot communiqué, l'équipe doit proposer une liste de mots suite à une discussion
                ouverte. La proposition peut comporter plusieurs salves.</p>
            <p>A chaque proposition, validée par l'ensemble de l'équipe, le leader va sélectionner les mots,
                puis cliquer sur "Valider".</p>
            <p>Les mots sélectionnés sont dévoilés pour l'ensemble des joueurs : le fond de la carte prend la couleur
                associée au mot.</p>
            <p>Si la somme des mots proposés n'a pas encore atteint le
                nombre donné par le leader, l'équipe poursuit. Elle peut cependant décider de s'arrêter
                avant d'avoir atteint le nombre de mots proposés par le leader si elle a un doute.</p>
            <p>Le leader doit anticiper les propositions de son équipe, puisque toute découverte d'une autre
                couleur est pénalisante :</p>
            <li>le mot noir est interdit et met fin au tour, avec un victoire de l'équipe adverse</li>
            <li>les mots de l'adversaire vont à l'équipe adverse</li>
            <li>les mots jaunes sont neutres et ne comptent pas de points, mais font perdre des propositions</li>
            <p>Le mot communiqué ne doit appartenir à la famille d'aucun mot sur le plateau.</p>
            <p>Lorsque le tour est terminé, le leader clic sur "Terminer". C'est alors au tour de l'équipe
                adverse de jouer, le leader voit les boutons de jeu apparaitre.</p>
            <br/>
            <h4>Fin du round</h4>
            <p>Le round s'arrête si une équipe tombe sur le mot interdit, ou parvient à avoir tous ses mots
                dévoilés (cela peut venir de l'adversaire!)</p>
            <p>Il est alors possible de commencer un nouveau round en cliquant sur "Une autre!"</p>
            <p>Un nouveau tableau est tiré, de nouveaux leaders se désignent, et la partie peut continuer.</p>
        </div>

    return <div className={isVisible ? 'rules-component' : ''}>
        {isVisible ? getRulesText() : <div/>}
    </div>
}

export default RulesComponent;