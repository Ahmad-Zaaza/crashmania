import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/utils/validations";
import { Input } from "../Input";
import { Button } from "../Button";
import { InputLabel } from "../InputLabel";
import { Stack } from "../Stack";
import { Text } from "../Text";

type SignupFormProps = Zod.infer<typeof signupFormSchema>;

interface IProps {
  onChangeMode: (m: "login") => void;
  onAuthSuccess?: (user: any) => void;
}

const SignupForm = ({ onChangeMode, onAuthSuccess }: IProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormProps> = async data => {
    try {
    } catch (error) {
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
      <Stack gap={4}>
        <div className="flex-1">
          <InputLabel>First name</InputLabel>
          <Input error={errors.firstName?.message} {...register("firstName")} />
        </div>
        <div className="flex-1">
          <InputLabel>Last name</InputLabel>
          <Input error={errors.lastName?.message} {...register("lastName")} />
        </div>
      </Stack>
      <div>
        <InputLabel>Email</InputLabel>
        <Input error={errors.email?.message} {...register("email")} />
      </div>

      <div>
        <InputLabel>Password</InputLabel>
        <Input
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />
      </div>
      <Button isLoading={isSubmitting} type="submit">
        Sign up
      </Button>
      <Text>
        Already have an account?{" "}
        <span
          className="cursor-pointer text-primary"
          onClick={() => onChangeMode("login")}
        >
          Sign in here
        </span>
      </Text>
    </Stack>
  );
};

export default SignupForm;
