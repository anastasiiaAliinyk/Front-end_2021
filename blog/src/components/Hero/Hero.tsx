import React from 'react';
import {
  HeroHeadingStyled, 
  HeroImageStyled, 
  HeroStyled
} from './Hero.styled';

export const Hero: React.FC = () =>
  <HeroStyled>
    <HeroHeadingStyled>
      <p>
        A place to share my React knowledge
      </p>
      <HeroImageStyled />
    </HeroHeadingStyled>
  </HeroStyled>
