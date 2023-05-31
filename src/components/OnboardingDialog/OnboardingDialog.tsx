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
import {
  useCreateGame,
  useCreateGameRound,
} from "@/features/game/gameMutations";
import {
  useCreateBots,
  useCreatePlayer,
} from "@/features/players/playersMutations";

type OnboardingFormProps = Zod.infer<typeof onboardingFormSchema>;

const OnboardingDialog = () => {
  const { mutateAsync: createGame } = useCreateGame();
  const { mutateAsync: createPlayer } = useCreatePlayer();
  const { mutateAsync: createBots } = useCreateBots();
  const { mutateAsync: createGameRound } = useCreateGameRound();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormProps>({
    resolver: zodResolver(onboardingFormSchema),
  });

  const onSubmit: SubmitHandler<OnboardingFormProps> = async data => {
    try {
      const player = await createPlayer({
        name: data.name,
        bot: false,
        points: 1000,
      });
      const bots = await createBots({ count: 2 });

      const game = await createGame({ players: [player, ...bots] });
      await createGameRound({ players: [player, ...bots] });
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
