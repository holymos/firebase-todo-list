// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    addTodo(title: string): Chainable<JQuery<HTMLElement>>;
    deleteTodo(title: string): Chainable<JQuery<HTMLElement>>;
    completeTodo(title: string): Chainable<JQuery<HTMLElement>>;
  }
}
