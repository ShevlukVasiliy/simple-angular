export type Complete = true | false;

export interface Task {
  id: string;
  text: string;
  status: Complete;
}

export interface Store {
  tasks: {
    [k: string]: Task;
  };
}
