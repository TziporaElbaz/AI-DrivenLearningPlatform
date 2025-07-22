import { useGetUserPromptsQuery, useGetUserPromptsByUserIdQuery } from '../../api/promptsApi';

export const usePromptHistory = (userId?: string) => {
  
  const { 
    data: userPrompts, 
    isLoading: userPromptsLoading, 
    error: userPromptsError 
  } = useGetUserPromptsQuery(undefined, {
    skip: !!userId, 
  });

  const { 
    data: adminPrompts, 
    isLoading: adminPromptsLoading, 
    error: adminPromptsError 
  } = useGetUserPromptsByUserIdQuery(userId!, {
    skip: !userId,
  });

  return {
    prompts: userId ? adminPrompts : userPrompts,
    isLoading: userId ? adminPromptsLoading : userPromptsLoading,
    error: userId ? adminPromptsError : userPromptsError,
  };
};
