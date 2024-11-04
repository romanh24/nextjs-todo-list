import { TaskStatus } from '@/app/types/statuses';

export type CardProps = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus | string;
  refetchToDos: () => void;
};
