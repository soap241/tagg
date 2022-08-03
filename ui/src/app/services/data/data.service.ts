import { IProject } from "./../../models/@types";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  projects: IProject[] = [
    {
      id: "1",
      status: 20,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "2",
      status: 40,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "3",
      status: 100,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "4",
      status: 80,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "5",
      status: 20,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "6",
      status: 60,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "7",
      status: 40,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "8",
      status: 40,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
    {
      id: "9",
      status: 60,
      agent: "Priscilla Owusu",
      task: "Buy Property",
      dateStarted: Date.now(),
      actualCompletionDate: Date.now(),
      comments: [],
    },
  ];

  getProjects() {
    return this.projects;
  }

  getProject(id: any) {
    return this.projects.find((project) => project.id === id);
  }
}
