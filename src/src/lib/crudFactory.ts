import axiosInstance from "@/config/axios";
import { AppDispatch } from "@/store";
import { AxiosResponse } from "axios";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

type CrudService<TGet, TPost, TUpdate> = {
  local: {
    getAll: () => Promise<AxiosResponse<ApiResponse<TGet[]>>>;
    getById: (id: string | number) => Promise<AxiosResponse<ApiResponse<TGet>>>;
    post: (data: TPost) => Promise<AxiosResponse<ApiResponse<TGet>>>;
    update: (
      id: string | number,
      data: TUpdate
    ) => Promise<AxiosResponse<ApiResponse<TGet>>>;
    remove: (id: string | number) => Promise<AxiosResponse<ApiResponse<void>>>;
  };
  global: {
    getAll: () => (dispatch: AppDispatch) => void;
    post: (data: TPost) => (dispatch: AppDispatch) => void;
    update: (
      id: string | number,
      data: TUpdate
    ) => (dispatch: AppDispatch) => void;
    remove: (id: string | number) => (dispatch: AppDispatch) => void;
  };
};

type CrudSliceActions<TGet> = {
  setData: (data: TGet[]) => any;
  setLoading: (loading: boolean) => any;
  setError: (error: string) => any;
};

type CrudFactoryParams<TGet, TPost, TUpdate> = {
  basePath: string;
  entity: TGet;
  postDto: TPost;
  updateDto: TUpdate;
  actions?: CrudSliceActions<TGet>;
};

export function createCrudService<TGet, TPost, TUpdate>(
  params: CrudFactoryParams<TGet, TPost, TUpdate>
): CrudService<TGet, TPost, TUpdate> {
  const { basePath, actions } = params;

  const local = {
    getAll: () => axiosInstance.get<ApiResponse<TGet[]>>(basePath),
    getById: (id: string | number) =>
      axiosInstance.get<ApiResponse<TGet>>(`${basePath}/${id}`),
    post: (data: TPost) =>
      axiosInstance.post<ApiResponse<TGet>>(basePath, data),
    update: (id: string | number, data: TUpdate) =>
      axiosInstance.put<ApiResponse<TGet>>(`${basePath}/${id}`, data),
    remove: (id: string | number) =>
      axiosInstance.delete<ApiResponse<void>>(`${basePath}/${id}`),
  };

  const global = {
    getAll: () => (dispatch: AppDispatch) => {
      if (!actions) return;
      dispatch(actions.setLoading(true));
      local
        .getAll()
        .then((res) => dispatch(actions.setData(res.data.data)))
        .catch((err) => {
          const message = err?.response?.data?.error || err.message;
          dispatch(actions.setError(message));
        })
        .finally(() => dispatch(actions.setLoading(false)));
    },
    post: (data: TPost) => (dispatch: AppDispatch) => {
      if (!actions) return;
      local
        .post(data)
        .then(() => dispatch(global.getAll()))
        .catch((err) => {
          const message = err?.response?.data?.error || err.message;
          dispatch(actions.setError(message));
        });
    },
    update: (id: string | number, data: TUpdate) => (dispatch: AppDispatch) => {
      if (!actions) return;
      local
        .update(id, data)
        .then(() => dispatch(global.getAll()))
        .catch((err) => {
          const message = err?.response?.data?.error || err.message;
          dispatch(actions.setError(message));
        });
    },
    remove: (id: string | number) => (dispatch: AppDispatch) => {
      if (!actions) return;
      local
        .remove(id)
        .then(() => dispatch(global.getAll()))
        .catch((err) => {
          const message = err?.response?.data?.error || err.message;
          dispatch(actions.setError(message));
        });
    },
  };

  return { local, global };
}
 