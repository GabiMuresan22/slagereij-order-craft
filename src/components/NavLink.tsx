import { Link, useMatch, useResolvedPath, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
  end?: boolean;
}

export function NavLink({ 
  children, 
  to, 
  className, 
  activeClassName = 'active',
  end = false,
  ...props 
}: NavLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end });

  return (
    <Link
      to={to}
      className={cn(className, match ? activeClassName : '')}
      {...props}
    >
      {children}
    </Link>
  );
}
