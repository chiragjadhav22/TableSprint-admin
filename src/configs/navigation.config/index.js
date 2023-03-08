import { 
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM 
} from 'constants/navigation.constant'

const navigationConfig = [
	{
		key: 'My Folder',
		path: '',
		title: 'My Folder',
		translateKey: '',
		icon: '',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [],
		subMenu: [
			{
				key: 'home',
				path: '/home',
				title: 'Home',
				translateKey: 'nav.home',
				icon: 'home',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [],
				subMenu: []
			},
			{
			key: 'productManagement',
			path: '',
			title: 'Group Menu',
			translateKey: 'nav.productManagement.groupMenu',
			icon: 'home',
			type: NAV_ITEM_TYPE_TITLE,
			authority: [],
			subMenu: [
				{
					key: 'productManagement.productList',
					path: '/productManagement-productList',
					title: 'Products',
					translateKey: 'nav.productManagement.productList',
					icon: 'groupSingleMenu',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [],
					subMenu: []
				},
				{
					key: 'productManagement.category',
					path: '/productManagement-category',
					title: 'Category',
					translateKey: 'nav.productManagement.category',
					icon: 'groupSingleMenu',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [],
					subMenu: []
				}
			]
		}]
    },
	{
		key: 'My Worksheet',
		path: '/worksheet',
		title: 'My Worksheet',
		translateKey: '',
		icon: '',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [],
		subMenu: [
			{
				key: 'addNewWorksheet',
				path: '/workSheet',
				title: 'Add new worksheet',
				translateKey: 'nav.addNewWorksheet',
				icon: '',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [],
				subMenu: []
			},
			{
				key: 'viewWorksheet',
				path: '/viewWorksheet',
				title: 'View Worksheet',
				translateKey: 'nav.viewWorksheet',
				icon: '',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [],
				subMenu: []
			},
		]
			
	},
	{
		key: 'My Templates',
		path: '',
		title: 'My Templates',
		translateKey: '',
		icon: '',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [],
		subMenu: [
			
			]
	}

]

export default navigationConfig