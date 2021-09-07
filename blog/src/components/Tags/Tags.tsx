import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { TagsListStyled, TagsListItemStyled, TagsHeadingStyled } from './Tags.styled';
import { useHistory } from 'react-router-dom';
import { TagT } from '../../types';
import { useApi } from '../../hooks/useApi';
import { useSnackbar } from 'notistack';
import { Button } from '../Button/Button';

type TagsProps = {
  onSelectTag: (tag: string) => void
}

export const Tags: React.FC<TagsProps> = ({ onSelectTag }) => {
  const history = useHistory();
  const [tags, setTags] = useState<TagT[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShowMoreTags, setIsShowMoreTags] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { getTagsApi } = useApi();

  useEffect(() => {
    getTagsApi()
      .then(data => setTags(data.tags))
      .catch(() => {
        enqueueSnackbar('Error loading Tags', {
          variant: 'error',
          persist: true,
        });
      })
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <TagsHeadingStyled>Popular Tags</TagsHeadingStyled>
      {!isLoaded &&  <Loader count={4}/>}
      <TagsListStyled>
        {isLoaded &&
          (tags.length > 0
            ? tags.slice(0, isShowMoreTags ? tags.length : 5).map((tag, index )=> (
              <TagsListItemStyled key={index}>
                <Button
                  primary
                  onClick={() => {
                    onSelectTag(tag);
                    history.push(`?active-tab=2&tag=${tag}`);
                  }}
                >
                  {tag}
                </Button>
              </TagsListItemStyled>
            ))
            : <p>No tags are here yet...</p>
          )}
      </TagsListStyled>
      {isLoaded && tags.length > 0 && <Button onClick={() => setIsShowMoreTags(!isShowMoreTags)}>
        {isShowMoreTags ? 'Show less' : 'Show more'}
      </Button>}
    </>
  )
}
