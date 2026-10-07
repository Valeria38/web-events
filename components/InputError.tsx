import type { ReactNode } from 'react';
import { Activity } from 'react';

interface IInputErrorProps {
  isHidden: boolean;
  children: ReactNode;
}

const InputError = ({ isHidden, children }: IInputErrorProps) => {
  return (
    <Activity mode={isHidden ? 'hidden' : 'visible'}>
      <span className="text-red-700 text-sm">{children}</span>
    </Activity>
  );
};

export default InputError;
