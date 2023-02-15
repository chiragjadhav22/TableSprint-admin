import { 
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM 
} from 'constants/navigation.constant'

const navigationConfig = [
	{
		key: 'Biofuel',
		path: '',
		title: '',
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
    }

]

export default navigationConfig