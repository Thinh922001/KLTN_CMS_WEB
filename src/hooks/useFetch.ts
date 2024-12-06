/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";

export interface State {
  payload: any;
  error: string;
  loading: boolean;
}

export const initState: State = {
  payload: null,
  error: "",
  loading: false,
};

const useFetch = (): [State, (fn: () => Promise<any>) => Promise<any>] => {
  const [state, setState] = useState<State>(initState);
  const callApi = useMemo(
    () =>
      async (callback: () => Promise<any>): Promise<void> => {
        try {
          setState({ ...initState, loading: true });
          const data = await callback();
          setState((prevState) => ({
            ...prevState,
            payload: data,
            loading: false,
          }));
          return Promise.resolve(data);
        } catch (error: any) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: error.message,
          }));
        }
      },
    []
  );

  return [state, callApi];
};

export default useFetch;