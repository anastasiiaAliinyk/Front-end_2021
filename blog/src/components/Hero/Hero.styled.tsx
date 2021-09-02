import styled from 'styled-components';
import heroImage from '../../images/heroImage.png';

export const HeroStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  color: ${props => props.theme.text};
  background: url(${props => props.theme.hero}) no-repeat 50%;
  background-size: cover;
`

export const HeroHeadingStyled = styled.div`
  max-width: 400px;
  padding: 35px 10px;

  font-family: 'MonteCarlo', cursive;
  text-align: center;
  letter-spacing: 2px;
  font-size: 38px;
  line-height: 3rem;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`
export const HeroImageStyled = styled.span`
  width: 80px;
  height: 80px;
  display: block;
  margin: 10px auto 0;

  background: url(${heroImage}) no-repeat 50%;
  background-size: contain;
`
  