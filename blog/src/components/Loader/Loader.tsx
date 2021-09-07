import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonStyled } from './Loader.styled';

type LoaderProps = {
  primary?: boolean
  count?: number
}
export const Loader: React.FC<LoaderProps> = ({primary = false, count = 4}) =>
  <SkeletonTheme color='rgb(199, 232, 231)'>
    <SkeletonStyled primary={primary} count={count} />
  </SkeletonTheme>
