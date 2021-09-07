import React, { useState } from 'react';
import { Hero } from '../../components/Hero/Hero';
import { HomeTabs } from '../../components/HomeTabs/HomeTabs';
import { Tags } from '../../components/Tags/Tags';

import {
  MainStyled,
  MainContainerStyled,
  MainContentStyled,
  MainAsideStyled
} from './Home.styled';

export const Home: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('');

  return (
    <MainStyled>
      <Hero/>
      <MainContainerStyled>
        <MainContentStyled>
          <HomeTabs
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </MainContentStyled>
        <MainAsideStyled>
          <Tags onSelectTag={setSelectedTag}/>
        </MainAsideStyled>
      </MainContainerStyled>
    </MainStyled>
  );
};
