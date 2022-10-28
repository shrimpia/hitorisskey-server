export type FontAwesomeIconType = string;

export type FontAwesomeSolidIconClassString = `fas fa-${FontAwesomeIconType}` | `fas fa-${FontAwesomeIconType} fa-fw`;
export type FontAwesomeRegularIconClassString = `far fa-${FontAwesomeIconType}` | `far fa-${FontAwesomeIconType} fa-fw`;
export type FontAwesomeBrandIconClassString = `fab fa-${FontAwesomeIconType}` | `fab fa-${FontAwesomeIconType} fa-fw`;

export type FontAwesomeIconClassString =
  | FontAwesomeSolidIconClassString
  | FontAwesomeRegularIconClassString
  | FontAwesomeBrandIconClassString
  ;

export type IconClassString = FontAwesomeIconClassString;

export type MenuItem = {
  iconClass: IconClassString;
  label: string;
  danger?: boolean;
  disabled?: boolean;
  href?: string;
  to?: string;
  onClick?: () => void;
};

export type MenuGroup = {
  title?: string;
  items: MenuItem[];
};

export type MenuDefinition = (MenuItem | MenuGroup)[];
