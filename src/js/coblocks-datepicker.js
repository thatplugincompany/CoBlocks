import jQuery from 'jquery';

jQuery( function( $ ) {
	$( '.coblocks-form input.coblocks-field--date' ).datepicker( {
		beforeShow() {
			$( '#ui-datepicker-div' ).addClass( 'coblocks' );
		},
	} );
} );
