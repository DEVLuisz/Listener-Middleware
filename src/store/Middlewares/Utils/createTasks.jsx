import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export default async function createTasks ({
  fork,
  dispatch,
  busca,
  action,
  loadingText,
  sucessText,
  errorText
}) {
  toast({
    title: 'Carregando',
    description: loadingText,
    status: 'loading',
    duration: 2000,
    isClosable: true
})
  const tarefa = fork(async api => {
    await api.delay(1000);
    return await busca();
  });

  const resposta = await tarefa.result;

  if(resposta.status === 'ok') {
    toast({
      title: "Sucesso!",
      description: sucessText,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    dispatch(action(resposta.value));
  }

  if(resposta.status === 'rejected') {
    toast({
      title: 'Erro',
      description: errorText,
      status: 'error',
      duration: 2000,
      isClosable: true
  });
  }

  return resposta;
}