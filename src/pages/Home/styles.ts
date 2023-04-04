import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: ${theme.colors.gray500};
    padding: 2rem;
    border-radius: 5px;
    width: 100%;
    height: 100%;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      color: ${theme.colors.primary};
    }

    p {
      margin-top: 0.5rem;
      text-align: center;
      font-size: 0.75rem;
    }

    color: ${theme.colors.gray300};

    @media (max-width: 300px) {
      gap: 1rem;

      h2 {
        font-size: 1rem;
      }

      p {
        font-size: 0.5rem;
      }
    }
  `}
`;

export const LoginButton = styled.button`
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;

  img {
    width: 15px;
    height: auto;
  }

  @media (max-width: 300px) {
    padding: 0.75rem;
    gap: 0.5rem;
    font-size: 0.5rem;
  }
`;
