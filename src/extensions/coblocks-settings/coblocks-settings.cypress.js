/*
 * Include our constants
 */
import * as helpers from '../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Settings', function() {
	let supportsGradients = false;
	beforeEach( function() {
		helpers.closeLayoutSelector();

		cy.get( '.edit-post-more-menu' ).click();
		cy.get( '.components-menu-group' ).find( 'button' ).contains( 'Editor settings' ).click();
		cy.get( '.coblocks-modal__content' ).find( 'input[type="checkbox"]' ).each( ( checkbox ) => {
			if ( ! Cypress.$( checkbox ).prop( 'checked' ) ) {
				cy.get( checkbox ).click();
			}

			if ( Cypress.$( checkbox ).parents( '.components-base-control__field' ).text() === 'Gradient styles' ) {
				supportsGradients = true;
			}
		} );
		cy.get( '.components-modal__header' ).find( 'button[aria-label="Close dialog"]' ).click();
	} );

	/**
	 * Test that the CoBlocks panel typography controls function as expected.
	 */
	it( 'Can control typography settings as expected.', function() {
		helpers.addBlockToPost( 'coblocks/row', true );
		cy.get( 'div[data-type="coblocks/row"] .components-placeholder' ).find( 'button' ).first().click( { force: true } );
		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );

		cy.get( '.edit-post-more-menu' ).click();
		cy.get( '.components-menu-group' ).find( 'button' ).contains( 'Editor settings' ).click();

		// Typography Test
		cy.get( 'button[aria-label="Change typography"]' ).should( 'exist' );
		cy.get( '.coblocks-modal__content' ).contains( 'Typography controls' ).click();
		cy.get( 'button[aria-label="Change typography"]' ).should( 'not.exist' );

		cy.get( '.components-modal__header' ).find( 'button[aria-label="Close dialog"]' ).click();
	} );

	/**
	 * Test that the CoBlocks panel layout selector controls function as expected.
	 */
	it( 'Can control layout selector visibility as expected.', function() {
		cy.visit( Cypress.env( 'testURL' ) + '/wp-admin/post-new.php?post_type=page' );
		cy.get( '.coblocks-layout-selector__sidebar' ).should( 'exist' );

		cy.get( '#editor' ).then( () => {
			cy.get( '.coblocks-layout-selector__sidebar' ).find( '.coblocks-layout-selector__add-button' ).click();
		} );

		cy.get( '.edit-post-more-menu' ).click();
		cy.get( '.components-menu-group' ).find( 'button' ).contains( 'Editor settings' ).click();
		cy.get( '.coblocks-modal__content' ).contains( 'Layout selector' ).click();

		cy.visit( Cypress.env( 'testURL' ) + '/wp-admin/post-new.php?post_type=page' );

		cy.get( '.coblocks-layout-selector__sidebar' ).should( 'not.exist' );
		cy.get( '.edit-post-more-menu' ).click();
		cy.get( '.components-menu-group' ).find( 'button' ).contains( 'Editor settings' ).click();
		cy.get( '.coblocks-modal__content' ).contains( 'Layout selector' ).click();

		cy.get( '.coblocks-layout-selector__sidebar' ).should( 'exist' );
		helpers.closeLayoutSelector();
	} );

	/**
	 * Test that the CoBlocks panel colors controls function as expected.
	 */
	it( 'Can control color settings as expected.', function() {
		helpers.addBlockToPost( 'coblocks/hero', true );
		cy.get( '.wp-block-button' ).first().click();
		helpers.openSettingsPanel( /(Background & Text Color|Color Settings)/i );

		cy.get( '.edit-post-more-menu' ).click();
		cy.get( '.components-menu-group' ).find( 'button' ).contains( 'Editor settings' ).click();

		if ( supportsGradients ) {
			// Gradient Panels
			cy.get( '.block-editor-color-gradient-control button' ).contains( 'Gradient' ).should( 'exist' );
			cy.get( '.coblocks-modal__content' ).contains( 'Gradient styles' ).click();
			cy.get( '.block-editor-color-gradient-control button' ).contains( 'Gradient' ).should( 'not.exist' );
			cy.get( '.coblocks-modal__content' ).contains( 'Gradient styles' ).click(); // Re-enable
		}

		// Custom Color Picker
		cy.get( 'button[aria-label="Custom color picker"]' ).should( 'exist' );
		cy.get( '.coblocks-modal__content' ).contains( 'Custom color pickers' ).click();
		cy.get( 'button[aria-label="Custom color picker"]' ).should( 'not.exist' );
		cy.get( '.coblocks-modal__content' ).contains( 'Custom color pickers' ).click();// Re-enable

		// Color Settings
		cy.get( '.components-panel__body-title' ).contains( /(Background & Text Color|Color Settings)/i ).should( 'exist' );
		cy.get( '.coblocks-modal__content' ).contains( 'Color settings' ).click();
		cy.get( '.components-panel__body-title' ).contains( /(Background & Text Color|Color Settings)/i ).should( 'not.exist' );
		cy.get( '.coblocks-modal__content' ).contains( 'Color settings' ).click(); // Re-enable

		cy.get( '.components-modal__header' ).find( 'button[aria-label="Close dialog"]' ).click();
	} );
} );
