import styled, { css } from 'styled-components';

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

type ContainerProps = {
  isOpen: boolean;
};

export const Container = styled.div<ContainerProps>`
  ${({ isOpen }) => css`
    z-index: ${isOpen && 10};
    width: 80%;
    position: relative;
    border-radius: 12px;
    height: 2.6rem;
    flex: 1 0 auto;
  `}
`;

type DropdownProps = {
  isOpen: boolean;
};

export const Dropdown = styled.ul<DropdownProps>`
  ${({ isOpen, theme }) => css`
    width: 100%;
    display: flex;
    cursor: pointer;
    list-style: none;
    user-select: none;
    position: absolute;
    border-radius: 5px;
    background-color: ${isOpen && theme.colors.gray300};
    border: ${isOpen
      ? `1px solid ${theme.colors.gray300}`
      : '1px solid transparent'};
    flex-direction: column;

    li {
      display: flex;
      transition: none;
      align-items: center;
      margin: 0 1rem 0 1rem;
      padding: 0.65rem 0 0.65rem 0;
      border-bottom: 1px solid ${theme.colors.gray500};
      color: ${theme.colors.gray900};

      p {
        font-size: 0.75rem;
      }

      &:last-of-type,
      &:first-of-type {
        border-bottom: none;
      }

      &:first-of-type {
        margin: 0;
        padding: 1rem;
      }
    }
  `}
`;

export const Selected = styled.li`
  ${({ theme }) => css`
    width: 100%;
    height: 2.5rem;
    display: flex;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.gray300};

    p {
      font-size: 0.75rem;
    }
  `}
`;

type AheadIconProps = {
  isOpen: boolean;
};

export const AheadIcon = styled.div<AheadIconProps>`
  ${({ isOpen }) => css`
    width: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: ${isOpen && 'rotate(90deg)'};

    svg {
      width: 100%;
    }
  `}
`;
