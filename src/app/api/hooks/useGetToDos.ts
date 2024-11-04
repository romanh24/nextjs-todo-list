import AxiosInstance from '@/app/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import { AxiosResponse } from 'axios';

import { useSnackbar } from '@/app/utils/providers/snackbar-provider';
import { TaskStatus } from '@/app/types/statuses';

type GetTodosRes = {
  id: number;
  title: string;
  description: TaskStatus;
  status: string;
};

const useGetToDos = () => {
  const { showSnackbar } = useSnackbar();

  const getToDos = async () => {
    try {
      const res: AxiosResponse<GetTodosRes[]> = await AxiosInstance.get(
        `${ApiUrlV1}/todo`
      );

      return res.data;
    } catch (error) {
      showSnackbar('Error to get todos', 'error');
      return console.error('Error in get todos:', error);
    }
  };

  return useQuery({
    queryKey: ['get-todos'],
    queryFn: getToDos,
    refetchOnWindowFocus: false,
  });
};

export default useGetToDos;
