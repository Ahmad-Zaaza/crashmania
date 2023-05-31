import React from "react";
import { Modal, ModalContent } from "../Modal";
import { Stack } from "../Stack";
import { Input } from "../Input";
import { Button } from "../Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingFormSchema } from "@/utils/validations";
import { Text } from "../Text";
import { createPlayer } from "@/utils/gameHelpers";
import { useCreateGame } from "@/features/game/gameMutations";

type OnboardingFormProps = Zod.infer<typeof onboardingFormSchema>;

const OnboardingDialog = () => {
  const { mutateAsync } = useCreateGame();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormProps>({
    resolver: zodResolver(onboardingFormSchema),
  });

  const onSubmit: SubmitHandler<OnboardingFormProps> = async data => {
    try {
      const player = createPlayer({ bot: false, name: data.name });
      const game = await mutateAsync({ noOfBots: 4, player });
    } catch (error) {
      console.error("There was an error", error);
    }
  };

  return (
    <Modal open={true}>
      <ModalContent
        width="600px"
        // onClose={() => setModalOpen(false)}
        // title="Login up"
      >
        <Stack
          id="onboarding"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          my={10}
          flexDirection="column"
          gap={4}
          paper
        >
          <Text textAlign="center" variant="headlineLarge">
            Welcome to CrashMania!
          </Text>
          <div>
            <Text mb={6} textAlign="center" variant="headlineMedium">
              Enter your name to play
            </Text>
            <Input
              size="large"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
        </Stack>
        <Button
          form="onboarding"
          fullWidth
          size="large"
          isLoading={isSubmitting}
          type="submit"
        >
          PLAY
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default OnboardingDialog;
