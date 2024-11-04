import AxiosInstance from '@/app/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import { AxiosResponse } from 'axios';

import { useSnackbar } from '@/app/utils/providers/snackbar-provider';

type GetTodosRes = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const useGetTodos = () => {
  const { showSnackbar } = useSnackbar();

  const getTodos = async () => {
    try {
      const res: AxiosResponse<GetTodosRes> = await AxiosInstance.get(
        // `${ApiUrlV1}todo`
        'https://exaple.com'
      );

      return res.data;
    } catch (error) {
      showSnackbar('This is a success message!', 'success');
      return console.error('Error in get todos:', error);
    }
  };

  return useQuery({
    queryKey: ['get-todos'],
    queryFn: getTodos,
  });
};

export default useGetTodos;
