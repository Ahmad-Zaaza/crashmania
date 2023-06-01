import React from "react";
import { Modal, ModalContent } from "../Modal";
import { Stack } from "../Stack";
import { Input } from "../Input";
import { Button } from "../Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingFormSchema } from "@/utils/validations";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Text } from "../Text";
import {
  useCreateGame,
  useCreateGameRound,
} from "@/features/game/gameMutations";
import {
  useCreateBots,
  useCreatePlayer,
} from "@/features/players/playersMutations";
import Logo from "../Logo/Logo";

type OnboardingFormProps = Zod.infer<typeof onboardingFormSchema>;

const OnboardingDialog = () => {
  const { mutateAsync: createGame } = useCreateGame();
  const { mutateAsync: createPlayer } = useCreatePlayer();
  const { mutateAsync: createBots } = useCreateBots();
  const { mutateAsync: createGameRound } = useCreateGameRound();
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormProps>({
    defaultValues: { bots: 1 },
    resolver: zodResolver(onboardingFormSchema),
  });

  const onSubmit: SubmitHandler<OnboardingFormProps> = async data => {
    try {
      const player = await createPlayer({
        name: data.name,
        bot: false,
        points: 1000,
      });
      const bots = await createBots({ count: data.bots });

      await createGame({ players: [player, ...bots] });
      await createGameRound({ players: [player, ...bots] });
    } catch (error) {
      console.error("There was an error", error);
    }
  };

  const handleBotsIncrement = (onChange: (value: number) => void) => {
    const current = getValues("bots");
    if (current === 5) return;
    onChange(current + 1);
  };
  const handleBotsDecrement = (onChange: (value: number) => void) => {
    const current = getValues("bots");
    if (current === 1) return;
    onChange(current - 1);
  };
  return (
    <Modal open={true}>
      <ModalContent width="600px">
        <Stack
          id="onboarding"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          my={10}
          flexDirection="column"
          gap={8}
          paper
        >
          <Logo />
          <div>
            <Text mb={6} textAlign="center" variant="headlineSmall">
              What&apos;s your name?
            </Text>
            <Input
              size="large"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div>
            <Text mb={6} textAlign="center" variant="titleMedium">
              How many bots shall play with you?
            </Text>
            <Controller
              control={control}
              name="bots"
              render={({ field: { value, onChange } }) => (
                <Stack gap={4} justifyContent="center">
                  <Button
                    onClick={() => handleBotsDecrement(onChange)}
                    size="large"
                  >
                    <HiMinus size={17} />
                  </Button>
                  <div className="px-8 py-2 text-lg rounded-lg bg-neutral-500">
                    {value}
                  </div>
                  <Button
                    onClick={() => handleBotsIncrement(onChange)}
                    size="large"
                  >
                    <HiPlus size={17} />
                  </Button>
                </Stack>
              )}
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
