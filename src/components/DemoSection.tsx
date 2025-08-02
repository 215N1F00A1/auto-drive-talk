import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Github, FileText, Shield, Zap, Bot } from 'lucide-react';

interface DemoSectionProps {
  onSendCommand: (command: string) => void;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ onSendCommand }) => {
  const demoCommands = [
    { command: 'LIST /ProjectX', description: 'Show files in ProjectX folder', icon: '📁' },
    { command: 'SUMMARY /ProjectX', description: 'AI summary of all documents', icon: '🤖' },
    { command: 'MOVE /ProjectX/presentation.pptx /Archive/', description: 'Move presentation to archive', icon: '📋' },
    { command: 'Show me files in /Documents', description: 'Natural language query', icon: '🗣️' }
  ];

  const features = [
    { icon: Shield, title: 'Security First', description: 'OAuth2 authentication with safety guards' },
    { icon: Bot, title: 'AI-Powered', description: 'GPT-4 document summaries and insights' },
    { icon: Zap, title: 'Real-time', description: 'Instant WhatsApp responses via webhooks' },
    { icon: FileText, title: 'Audit Trail', description: 'Complete logging and activity tracking' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Demo Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlayCircle className="h-5 w-5 text-green-600" />
            <span>Try These Demo Commands</span>
          </CardTitle>
          <CardDescription>
            Click any command to test it in the chat interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {demoCommands.map((demo, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left justify-start"
                onClick={() => onSendCommand(demo.command)}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{demo.icon}</span>
                  <div>
                    <div className="font-mono text-sm font-semibold">{demo.command}</div>
                    <div className="text-xs text-muted-foreground mt-1">{demo.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>🛠️ Technical Implementation</CardTitle>
          <CardDescription>
            This simulation demonstrates the complete n8n workflow architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Workflow Components</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">Twilio WhatsApp API</Badge>
                <Badge variant="outline" className="mr-2">Google Drive OAuth2</Badge>
                <Badge variant="outline" className="mr-2">OpenAI GPT-4</Badge>
                <Badge variant="outline" className="mr-2">n8n Automation</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Security Features</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">OAuth2 Scopes</Badge>
                <Badge variant="outline" className="mr-2">Deletion Confirmation</Badge>
                <Badge variant="outline" className="mr-2">Audit Logging</Badge>
                <Badge variant="outline" className="mr-2">Rate Limiting</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Implementation Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-green-700">✅ Completed Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• WhatsApp-style interface simulation</li>
                <li>• Command parsing (LIST, DELETE, MOVE, SUMMARY)</li>
                <li>• Natural language processing</li>
                <li>• AI document summaries</li>
                <li>• Safety guards & confirmation prompts</li>
                <li>• Audit logging and dashboard</li>
                <li>• Responsive design with WhatsApp styling</li>
                <li>• Error handling and user feedback</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-blue-700">🔮 Production Implementation</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Deploy n8n workflow with Docker</li>
                <li>• Configure Twilio WhatsApp sandbox</li>
                <li>• Set up Google Drive OAuth2 credentials</li>
                <li>• Add OpenAI API integration</li>
                <li>• Implement webhook security</li>
                <li>• Add rate limiting and quotas</li>
                <li>• Set up monitoring and alerts</li>
                <li>• Create backup and recovery procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};