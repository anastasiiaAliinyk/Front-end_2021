import styled from 'styled-components';
import { useState, cloneElement } from 'react';
import { animationTime } from '../constants';

const StyledTabs = styled.div`
  & > .tabs-list {
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(76, 175, 80);
    
    & > li {
      display: inline-block;
      padding: 10px 15px;
      
      cursor: pointer;
      
      &.active {
        position: relative;
       
        font-size: 16px;
        border: 1px solid rgb(76, 175, 80);
        border-bottom: none;
        border-radius: 5px 5px 0 0;
        
        &::after {
          position: absolute;
          bottom: -1px;
          left: 0;
          
          width: 100%;
          height: 2px;
          display: block;
          
          content: '';
          background-color: ${props => props.theme.colors.primaryBackground};
          transition: background-color ${animationTime} ease-out;
        }
      }
    }
  }
`

type TabsProps = {
  tabs: string[]
  children: JSX.Element[]
}

export const Tabs = (props: TabsProps) => {
  const [active, setActive] = useState(1);

  return (
    <StyledTabs>
      <ul className='tabs-list'>
        {props.tabs.map((tab, index) => (
          <li
            key={tab}
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
      {props.children.map((child, index) =>
        cloneElement(child, {
          key: `tab-content-${index}`,
          style: { display: active === index ? 'block' : 'none' }
        })
      )}
    </StyledTabs>
  )
}