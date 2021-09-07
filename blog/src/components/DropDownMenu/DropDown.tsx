import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ArticleModal } from '../Modals/ArticleModal';
import { useHistory } from 'react-router-dom';

const ListStyled = styled.ul`
`;

const FormContainerStyled = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  width: ${(props: { width: string }) => props.width};
  padding: 10px;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
  background-color: white;
  border-radius: 5px;
`;

const ListItemStyled = styled.li`
  &:nth-last-child(-n+2) {
    margin-top: 10px;
  }
`;

const ListButtonStyled = styled.button`
  width: 100%;
  padding: 5px;
  border: 1px solid rgb(76, 175, 80);
  color: rgb(76, 175, 80);
  text-align: center;
  background-color: white;
  border-radius: 3px;
  cursor: pointer;
  
  ${(props: { secondary?: boolean }) => props.secondary && css`
    color: white;
    background-color: #c82525;
    border: none;
  `}
`;

type DropDownProps = {
  isDropdownOpen: boolean
  onClose: () => void
  onLogout: () => void
}

export const DropDown: React.FC<DropDownProps> = ({ isDropdownOpen, onClose, onLogout }) => {
  const history = useHistory();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(isDropdownOpen);

  useEffect(() => {
    setIsOpen(isDropdownOpen);
  }, [isDropdownOpen]);

  const openModal = () => {
    setModalIsOpen(true);
    setIsOpen(false);
    onClose();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const logout = () => {
    history.push('/');
    onLogout();
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <FormContainerStyled width='200px'>
          <ListStyled>
            <ListItemStyled>
              <ListButtonStyled onClick={() => {}}>
                Profile
              </ListButtonStyled>
            </ListItemStyled>
            <ListItemStyled>
              <ListButtonStyled onClick={openModal}>
                New Article
              </ListButtonStyled>
            </ListItemStyled>
            <ListItemStyled>
              <ListButtonStyled onClick={logout} secondary>
                Log Out
              </ListButtonStyled>
            </ListItemStyled>
          </ListStyled>
        </FormContainerStyled>
      )}
      <ArticleModal modalIsOpen={modalIsOpen} onCloseModal={closeModal} />
    </>
  );
};
