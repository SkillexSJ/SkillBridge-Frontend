/**
 * LIBS
 */
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/api-client";
import { env } from "@/config/env";

export const authService = {
  signUp: async (data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    image?: string;
  }) => {
    const res = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      // @ts-expect-error
      role: data.role,
      image: data.image,
      callbackURL: `${env.APP_URL}/dashboard`,
    });
    if (res.error) {
      throw res.error;
    }
    return res;
  },

  signUpWithImage: async (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    imageFile: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("image", data.imageFile);

      const result = await apiClient.post<any>(
        "/users/signup-with-image",
        formData,
      );

      return {
        data: result.data || result,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: {
          message: error.message || "Network error occurred",
          code: error.data?.code || "NETWORK_ERROR",
          status: error.status || 500,
        },
      };
    }
  },

  signIn: async (data: { email: string; password: string }) => {
    const res = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (res.error) {
      throw res.error;
    }
    return res;
  },

  googleSignIn: async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  },

  signOut: async () => {
    return await authClient.signOut();
  },
};
