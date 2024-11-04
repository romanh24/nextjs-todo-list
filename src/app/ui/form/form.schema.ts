import { string, object } from 'yup';

export const schema = object({
  title: string().required('Required Field'),
  description: string().required('Required Field'),
});
