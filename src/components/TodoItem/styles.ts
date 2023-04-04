import styled, { css } from 'styled-components';

import { TodoStatus } from 'types/index';

export const Container = styled.li`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray900};
    list-style: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  `}
`;

type TodoWrapperProps = {
  status: TodoStatus;
  isLocked: boolean;
};
export const TodoWrapper = styled.div<TodoWrapperProps>`
  ${({ theme, status, isLocked }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    filter: opacity(
      ${['completed', 'archived'].includes(status) || isLocked ? 0.3 : 1}
    );

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: transparent;
    }

    input[type='text'] {
      background: none;
      color: ${theme.colors.gray300};
      outline: none;
      text-decoration: ${['completed', 'archived'].includes(status)
        ? 'line-through'
        : 'none'};
      max-width: 125px;

      @media (max-width: 300px) {
        width: 55px;
        font-size: 0.65rem;
      }
    }

    input[type='checkbox'] {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;

      cursor: pointer;
    }

    input[type='checkbox']:checked {
    }
  `}
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const OuterCheckbox = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid ${theme.colors.gray900};
    border-radius: 50%;
    background: ${theme.colors.gray300};
  `}
`;

export const InnerCheckbox = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
  `}
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

export const CreatorInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CreatorInfo = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 3px;

  ${({ theme }) => css`
    strong {
      font-weight: 600;
      color: ${theme.colors.primary};
      font-size: 0.5rem;
    }

    span {
      color: ${theme.colors.gray300};
      font-size: 0.5rem;
    }

    @media (max-width: 300px) {
      strong {
        font-size: 0.4rem;
      }

      span {
        font-size: 0.4rem;
      }
    }
  `}
`;
