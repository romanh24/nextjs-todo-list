import { useSnackbar } from '@/app/utils/providers/snackbar-provider';
import { AxiosResponse } from 'axios';
import AxiosInstance from '@/app/api/axiosInstance';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import { useMutation } from '@tanstack/react-query';

const useDeleteToDo = () => {
  const { showSnackbar } = useSnackbar();

  const deleteToDo = async (id: number) => {
    try {
      const res: AxiosResponse = await AxiosInstance.delete(
        `${ApiUrlV1}/todo/${id}`
      );
      showSnackbar('Task deleted!', 'success');
      return res.data;
    } catch (error) {
      showSnackbar('Unable to delete task. Please try again.', 'error');
      return console.error('Error in delete task:', error);
    }
  };

  return useMutation({
    mutationFn: deleteToDo,
  });
};

export default useDeleteToDo;
