import { useCallback } from 'react';
import { useCreatePromptMutation } from '../api/promptsApi';
import { Message } from '../components/chat/Message';

export const useChatAPI = (onMessageReceived: (message: Message) => void) => {
  const [createPrompt, { isLoading, error }] = useCreatePromptMutation();

  const sendMessage = useCallback(async (
    categoryId: number,
    subCategoryId: number,
    text: string
  ) => {
    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: text,
        timestamp: new Date()
      };
      onMessageReceived(userMessage);

      const result = await createPrompt({
        categoryId,
        subCategoryId,
        promptText: text
      }).unwrap();


      const aiMessage: Message = {
        id: result.id.toString(),
        type: 'ai',
        content: result.response,
        timestamp: new Date(result.created_at)
      };
      onMessageReceived(aiMessage);

      return { success: true, result };
    } catch (err) {

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'ai',
        content: 'מצטער, אירעה שגיאה. אנא נסה שוב.',
        timestamp: new Date()
      };
      onMessageReceived(errorMessage);

      return { success: false, error: err };
    }
  }, [createPrompt, onMessageReceived]);

  return {
    sendMessage,
    isLoading,
    error
  };
};
