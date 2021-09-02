import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';

const SkeletonStyled = styled(Skeleton)((props: { primary?: boolean }) => ({
  height: props.primary ? '150px' : '20px',
  marginBottom: props.primary ? '15px' : '5px'
}));

type LoaderProps = {
  primary?: boolean
  count?: number
}
export const Loader: React.FC<LoaderProps> = ({primary = false, count = 4}) => {
  return(
    <SkeletonTheme color='rgb(199, 232, 231)'>
      <SkeletonStyled primary={primary} count={count}/>
    </SkeletonTheme>
  )
}
