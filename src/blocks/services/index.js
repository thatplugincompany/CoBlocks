/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Services', 'coblocks' ),
	description: __( 'Add up to four columns of services to display.', 'coblocks' ),
	icon,
	keywords: [ __( 'features', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		reusable: false,
		html: false,
	},
	example: {
		attributes: {
			align: 'full',
		},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
