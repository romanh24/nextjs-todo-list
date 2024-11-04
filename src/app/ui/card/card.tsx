import React, { useState } from 'react';
import Image from 'next/image';

import { ColorStatus, TaskStatus } from '@/app/types/statuses';
import { statusButtonsConfig } from '@/app/ui/card/config/statusButtonsConfig';
import Form from '@/app/ui/form';
import { actionButtonsConfig } from '@/app/ui/card/config/actionButtonsConfig';
import CircularProgress from '@mui/material/CircularProgress';
import useDeleteToDo from '@/app/api/hooks/useDeleteToDo';
import useSetStatusToDo from '@/app/api/hooks/useSetStatusToDo';
import { CardProps } from '@/app/ui/card';
import Button from '@/app/ui/button';

export default function Card({
  id,
  title,
  description,
  status,
  refetchToDos,
}: CardProps) {
  const { mutateAsync: setStatusToDo, isPending: isLoadingSetStatus } =
    useSetStatusToDo();
  const { mutateAsync: deleteToDo, isPending: isLoadingDelete } =
    useDeleteToDo();

  const [isEditForm, setIsEditForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const colorStatus: string = ColorStatus[status];

  const handleOpenEdit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation();

    setIsEditForm((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsEditForm((prevState) => !prevState);
    refetchToDos();
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();

    try {
      await deleteToDo(id);
      refetchToDos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleStatus = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: TaskStatus
  ) => {
    event.stopPropagation();

    try {
      await setStatusToDo({ id, status });
      refetchToDos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 w-full">
      <div
        className="relative flex flex-col bg-white p-[1rem] pl-[2rem] rounded-lg transition-all duration-300 ease-in-out overflow-hidden"
        onClick={handleExpand}
      >
        <div
          className={`absolute top-2 left-2 w-4 h-4 ${colorStatus} rounded-full shadow`}
        />

        <div className="flex justify-between">
          <div>
            <p className="text-[0.5625rem] leading-3 text-light-grey">
              {title}
            </p>
            <p className="text-[0.875rem] leading-5">{description}</p>
          </div>

          <div className="flex gap-4">
            {actionButtonsConfig.map(({ title, onClick, icon, alt }) => (
              <Button
                key={title}
                className="flex items-center transition duration-300 ease-in-out hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={title}
                onClick={(event) =>
                  onClick === 'handleEdit'
                    ? handleOpenEdit(event)
                    : handleDelete(event, id)
                }
                isDisabled={isLoadingDelete}
              >
                {isLoadingDelete && onClick === 'handleDelete' ? (
                  <CircularProgress size={18} className="ml-2" />
                ) : (
                  <Image src={icon} alt={alt} />
                )}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={`flex justify-between ml-[-1rem] transition-all duration-300 ease-in-out ${
            isExpanded
              ? 'max-h-40 opacity-100 mt-[1.375rem]'
              : 'max-h-0 opacity-0 z-[-1]'
          }`}
        >
          {statusButtonsConfig.map(({ label, style, status }) => (
            <Button
              key={label}
              className={style}
              title={label}
              isDisabled={isLoadingSetStatus}
              onClick={(event) => handleStatus(event, status)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isEditForm ? 'mt-2 opacity-100 max-h-[26rem]' : 'opacity-0 max-h-0'
        }`}
      >
        <Form
          isEdit
          data={{ id, description, title }}
          onCancel={handleOpenEdit}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
