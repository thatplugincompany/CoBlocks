/**
 * Internal dependencies
 */
import CoBlocksField from '../field';

function CoBlocksFieldTextarea( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, labelColor } = attributes;

	return (
		<CoBlocksField
			type="email"
			label={ label }
			labelColor={ labelColor }
			required={ required }
			setAttributes={ setAttributes }
			isSelected={ isSelected }
		/>
	);
}

export default CoBlocksFieldTextarea;
