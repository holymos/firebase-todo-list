import logo from '../../assets/todo-list.png';
import * as S from './styles';

export const Header = () => {
  return (
    <S.Container>
      <img src={logo} alt="Togo list logo" />

      <h1>Collaborative Todo List</h1>
    </S.Container>
  );
};
