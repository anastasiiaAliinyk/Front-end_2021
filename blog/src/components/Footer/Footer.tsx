import React from 'react';
import {
  FooterContainerStyled,
  FooterLogoStyled, 
  FooterMainContentStyled, 
  FooterStyled
} from './Footer.styled';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () =>
  <FooterStyled>
    <FooterContainerStyled>
     <FooterMainContentStyled>
        <Link to='/'>
          <FooterLogoStyled />
        </Link>
        © 2021. An interactive learning project
     </FooterMainContentStyled>
      <div>
        Developed 2021
      </div>
    </FooterContainerStyled>
  </FooterStyled>
