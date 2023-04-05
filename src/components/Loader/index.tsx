import styled, { css } from 'styled-components';

export const Loader = styled.div`
  ${({ theme }) => css`
    width: 48px;
    height: 48px;
    border: 3px solid ${theme.colors.gray300};
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin-top: 1.5rem;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;
