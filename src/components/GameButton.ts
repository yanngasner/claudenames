import styled from "styled-components";
import {Team} from "../types/enums";
import {getButtonImage, gameGrey, gameWhite} from "../services/colorsProvider";

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

