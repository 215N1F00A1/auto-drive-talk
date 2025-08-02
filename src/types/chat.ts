export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'file';
}

export interface DriveFile {
  name: string;
  path: string;
  type: 'folder' | 'document' | 'image' | 'other';
  size?: number;
  modifiedAt: Date;
}

export interface Command {
  action: 'LIST' | 'DELETE' | 'MOVE' | 'SUMMARY' | 'HELP';
  path?: string;
  destination?: string;
  parameters?: Record<string, string>;
}

export interface ActionLog {
  id: string;
  timestamp: Date;
  action: string;
  details: string;
  status: 'success' | 'error' | 'warning';
}