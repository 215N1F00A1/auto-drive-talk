import { Command } from '@/types/chat';

export class CommandParser {
  static parse(input: string): Command | null {
    const trimmed = input.trim().toUpperCase();
    
    // Handle HELP command
    if (trimmed === 'HELP') {
      return { action: 'HELP' };
    }
    
    // Handle LIST command
    if (trimmed.startsWith('LIST')) {
      const parts = input.trim().split(' ');
      const path = parts[1] || '/';
      return { action: 'LIST', path };
    }
    
    // Handle DELETE command
    if (trimmed.startsWith('DELETE')) {
      const parts = input.trim().split(' ');
      if (parts.length < 2) return null;
      return { action: 'DELETE', path: parts[1] };
    }
    
    // Handle MOVE command
    if (trimmed.startsWith('MOVE')) {
      const parts = input.trim().split(' ');
      if (parts.length < 3) return null;
      return { action: 'MOVE', path: parts[1], destination: parts[2] };
    }
    
    // Handle SUMMARY command
    if (trimmed.startsWith('SUMMARY')) {
      const parts = input.trim().split(' ');
      const path = parts[1] || '/';
      return { action: 'SUMMARY', path };
    }
    
    return null;
  }
}