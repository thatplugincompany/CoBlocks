/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';
import svgs from './svgs';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { ResizableBox } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { domReady } from '@wordpress/dom-ready';

/**
 * Set and export block values.
 */
const MIN_ICON_SIZE = 32;
const MAX_ICON_SIZE = 400;

export { MIN_ICON_SIZE, MAX_ICON_SIZE };

const bundledIconsEnabled = ( typeof coblocksBlockData === 'undefined' || coblocksBlockData.bundledIconsEnabled );

class Edit extends Component {
	componentDidMount() {
		// Check if the icon is the default.
		if ( this.props.attributes.icon === '' ) {
			// Randomized the default icon when first added.
			let defaultIcons = [ 'aperture', 'gesture', 'scatter_plot', 'waves', 'blocks', 'coblocks', 'drafts', 'device_hub', 'marker' ];
			if ( ! bundledIconsEnabled && Object.keys( coblocksBlockData.customIcons ).length ) {
				defaultIcons = Object.keys( coblocksBlockData.customIcons );
			}
			const rand = defaultIcons[ Math.floor( Math.random() * defaultIcons.length ) ];
			this.props.setAttributes( { icon: rand } );
		}
	}

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			setAttributes,
			iconColor,
			isRTL,
		} = this.props;

		const {
			icon,
			contentAlign,
			width,
			borderRadius,
			padding,
			hasContentAlign,
		} = attributes;

		const classes = classnames( className, {
			[ `has-text-align-${ contentAlign }` ]: contentAlign,
		} );

		const innerClasses = classnames( 'wp-block-coblocks-icon__inner', {
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			'has-text-color': iconColor.color,
			[ iconColor.class ]: iconColor.class,
			'is-selected': isSelected,
		} );

		const innerStyles = {
			backgroundColor: backgroundColor.color,
			color: iconColor.color,
			fill: iconColor.color,
			borderRadius: borderRadius + 'px',
			padding: padding + 'px',
		};

		let iconStyle = 'outlined';

		if ( className.includes( 'is-style-filled' ) ) {
			iconStyle = 'filled';
		}

		const selectedIcon = icon ? svgs[ iconStyle ][ icon ] : svgs[ iconStyle ].logo;

		// Show or hide handles based on the contentAlign attribute.
		let showRightHandle = false;
		let showLeftHandle = false;

		if ( contentAlign === 'center' ) {
			// When the image is centered, show both handles.
			showRightHandle = true;
			showLeftHandle = true;
		} else if ( isRTL ) {
			// In RTL mode the image is on the right by default.
			// Show the right handle and hide the left handle only when it is aligned left.
			// Otherwise always show the left handle.
			if ( contentAlign === 'left' ) {
				showRightHandle = true;
			} else {
				showLeftHandle = true;
			}
		} else {
			// Show the left handle and hide the right handle only when the image is aligned right.
			// Otherwise always show the right handle.
			if ( contentAlign === 'right' ) {
				showLeftHandle = true;
			} else {
				showRightHandle = true;
			}
		}

		// If the parent block has set this block to not display alignment controls.
		// then we set them to true and hide them via CSS.
		if ( hasContentAlign === false ) {
			showRightHandle = true;
			showLeftHandle = true;
		}

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<div className={ classes }>
					<ResizableBox
						className={ innerClasses }
						style={ innerStyles }
						size={ { width } }
						minWidth={ padding ? MIN_ICON_SIZE + 28 : MIN_ICON_SIZE }
						maxWidth={ MAX_ICON_SIZE }
						enable={ {
							top: false,
							right: showRightHandle,
							bottom: true,
							left: showLeftHandle,
						} }
						lockAspectRatio
						onResizeStop={ ( _event, _direction, _elt, delta ) => {
							setAttributes( {
								height: parseInt( width + delta.width, 10 ),
								width: parseInt( width + delta.width, 10 ),
							} );
						} }
						onResizeStart={ () => {
							setAttributes( { iconSize: 'advanced' } );
						} }
						showHandle={ isSelected }
					>
						{ selectedIcon ? selectedIcon.icon : null }
					</ResizableBox>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	withSelect( ( select ) => {
		const { getEditorSettings } = select( 'core/editor' );
		const { isRTL } = getEditorSettings();

		return {
			isRTL,
		};
	} ),
] )( Edit );

if ( 'function' === typeof wp.domReady ) {
	wp.domReady( () => {
		// Remove the icon styles when bundled icons are disabled and no custom icon config exists.
		if ( ! bundledIconsEnabled && ! coblocksBlockData.customIconConfigExists ) {
			wp.blocks.unregisterBlockStyle( 'coblocks/icon', 'filled' );
			wp.blocks.unregisterBlockStyle( 'coblocks/icon', 'outlined' );
		}
	} );
}
