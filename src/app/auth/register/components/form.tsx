"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Usuario, UserSchema } from "@/libs/types";

const Form = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isDirty },
    reset,
  } = useForm<Usuario>({
    defaultValues: {
      id: 0,
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      rol: "",
    },
    resolver: zodResolver(UserSchema),
  });
  const [users, setUsers] = useState<Usuario[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user, setUser] = useState<Usuario>({
    id: 0,
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
  });
  const modal = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await axios.get("/api/users-zod");

        toast.promise(Promise.resolve(resp.data), {
          loading: "Loading...",
          success: (data) => {
            setUsers(data.users);
            return `${data.message}`;
          },
          error: "Error loading users",
        });
      } catch (error) {
        toast.error(`Error: ${error}`);
      }
    };
    getUsers();
  }, []);

  const onSubmit = async (data: Usuario) => {
    if (isEdit) update(data);
    else create(data);
  };

  const create = async (data: Usuario) => {
    try {
      const toastId = toast.loading("Loading...");
      const resp = await axios.post("/api/users-zod", data);

      // toast.promise(Promise.resolve(resp.data), {
      //   loading: "Loading...",
      //   success: (data) => {
      //     return `${data.message}`;
      //   },
      //   error: "Error",
      // });

      if (resp && resp.data) {
        if (resp.data.errors) {
          resp.data.errors.forEach(
            (error: { path: keyof Usuario; message: string }) => {
              clearErrors(error.path);
              setError(error.path, {
                type: "validate",
                message: error.message,
              });
              toast.error(`Error: ${error.message}`, {
                id: toastId,
              });
            }
          );
          return;
        }

        setUsers((prevState) => [...prevState, resp.data.userRegistered]);
      }
      toast.success(`Usuario ${resp.data.userRegistered.user} created!`, {
        id: toastId,
      });

      resetUser();
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:118 ~ create ~ error:", error);
      toast.error(`Error: ${error}`);
    }
  };

  const update = async (data: Usuario) => {
    try {
      const toastId = toast.loading("Loading...");
      const resp = await axios.put("/api/users-zod/", data);

      // toast.promise(Promise.resolve(resp.data), {
      //   loading: "Loading...",
      //   success: (data) => {
      //     return data.message;
      //   },
      //   error: "Error",
      // });

      if (resp && resp.data) {
        if (resp.data.errors) {
          resp.data.errors.forEach(
            (error: { path: keyof Usuario; message: string }) => {
              clearErrors(error.path);
              setError(
                error.path,
                {
                  type: "validate",
                  message: error.message,
                },
                { shouldFocus: true }
              );
              toast.error(`Error: ${error.message}`, {
                id: toastId,
              });
            }
          );
          return;
        }

        setUsers((prevState) => {
          const index = prevState.findIndex(
            (user) => user.id === resp.data.userUpdated.id
          );
          prevState[index] = resp.data.userUpdated;
          return prevState;
        });
      }
      toast.success(`Usuario ${resp.data.userUpdated.user} updated!`, {
        id: toastId,
      });
      resetUser();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const editUser = (editUser: Usuario) => {
    if (editUser) {
      reset(
        { ...editUser, confirmPassword: editUser.password },
        { keepDefaultValues: true }
      );
      setIsEdit(true);
      setUser(editUser);
    }
  };

  const deleteUser = async (deleteUser: Usuario, deleteConfirm: boolean) => {
    if (modal.current) {
      modal.current.showModal();
    }

    if (!deleteConfirm) {
      setUser(deleteUser);
      return;
    }

    try {
      const resp = await axios.delete("/api/users-zod", {
        params: { id: deleteUser.id },
      });

      toast.promise(Promise.resolve(resp.data), {
        loading: "Loading...",
        success: (data) => {
          setUsers((prevState) =>
            prevState.filter(
              (usuario) => usuario.id !== resp.data.userDeleted.id
            )
          );
          resetUser();
          return `${data.message}`;
        },
        error: (error) => {
          return `Error: ${error}`;
        },
      });
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const resetUser = () => {
    setIsEdit(false);
    setUser({
      id: 0,
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      rol: "",
    });

    reset();
  };
  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Registrar</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email and password to enter the application
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <p className="font-bold text-sm">
          {isDirty && `Full name: ${watch("user")}`}
        </p>

        <Input type="text" placeholder="Usuario" register={register("user")} />
        {errors.user && (
          <span className="text-red-500">{`${errors.user.message}`}</span>
        )}
        <Input type="email" placeholder="Email" register={register("email")} />
        {errors.email && (
          <span className="text-red-500">{`${errors.email.message}`}</span>
        )}
        <Input
          type="password"
          placeholder="Password"
          register={register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <Input
          type="password"
          placeholder="Confirm-Password"
          register={register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
        )}
        <Input type="text" placeholder="Rol" register={register("rol")} />
        {errors.rol && (
          <span className="text-red-500">{`${errors.rol.message}`}</span>
        )}
        <Button type="submit" disabled={isEdit} label="Create account" />

        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">have account?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div className="mb-5">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <ButtonIcon icon={RiGoogleFill} />
          <ButtonIcon icon={RiFacebookFill} />
          <ButtonIcon icon={RiGithubFill} />
        </div>
      </form>
    </div>
  );
};

export default Form;
