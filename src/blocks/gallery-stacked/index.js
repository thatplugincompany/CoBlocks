/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	title: __( 'Stacked', 'coblocks' ),
	description: __( 'Display multiple images in an single column stacked gallery.', 'coblocks' ),
	icon,
	keywords: [ __( 'gallery', 'coblocks' ), __( 'photos', 'coblocks' ), __( 'lightbox', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full', 'left', 'center', 'right' ],
		html: false,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			fullwidth: false,
			gutter: 5,
			images: [
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-6.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-2.jpg' },
			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, icon, metadata, settings };
