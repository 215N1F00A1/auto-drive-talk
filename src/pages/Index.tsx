import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatInterface } from '@/components/ChatInterface';
import { Dashboard } from '@/components/Dashboard';
import { DemoSection } from '@/components/DemoSection';
import { MessageSquare, BarChart3, HardDrive, Smartphone } from 'lucide-react';
import { ActionLog } from '@/types/chat';

const Index = () => {
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [triggerCommand, setTriggerCommand] = useState<string>('');

  const handleActionLogged = (action: string) => {
    const newLog: ActionLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      action: action,
      details: `Operation: ${action}`,
      status: action.includes('Error') ? 'error' : 'success'
    };
    setActionLogs(prev => [...prev, newLog]);
  };

  const handleSendCommand = (command: string) => {
    setTriggerCommand(command);
  };

  const handleCommandProcessed = () => {
    setTriggerCommand('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-light to-chat-bg">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-whatsapp-primary rounded-full">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <div className="p-3 bg-blue-600 rounded-full">
              <HardDrive className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-whatsapp-dark mb-2">
            WhatsApp Google Drive Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the n8n workflow simulation - Control your Google Drive through WhatsApp commands with AI-powered document summaries
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="chat" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Chat</span>
              </TabsTrigger>
              <TabsTrigger value="demo" className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4" />
                <span>Demo & Docs</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-6">
              <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Smartphone className="h-5 w-5 text-whatsapp-primary" />
                    <span>WhatsApp Interface</span>
                  </CardTitle>
                  <CardDescription>
                    Send commands to manage your Google Drive files
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px] border rounded-lg overflow-hidden">
                    <ChatInterface 
                      onActionLogged={handleActionLogged}
                      triggerCommand={triggerCommand}
                      onCommandProcessed={handleCommandProcessed}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demo" className="space-y-6">
              <DemoSection onSendCommand={handleSendCommand} />
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-6">
              <Dashboard actionLogs={actionLogs} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-whatsapp-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">WhatsApp Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Natural command interface through WhatsApp messages with real-time responses
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HardDrive className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Drive Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                List, delete, move files and folders with OAuth2 authenticated access
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">AI Summaries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Intelligent document summaries powered by OpenAI GPT for quick insights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
