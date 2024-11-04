import { ColorStatus } from '@/app/types/statuses';

export type IndicatorProps = {
  color: ColorStatus.pending | ColorStatus.done | ColorStatus.wontdo;
};
