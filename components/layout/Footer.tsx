import { IconInstagram, IconPromoPin } from "@/components/icons";
import type { Globals } from "@/types/content";
import { MenuList } from "./MenuList";

type Props = { globals: Globals; current: string };

/** Rodapé: versão celular (272b472) e versão tablet/desktop (0e07b14), como no original. */
export function Footer({ globals, current }: Props) {
  const { instagram, copyright, menuRodape } = globals;
  return (
    <div
      role="contentinfo"
      data-elementor-type="footer"
      className="elementor elementor-1367 elementor-location-footer"
    >
      {" "}
      <div className="elementor-element elementor-element-272b472 e-con-full elementor-hidden-desktop elementor-hidden-tablet e-flex e-con e-parent">
        {" "}
        <div className="elementor-element elementor-element-fa59646 e-con-full e-flex e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-85e10eb elementor-hidden-desktop elementor-hidden-tablet elementor-widget elementor-widget-image">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <a href="/">
                {" "}
                <img
                  width="329"
                  height="326"
                  src="/images/PromoPost_Color_Grad-1.svg"
                  className="attachment-large size-large wp-image-298"
                  alt="PromoPost"
                />{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-ce6daf6 e-con-full e-flex e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-b52c33e elementor-nav-menu--dropdown-none elementor-nav-menu__align-center elementor-hidden-desktop elementor-hidden-tablet elementor-widget elementor-widget-nav-menu">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <nav
                aria-label="Menu"
                className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-vertical e--pointer-underline e--animation-fade"
              >
                {" "}
                <MenuList
                  id="menu-1-b52c33e"
                  className="elementor-nav-menu sm-vertical"
                  items={menuRodape}
                  current={current}
                />{" "}
              </nav>{" "}
              <nav
                className="elementor-nav-menu--dropdown elementor-nav-menu__container"
                aria-hidden="true"
              >
                {" "}
                <MenuList
                  id="menu-2-b52c33e"
                  className="elementor-nav-menu sm-vertical"
                  items={menuRodape}
                  current={current}
                  dropdown
                />{" "}
              </nav>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-640285b elementor-hidden-mobile elementor-widget-divider--view-line elementor-widget elementor-widget-divider">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <div className="elementor-divider">
                {" "}
                <span className="elementor-divider-separator"> </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-a0296e0 e-con-full e-flex e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-6dc8c81 e-con-full elementor-hidden-desktop elementor-hidden-tablet e-flex e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-e837c08 elementor-view-default elementor-widget elementor-widget-icon">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-wrapper">
                  {" "}
                  <a className="elementor-icon" href={instagram}>
                    {" "}
                    <IconPromoPin />{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-206abc3 elementor-view-default elementor-widget elementor-widget-icon">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-wrapper">
                  {" "}
                  <a className="elementor-icon" href={instagram}>
                    {" "}
                    <IconInstagram />{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-3fa7163 elementor-widget elementor-widget-image">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <img
                  width="300"
                  height="300"
                  src="/images/qr_PP-copy-300x300.webp"
                  className="attachment-medium size-medium wp-image-1682"
                  alt="QR Code do Instagram da PromoPost"
                  sizes="150px"
                  srcSet="/images/qr_PP-copy-300x300.webp 300w, /images/qr_PP-copy-150x150.webp 150w, /images/qr_PP-copy.webp 633w"
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-cc8c29b elementor-widget elementor-widget-heading">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <h2 className="elementor-heading-title elementor-size-default">
                  <a href={instagram}>Segue a Gente</a>
                </h2>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-c5dce98 elementor-widget elementor-widget-heading">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <h2 className="elementor-heading-title elementor-size-default">
                  {copyright}
                </h2>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-08fec3f e-con-full e-grid elementor-hidden-mobile e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-b144a2c elementor-widget elementor-widget-heading">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <h2 className="elementor-heading-title elementor-size-default">
                  <a href={instagram}>Segue e gente no insta</a>
                </h2>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-6307d5b elementor-view-default elementor-widget elementor-widget-icon">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-wrapper">
                  {" "}
                  <a className="elementor-icon" href={instagram}>
                    {" "}
                    <IconInstagram />{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-5a4e351 elementor-widget elementor-widget-image">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <img
                  width="300"
                  height="300"
                  src="/images/qr_promopost_insta-1.svg"
                  className="attachment-medium size-medium wp-image-1565"
                  alt="QR Code do Instagram da PromoPost"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="elementor-element elementor-element-0e07b14 e-con-full elementor-hidden-mobile e-flex e-con e-parent">
        {" "}
        <div className="elementor-element elementor-element-bb66438 e-con-full e-flex e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-dd4cdcd elementor-widget elementor-widget-image">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <a href="/">
                {" "}
                <img
                  width="172"
                  height="94"
                  src="/images/PP_Logo_Vermelho.svg"
                  className="attachment-large size-large wp-image-94"
                  alt="PromoPost"
                />{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-3a51ceb e-con-full e-flex e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-da450c5 elementor-nav-menu--dropdown-none elementor-nav-menu__align-center elementor-widget elementor-widget-nav-menu">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <nav
                aria-label="Menu"
                className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade"
              >
                {" "}
                <MenuList
                  id="menu-1-da450c5"
                  className="elementor-nav-menu"
                  items={menuRodape}
                  current={current}
                />{" "}
              </nav>{" "}
              <nav
                className="elementor-nav-menu--dropdown elementor-nav-menu__container"
                aria-hidden="true"
              >
                {" "}
                <MenuList
                  id="menu-2-da450c5"
                  className="elementor-nav-menu"
                  items={menuRodape}
                  current={current}
                  dropdown
                />{" "}
              </nav>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-b848d55 elementor-hidden-mobile elementor-widget-divider--view-line elementor-widget elementor-widget-divider">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <div className="elementor-divider">
                {" "}
                <span className="elementor-divider-separator"> </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-1aa2c00 elementor-widget elementor-widget-heading">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <h2 className="elementor-heading-title elementor-size-default">
                {copyright}
              </h2>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-4a60d25 e-con-full e-flex e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-88bb4ee e-con-full e-grid elementor-hidden-mobile e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-57aabe3 elementor-widget elementor-widget-heading">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <h2 className="elementor-heading-title elementor-size-default">
                  <a href={instagram}>Segue a Gente</a>
                </h2>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-c0a0a43 elementor-view-default elementor-widget elementor-widget-icon">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-wrapper">
                  {" "}
                  <a className="elementor-icon" href={instagram}>
                    {" "}
                    <IconInstagram />{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-fd2726d elementor-widget elementor-widget-image">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <img
                  width="300"
                  height="300"
                  src="/images/qr_PP-copy-300x300.webp"
                  className="attachment-medium size-medium wp-image-1682"
                  alt="QR Code do Instagram da PromoPost"
                  sizes="(max-width: 767px) 150px, (max-width: 1024px) 97px, 11vw"
                  srcSet="/images/qr_PP-copy-300x300.webp 300w, /images/qr_PP-copy-150x150.webp 150w, /images/qr_PP-copy.webp 633w"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
