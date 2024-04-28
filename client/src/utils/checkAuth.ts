import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const checkAuth = (
  id: string,
  router: AppRouterInstance,
  register?: boolean
) => {
  if (!id) {
    router.push("/login");
    if (register) {
      return router.push("/register");
    }
  } else {
    return router.push("/");
  }
};

export { checkAuth };
