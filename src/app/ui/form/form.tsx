import Button, { ButtonVersion } from '@/app/ui/button';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useCreateToDo from '@/app/api/hooks/useCreateToDo';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/app/ui/form/form.schema';
import CircularProgress from '@mui/material/CircularProgress';
import useUpdateToDo from '@/app/api/hooks/useUpdateToDo';
import { FormProps, FormState } from '@/app/ui/form/form.types';

const { Primary, Secondary } = ButtonVersion;

export default function Form({
  data: dataProps,
  isEdit,
  onCancel,
  onAdd,
  onEdit,
}: FormProps) {
  const { mutateAsync: createToDo, isPending: isCreateToDoLoading } =
    useCreateToDo();
  const { mutateAsync: updateToDo, isPending: isUpdateToDoLoading } =
    useUpdateToDo();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (dataProps) {
      setValue('title', dataProps.title);
      setValue('description', dataProps.description);
    }
  }, []);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    try {
      const response = isEdit
        ? await updateToDo({ id: dataProps?.id, ...data })
        : await createToDo(data);

      if (response && onAdd) {
        onAdd();
      }

      if (response && onEdit) {
        onEdit();
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <form className="relative flex flex-col items-center shadow-light-black rounded-lg h-[24.5rem] p-3 bg-white">
      <div className="mb-2 w-full text-right">
        <input
          className="w-full bg-light-rose rounded-lg pl-4 p-2 placeholder-gray-400"
          type="text"
          placeholder="Title"
          {...register('title')}
        />
        <span className="text-xs text-red-500 relative -top-1.5">
          {errors.title?.message}
        </span>
      </div>

      <div className="mb-5 w-full h-full text-right">
        <textarea
          className="w-full h-full resize-none bg-light-rose rounded-lg pl-4 p-2 placeholder-gray-400"
          placeholder="Description"
          {...register('description')}
        />
        <span className="text-xs text-red-500 relative -top-3">
          {errors.description?.message}
        </span>
      </div>

      <div className="flex w-full justify-between">
        <Button title="Cancel" version={Primary} onClick={onCancel}>
          Cancel
        </Button>

        <Button
          title="Done"
          version={Secondary}
          onClick={handleSubmit(onSubmit)}
          isDisabled={
            Object.keys(errors).length > 0 ||
            isCreateToDoLoading ||
            isUpdateToDoLoading
          }
        >
          Done
          {(isCreateToDoLoading || isUpdateToDoLoading) && (
            <CircularProgress size={18} className="ml-2" />
          )}
        </Button>
      </div>
    </form>
  );
}
