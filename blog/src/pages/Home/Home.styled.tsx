import styled from 'styled-components';
import { Container } from '../../components/Container';

export const MainStyled = styled.main`
  padding-bottom: 54px
`
export const MainContainerStyled = styled(Container)`
  display: flex;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const MainContentStyled = styled.div`
  flex: 1;
  min-width: 0;
  margin-right: 20px;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    order: 2;
  }
`

export const MainAsideStyled = styled.aside`
  max-width: 250px;
  width: 100%;
  height: max-content;
  padding: 10px;

  line-height: 1.5rem;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
  border-radius: 5px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 20px;
    order: 1;
  }
`
