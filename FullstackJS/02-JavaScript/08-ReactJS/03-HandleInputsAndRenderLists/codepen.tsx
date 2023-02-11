import React, { FormEvent, MouseEvent } from 'react';

export default class App extends React.Component<
  {},
  { text: string; isEditing: boolean }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      text: 'Sample text',
      isEditing: false,
    };
  }

  render() {
    const { text, isEditing } = this.state;
    console.log(isEditing);

    const formId = 'edit-form';

    const display = !isEditing ? (
      <p>{text}</p>
    ) : (
      <form id={formId} onSubmit={(event) => this.#handleFormSubmission(event)}>
        <input
          className="border border-2 px-2"
          type="text"
          name="newText"
          defaultValue={text}
        />
      </form>
    );

    const button = !isEditing ? (
      <button
        className="border border-2 px-2"
        type="button"
        onClick={(event) => this.#switchToEditMode(event)}
      >
        Edit
      </button>
    ) : (
      <button
        className="border border-2 px-2"
        type="submit"
        form={formId}
        onSubmit={() => console.log('bruh')}
      >
        Update
      </button>
    );

    return (
      <div className="flex justify-center p-3 gap-3">
        {display}
        {button}
      </div>
    );
  }

  #switchToEditMode(event: MouseEvent) {
    console.log('toggled state');

    event.preventDefault();
    this.setState({ isEditing: true });
  }

  #handleFormSubmission(event: FormEvent) {
    console.log('submit');

    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const newText = data.get('newText');
    if (!newText) {
      return;
    }

    this.setState({
      text: `${newText}`,
      isEditing: false,
    });
  }
}
