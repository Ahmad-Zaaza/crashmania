import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "ui";
import { useUser } from "../../hooks/queries/user/userQueries";

const UserDropdown = () => {
  const { data } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button theme="neutral" variant="ghost">
          {data?.data.user.firstName} {data?.data.user.lastName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-paper">
        <DropdownMenuLabel>
          Welcome {data?.data.user.firstName}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
