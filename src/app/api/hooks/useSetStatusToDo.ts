import { useSnackbar } from '@/app/utils/providers/snackbar-provider';
import AxiosInstance from '@/app/api/axiosInstance';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import { useMutation } from '@tanstack/react-query';
import { TaskStatus } from '@/app/types/statuses';

export type SetStatusProps = {
  id: number | undefined;
  status: TaskStatus;
};

const { Pending, Done, WontDo } = TaskStatus;

const useSetStatusToDo = () => {
  const { showSnackbar } = useSnackbar();

  const setStatusToDo = async (payload: SetStatusProps) => {
    try {
      const { id, status } = payload;

      const allowedStatuses = [Pending, Done, WontDo];

      if (!allowedStatuses.includes(status)) {
        const message = `Invalid status. Allowed values are: ${allowedStatuses.join(', ')}`;
        showSnackbar(message);
        return console.error(message);
      }

      const res = await AxiosInstance.put(`${ApiUrlV1}/todo/status/${id}`, {
        status,
      });
      showSnackbar('Status updated!', 'success');
      return res.data;
    } catch (error) {
      showSnackbar('Unable to set status. Please try again.', 'error');
      return console.error('Error in set status:', error);
    }
  };

  return useMutation({
    mutationFn: setStatusToDo,
  });
};

export default useSetStatusToDo;
