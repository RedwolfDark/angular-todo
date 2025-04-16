import { Label, Priority } from '@core';
import { NavbarItem } from '../navbar-items/navbar-items.component';

export const MENUITEMS: NavbarItem[] = [
  {
    title: 'All',
    id: 'all',
    href: 'tasks',
    icon: 'people',
    is_active: true,
  },
  {
    title: 'Priority',
    id: 'priority',
    href: '#',
    icon: 'label_important',
    sub_items: [
      {
        title: 'LOW',
        id: `${Priority.LOW}`,
        href: `priority/${Priority.LOW}`,
        icon: 'circle',
        is_active: false,
      },
      {
        title: 'MEDIUM',
        id: `${Priority.MEDIUM}`,
        href: `priority/${Priority.MEDIUM}`,
        icon: 'circle',
        is_active: false,
      },
      {
        title: 'HIGH',
        id: `${Priority.HIGH}`,
        href: `priority/${Priority.HIGH}`,
        icon: 'circle',
        is_active: false,
      },
    ],
    is_active: false,
  },
  {
    title: 'Today',
    href: 'today',
    id: 'today',
    icon: 'event',
    is_active: false,
  },
  {
    title: 'Complete',
    href: 'complete',
    id: 'complete',
    icon: 'task_alt',
    is_active: false,
  },
  {
    title: 'Labels',
    href: '#',
    special_class: 'labels',
    id: 'label',
    icon: 'label',
    sub_items: [
      {
        title: Label.CSS,
        href: `label/${Label.CSS}`,
        id: `${Label.CSS}`,
        icon: 'label_outline',
        is_active: false,
      },
      {
        title: Label.HTML,
        href: `label/${Label.HTML}`,
        id: `${Label.HTML}`,
        icon: 'label_outline',
        is_active: false,
      },
      {
        title: Label.NODE_JS,
        href: `label/${Label.NODE_JS}`,
        id: `${Label.NODE_JS}`,
        icon: 'label_outline',
        is_active: false,
      },
      {
        title: Label.JQUERY,
        href: `label/${Label.JQUERY}`,
        id: `${Label.JQUERY}`,
        icon: 'label_outline',
        is_active: false,
      },
    ],
    is_active: false,
  },
];
