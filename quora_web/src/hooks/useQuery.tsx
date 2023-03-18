import { useMemo } from 'react';
import { useLocation } from 'react-router';

export default function useQuery() {
  const { search } = useLocation();

  return useMemo(() => { return new URLSearchParams(search); }, [search]);
}
