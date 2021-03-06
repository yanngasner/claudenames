import styled from "styled-components";
import {Team} from "../types/enums";
import {getButtonImage, gameGrey, gameWhite} from "../services/colorsProvider";
import rightBall from "../resources/bulle_Droite.png";
import leftBall from "../resources/bulle_Gauche.png";
import "../App.css"

const BaseButton = styled.button`
  color:${gameWhite};
  background-image: url(${(props: {team: Team | undefined}) => getButtonImage(props.team)});
  background-size: 100% 100%;
  margin: auto auto;
  display: block;
  &:hover:enabled {
    color: ${gameGrey};
  }
  &:disabled {
    opacity: 0.3;
  }
`;

export const GameButton = styled(BaseButton)`
  width: 10vw;
  height: calc(var(--upper-height) / 4);
  font-size: 1.5vw;
  @media (max-aspect-ratio: 1/1) {
    width: 12vw;
    height: calc(var(--upper-height) / 7);
    font-size: 2vw;
  }
`;

export const MenuButton = styled(BaseButton)`
  width: 150px;
  height: 60px;
  font-size: 1.25em;
`;

export const SmallMenuButton = styled(BaseButton)`
  width: 75px;
  height: 30px;
  font-size: 1em;
`;

const BallButton = styled.button`
    color: ${gameGrey};
    background-size: 100% 100%;
    width : 100%;
    height : 90%;
    margin : auto auto;
    font-size: 0.6vw;
    padding: 0.25vw; 
    &:hover:enabled {
        font-size: 0.7vw;
    } 
    @media (max-aspect-ratio: 1/1) {
      font-size: 1vw;
      &:hover:enabled {
        font-size: 1.2vw;
    } 
  } 
`;

export const LeftBallButton = styled(BallButton)`
    background-image: url(${leftBall});
    text-align: left;
`;

export const RightBallButton = styled(BallButton)`
    background-image: url(${rightBall});
    text-align: right;
`;