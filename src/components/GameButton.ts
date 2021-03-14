import styled from "styled-components";
import {Team} from "../types/enums";
import {getButtonImage, gameGrey, gameWhite} from "../services/colorsProvider";

export const GameButton = styled.button`
  color:${gameWhite};
  background-image: url(${(props: {team:Team|undefined}) => getButtonImage(props.team)});
  background-size: 100% 100%;
  width: 100px;
  height: 50px;
  margin: auto 2rem;
  &:hover:enabled {
    color: ${gameGrey};
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.3;
  }
`;


