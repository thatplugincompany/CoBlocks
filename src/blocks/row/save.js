/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundClasses, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
const { getColorClassName, InnerBlocks } = wp.blockEditor;

function Save( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		gutter,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
		focalPoint,
		hasParallax,
		backgroundType,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		paddingUnit,
		marginUnit,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	let classes;
	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-row-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `has-${ gutter }-gutter` ]: gutter,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
			'is-stacked-on-mobile': isStackedOnMobile,
		} );

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		color: textClass ? undefined : customTextColor,
		paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
		paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
		paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
		paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
		marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
		marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
		marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
	};

	return (
		<div className={ classes } data-columns={ columns } data-layout={ layout } >
			<div className={ innerClasses } style={ innerStyles }>
				{ BackgroundVideo( attributes ) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default Save;
