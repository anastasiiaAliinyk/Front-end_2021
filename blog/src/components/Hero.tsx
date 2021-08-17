import styled from 'styled-components';
import heroImage from '../images/heroImage.png';

const StyledHero = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  color: ${props => props.theme.text};
  background: url(${props => props.theme.hero}) no-repeat 50%;
  background-size: cover;
`

const HeroHeading = styled.div`
  max-width: 400px;
  padding: 0 10px;

  font-family: 'MonteCarlo', cursive;
  text-align: center;
  letter-spacing: 2px;
  font-size: 38px;
  line-height: 3rem;

  @media (max-width: 768px) {
    font-size: 30px;
  }
  
  & > .image {
    width: 80px;
    height: 80px;
    display: block;
    margin: 10px auto 0;
    
    background: url(${heroImage}) no-repeat 50%;
    background-size: contain;
  }
`

export const Hero = () => {
  return (
    <StyledHero>
      <HeroHeading>
        <p>A place to share my React knowledge</p>
        <span className='image' />
      </HeroHeading>
    </StyledHero>
  )
}