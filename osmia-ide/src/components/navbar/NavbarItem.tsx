import './NavbarItem.scss';

interface Props {
  active: boolean,
  onClick: () => void,
  children: React.ReactNode
};

const NavbarItem = ({active, onClick, children}: Props) => {
  const clickIfChildNotClicked = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('close-tab')) {
      return;
    }
    onClick();
  };
  return (
    <div
      onClick={clickIfChildNotClicked}
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
