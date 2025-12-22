import { Link, LinkProps } from 'react-router-dom';
import { useLocalizedNavigation } from '@/hooks/useLocalizedNavigation';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

/**
 * A Link component that automatically adds the current language prefix to the path.
 * Use this instead of Link for all internal navigation.
 */
export function LocalizedLink({ to, children, ...props }: LocalizedLinkProps) {
  const { getLocalizedHref } = useLocalizedNavigation();
  
  return (
    <Link to={getLocalizedHref(to)} {...props}>
      {children}
    </Link>
  );
}

export default LocalizedLink;
