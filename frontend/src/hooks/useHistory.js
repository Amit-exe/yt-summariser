import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

function useHistory() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["history"],

    queryFn: async () => {
      const { data } = await api.get("/api/summarise/history");
      return data;
    },

    staleTime: 5 * 60 * 1000, // consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // keep in cache for 10 minutes
  });

  return { history: data?.history, isLoading, error };
}

export default useHistory;
