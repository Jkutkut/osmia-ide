import './NavbarItem.scss';

interface Props {
  active: boolean,
  onClick: () => void,
  children: React.ReactNode
};

const NavbarItem = ({active, onClick, children}: Props) => {
  return (
    <div
      onClick={onClick}
      className={
        "nav-item nav-file-item d-flex gap-1 text-nowrap p-2 pt-1 mt-2" +
        (active ? ' active' : '')
      }
    >
      {children}
    </div>
  );
};

export default NavbarItem;
