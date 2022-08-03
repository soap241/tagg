export interface IProject {
  id: string;
  status: number;
  agent: string;
  task: string;
  dateStarted: number;
  actualCompletionDate: number;
  comments: any[];
}
