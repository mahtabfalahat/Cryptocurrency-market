import { useTranslation } from 'react-i18next';
import './style.scss';

const Loading = () => {
    const { t } = useTranslation();

    return (
        <div className="LoaderContainer">
            <div className="Loader">{t('Loading')}</div>
        </div>
    );
};

export default Loading;
