'use client';

import { useState, forwardRef } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
}

const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ className, showToggle = true, type = 'password', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : type}
          className={cn('pr-10', className)}
          ref={ref}
          autoComplete="new-password"
          spellCheck={false}
          {...props}
        />
        {showToggle && type === 'password' && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePassword}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';

export { SecureInput };