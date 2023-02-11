import React from "react";
import { Task } from "../App.js";
import { DeleteTaskEvent } from "../events.js";
import { CheckCircleIcon, DeleteIcon, PencilSquareIcon } from "../icons.js";

type TaskItemProps = { task: Task; ct: number };
type TaskItemState = { isEditing: boolean };

class TaskItem extends React.Component<TaskItemProps, TaskItemState> {
  #deleteThisTask = () => {
    const { task } = this.props;
    DeleteTaskEvent.publish(task);
  };
  #switchToEditMode = () => {
    this.setState({ isEditing: true });
  };
  #saveEdit: React.FormEventHandler = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const newDescription = data.get("newDescription");

    if (!newDescription) {
      console.warn("Input field is empty?");
      return;
    }

    const { task } = this.props;

    /**
     * Kinda hackish...
     * Will not be reflected if this component is not re-rendered.
     * However, since the state is refreshed anyway afterwards,
     * that can be used to automatically reflect these mutations...
     */
    task.description = `${newDescription}`;

    this.setState({ isEditing: false });
  };

  constructor(props: TaskItemProps) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  render() {
    const { task, ct } = this.props;
    const { isEditing } = this.state;

    const formID = crypto.randomUUID();

    const deleteButton = (
      <button className="w-4 h-4" onClick={this.#deleteThisTask}>
        <DeleteIcon />
      </button>
    );
    const editButton = !isEditing ? (
      <button key="edit-button" className="w-4 h-4" type="button" onClick={this.#switchToEditMode}>
        <PencilSquareIcon />
      </button>
    ) : (
      <button key="save-button" className="w-4 h-4" type="submit" form={formID}>
        <CheckCircleIcon />
      </button>
    );

    const display = !isEditing ? (
      /**
       * Item count can be implemented via CSS,
       * but assignment instructions demand manual approach.
       */
      <span className="border-2 border-transparent">{`${ct}. ${task}`}</span>
    ) : (
      <form id={formID} onSubmit={this.#saveEdit}>
        <input
          className="border border-2 border-orange-200 px-1"
          type="text"
          defaultValue={`${task}`}
          name="newDescription"
          autoFocus={true}
        />
      </form>
    );

    return (
      <li className="flex items-center gap-3">
        <span className="flex items-center gap-2">
          {deleteButton}
          {editButton}
        </span>

        {display}
      </li>
    );
  }
}

type Props = { tasks: Task[] };

export class Overview extends React.Component<Props> {
  render() {
    const { tasks } = this.props;
    const classes = "bg-white rounded-lg p-3";

    if (tasks.length === 0) {
      return (
        <p className={`${classes} text-gray-400`}>
          <em>Add tasks through the form above.</em>
        </p>
      );
    }

    const taskItems = tasks.map((task, idx) => <TaskItem key={task.id} task={task} ct={idx + 1} />);
    return <ol className={`${classes} flex flex-col gap-2`}>{taskItems}</ol>;
  }
}
