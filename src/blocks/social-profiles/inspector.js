/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const {
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	withFallbackStyles,
	CheckboxControl,
	TextControl,
} = wp.components;

// Text control docs : https://github.com/WordPress/gutenberg/tree/master/packages/components/src/text-control
/**
 * Inspector controls
 */
class Inspector extends Component {
	getHasColorsHelp( checked ) {
		return checked ?
			__( 'Share button colors are enabled.' ) :
			__( 'Toggle to use official colors from each social media platform.' );
	}

	render() {
		const {
			className,
			attributes,
			setAttributes,
			setState,
			setBackgroundColor,
			setTextColor,
			fallbackTextColor,
			backgroundColor,
			textColor,
			fallbackBackgroundColor,
		} = this.props;

		const {
			hasColors,
			linkedin,
			pinterest,
			borderRadius,
			tumblr,
			twitter,
			size,
			reddit,
			email,
			google,
			iconSize,
			padding,
			houzz,
			yelp,
			youtube,
			instagram,
			facebook,
		} = attributes;

		const options = [
			{ value: 'sml', label: __( 'Small' ) },
			{ value: 'med', label: __( 'Medium' ) },
			{ value: 'lrg', label: __( 'Large' ) },
		];

		const defaultColors = [
			{
				value: backgroundColor.color,
				onChange: setBackgroundColor,
				label: __( 'Background Color' ),
			},
			{
				value: textColor.color,
				onChange: setTextColor,
				label: __( 'Text Color' ),
			},
		];

		const maskColors = [
			{
				value: backgroundColor.color,
				onChange: setBackgroundColor,
				label: __( 'Background Color' ),
			},
		];

		const isMaskStyle = includes( className, 'is-style-mask' );
		const isCircularStyle = includes( className, 'is-style-circular' );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Settings' ) }>
						<ToggleControl
							label={ __( 'Social Colors' ) }
							checked={ !! hasColors }
							onChange={ () => setAttributes( { hasColors: ! hasColors } ) }
							help={ this.getHasColorsHelp }
						/>
						{ ! isMaskStyle && ! isCircularStyle && (
							<RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ borderRadius }
								onChange={ value => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 50 }
							/>
						) }
						{ ( isMaskStyle || isCircularStyle ) && (
							<RangeControl
								label={ __( 'Icon Size' ) }
								value={ iconSize }
								onChange={ value => setAttributes( { iconSize: value } ) }
								min={ 16 }
								max={ 60 }
							/>
						) }
						{ isCircularStyle && (
							<RangeControl
								label={ __( 'Circle Size' ) }
								value={ padding }
								onChange={ value => setAttributes( { padding: value } ) }
								min={ 10 }
								max={ 50 }
							/>
						) }
						{ ! isMaskStyle && ! isCircularStyle && (
							<SelectControl
								label={ __( 'Button Size' ) }
								value={ size }
								options={ options }
								onChange={ value => setAttributes( { size: value } ) }
								className="components-coblocks-inspector__social-button-size"
							/>
						) }
						<div className="components-social-icons-list">
							<p className="components-social-icons-list__label">
								{ __( 'Icons' ) }
							</p>
							<TextControl label="Facebook" value={ facebook } />
							<TextControl label="Twitter" value={ twitter } />
							<TextControl label="Instagram" value={ instagram } />
							<TextControl label="Pintrest" value={ pinterest } />
							<TextControl label="Linkedin" value={ linkedin } />
							<TextControl label="YouTube" value={ youtube } />
							<TextControl label="Yelp" value={ yelp } />
							<TextControl label="Houze" value={ houzz } />
						</div>
					</PanelBody>

					{ ! hasColors && (
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							initialOpen={ false }
							colorSettings={ ! isMaskStyle ? defaultColors : maskColors }
						>
							{ ! isMaskStyle && (
								<ContrastChecker
									{ ...{
										isLargeText: true,
										textColor: textColor.color,
										backgroundColor: backgroundColor.color,
										fallbackBackgroundColor,
										fallbackTextColor,
									} }
								/>
							) }
						</PanelColorSettings>
					) }
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [ applyWithColors ] )( Inspector );
