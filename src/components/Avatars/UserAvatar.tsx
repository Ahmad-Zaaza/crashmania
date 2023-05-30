import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "ui";

interface IUserAvatarProps {
  src: string;
  children: React.ReactNode;
}

const UserAvatar = ({ children, src }: IUserAvatarProps) => {
  return (
    <Avatar size="large">
      <AvatarImage src={src} />
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
