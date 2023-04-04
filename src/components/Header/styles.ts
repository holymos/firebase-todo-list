import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 2rem;
    background-color: ${theme.colors.gray300};
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 5px;

    h1 {
      color: ${theme.colors.gray500};
    }

    img {
      width: 15px;
      height: auto;
    }
  `}
`;
