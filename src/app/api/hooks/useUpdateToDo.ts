import { useSnackbar } from '@/app/utils/providers/snackbar-provider';
import AxiosInstance from '@/app/api/axiosInstance';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import { useMutation } from '@tanstack/react-query';

export type UpdateToDoProps = {
  id: number | undefined;
  title: string;
  description: string;
};

const useUpdateToDo = () => {
  const { showSnackbar } = useSnackbar();

  const updateToDo = async (payload: UpdateToDoProps) => {
    try {
      const { id, title, description } = payload;

      const res = await AxiosInstance.put(`${ApiUrlV1}/todo/${id}`, {
        title,
        description,
      });
      showSnackbar('Task updated!', 'success');
      return res.data;
    } catch (error) {
      showSnackbar('Unable to update task. Please try again.', 'error');
      return console.error('Error in update task:', error);
    }
  };

  return useMutation({
    mutationFn: updateToDo,
  });
};

export default useUpdateToDo;
