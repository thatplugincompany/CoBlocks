/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { ButtonGroup, Button, BaseControl, PanelRow } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

class SizeControl extends Component {
	constructor() {
		super( ...arguments );
		this.getSizes = this.getSizes.bind( this );
	}

	componentDidUpdate() {
		const { align, columns } = this.props.attributes;

		// Prevent small and medium column grid sizes without wide or full alignments.
		if ( align === undefined ) {
			if ( columns === 'med' || columns === 'sml' ) {
				this.props.setAttributes( {
					gridSize: 'xlrg',
				} );
			}
		}
	}

	getSizes() {
		const { type, wideControlsEnabled } = this.props;
		const { align } = this.props.attributes;

		const defaultSizes = [
			{
				shortName: 'None',
				size: 'none',
			},
			{
				shortName: 'S',
				size: 'sml',
			},
			{
				shortName: 'M',
				size: 'med',
			},
			{
				shortName: 'L',
				size: 'lrg',
			},
		];

		const standardSizes = [
			{
				shortName: ( wideControlsEnabled === true && 'wide' === align ) || 'full' === align ? 'L' : __( 'Large', 'coblocks' ),
				size: 'lrg',
			},
			{
				shortName: ( wideControlsEnabled === true && 'wide' === align ) || 'full' === align ? 'XL' : __( 'Extra Large', 'coblocks' ),
				size: 'xlrg',
			},
		];

		const wideSizes = [
			{
				shortName: 'M',
				size: 'med',
			},
		];

		const fullSizes = [
			{
				shortName: 'S',
				size: 'sml',
			},
		];

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'smlx' === type ) {
			const standardSizes = [
				{
					shortName: 'S',
					size: 'sml',
				},
				{
					shortName: 'M',
					size: 'med',
				},
				{
					shortName: 'L',
					size: 'lrg',
				},
				{
					shortName: 'XL',
					size: 'xlrg',
				},
			];

			return standardSizes;
		}

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'reverse-grid' === type ) {
			const standardSizes = [
				{
					shortName: ( wideControlsEnabled === true && 'wide' === align ) || 'full' === align ? 'S' : __( 'Small', 'coblocks' ),
					size: 'small',
				},
				{
					shortName: ( wideControlsEnabled === true && 'wide' === align ) || 'full' === align ? 'M' : __( 'Medium', 'coblocks' ),
					size: 'medium',
				},
			];

			const wideSizes = [
				{
					shortName: 'L',
					size: 'large',
				},
			];

			const fullSizes = [
				{
					shortName: 'XL',
					size: 'huge',
				},
			];

			if ( 'wide' === align ) {
				return standardSizes.concat( wideSizes );
			} else if ( 'full' === align ) {
				return standardSizes.concat( wideSizes ).concat( fullSizes );
			}
			return standardSizes;
		}

		// If this is a standard size settings, not a complex grid sizer.
		if ( 'grid' !== type ) {
			return defaultSizes;
		}

		if ( wideControlsEnabled === true && 'wide' === align ) {
			return wideSizes.concat( standardSizes );
		} else if ( wideControlsEnabled === true && 'full' === align ) {
			return fullSizes.concat( wideSizes ).concat( standardSizes );
		}
		return standardSizes;
	}

	render() {
		const {
			onChange,
			value,
			resetValue = undefined,
			label,
			reset = true,
		} = this.props;

		return (
			<BaseControl label={ label }>
				<PanelRow>
					<ButtonGroup aria-label={ __( 'Select Size', 'coblocks' ) }>
						{ map( this.getSizes(), ( { size, shortName } ) => (
							<Button
								key={ size }
								isLarge
								isPrimary={ value === size }
								aria-pressed={ value === size }
								onClick={ () => onChange( size ) }
							>
								{ shortName }
							</Button>
						) ) }
					</ButtonGroup>
					{ reset &&
						<Button
							isSmall
							onClick={ () => onChange( resetValue ) }
						>
							{ __( 'Reset', 'coblocks' ) }
						</Button>
					}
				</PanelRow>
			</BaseControl>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
] )( SizeControl );
