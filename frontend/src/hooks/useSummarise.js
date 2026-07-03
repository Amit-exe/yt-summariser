import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import api from "../api/axios";

function useSummarise() {
  const queryClient = useQueryClient();

  const [error, setError] = useState();
  const [summary, setSummary] = useState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post("/api/summarise", formData);
      return data;
    },
    onSuccess: (data) => {
      setSummary(data);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error) => {
      setError(error.response?.data?.message || error.message);
    },
  });

  const getSummary = async (url, summaryType) => {
    if (!url) {
      setError("video url is empty");
      setTimeout(() => {
        setError();
      }, 5000);
      return;
    }
    mutate({ videoUrl: url, summaryType });
  };

  const setManualSummary = (item) => {
    setSummary({
      summary: item.summary,
      cached: item.cached,
    });
  };

  return { getSummary, summary, error, isPending, setManualSummary };
}

export default useSummarise;
