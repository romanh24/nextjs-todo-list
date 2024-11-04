export enum ButtonVersion {
  Primary = 'primary',
  Secondary = 'secondary',
  Icon = 'icon',
  Transparent = 'transparent',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  version?: ButtonVersion | null;
  isDisabled?: boolean;
  children: React.ReactNode;
};
