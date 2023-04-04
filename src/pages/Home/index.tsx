import { useAuth } from '@contexts/auth';
import { Wrapper } from '@styles/globals';

import googleLogo from '../../assets/google.png';
import * as S from './styles';

export default function Home() {
  const { login } = useAuth();

  return (
    <Wrapper>
      <S.Container>
        <div>
          <h2>Welcome to our Collaborative Todo List!</h2>
          <p>
            Collaborative Todo List is an intuitive and powerful tool that lets
            you collaborate with others in real-time to manage your tasks.
          </p>
        </div>

        <S.LoginButton onClick={login}>
          <img src={googleLogo} alt="Google logo" />
          Sign In With Google
        </S.LoginButton>
      </S.Container>
    </Wrapper>
  );
}
