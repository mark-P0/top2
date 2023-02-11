import { Task } from "./App.js";

class Event<T> {
  #subscribers: ((data: T) => Promise<void>)[] = [];

  subscribe(callback: (data: T) => Promise<void>) {
    this.#subscribers.push(callback);
  }

  unsubscribe(callback: (data: T) => Promise<void>) {
    this.#subscribers = this.#subscribers.filter((sub) => sub !== callback);
  }

  publish(data: T) {
    for (const sub of this.#subscribers) {
      sub(data);
    }
  }
}

export const CreateTaskEvent = new Event<string>();
export const DeleteTaskEvent = new Event<Task>();
