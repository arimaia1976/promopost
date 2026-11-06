import {
  IconChartBar,
  IconHeart,
  IconInstagramRed,
  IconRocket,
} from "@/components/icons";
import type { Home } from "@/types/content";

type Props = {
  beneficios: Home["beneficios"];
  imagem: Home["imagemBeneficios"];
};

/** Seção "Fortaleça sua marca / Venda mais / ..." com imagem à esquerda. */
export function Beneficios({ beneficios, imagem }: Props) {
  return (
    <div className="elementor-element elementor-element-d6510b2 e-grid e-con-boxed e-con e-parent">
      {" "}
      <div className="e-con-inner">
        {" "}
        <div className="elementor-element elementor-element-b27ea40 e-grid e-con-boxed e-con e-child">
          {" "}
          <div className="e-con-inner">
            {" "}
            <div className="elementor-element elementor-element-5d49d74 elementor-widget__width-inherit elementor-widget elementor-widget-image">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <img
                  loading="lazy"
                  width={imagem.largura}
                  height={imagem.altura}
                  src={imagem.src}
                  className="attachment-full size-full wp-image-1512"
                  alt=""
                  srcSet={imagem.srcSet || undefined}
                  sizes="(max-width: 767px) calc(100vw - 20px), 36vw"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-cc85d5f e-grid e-con-full e-con e-child">
          {" "}
          <div className="elementor-element elementor-element-af9c10e e-con-full e-flex e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-b477ae8 elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <IconHeart />{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> {beneficios[0].titulo} </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      {beneficios[0].texto}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-3b2f2fa e-con-full e-flex e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-f92ecfd elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <IconChartBar />{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> {beneficios[1].titulo} </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      {beneficios[1].texto}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-24365172 e-con-full e-flex e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-eac80fb elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <IconRocket />{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> {beneficios[2].titulo} </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      {beneficios[2].texto}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="elementor-element elementor-element-dbb916c e-con-full e-flex e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-6b986c2 elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <IconInstagramRed />{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> {beneficios[3].titulo} </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      {beneficios[3].texto}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
