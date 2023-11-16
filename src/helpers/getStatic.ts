import i18nextConfig from '../../next-i18next.config';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticPaths, GetStaticProps} from 'next';

export const getI18nPaths = (): { params: { locale: string } }[] =>
  i18nextConfig.i18n.locales.map(locale => ({
    params: {
      locale: locale,
    },
  }));

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getI18nPaths(),
  fallback: false,
});

export const getI18nProps = async (
  ctx: { params?: { locale?: string } },
  ns: string[] = ['common']
) => {
  const locale = ctx?.params?.locale || i18nextConfig.i18n.defaultLocale;
  return {
    ...(await serverSideTranslations(locale, ns)),
  };
};

export const makeStaticProps = (ns: string[] = []): GetStaticProps => async (context) => ({
  props: await getI18nProps(context, ns),
});
