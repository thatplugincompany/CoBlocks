/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Textarea', 'coblocks' ),
	description: __( 'A text box for longer responses.', 'coblocks' ),
	icon,
	keywords: [ __( 'Textarea', 'coblocks' ), 'textarea', __( 'Multiline text', 'coblocks' ) ],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };
