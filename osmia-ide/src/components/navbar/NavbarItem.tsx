import './NavbarItem.scss';

interface Props {
  active: boolean,
  onClick: () => void,
  onMiddleClick?: () => void,
  isScrollBarOn: boolean,
  children: React.ReactNode
};

const NavbarItem = ({active, onClick, onMiddleClick, isScrollBarOn, children}: Props) => {
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
  const adjustScrollBar = isScrollBarOn && !isFirefox;
  const clickIfChildNotClicked = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('close-tab')) {
      return;
    }
    onClick();
  };
  const onMiddleClickPressed = (e: React.MouseEvent) => {
    if (e.button === 1 && onMiddleClick) {
      onMiddleClick();
    }
  };
  return (
    <div
      onClick={clickIfChildNotClicked}
      onMouseDown={onMiddleClickPressed}
      className={
        "nav-item nav-file-item d-flex gap-1 text-nowrap p-2 pt-1 mt-2" +
        (adjustScrollBar ? ' pb-0' : '') +
        (active ? ' active' : '')
      }
    >
      {children}
    </div>
  );
};

export default NavbarItem;
