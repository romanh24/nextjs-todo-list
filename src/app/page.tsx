'use client';

import BackGroundPic from '../../public/Background.svg';
import AddIcon from '../../public/Add.svg';
import Image from 'next/image';
import Button, { ButtonVersion } from '@/app/ui/button';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Form from '@/app/ui/form/form';
import Card from '@/app/ui/card';
import useGetToDos from '@/app/api/hooks/useGetToDos';
import CircularProgress from '@mui/material/CircularProgress';
import Filter from '@/app/ui/filter';
import useCreateUser from '@/app/api/hooks/useCreateUser';

const { Icon } = ButtonVersion;

export default function Home() {
  const userInfo =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo') || '{}')
      : {};
  const userId = userInfo?.user?.id;

  const {
    data: todosData,
    isFetched: isTodosFetched,
    refetch: refetchTodos,
  } = useGetToDos(!!userId);
  const { mutateAsync: createUser } = useCreateUser();

  const [showForm, setShowForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState(() => ['pending', 'done', 'wontdo']);

  useEffect(() => {
    if (!userId) {
      createUser().then();
    }
  }, []);

  useEffect(() => {
    if (!todosData?.length) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showForm, todosData]);

  const filterStatus = useMemo(
    () => todosData?.filter(({ status }) => filter.includes(status)),
    [todosData, filter]
  );

  const handleShowForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleAddItem = () => {
    refetchTodos().then();
    handleShowForm();
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string[]
  ) => {
    if (newStatus.length) {
      setFilter(newStatus);
    }
  };

  return (
    <div
      className="relative bg-local bg-no-repeat flex flex-col items-center p-[1.75rem_1.375rem_2.1875rem_1.375rem] w-[23.4375rem] h-[50.75rem] overflow-scroll"
      style={{ backgroundImage: `url(${BackGroundPic.src})` }}
    >
      <main className="w-full pb-[3.4375rem] flex flex-col items-center">
        <div>
          <h1 className="text-xl text-center font-semibold mb-8 flex">
            My To-Do
          </h1>

          <Filter filter={filter} handleFilter={handleFilter} />
        </div>

        {!isTodosFetched ? (
          <CircularProgress className="mt-4" />
        ) : (
          filterStatus?.map(({ id, title, status, description }) => (
            <Card
              key={id}
              id={id}
              title={title}
              status={status}
              description={description}
              refetchToDos={refetchTodos}
            />
          ))
        )}

        {showForm && (
          <div className="mt-4 w-full">
            <Form onCancel={handleShowForm} onAdd={handleAddItem} />
          </div>
        )}

        <div ref={bottomRef} />
      </main>
      <footer className="fixed bottom-[2.1875rem]">
        <Button title="Add To Do" version={Icon} onClick={handleShowForm}>
          <Image src={AddIcon} alt="add-icon" />
        </Button>
      </footer>
    </div>
  );
}
