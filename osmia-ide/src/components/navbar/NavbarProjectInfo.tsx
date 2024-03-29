import {version, repository} from '@/package.json';
import {useTranslation} from 'react-i18next';
import GitHubLogo from '@/src/assets/GitHubLogo';

const NavbarProjectInfo = () => {
  const {t} = useTranslation();

  return (
    <div className="d-flex gap-3">
      <a className="nav-link tablet-desktop-only" href={repository.url} target='_blank' rel="noreferrer">
        <span className="nav-link text-nowrap">
          {t('name')} {version}
        </span>
      </a>
      <a className="nav-link d-flex" href="https://github.com/jkutkut" target="_blank" rel="noreferrer">
        <span className="desktop-only me-2 text-nowrap">
          {t('madeBy', {author: 'jkutkut'})}
        </span>
        <GitHubLogo />
      </a>
    </div>
  );
};

export default NavbarProjectInfo;
