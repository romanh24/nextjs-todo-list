import { useMutation } from '@tanstack/react-query';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import { AxiosResponse } from 'axios';
import AxiosInstance from '@/app/api/axiosInstance';
import { useSnackbar } from '@/app/utils/providers/snackbar-provider';

type CreateTaskPayload = {
  title: string;
  description: string;
};

type CreateTaskRes = {
  id: string;
  title: string;
  description: string;
  status: string;
};

const useCreateToDo = () => {
  const { showSnackbar } = useSnackbar();

  const createTask = async (payload: CreateTaskPayload) => {
    try {
      const res: AxiosResponse<CreateTaskRes> = await AxiosInstance.post(
        `${ApiUrlV1}/todo`,
        payload
      );
      showSnackbar('Task created!', 'success');
      return res.data;
    } catch (error) {
      showSnackbar('Unable to create task. Please try again.', 'error');
      return console.error('Error in create task:', error);
    }
  };

  return useMutation({
    mutationFn: createTask,
  });
};

export default useCreateToDo;
