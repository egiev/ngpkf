import { Box, Button, H1, Icon, Link, Text } from '@adminjs/design-system';
import { useCurrentAdmin } from 'adminjs';

const DashboardPage = () => {
  const [currentAdmin] = useCurrentAdmin();

  const isSuperUser = currentAdmin && currentAdmin.isSuperUser;

  console.log({ isSuperUser });

  return (
    <Box variant="white" flex flexDirection="column" p="x2" m="default">
      <H1>👋 Welcome to the Admin Panel!</H1>

      <Text my="lg">
        This is your custom dashboard. Use the sidebar on the left to navigate through the available resources (e.g.,
        users, groups, and permissions).
      </Text>

      {isSuperUser && (
        <Box flex mt="xl">
          <Link href="/admin/resources/AuthUserEntity" mr="lg">
            <Button variant="primary">
              <Icon icon="User" mr="sm" />
              Manage Users
            </Button>
          </Link>
          <Link href="/admin/resources/AuthGroupEntity">
            <Button variant="secondary">
              <Icon icon="Users" mr="sm" />
              Manage Groups
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
