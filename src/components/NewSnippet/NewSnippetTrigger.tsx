import { useState } from "react";
import { Button } from "../Button";
import { RiCodeBoxLine } from "react-icons/ri";
import { Modal, ModalTrigger } from "../Modal";
import dynamic from "next/dynamic";


const ModalContent = dynamic(() => import("../Modal/ModalContent"), {
  ssr: true,
});
const SnippetForm = dynamic(() => import("../SnippetForm/SnippetForm"), {
  ssr: false,
});

const NewSnippetTrigger = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button fullWidth
          startIcon={<RiCodeBoxLine size={25} />}
          size="medium"
          onClick={() => setModalOpen(true)}
        >
          Create new snippet
        </Button>
      </ModalTrigger>
      {modalOpen  && (
        <ModalContent width="800px" onClose={() => setModalOpen(false)} title="Create new snippet">
         <SnippetForm/>
        </ModalContent>
      )}
    </Modal>
  );
};

export default NewSnippetTrigger;
