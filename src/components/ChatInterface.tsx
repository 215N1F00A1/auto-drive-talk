import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { DriveService } from '@/services/DriveService';
import { CommandParser } from '@/services/CommandParser';
import { Message, DriveFile } from '@/types/chat';

interface ChatInterfaceProps {
  onActionLogged: (action: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onActionLogged }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 Hi! I\'m your Google Drive assistant. Send me commands like:\n\n• LIST /ProjectX\n• DELETE /ProjectX/report.pdf\n• MOVE /ProjectX/report.pdf /Archive\n• SUMMARY /ProjectX\n• HELP for more commands',
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const addMessage = (content: string, sender: 'user' | 'assistant', type: 'text' | 'file' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');
    simulateTyping();
    onActionLogged(`User sent: ${userMessage}`);

    // Parse command and execute
    try {
      const command = CommandParser.parse(userMessage);
      
      if (!command) {
        setTimeout(() => {
          addMessage('❌ Command not recognized. Type HELP to see available commands.', 'assistant');
        }, 1500);
        return;
      }

      onActionLogged(`Executing command: ${command.action} ${command.path || ''}`);

      let response = '';
      
      switch (command.action) {
        case 'LIST':
          const files = DriveService.listFiles(command.path || '/');
          if (files.length === 0) {
            response = `📁 Folder "${command.path || '/'}" is empty or doesn't exist.`;
          } else {
            response = `📁 Files in "${command.path || '/'}":\n\n${files.map(file => 
              `${file.type === 'folder' ? '📁' : '📄'} ${file.name}`
            ).join('\n')}`;
          }
          break;

        case 'DELETE':
          if (!command.path) {
            response = '❌ Please specify a file path to delete.';
            break;
          }
          if (command.path.includes('*') || command.path === '/' || command.path === '') {
            response = '⚠️ For safety, bulk deletion requires confirmation. Add CONFIRM to your command.';
            break;
          }
          const deleted = DriveService.deleteFile(command.path);
          response = deleted ? 
            `✅ Deleted "${command.path}" successfully.` : 
            `❌ File "${command.path}" not found.`;
          break;

        case 'MOVE':
          if (!command.path || !command.destination) {
            response = '❌ Please specify both source and destination paths.\nExample: MOVE /source/file.pdf /destination/';
            break;
          }
          const moved = DriveService.moveFile(command.path, command.destination);
          response = moved ? 
            `✅ Moved "${command.path}" to "${command.destination}"` : 
            `❌ Could not move file. Check if paths exist.`;
          break;

        case 'SUMMARY':
          const summaryFiles = DriveService.listFiles(command.path || '/');
          if (summaryFiles.length === 0) {
            response = `📁 No files found in "${command.path || '/'}"`;
          } else {
            const documentFiles = summaryFiles.filter(f => f.type === 'document');
            if (documentFiles.length === 0) {
              response = `📁 No documents found in "${command.path || '/'}" to summarize.`;
            } else {
              response = `📋 Document Summary for "${command.path || '/'}":\n\n${documentFiles.map(file => 
                `📄 ${file.name}\n• ${DriveService.generateSummary(file.name)}\n`
              ).join('\n')}`;
            }
          }
          break;

        case 'HELP':
          response = `🤖 Available Commands:\n\n• LIST /path - List files in a folder\n• DELETE /path/file.ext - Delete a specific file\n• MOVE /source /destination - Move file/folder\n• SUMMARY /path - Get AI summary of documents\n• HELP - Show this help message\n\nExample:\nLIST /ProjectX\nDELETE /ProjectX/old_report.pdf\nMOVE /ProjectX/report.pdf /Archive/\nSUMMARY /ProjectX`;
          break;

        default:
          response = '❌ Unknown command. Type HELP for available commands.';
      }

      setTimeout(() => {
        addMessage(response, 'assistant');
      }, 1500);

    } catch (error) {
      setTimeout(() => {
        addMessage('❌ Error processing command. Please try again.', 'assistant');
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-chat-bg">
      {/* Header */}
      <div className="bg-whatsapp-primary p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-whatsapp-light rounded-full flex items-center justify-center">
            <span className="text-whatsapp-dark font-semibold">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold">Drive Assistant</h3>
            <p className="text-sm opacity-90">Online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-whatsapp-dark">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-whatsapp-dark">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-whatsapp-dark">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-chat-sent text-white'
                  : 'bg-chat-received border'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-chat-time'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-chat-received border px-4 py-2 rounded-lg max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-background border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a command..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="bg-whatsapp-primary hover:bg-whatsapp-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};