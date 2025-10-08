import { PropertyOptions } from 'adminjs';

export const properties: Record<string, PropertyOptions> = {
  password: {
    type: 'password',
    isVisible: {
      list: false,
      edit: true,
      filter: false,
      show: false,
    },
  },
};
