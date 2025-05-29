import { useInfiniteQuery } from '@tanstack/react-query';
import { letterService } from '@/shared/api/services/get-letters.service';

export function useGetLettersInfinite(filters: {
  letter_id?: string | null;
  author?: string | null;
  sender?: string | null;
  recipient?: string | null;
  destination?: string | null;
  min_length?: number | null;
  max_length?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  text_length?: number | null;
  limit?: number | null;
} = {}) {
  const limit = filters.limit ?? 6;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['letters', filters],
    queryFn: async ({ pageParam = 0 }) => {
      return await letterService.getFilteredLetters({
        ...filters,
        offset: pageParam,
        limit,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? undefined : allPages.length * limit;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
};
