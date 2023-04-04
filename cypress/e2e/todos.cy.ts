describe('Todos Page', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should create a new todo', () => {
    cy.visit('/todos');

    cy.addTodo('My new todo');

    cy.deleteTodo('My new todo');
  });

  it('should complete a todo', () => {
    cy.visit('/todos');

    cy.addTodo('My complete todo');

    cy.completeTodo('My complete todo');

    cy.get('input[value="My complete todo"]')
      .parent()
      .siblings('div[data-testid="Checkbox"]')
      .parent()
      .should('have.css', 'filter')
      .and('include', 'opacity(0.3)');

    cy.deleteTodo('My complete todo');
  });

  it('should delete a todo', () => {
    cy.visit('/todos');

    cy.get('input[value="My deleted todo"]').should('not.exist');

    cy.addTodo('My deleted todo');

    cy.deleteTodo('My deleted todo');

    cy.get('input[value="My deleted todo"]').should('not.exist');
  });

  it('should filter todos by completed', () => {
    cy.visit('/todos');

    cy.addTodo('My completed todo');
    cy.wait(1000);
    cy.addTodo('My pending todo');
    cy.completeTodo('My completed todo');

    cy.get('div[data-testid="Select"]').click();
    cy.contains('completed').click();

    cy.get('input[value="My pending todo"]').should('not.exist');
    cy.get('input[value="My completed todo"]').should('be.visible');

    cy.get('div[data-testid="Select"]').click();
    cy.contains('all').click();

    cy.deleteTodo('My pending todo');
    cy.deleteTodo('My completed todo');
  });
});
