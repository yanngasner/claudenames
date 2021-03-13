import React, {FC, useState} from "react";
import './RulesComponent.css'

const RulesComponent: FC<{fromMenu:boolean}> = ({fromMenu}) => {

        const [isVisible, setVisible] = useState(fromMenu);
        const handleOnClick = () => setVisible(!isVisible);

        const getRulesText = () =>
            <div>
                    <h2>ClaudeNames</h2>
                    <br/>
                    <h4>Version online entre amis du célèbre jeu CodeNames</h4>
                    <br/>
                    <h4>Avant de jouer</h4>
                    <p>Se logger au jeu. Si vous n'avez jamais joué, il vous faudra Signup.</p>
                    <p>NB : L'association UserName - Email doit être constante.</p>
                    <p>Une fois loggé, vous pouvez via le menu rejoindre une partie déjà créée, ou en créer une
                            nouvelle.</p>
                    <br/>
                    <h4>Choix des rôles</h4>
                    <p>Vous choisissez si vous êtes dans l'équipe bleue ou rouge</p>
                    <p>Une personne par équipe décide de prendre le lead : c'est le joueur qui fera deviner les mots à
                            son équipe.</p>
                    <p>Une fois les 2 leaders déclarés, la partie commence.</p>
                    <p>Les leaders voient apparaitre les couleurs des cartes, tandis qu'elles restent masquées pour les
                            autres joueurs.</p>
                    <p>Le leader qui a un mot de plus a faire deviner (il y en a 9 contre 8) sera le premier à jouer. Il
                            voit les boutons de jeu appraitre.</p>
                    <br/>
                    <h4>Déroulement</h4>
                    <p>Lorsque c'est à son tour de jouer, le leader doit essayer de faire deviner un maximum de mots à
                            son équipe.</p>
                    <p>En utilisant des asociations d'idée, il doit à partir d'un mot qu'il choisit et communique à
                            l'ensemble des joueurs, faire deviner à son équipe le maximum de mots de sa couleur.</p>
                    <p>Il doit avant tout éviter le mot interdit (gris), éviter également les mots de l'avsersaire qui
                            seront comptabilisés pour lui, tandis que les mots neutres (jaunes) ne comptent pas.</p>
                    <p>Le mot communiqué ne doit appartenir à la famille d'aucun mot sur le plateau. Le leadr communique
                            également le nombre de mots qu'il espère que son équipe découvre.</p>
                    <p>Une fois le mot communiqué, l'équipe doit proposer une liste de mots suite à une discussion
                            ouverte. La proposition peut comporter plusieurs salves.</p>
                    <p>A chaque proposition, validée par l'ensemble de l'équipe, le leader va sélectionner les mots,
                            puis cliquer sur "Valider la sélection".</p>
                    <p>Les mots sélectionnés sont dévoilés. Si la somme des mots proposés n'a pas encore atteint le
                            nombre donné par le leader, l'équipe poursuit. Elle peut cependant décider de s'arrêter
                            avant d'avoir atteint le nombre de mots proposé par le leader si elle a un doute</p>
                    <p>Lorsque le tour est terminé, le leader clic sur "Passer la main". C'est alors au tour de l'équipe
                            adverse de jouer, le leader voit les boutons de jeu apparaitre.</p>
                    <br/>
                    <h4>Fin du round</h4>
                    <p>Le round s'arrête si une équipe tombe sur le mot interdit, ou parvient à avoir tous ses mots
                            dévoilés (cela peut venir de l'aversaire!)</p>
                    <p>Il est alors possible de commencer un nouveau round en cliquant sur "Commencer un nouveau
                            Round"</p>
                    <p>Un nouveau tableau est tiré, de nouveaux leaders se désignent, et la partie peut continuer.</p>
            </div>

        return <div className={isVisible ? 'filled-rules-component' : 'empty-rules-component'}>
                {fromMenu ? <div></div> :
                    <button onClick={() => handleOnClick()}>{isVisible ? 'Masquer' : 'Règles'}</button>}
                {isVisible ? getRulesText() : <div></div>}
        </div>
}

export default RulesComponent;