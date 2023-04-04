import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { Plus } from 'phosphor-react';
import { useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import * as z from 'zod';

import { Header } from '@components/Header';
import { InputSelect } from '@components/InputSelect';
import { TodoItem } from '@components/TodoItem';
import { useAuth } from '@contexts/auth';
import { db } from '@services/firebase';
import { Wrapper } from '@styles/globals';
import type { TodoItemData } from 'types/index';

import * as S from './styles';

const schema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório' }),
});

export default function Todos() {
  const [todoItems, setTodoItems] = useState<TodoItemData[]>([]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const { user } = useAuth();

  const filterOptions = ['all', 'completed', 'pending', 'archived', 'user'];

  const theme = useTheme();

  const filteredTodoItems = todoItems.filter((item) => {
    if (filterOptions[selectedFilterIndex] === 'all')
      return item.status !== 'archived';

    if (filterOptions[selectedFilterIndex] === 'user')
      return item.creatorId === user?.id && item.status !== 'archived';

    return item.status === filterOptions[selectedFilterIndex];
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<TodoItemData, 'title'>>({
    resolver: zodResolver(schema),
  });

  const submitHandler: SubmitHandler<Pick<TodoItemData, 'title'>> = async (
    data: Pick<TodoItemData, 'title'>
  ) => {
    const todo = {
      title: data.title,
      status: 'pending',
      createdAt: new Date().toJSON(),
      createdBy: user?.name,
      creatorId: user?.id,
      isLocked: false,
    };

    await addDoc(collection(db, 'todos'), todo);
    reset();
  };

  const handleFilterChange = (filterIndex: number) => {
    setSelectedFilterIndex(filterIndex);
  };

  useLayoutEffect(() => {
    try {
      const q = query(collection(db, 'todos'));

      const unsub = onSnapshot(q, (snapshot) => {
        const todos: TodoItemData[] = [];

        if (snapshot.empty) {
          setTodoItems([]);
          return;
        }

        snapshot.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() } as TodoItemData);

          setTodoItems(todos);
        });
      });

      return unsub;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Wrapper>
      <Header />

      <S.Container>
        <S.AddForm onSubmit={handleSubmit(submitHandler)}>
          <input type="text" {...register('title')} />

          <button type="submit">
            <Plus size={15} color={theme.colors.gray300} />
          </button>

          <InputSelect
            options={filterOptions}
            label={filterOptions[selectedFilterIndex]}
            selectedIndex={selectedFilterIndex}
            onSelect={handleFilterChange}
          />
        </S.AddForm>

        {errors && <S.Error>{errors.title?.message}</S.Error>}

        {filteredTodoItems.length ? (
          <S.TodoListContainer>
            {filteredTodoItems.map((item) => (
              <TodoItem todo={item} key={item.id} />
            ))}
          </S.TodoListContainer>
        ) : null}
      </S.Container>
    </Wrapper>
  );
}
