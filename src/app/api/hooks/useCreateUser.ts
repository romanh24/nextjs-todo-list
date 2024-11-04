import { useMutation } from '@tanstack/react-query';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';
import axios, { AxiosResponse } from 'axios';

export type CreateUserRes = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
  };
};

const useCreateUser = () => {
  const createUser = async () => {
    try {
      const res: AxiosResponse<CreateUserRes> = await axios.post(
        `${ApiUrlV1}/auth`
      );
      console.log('res.data:', res.data);

      const resData: CreateUserRes = res.data;

      localStorage.setItem('userInfo', JSON.stringify(resData));
      return resData;
    } catch (error) {
      return console.error('Error in create user:', error);
    }
  };

  return useMutation({
    mutationFn: createUser,
  });
};

export default useCreateUser;
