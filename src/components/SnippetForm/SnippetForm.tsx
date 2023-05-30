import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "../Stack";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { snippetFormSchema } from "@/utils/validations";
import { InputLabel } from "../InputLabel";
import { Input } from "../Input";
import { Button } from "../Button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Editor from "@monaco-editor/react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComboboxDemo } from "../Combobox/Combobox";
import LanguageSelector from "../NewSnippet/LanguageSelector";
import { useState } from "react";
type SnippetFormProps = Zod.infer<typeof snippetFormSchema>;

const SnippetForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SnippetFormProps>({
    resolver: zodResolver(snippetFormSchema),
  });

  const [languageOpen, setLanguageOpen] = useState(false);

  const onSubmit: SubmitHandler<SnippetFormProps> = async data => {
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
      <div>
        <InputLabel>Title</InputLabel>
        <Input error={errors.title?.message} {...register("title")} />
      </div>
      <div>
        <InputLabel>Description</InputLabel>
        <Input
          error={errors.description?.message}
          {...register("description")}
        />
      </div>
      {/* <ComboboxDemo /> */}
      <Controller
        control={control}
        name="lang"
        render={({ field: { ref, value, onChange } }) => (
          <LanguageSelector
            open={languageOpen}
            setOpen={setLanguageOpen}
            setValue={onChange}
            value={value}
          />
        )}
      />
      <div>
        <InputLabel>Snippet</InputLabel>
        <Editor
          className="overflow-hidden border rounded-lg"
          options={{ minimap: { enabled: false } }}
          theme="vs-dark"
          height="400px"
          defaultLanguage="javascript"
          defaultValue="// add your snippet here"
        />
      </div>

      {/* <SyntaxHighlighter style={vscDarkPlus} language="c">
        {`#include <unistd.h>

int main(void)
{
    return (0);
}`}
      </SyntaxHighlighter> */}
      <Button isLoading={isSubmitting} type="submit">
        Create snippet
      </Button>
    </Stack>
  );
};
export default SnippetForm;
