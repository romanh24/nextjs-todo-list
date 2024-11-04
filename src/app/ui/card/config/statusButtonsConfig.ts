import { TaskStatus } from '@/app/types/statuses';

const { Pending, Done, WontDo } = TaskStatus;

const baseStyle =
  'text-[0.875rem] w-[5rem] h-[2.25rem] rounded-full transition duration-300 ease-in-out hover:scale-105';

export const statusButtonsConfig = [
  {
    label: 'Pending',
    style: `border border-pending ${baseStyle}`,
    status: Pending,
  },
  {
    label: 'Done',
    style: `bg-done text-white ${baseStyle}`,
    status: Done,
  },
  {
    label: "Won't do",
    style: `border border-wontdo ${baseStyle}`,
    status: WontDo,
  },
];
