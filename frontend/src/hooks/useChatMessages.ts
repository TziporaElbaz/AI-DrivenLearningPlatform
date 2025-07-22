import { useState, useEffect, useCallback } from 'react';
import { Message } from '../components/chat/Message';

export const useChatMessages = (
  conversationHistory?: any[],
  resumeConversation?: boolean
) => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Add new message
  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Load conversation history
  const loadHistory = useCallback(() => {
    if (!resumeConversation || !conversationHistory || conversationHistory.length === 0) {
      return;
    }

    const historyMessages: Message[] = [];
    
    // הוסף הודעת מערכת שמציינת שזו המשך שיחה
    historyMessages.push({
      id: 'resume-notice',
      type: 'ai',
      content: `📚 ממשיך שיחה קיימת עם ${conversationHistory.length} הודעות קודמות...`,
      timestamp: new Date()
    });
   
    conversationHistory.forEach((prompt: any) => {

      historyMessages.push({
        id: `user-${prompt.id}`,
        type: 'user',
        content: prompt.prompt,
        timestamp: new Date(prompt.created_at)
      });
      

      historyMessages.push({
        id: `ai-${prompt.id}`,
        type: 'ai',
        content: prompt.response,
        timestamp: new Date(prompt.created_at)
      });
    });
    
    historyMessages.push({
      id: 'continue-prompt',
      type: 'ai',
      content: `🚀 עכשיו אתה יכול להמשיך לשאול שאלות נוספות על הנושא!`,
      timestamp: new Date()
    });
    
    setMessages(historyMessages);
  }, [conversationHistory, resumeConversation]);


  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addWelcomeMessage = useCallback((categoryName?: string, subCategoryName?: string) => {
    if (resumeConversation) return;
    
    const welcomeContent = categoryName && subCategoryName 
      ? `שלום! אני כאן כדי לעזור לך ללמוד על ${subCategoryName} בתחום ${categoryName}. מה תרצה לדעת?`
      : 'שלום! איך אני יכול לעזור לך היום?';

    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: welcomeContent,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, [resumeConversation]);

  return {
    messages,
    addMessage,
    clearMessages,
    addWelcomeMessage
  };
};
