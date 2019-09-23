/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

const save = ( { attributes, className } ) => {
	const {
		autoPlay,
		autoPlaySpeed,
		draggable,
		freeScroll,
		gridSize,
		gutter,
		gutterMobile,
		height,
		images,
		pageDots,
		pauseHover,
		prevNextButtons,
		primaryCaption,
		alignCells,
		thumbnails,
		responsiveHeight,
	} = attributes;

	const innerClasses = classnames(
		'is-cropped',
		...GalleryClasses( attributes ), {
			'has-horizontal-gutter': gutter > 0,

		}
	);

	const flickityClasses = classnames(
		'has-carousel',
		`has-carousel-${ gridSize }`, {
			'has-aligned-cells': alignCells,
		}
	);

	const flickityStyles = {
		height: height ? height + 'px' : undefined,
	};

	const figureClasses = classnames(
		'coblocks-gallery--figure', {
			[ `has-margin-left-${ gutter }` ]: gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ]: gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const flickityOptions = {
		autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
		draggable: draggable,
		pageDots: pageDots,
		prevNextButtons: prevNextButtons,
		wrapAround: true,
		cellAlign: alignCells ? 'left' : 'center',
		pauseAutoPlayOnHover: pauseHover,
		freeScroll: freeScroll,
		arrowShape: {
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20,
		},
		thumbnails: thumbnails,
		responsiveHeight: responsiveHeight,
	};

	const captionClasses = classnames(
		'coblocks-gallery--caption',
		'coblocks-gallery--primary-caption', {}
	);

	// Return early if there are no images.
	if ( images.length <= 0 ) {
		return;
	}

	return (
		<div className={ className }>
			<div className={ innerClasses }>
				<div
					className={ flickityClasses }
					style={ flickityStyles }
					data-flickity={ JSON.stringify( flickityOptions ) }
				>
					{ images.map( ( image ) => {
						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

						return (
							<div key={ image.id || image.url } className="coblocks-gallery--item">
								<figure className={ figureClasses }>
									{ img }
								</figure>
							</div>
						);
					} ) }
				</div>
			</div>
			{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } /> }
		</div>
	);
};

export default save;
