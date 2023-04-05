import dayjs from 'dayjs';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { File, Lock, LockOpen, TrashSimple } from 'phosphor-react';
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'styled-components';

import { useAuth } from '@contexts/auth';
import { db } from '@services/firebase';
import { TodoItemData } from 'types/index';

import * as S from './styles';

type TodoItemProps = {
  todo: TodoItemData;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { title, id, status, isLocked, createdBy, creatorId, createdAt } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  const { user } = useAuth();

  const todosRef = doc(db, 'todos', id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) return setTodoTitle(title);

    try {
      const todosRef = doc(db, 'todos', id);

      await updateDoc(todosRef, {
        title: todoTitle,
      });
    } catch (error) {
      alert('Ocorreu um erro com a solicitação. Tente novamente');
    }
  };

  const handleKeydown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target as HTMLInputElement).value) return setTodoTitle(title);

    if (e.key === 'Enter') {
      setIsEditing(false);

      try {
        const todosRef = doc(db, 'todos', id);
        await updateDoc(todosRef, {
          title: todoTitle,
        });
      } catch (error) {
        alert('Ocorreu um erro com a solicitação. Tente novamente');
      }
    }
  };

  const handleClick = () => {
    if (isLocked && creatorId !== user?.id) return;
    setIsEditing(true);
  };

  const deleteHandler = async () => {
    if (isLocked && creatorId !== user?.id) return;

    try {
      await deleteDoc(todosRef);
    } catch (error) {
      alert('Ocorreu um erro com a solicitação. Tente novamente');
    }
  };

  const lockHandler = async () => {
    if (creatorId === user?.id) {
      try {
        await updateDoc(todosRef, {
          isLocked: !isLocked,
        });
      } catch (error) {
        alert('Ocorreu um erro com a solicitação. Tente novamente');
      }
    }
  };

  const archiveHandler = async () => {
    if (isLocked && creatorId !== user?.id) return;
    try {
      await updateDoc(todosRef, {
        status: status === 'completed' ? 'archived' : 'completed',
      });
    } catch (error) {
      alert('Ocorreu um erro com a solicitação. Tente novamente');
    }
  };

  const completeHandler = async () => {
    if (isLocked && creatorId !== user?.id) return;

    try {
      if (status === 'archived') {
        await updateDoc(todosRef, {
          status: 'pending',
        });
        return;
      }

      await updateDoc(todosRef, {
        status: status === 'completed' ? 'pending' : 'completed',
      });
    } catch (error) {
      alert('Ocorreu um erro com a solicitação. Tente novamente');
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    try {
      const unsub = onSnapshot(todosRef, (doc) => {
        if (doc.exists()) {
          const todoItemData = { id: doc.id, ...doc.data() } as TodoItemData;
          setTodoTitle(todoItemData.title);
        }
      });

      return unsub;
    } catch (error) {
      console.log('error');
    }
  }, []);

  return (
    <S.Container>
      <S.TodoWrapper
        status={status}
        isLocked={isLocked && creatorId !== user?.id}
      >
        <S.Checkbox onClick={completeHandler} data-testid="Checkbox">
          <S.OuterCheckbox />
          {['completed', 'archived'].includes(status) && <S.InnerCheckbox />}
        </S.Checkbox>

        <div onClick={handleClick}>
          <input
            type="text"
            ref={inputRef}
            value={todoTitle}
            onChange={handleChange}
            disabled={!isEditing}
            onBlur={handleBlur}
            onKeyDown={handleKeydown}
          />
        </div>

        <S.ActionsContainer>
          {['completed', 'archived'].includes(status) && (
            <button onClick={archiveHandler} title="Archive">
              <File size={15} color={theme.colors.gray300} />
            </button>
          )}

          <button onClick={lockHandler} title="Lock">
            {isLocked ? (
              <Lock size={15} color={theme.colors.gray300} />
            ) : (
              <LockOpen size={15} color={theme.colors.gray300} />
            )}
          </button>

          <button onClick={deleteHandler} title="Delete">
            <TrashSimple size={15} color={theme.colors.gray300} />
          </button>
        </S.ActionsContainer>
      </S.TodoWrapper>

      <S.CreatorInfoContainer>
        <S.CreatorInfo>
          <strong>Created by:</strong>
          <span>{createdBy}</span>
        </S.CreatorInfo>

        <S.CreatorInfo>
          <strong>Date:</strong>
          <span>{dayjs(createdAt).format('DD/MM/YYYY')}</span>
        </S.CreatorInfo>
      </S.CreatorInfoContainer>
    </S.Container>
  );
};
