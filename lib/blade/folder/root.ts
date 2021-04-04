import {ViewProps} from '../../common/model/view-props';
import {Blade} from '../common/model/blade';
import {FolderController} from './controller/folder';
import {FolderProps} from './view';

interface Config {
	blade: Blade;
	props: FolderProps;
	viewProps: ViewProps;

	expanded?: boolean;
	title?: string;
}

export class RootController extends FolderController {
	constructor(doc: Document, config: Config) {
		super(doc, {
			expanded: config.expanded,
			blade: config.blade,
			props: config.props,
			viewProps: config.viewProps,

			viewName: 'rot',
		});
	}
}
