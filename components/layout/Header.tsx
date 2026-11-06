import type { Globals } from "@/types/content";
import { NavMenu } from "./NavMenu";

type Props = { globals: Globals; current: string };

const NAV_CLASS =
  "elementor-nav-menu__align-center elementor-nav-menu--stretch elementor-nav-menu--dropdown-mobile elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger elementor-widget";

export function Header({ globals, current }: Props) {
  const [anuncie, cadastro] = globals.botoesTopo;
  return (
    <div
      role="banner"
      data-elementor-type="header"
      data-elementor-id="1363"
      className="elementor elementor-1363 elementor-location-header"
    >
      <div className="elementor-element elementor-element-e08d06c e-flex e-con-boxed e-con e-parent e-lazyloaded">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-62e9233 e-flex e-con-boxed e-con e-child">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-859eb7d e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-0e2885d elementor-widget elementor-widget-theme-site-logo elementor-widget-image">
                  <div className="elementor-widget-container">
                    <a href="/">
                      <img
                        width={412}
                        height={97}
                        src={globals.logo.src}
                        className="attachment-full size-full wp-image-1274"
                        alt={globals.logo.alt}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-888f851 e-con-full elementor-hidden-mobile e-flex e-con e-child">
                <NavMenu
                  widgetId="3a11820"
                  widgetClass={`${NAV_CLASS} elementor-widget-global elementor-global-630 elementor-widget-nav-menu`}
                  items={globals.menuPrincipal}
                  current={current}
                />
              </div>
              <div className="elementor-element elementor-element-5895847 e-con-full elementor-hidden-desktop elementor-hidden-tablet e-flex e-con e-child">
                <NavMenu
                  widgetId="b08d670"
                  widgetClass={`${NAV_CLASS} elementor-widget-nav-menu`}
                  items={globals.menuMobile}
                  current={current}
                />
              </div>
              <div className="elementor-element elementor-element-18aa7b5 e-con-full elementor-hidden-mobile e-flex e-con e-child">
                <div className="elementor-element elementor-element-9e30277 elementor-button-info elementor-widget elementor-widget-button">
                  <div className="elementor-widget-container">
                    <div className="elementor-button-wrapper">
                      <a
                        className="elementor-button elementor-button-link elementor-size-sm"
                        href={anuncie.href}
                      >
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-text">
                            {anuncie.label}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-96cf202 elementor-widget elementor-widget-button">
                  <div className="elementor-widget-container">
                    <div className="elementor-button-wrapper">
                      <a
                        className="elementor-button elementor-button-link elementor-size-sm"
                        href={cadastro.href}
                      >
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-text">
                            {cadastro.label}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
