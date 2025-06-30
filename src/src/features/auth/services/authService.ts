import { createCrudService } from "@/lib/crudFactory";
import { AuthDto, AuthResponse } from "../types/auth.types";
import { useCookies } from "react-cookie";

const MAX_AGE = 60 * 60 * 24 * 7;

const base = createCrudService({
  basePath: "/login",
  entity: {} as AuthResponse,
  postDto: {} as AuthDto,
  updateDto: {},
});

export const useAuthService = () => {
  const [, setCookie] = useCookies(["token", "user"]);

  const post = async (data: AuthDto) => {
    const res = await base.local.post(data);
    const { token, user } = res.data;

    setCookie("token", token, { path: "/", maxAge: MAX_AGE });
    setCookie("user", JSON.stringify(user), { path: "/", maxAge: MAX_AGE });

    return res;
  };

  return {
    ...base,
    local: {
      ...base.local,
      post,
    },
  };
};
