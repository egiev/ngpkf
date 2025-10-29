import { Navigation } from '@adminjs/design-system';
import { useNavigationResources, useTranslation, ViewHelpers } from 'adminjs';
import { useLocation, useNavigate } from 'react-router';

const SidebarResourceSection = ({ resources }) => {
  const elements = useNavigationResources(resources);
  const { translateLabel } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const h = new ViewHelpers();

  const dashboard = {
    icon: 'Home',
    label: translateLabel('dashboard'),
    onClick: () => {
      navigate(h.dashboardUrl());
    },
    isSelected: location.pathname === h.dashboardUrl(),
  };

  elements.unshift(dashboard);

  const updatedElements = elements.map((el) => {
    if (el.label === 'Datasets') {
      return {
        ...el,
        isSelected: location.pathname.includes('resources/Dataset/actions/stats') ? false : el.isSelected,
      };
    }

    return el;
  });

  return <Navigation label={translateLabel('navigation')} elements={updatedElements} />;
};

export default SidebarResourceSection;
