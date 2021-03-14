import styled from "styled-components";
import {Team} from "../types/enums";
import {getButtonImage, gameGrey, gameWhite} from "../services/colorsProvider";
import rightBall from "../resources/bulle_Droite.png";
import leftBall from "../resources/bulle_Gauche.png";

export const GameButton = styled.button`
  color:${gameWhite};
  background-image: url(${(props: {team:Team|undefined}) => getButtonImage(props.team)});
  background-size: 100% 100%;
  width: 150px;
  height: 50px;
  font-size: 1.5rem;
  &:hover:enabled {
    color: ${gameGrey};
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.3;
  }
  &:focus {
    outline: none;
  }
`;

export const LeftBallButton = styled.button`
    background-image: url(${leftBall});
    background-size: 100% 100%;
    width : 100%;
    height : 90%;
    margin : auto auto;
    font-size: 1rem;
    color:transparent;
    text-align: left;
    padding: 0.5rem; 
    
    &:focus, &:active {
        outline: 0;
    }
    &:hover:enabled {
        cursor:pointer;
        color:${gameGrey}
    }  
`;

export const RightBallButton = styled.button`
    background-image: url(${rightBall});
    background-size: 100% 100%;
    width : 100%;
    height : 90%;
    margin : auto auto;
    font-size: 1rem;
    color:transparent;
    text-align: right;
    padding: 0.5rem; 
    
    &:focus, &:active {
        outline: 0;
    }
    &:hover:enabled {
        cursor:pointer;
        color:${gameGrey}
    }  
`;