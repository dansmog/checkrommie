import { useEffect, useState } from "react";
import httpRequestHelper from "../utils/httpRequest.helper";

export default function useGetApartments(filter: any, pageNumber: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [apartments, setApartments] = useState([] as any);
  const [pageLoading, setPageLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setApartments([]);
    setPageLoading(true);
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    httpRequestHelper
      .get(`/apartments`, {
        params: { filter, page: pageNumber, take: 12 },
      })
      .then(({ data }) => {
        setHasMore(data?.data?.pagination?.hasNextPage);
        setApartments((prevApartments: any) => {
          /** @ts-ignore */
          return [...new Set([...prevApartments, ...data.data.data])];
        });
        setLoading(false);
        setPageLoading(false);
        setSuccess(true);
      })
      .catch((error: any) => {
        setLoading(false);
        setPageLoading(false);
        console.log(error);
      });
  }, [filter, pageNumber]);

  return { loading, pageLoading, success, error, apartments, hasMore };
}
