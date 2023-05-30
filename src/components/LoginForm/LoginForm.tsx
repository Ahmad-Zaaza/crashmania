"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { http } from "../../config/axios";
import { useState } from "react";
import axios from "axios";
import { loginFormSchema } from "@/utils/validations";
import { Input } from "../Input";
import { Button } from "../Button";
import { InputLabel } from "../InputLabel";
import { Stack } from "../Stack";
import { Text } from "../Text";

type LoginFormProps = Zod.infer<typeof loginFormSchema>;

interface IProps {
  onChangeMode: (m: "signup") => void;
  onAuthSuccess: (user: any) => void;
}

const LoginForm = ({ onChangeMode, onAuthSuccess }: IProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema),
  });
  const [error, setE] = useState(null);
  const onSubmit: SubmitHandler<LoginFormProps> = async data => {
    try {
      const res = await http.post("/auth/login", data);
      onAuthSuccess(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setE(error.toJSON());
      }
      console.error("There was an error", error);
    }
  };
  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      my={6}
      flexDirection="column"
      gap={4}
      paper
    >
      {JSON.stringify(error)}
      <div>
        <InputLabel>Email</InputLabel>
        <Input
          autoCapitalize="none"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div>
        <InputLabel>Password</InputLabel>
        <Input
          autoCapitalize="none"
          error={errors.password?.message}
          {...register("password")}
          type="password"
        />
      </div>

      <Button isLoading={isSubmitting} type="submit">
        Sign in{" "}
      </Button>
      <Text>
        Don&apos;t have an account?{" "}
        <span
          className="cursor-pointer text-primary"
          onClick={() => onChangeMode("signup")}
        >
          Sign up here
        </span>
      </Text>
    </Stack>
  );
};

export default LoginForm;
