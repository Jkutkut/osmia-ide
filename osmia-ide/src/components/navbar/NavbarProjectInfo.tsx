import {version, repository} from '../../../package.json';
import {useTranslation} from 'react-i18next';
import './NavbarProjectInfo.scss';
import GitHubLogo from '../../assets/GitHubLogo';

const NavbarProjectInfo = () => {
  const {t} = useTranslation();

  return <div className="d-flex gap-3 pt-2 pb-2">
    <a className="nav-link" href={repository.url} target='_blank' rel="noreferrer">
      <span className="nav-link text-nowrap">
        {t('name')} {version}
      </span>
    </a>
    <a className="nav-link" href="https://github.com/jkutkut" target="_blank" rel="noreferrer">
      <span className="desktop-only me-2">
        {t('madeBy', {author: 'jkutkut'})}
      </span>
      <GitHubLogo />
    </a>
  </div>;
};

export default NavbarProjectInfo;
