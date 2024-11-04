import { useMutation } from '@tanstack/react-query';
import { ApiUrlV1 } from '@/app/api/constants/api-version';
import axios, { AxiosResponse } from 'axios';

// const useGetPitchOutings = (payload: IPitchCountQuery) => {
//   const getPitchOutings = async () => {
//     try {
//       const data = {
//         ...payload,
//         date: dateFormat(payload.date, 'YYYY-MM-DD'),
//         end_date: dateFormat(payload.end_date, 'YYYY-MM-DD'),
//         offset: new Date().getTimezoneOffset(),
//       };
//
//       const res = await axios.post(`${apiUrlV4}pitcherOuting/getPitcherOutings`, data);
//       const resData: PitchOutingsRes = res.data;
//
//       return resData;
//     } catch (error) {
//       return console.error('Error in get schools by email:', error);
//     }
//   };
//
//   return useQuery(
//     {
//       queryKey: ['query-get-pitcher-outing', payload],
//       queryFn: getPitchOutings,
//       onError: () => {
//         snackbarService.error("Can't get pitch outings. Please, try later.");
//       },
//       refetchOnWindowFocus: false,
//       cacheTime: 1000 * 60 * 60,
//       keepPreviousData: true,
//     },
//   );
// };

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
        `${ApiUrlV1}auth`
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

// {
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzVlNGZhYTZjMjRmMDg4N2VmYWRkNjYzNzJmNTZkIiwiaWF0IjoxNzI5ODUzMjU0LCJleHAiOjE3Mjk4NTY4NTR9.dMsR0CBW4-Zouj3nBuZbYi10ejQGyuUDh3SiKM6V4NU",
//   "refreshToken": "287b2e8f-e7b0-413e-b104-dba8343cc18d",
//   "user": {
//   "id": "64c5e4faa6c24f0887efadd66372f56d"
// }
// }
