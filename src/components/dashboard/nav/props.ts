import { type SVGProps } from "react";
import { type User } from "@prisma/client";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  classNames: (...classes: string[]) => string;
  navigation: {
    id: number;
    name: string;
    href: string;
    icon: (
      props: SVGProps<SVGSVGElement> & {
        title?: string | undefined;
        titleId?: string | undefined;
      }
    ) => JSX.Element;
    current: boolean;
  }[];
  navbarState: number;
  setNavbarState: (val: number) => void;
  user: User;
};

export type { Props };
