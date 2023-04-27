describe("template spec", () => {
	it("should render the home page", () => {
        cy.visit("http://localhost:3000/");
        cy.wait(400);
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-testid="task_Study"]').click();
        cy.get("#detail_input_button_OOP\\ Javascript").check();
        cy.get('[data-testid="back_button"] > .text-red-600').click();
        cy.get('[data-testid="task_Study"]').click();
        cy.get("#detail_input_button_Science\\ Books").check();
        cy.get('[data-testid="back_button"] > .text-red-600 > path').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-testid="task_Study"]').click();
        cy.get("#detail_input_button_OOP\\ Javascript").check();
        cy.get('[data-testid="back_button"] > .text-red-600').click();
        cy.get('[data-testid="task_Study"]').click();
        cy.get("#detail_input_button_Science\\ Books").check();
        cy.get('[data-testid="back_button"] > .text-red-600 > path').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get("#add_input").clear("G");
        cy.get("#add_input").type("Go to Market");
        cy.get('[data-testid="add_confirm_button"]').click();
        cy.get('[data-testid="task_Go to Market"]').click();
        cy.get("#add_input").clear("B");
        cy.get("#add_input").type("Buy Milk");
        cy.get('[data-testid="add_confirm_button"]').click();
        cy.get("#add_input").clear("P");
        cy.get("#add_input").type("Pay Bills");
        cy.get('[data-testid="add_confirm_button"]').click();
        cy.get('[data-testid="back_button"] > .text-red-600').click();
        cy.get('[data-testid="task_Go to Market"]').click();
        cy.get('[data-testid="filter_active"]').click();
        cy.get('[data-testid="filter_done"]').click();
        cy.get('[data-testid="filter_all"]').click();
        cy.get("#detail_input_button_Pay\\ Bills").check();
        cy.get('[data-testid="filter_done"]').click();
        cy.get('[data-testid="filter_active"]').click();
        cy.get('[data-testid="filter_all"]').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get("#add_input").clear("G");
        cy.get("#add_input").type("Go to Market");
        cy.get('[data-testid="add_confirm_button"]').click();

        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-testid="back_button"] > .text-red-600').click();
        cy.get('[data-testid="task_Go to Market"]').click();
        cy.get('#detail_input_button_Go\\ to\\ Market').check();
        cy.get('#detail_input_button_Buy\\ Milk').check();
        cy.get('[data-testid="back_button"] > .text-red-600').click();
        cy.get('[data-testid="task_Go to Market"]').click();
        cy.get('[data-testid="detail_delete_button_Go to Market"]').click();
        cy.get('[data-testid="back_button"] > .text-red-600 > path').click();
        cy.get('[data-testid="task_House Hold Chore"]').click();
        cy.get('[data-testid="delete_all_done_button"]').click();
        cy.get('[data-testid="filter_active"]').click();
        cy.get('[data-testid="filter_done"]').click();
        cy.get('[data-testid="filter_all"]').click();
        cy.get('[data-testid="back_button"] > .text-red-600').click();
        /* ==== End Cypress Studio ==== */
    });
});
