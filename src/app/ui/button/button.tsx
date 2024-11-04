import { twMerge } from 'tailwind-merge';

export enum ButtonVersion {
  Primary = 'primary',
  Secondary = 'secondary',
  Icon = 'icon',
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled: boolean;
  title: string;
  version?: ButtonVersion;
  children: React.ReactNode;
};

export default function Button({
  disabled,
  title,
  className,
  version = ButtonVersion.Primary,
  children,
}: ButtonProps) {
  const baseStyle =
    'flex justify-center items-center rounded-full text-base w-[7.5rem] h-9';

  const versionStyles = {
    primary: 'bg-purple text-white',
    secondary: 'border border-purple text-purple',
    icon: 'bg-purple w-[3.125rem] h-[3.125rem] rounded-full',
  };

  return (
    <button
      disabled={disabled}
      title={title}
      type="button"
      className={twMerge(baseStyle, versionStyles[version], className)}
    >
      {children}
    </button>
  );
}
