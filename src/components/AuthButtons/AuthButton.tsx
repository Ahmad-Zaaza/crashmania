"use client";
import { useState, useCallback, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { Modal, ModalTrigger } from "../Modal";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../Button";

const ModalContent = dynamic(() => import("../Modal/ModalContent"), {
  ssr: true,
});
const SignupForm = dynamic(() => import("../SignupForm/SignupForm"), {
  ssr: true,
});
const LoginForm = dynamic(() => import("../LoginForm/LoginForm"), {
  ssr: true,
});

interface IProps {
  mode: "login" | "signup";
}

const AuthButton = ({ mode }: IProps) => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<"login" | "signup">(mode);

  const onChangeMode = useCallback((m: "login" | "signup") => {
    setCurrentMode(m);
  }, []);

  const onAuthSuccess = (user: any) => {
    setModalOpen(false);
    // queryClient.setQueryData(userQueryKeys.user(), user);
    // queryClient.invalidateQueries(postsQueryKeys.all);
  };
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);
  return (
    <Modal open={modalOpen}>
      <ModalTrigger asChild>
        <Button
          size="small"
          onClick={() => setModalOpen(true)}
          variant={mode === "login" ? "filled" : "ghost"}
          theme={mode === "login" ? "primary" : "neutral"}
        >
          {currentMode === "login" ? "Sign in" : "Sign up"}
        </Button>
      </ModalTrigger>
      {modalOpen && currentMode === "signup" && (
        <ModalContent
          width="600px"
          onClose={() => setModalOpen(false)}
          title="Login up"
        >
          <SignupForm
            onChangeMode={onChangeMode}
            // onAuthSuccess={onAuthSuccess}
          />
        </ModalContent>
      )}
      {modalOpen && currentMode === "login" && (
        <ModalContent onClose={() => setModalOpen(false)} title="Sign in">
          <LoginForm
            onChangeMode={onChangeMode}
            onAuthSuccess={onAuthSuccess}
          />
        </ModalContent>
      )}
    </Modal>
  );
};

export default AuthButton;
