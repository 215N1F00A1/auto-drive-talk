import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { ActionLog } from '@/types/chat';

interface DashboardProps {
  actionLogs: ActionLog[];
}

export const Dashboard: React.FC<DashboardProps> = ({ actionLogs }) => {
  const getStatusIcon = (status: ActionLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: ActionLog['status']) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      warning: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[status] || 'outline'} className="text-xs">
        {status}
      </Badge>
    );
  };

  const recentLogs = actionLogs.slice(-10).reverse();
  const successCount = actionLogs.filter(log => log.status === 'success').length;
  const errorCount = actionLogs.filter(log => log.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionLogs.length}</div>
            <p className="text-xs text-muted-foreground">Lifetime commands executed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {actionLogs.length > 0 ? Math.round((successCount / actionLogs.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">{successCount} successful operations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <p className="text-xs text-muted-foreground">Failed operations</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest WhatsApp commands and Google Drive operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            {recentLogs.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No activity yet. Start chatting with the assistant!
              </div>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                    <div className="mt-0.5">
                      {getStatusIcon(log.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{log.action}</p>
                        {getStatusBadge(log.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {log.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Command Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Command Reference</CardTitle>
          <CardDescription>Available WhatsApp commands for Google Drive operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">File Operations</h4>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded text-xs block">LIST /folder/path</code>
                <code className="bg-muted px-2 py-1 rounded text-xs block">DELETE /path/file.ext</code>
                <code className="bg-muted px-2 py-1 rounded text-xs block">MOVE /source /destination</code>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">AI Operations</h4>
              <div className="space-y-1 text-sm">
                <code className="bg-muted px-2 py-1 rounded text-xs block">SUMMARY /folder/path</code>
                <code className="bg-muted px-2 py-1 rounded text-xs block">HELP</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};