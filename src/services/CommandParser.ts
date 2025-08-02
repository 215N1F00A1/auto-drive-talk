import { Command } from '@/types/chat';

export class CommandParser {
  static parse(input: string): Command | null {
    const trimmed = input.trim();
    const upperInput = trimmed.toUpperCase();
    
    // Handle HELP command
    if (upperInput === 'HELP' || upperInput === '/HELP') {
      return { action: 'HELP' };
    }
    
    // Handle LIST command
    if (upperInput.startsWith('LIST') || upperInput.startsWith('/LIST')) {
      const parts = trimmed.split(' ');
      const path = parts[1] || '/';
      return { action: 'LIST', path };
    }
    
    // Handle DELETE command with safety checks
    if (upperInput.startsWith('DELETE') || upperInput.startsWith('/DELETE')) {
      const parts = trimmed.split(' ');
      if (parts.length < 2) return null;
      
      const path = parts[1];
      const hasConfirm = upperInput.includes('CONFIRM');
      
      return { 
        action: 'DELETE', 
        path,
        parameters: { confirm: hasConfirm ? 'true' : 'false' }
      };
    }
    
    // Handle MOVE command
    if (upperInput.startsWith('MOVE') || upperInput.startsWith('/MOVE')) {
      const parts = trimmed.split(' ');
      if (parts.length < 3) return null;
      return { action: 'MOVE', path: parts[1], destination: parts[2] };
    }
    
    // Handle SUMMARY command
    if (upperInput.startsWith('SUMMARY') || upperInput.startsWith('/SUMMARY')) {
      const parts = trimmed.split(' ');
      const path = parts[1] || '/';
      return { action: 'SUMMARY', path };
    }
    
    // Natural language parsing for common phrases
    if (this.containsNaturalLanguage(upperInput)) {
      return this.parseNaturalLanguage(trimmed);
    }
    
    return null;
  }

  private static containsNaturalLanguage(input: string): boolean {
    const naturalPhrases = [
      'SHOW ME', 'WHAT\'S IN', 'LIST FILES', 'DELETE FILE', 'REMOVE',
      'MOVE FILE', 'SUMMARIZE', 'SUMMARY OF', 'HELP ME', 'WHAT CAN'
    ];
    return naturalPhrases.some(phrase => input.includes(phrase));
  }

  private static parseNaturalLanguage(input: string): Command | null {
    const upperInput = input.toUpperCase();
    
    // Natural LIST commands
    if (upperInput.includes('SHOW ME') || upperInput.includes('WHAT\'S IN') || upperInput.includes('LIST FILES')) {
      const pathMatch = input.match(/\/[\w\/]+/);
      const path = pathMatch ? pathMatch[0] : '/';
      return { action: 'LIST', path };
    }
    
    // Natural DELETE commands
    if (upperInput.includes('DELETE') || upperInput.includes('REMOVE')) {
      const pathMatch = input.match(/\/[\w\/\.]+\.\w+/);
      if (pathMatch) {
        return { 
          action: 'DELETE', 
          path: pathMatch[0],
          parameters: { confirm: 'false' }
        };
      }
    }
    
    // Natural SUMMARY commands
    if (upperInput.includes('SUMMARIZE') || upperInput.includes('SUMMARY OF')) {
      const pathMatch = input.match(/\/[\w\/]+/);
      const path = pathMatch ? pathMatch[0] : '/';
      return { action: 'SUMMARY', path };
    }
    
    // Help requests
    if (upperInput.includes('HELP') || upperInput.includes('WHAT CAN')) {
      return { action: 'HELP' };
    }
    
    return null;
  }
}