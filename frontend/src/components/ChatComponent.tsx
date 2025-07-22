import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useGetCategoriesQuery } from '../api/categoriesApi';
import { useGetSubCategoriesQuery } from '../api/subCategoriesApi';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { useChatMessages } from '../hooks/useChatMessages';
import { useChatAPI } from '../hooks/useChatAPI';

interface ChatComponentProps {
  categoryId: number;
  subCategoryId: number;
  conversationHistory?: any[];
  resumeConversation?: boolean;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ 
  categoryId, 
  subCategoryId, 
  conversationHistory,
  resumeConversation 
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesQuery(categoryId);

  const category = categories?.find(cat => cat.id === categoryId);
  const subCategory = subCategories?.find(sub => sub.id === subCategoryId);

  const { messages, addMessage, addWelcomeMessage } = useChatMessages(
    conversationHistory, 
    resumeConversation
  );


  const { sendMessage, isLoading, error } = useChatAPI(addMessage);

  useEffect(() => {
    if (category && subCategory) {
      addWelcomeMessage(category.name, subCategory.name);
    }
  }, [category, subCategory, addWelcomeMessage]);

  const handleSendMessage = async (text: string) => {
    await sendMessage(categoryId, subCategoryId, text);
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>

      <ChatHeader 
        categoryName={category?.name}
        subCategoryName={subCategory?.name}
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MessageList 
          messages={messages}
          isLoading={isLoading}
        />
      </Box>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        error={error}
        placeholder={`שאל שאלה על ${subCategory?.name}...`}
      />
    </Box>
  );
};

export default ChatComponent;
