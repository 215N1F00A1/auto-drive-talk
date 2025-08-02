import { DriveFile } from '@/types/chat';

// Mock Google Drive data
const mockFiles: DriveFile[] = [
  {
    name: 'ProjectX',
    path: '/ProjectX',
    type: 'folder',
    modifiedAt: new Date('2024-01-15')
  },
  {
    name: 'Archive',
    path: '/Archive',
    type: 'folder',
    modifiedAt: new Date('2024-01-10')
  },
  {
    name: 'Documents',
    path: '/Documents',
    type: 'folder',
    modifiedAt: new Date('2024-01-20')
  },
  {
    name: 'quarterly_report.pdf',
    path: '/ProjectX/quarterly_report.pdf',
    type: 'document',
    size: 2048576,
    modifiedAt: new Date('2024-01-15')
  },
  {
    name: 'meeting_notes.docx',
    path: '/ProjectX/meeting_notes.docx',
    type: 'document',
    size: 524288,
    modifiedAt: new Date('2024-01-14')
  },
  {
    name: 'budget_analysis.xlsx',
    path: '/ProjectX/budget_analysis.xlsx',
    type: 'document',
    size: 1048576,
    modifiedAt: new Date('2024-01-13')
  },
  {
    name: 'presentation.pptx',
    path: '/ProjectX/presentation.pptx',
    type: 'document',
    size: 3145728,
    modifiedAt: new Date('2024-01-12')
  },
  {
    name: 'project_images',
    path: '/ProjectX/project_images',
    type: 'folder',
    modifiedAt: new Date('2024-01-11')
  },
  {
    name: 'old_report.pdf',
    path: '/Archive/old_report.pdf',
    type: 'document',
    size: 1572864,
    modifiedAt: new Date('2023-12-20')
  },
  {
    name: 'contract.pdf',
    path: '/Documents/contract.pdf',
    type: 'document',
    size: 2097152,
    modifiedAt: new Date('2024-01-18')
  }
];

export class DriveService {
  private static files = [...mockFiles];

  static listFiles(path: string): DriveFile[] {
    // Normalize path
    const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '');
    
    if (normalizedPath === '') {
      // Root directory - return top-level items
      return this.files.filter(file => {
        const filePath = file.path.substring(1); // Remove leading slash
        return !filePath.includes('/') || (file.type === 'folder' && filePath === file.name);
      });
    }
    
    // Return files in the specified directory
    return this.files.filter(file => {
      const parentPath = file.path.substring(0, file.path.lastIndexOf('/'));
      return parentPath === normalizedPath;
    });
  }

  static deleteFile(path: string): boolean {
    const index = this.files.findIndex(file => file.path === path);
    if (index !== -1) {
      this.files.splice(index, 1);
      return true;
    }
    return false;
  }

  static moveFile(sourcePath: string, destinationPath: string): boolean {
    const file = this.files.find(f => f.path === sourcePath);
    if (!file) return false;
    
    // Update file path
    const fileName = file.name;
    const newPath = destinationPath.endsWith('/') ? 
      destinationPath + fileName : 
      destinationPath + '/' + fileName;
    
    file.path = newPath;
    return true;
  }

  static generateSummary(fileName: string): string {
    const summaries: Record<string, string> = {
      'quarterly_report.pdf': 'Q4 financial performance shows 15% growth with key metrics exceeding targets. Revenue increased significantly in cloud services division.',
      'meeting_notes.docx': 'Weekly team meeting covering project milestones, budget allocation, and upcoming deadlines. Action items assigned to team members.',
      'budget_analysis.xlsx': 'Comprehensive financial analysis showing cost breakdowns, ROI calculations, and resource allocation for next quarter.',
      'presentation.pptx': 'Executive presentation outlining project goals, current progress, and strategic recommendations for stakeholder review.',
      'contract.pdf': 'Legal agreement with vendor specifications, payment terms, deliverables, and compliance requirements.',
      'old_report.pdf': 'Historical analysis from previous quarter showing baseline metrics and comparative performance data.'
    };
    
    return summaries[fileName] || 'Document contains business information and data relevant to project objectives.';
  }

  static searchFiles(query: string): DriveFile[] {
    return this.files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.path.toLowerCase().includes(query.toLowerCase())
    );
  }

  static getFilesByType(type: DriveFile['type']): DriveFile[] {
    return this.files.filter(file => file.type === type);
  }
}