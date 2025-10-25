import { PropertyOptions } from 'adminjs';

export const properties: Record<string, PropertyOptions> = {
  apiKeyHash: {
    isVisible: {
      list: false,
      edit: false,
      filter: false,
      show: false,
    },
  },
};
