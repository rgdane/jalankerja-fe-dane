import axiosInstance from "@/config/axios";
import { AppDispatch } from "@/store";
import { AxiosResponse } from "axios";

type CrudService<TGet, TPost, TUpdate> = {
  local: {
    getAll: () => Promise<AxiosResponse<TGet[]>>;
    getById: (id: string | number) => Promise<AxiosResponse<TGet>>;
    post: (data: TPost) => Promise<AxiosResponse<TGet>>;
    update: (
      id: string | number,
      data: TUpdate
    ) => Promise<AxiosResponse<TGet>>;
    remove: (id: string | number) => Promise<AxiosResponse<void>>;
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
    getAll: () => axiosInstance.get<TGet[]>(basePath),
    getById: (id: string | number) =>
      axiosInstance.get<TGet>(`${basePath}/${id}`),
    post: (data: TPost) => axiosInstance.post<TGet>(basePath, data),
    update: (id: string | number, data: TUpdate) =>
      axiosInstance.put<TGet>(`${basePath}/${id}`, data),
    remove: (id: string | number) => axiosInstance.delete(`${basePath}/${id}`),
  };

  const global = {
    getAll: () => (dispatch: AppDispatch) => {
      if (!actions) return;
      dispatch(actions.setLoading(true));
      axiosInstance
        .get<TGet[]>(basePath)
        .then((res) => dispatch(actions.setData(res.data)))
        .catch((err) => dispatch(actions.setError(err.message)))
        .finally(() => dispatch(actions.setLoading(false)));
    },
    post: (data: TPost) => (dispatch: AppDispatch) => {
      if (!actions) return;
      local
        .post(data)
        .then(() => dispatch(global.getAll()))
        .catch((err) => dispatch(actions.setError(err.message)));
    },
    update: (id: string | number, data: TUpdate) => (dispatch: AppDispatch) => {
      if (!actions) return;
      local
        .update(id, data)
        .then(() => dispatch(global.getAll()))
        .catch((err) => dispatch(actions.setError(err.message)));
    },
    remove: (id: string | number) => (dispatch: AppDispatch) => {
      if (!actions) return;
      local
        .remove(id)
        .then(() => dispatch(global.getAll()))
        .catch((err) => dispatch(actions.setError(err.message)));
    },
  };

  return { local, global };
}
