import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    width: 100%;
    padding: 2rem;
    background-color: ${theme.colors.gray500};
    margin-top: 1.5rem;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  `}
`;

export const AddForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    button {
      background: ${theme.colors.primary};
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 5px;
      flex-shrink: 0;
    }

    input {
      background: ${theme.colors.gray900};
      padding: 0.5rem;
      height: 2.5rem;
      color: ${theme.colors.gray300};
      border-radius: 5px;
      flex: 1 0 auto;
      max-width: calc(100% - 50px);

      &:focus {
        outline-color: ${theme.colors.primary};
      }
    }
  `}
`;

export const TodoListContainer = styled.ul`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Error = styled.span`
  ${({ theme }) => css`
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: ${theme.colors.error};
  `}
`;
