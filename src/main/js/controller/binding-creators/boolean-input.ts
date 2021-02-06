import {InputParams} from '../../api/types';
import {InputBinding} from '../../binding/input';
import {CompositeConstraint} from '../../constraint/composite';
import {Constraint} from '../../constraint/constraint';
import {ListConstraint} from '../../constraint/list';
import {ConstraintUtil} from '../../constraint/util';
import * as BooleanConverter from '../../converter/boolean';
import {InputValue} from '../../model/input-value';
import {ViewModel} from '../../model/view-model';
import {CheckboxInputController} from '../input/checkbox';
import {ListInputController} from '../input/list';
import * as UiUtil from '../ui-util';
import {InputBindingPlugin} from './input-binding-plugin';

function createConstraint(params: InputParams): Constraint<boolean> {
	const constraints: Constraint<boolean>[] = [];

	if ('options' in params && params.options !== undefined) {
		constraints.push(
			new ListConstraint({
				options: UiUtil.normalizeInputParamsOptions(
					params.options,
					BooleanConverter.fromMixed,
				),
			}),
		);
	}

	return new CompositeConstraint({
		constraints: constraints,
	});
}

function createController(document: Document, value: InputValue<boolean>) {
	const c = value.constraint;

	if (c && ConstraintUtil.findConstraint(c, ListConstraint)) {
		return new ListInputController(document, {
			viewModel: new ViewModel(),
			stringifyValue: BooleanConverter.toString,
			value: value,
		});
	}

	return new CheckboxInputController(document, {
		viewModel: new ViewModel(),
		value: value,
	});
}

/**
 * @hidden
 */
export const BooleanInputPlugin: InputBindingPlugin<boolean, boolean> = {
	createBinding: (params) => {
		const initialValue = params.target.read();
		if (typeof initialValue !== 'boolean') {
			return null;
		}

		const value = new InputValue(false, createConstraint(params.inputParams));
		return new InputBinding({
			reader: BooleanConverter.fromMixed,
			target: params.target,
			value: value,
			writer: (v) => v,
		});
	},
	createController: (params) => {
		return createController(params.document, params.binding.value);
	},
};
