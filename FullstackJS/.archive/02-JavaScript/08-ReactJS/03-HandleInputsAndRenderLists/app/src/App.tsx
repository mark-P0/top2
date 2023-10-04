import "./tailwind.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Overview } from "./components/Overview.js";
import { CreateTaskEvent, DeleteTaskEvent } from "./events.js";

export class Task {
  static #ct = 0;

  id: number;
  description: string;
  constructor(description: string) {
    this.id = ++Task.#ct;
    this.description = description;
  }

  toString() {
    return this.description;
  }
}

class NewTaskForm extends React.Component<{}> {
  #createTask: React.FormEventHandler = (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const description = data.get("description")?.toString();

    if (!description || description === "") return;

    CreateTaskEvent.publish(description);

    form.reset();
  };

  render() {
    return (
      <form className="bg-white rounded-lg flex gap-3 p-3" onSubmit={this.#createTask}>
        <input
          className="border border-2 border-stone-300 rounded-full flex-1 px-3"
          type="text"
          name="description"
        />
        <button className="border border-2 border-stone-300 rounded px-3 py-1" type="submit">
          Add Task
        </button>
      </form>
    );
  }
}

type Props = {};
type State = { tasks: Task[] };

class App extends React.Component<Props, State> {
  #CreateTaskSubscriber = async (description: string) => {
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, new Task(description)],
    });
  };
  #DeleteTaskSubscriber = async (taskToDelete: Task) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.filter((task) => task !== taskToDelete),
    });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    CreateTaskEvent.subscribe(this.#CreateTaskSubscriber);
    DeleteTaskEvent.subscribe(this.#DeleteTaskSubscriber);
  }

  componentWillUnmount() {
    CreateTaskEvent.unsubscribe(this.#CreateTaskSubscriber);
    DeleteTaskEvent.unsubscribe(this.#DeleteTaskSubscriber);
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="min-h-screen min-w-screen bg-stone-500 flex flex-col gap-3 p-3">
        <NewTaskForm />
        <Overview tasks={tasks} />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
