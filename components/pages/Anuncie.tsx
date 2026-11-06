import type { Anunciante, Banner } from "@/types/content";
import { Carousel } from "@/components/blocks/Carousel";
import { AnuncianteCard } from "@/components/blocks/AnuncianteCard";

/** Conteúdo da página "Anuncie" (estrutura e classes do original, para o CSS de referência). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PaginaAnuncie({
  apoio,
  destaque,
  texto,
}: {
  apoio: Banner[];
  destaque: Anunciante[];
  texto: string;
}) {
  return (
    <main
      id="content"
      data-elementor-type="wp-page"
      data-elementor-id="585"
      className="elementor elementor-585"
    >
      <div className="elementor-element elementor-element-723a358 e-flex e-con-boxed e-con e-parent e-lazyloaded">
        {" "}
        <div className="e-con-inner">
          {" "}
          <div className="elementor-element elementor-element-da6a3b5 elementor-widget elementor-widget-image">
            {" "}
            <div className="elementor-widget-container">
              {" "}
              <img
                fetchPriority="high"
                width="1400"
                height="410"
                src="/images/03.anuncie_1400x410-copy-1.webp"
                className="attachment-full size-full wp-image-1528"
                alt=""
                srcSet="/images/03.anuncie_1400x410-copy-1.webp 1400w, /images/03.anuncie_1400x410-copy-1-300x88.webp 300w, /images/03.anuncie_1400x410-copy-1-1024x300.webp 1024w, /images/03.anuncie_1400x410-copy-1-768x225.webp 768w"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-90b835a e-con-full e-flex e-con e-parent e-lazyloaded">
        {" "}
        <div className="elementor-element elementor-element-0181644 elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h1 className="elementor-heading-title elementor-size-default">
              Anuncie
            </h1>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-325c00d elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h3 className="elementor-heading-title elementor-size-default">
              PromoPost Ads
            </h3>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-e9cae14 elementor-widget elementor-widget-text-editor">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <p>
              Lojas, Restaurantes, Produtos, Comércios, Serviços, Saúde, Beleza,
              Shoppings, Lançamentos, Novidades …mais!
            </p>
            <p>
              Traga sua marca para nossa plataforma e seja visto pelo seleto
              público que mora e trabalha em Alphaville e Região; são mais de
              91.800 residentes e um fluxo diário de aproximadamente 240 mil
              pessoas!
            </p>
            <p>É muita gente!!!</p>
            <p>
              Na PromoPost Alphaville seus Posts aparecem no nosso Instagram
              conforme o planejamento das suas campanhas, ficam em destaque no
              nosso site e atingem o público certo que vive, consome por aqui e
              que adora Promoções!
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-4108efb e-grid e-con-boxed e-con e-child">
          {" "}
          <div className="e-con-inner">
            {" "}
            <div className="elementor-element elementor-element-c5d2551 elementor-widget__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <svg
                        aria-hidden="true"
                        className="e-font-icon-svg e-fas-rocket"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z" />
                      </svg>{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> Amplie seu alcance </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      Apareça para mais de 330 mil pessoas que moram, trabalham,
                      vivem e consomem diariamente em Alphaville e Região!{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-eb2e960 elementor-widget__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <svg
                        aria-hidden="true"
                        className="e-font-icon-svg e-fas-chart-line"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z" />
                      </svg>{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> Venda mais </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      Divulgue e atraia mais clientes com suas promoções,
                      descontos, ofertas, benefícios, prêmios, sorteios,
                      novidades, lançamentos e ações de marketing.{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-308067b elementor-widget__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <svg
                        aria-hidden="true"
                        className="e-font-icon-svg e-fas-heart"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                      </svg>{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> Fortaleça sua marca </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      Aumente sua frequência no mercado Regional de Alphaville e
                      mantenha uma relação de engajamento, interesse e
                      relevância junto aos seus clientes e novos
                      consumidores.{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-3d3b17f elementor-widget__width-inherit elementor-view-default elementor-position-top elementor-mobile-position-top elementor-widget elementor-widget-icon-box">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-icon-box-wrapper">
                  {" "}
                  <div className="elementor-icon-box-icon">
                    {" "}
                    <span className="elementor-icon">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="uuid-3dab5938-513a-4cac-91e3-39fcb3ec2fb3"
                        data-name="Layer_2"
                        viewBox="0 0 690.4 690.4"
                      >
                        <defs>
                          <style>{` .uuid-a99cfa52-42f8-402e-ba9f-a3d4450ae891 { fill: #ff3131; } `}</style>
                        </defs>
                        <g
                          id="uuid-8ccce416-870f-4460-a097-df7de278020d"
                          data-name="Layer_1"
                        >
                          <g>
                            <path
                              className="uuid-a99cfa52-42f8-402e-ba9f-a3d4450ae891"
                              d="M487.96,0H202.45C90.82,0,0,90.82,0,202.45v285.51c0,111.63,90.82,202.44,202.45,202.44h285.51c111.63,0,202.44-90.82,202.44-202.44V202.45C690.4,90.82,599.58,0,487.96,0ZM491.3,614.88H199.1c-67.22,0-121.9-54.68-121.9-121.9V200.78c0-67.22,54.68-121.9,121.9-121.9h292.2c67.22,0,121.9,54.68,121.9,121.9v292.2c0,67.22-54.68,121.9-121.9,121.9Z"
                            />
                            <path
                              className="uuid-a99cfa52-42f8-402e-ba9f-a3d4450ae891"
                              d="M345.2,164.14c-100.77,0-182.75,81.98-182.75,182.74s81.98,182.75,182.75,182.75,182.74-81.98,182.74-182.75-81.98-182.74-182.74-182.74ZM345.2,452.98c-58.5,0-106.1-47.6-106.1-106.1s47.6-106.1,106.1-106.1,106.1,47.6,106.1,106.1-47.6,106.1-106.1,106.1Z"
                            />
                            <path
                              className="uuid-a99cfa52-42f8-402e-ba9f-a3d4450ae891"
                              d="M526.29,116.65c-26.65,0-48.32,21.68-48.32,48.33s21.68,48.32,48.32,48.32,48.33-21.68,48.33-48.32-21.68-48.33-48.33-48.33Z"
                            />
                          </g>
                        </g>
                      </svg>{" "}
                    </span>{" "}
                  </div>{" "}
                  <div className="elementor-icon-box-content">
                    {" "}
                    <h3 className="elementor-icon-box-title">
                      {" "}
                      <span> Redes Sociais </span>{" "}
                    </h3>{" "}
                    <p className="elementor-icon-box-description">
                      {" "}
                      Amplie ainda mais sua presença digital com nosso Instagram
                      para divulgar e engajar quem mora ou trabalha na Região de
                      Alphaville.{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-000f243 elementor-widget elementor-widget-spacer">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-spacer">
                  {" "}
                  <div className="elementor-spacer-inner"></div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-c125eaa elementor-align-center elementor-button-success elementor-widget elementor-widget-button">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="elementor-button-wrapper">
                  {" "}
                  <a
                    className="elementor-button elementor-button-link elementor-size-sm"
                    href="/contato/"
                  >
                    {" "}
                    <span className="elementor-button-content-wrapper">
                      {" "}
                      <span className="elementor-button-text">
                        QUERO ANUNCIAR
                      </span>{" "}
                    </span>{" "}
                  </a>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-509f6b1 e-flex e-con-boxed e-con e-parent">
        {" "}
        <div className="e-con-inner">
          {" "}
          <div className="elementor-element elementor-element-a8a0d9c e-con-full e-flex e-con e-child">
            {" "}
            <div className="elementor-element elementor-element-80c6f0c elementor-widget__width-inherit elementor-widget elementor-widget-heading">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <h2 className="elementor-heading-title elementor-size-default">
                  EM DESTAQUE
                </h2>{" "}
              </div>{" "}
            </div>{" "}
            <div className="elementor-element elementor-element-62d571b elementor-widget__width-inherit elementor-widget elementor-widget-jet-listing-grid">
              {" "}
              <div className="elementor-widget-container">
                {" "}
                <div className="jet-listing-grid jet-listing">
                  <div className="jet-listing-grid__items grid-col-desk-4 grid-col-tablet-4 grid-col-mobile-1 jet-listing-grid--1833">
                    {destaque.map((a) => (
                      <AnuncianteCard key={a.id} anunciante={a} modelo="1833" />
                    ))}
                  </div>
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <div className="elementor-element elementor-element-2979abf e-con-full e-flex e-con e-parent">
        {" "}
        <div className="elementor-element elementor-element-33b9776 elementor-widget__width-inherit elementor-widget elementor-widget-heading">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <h2 className="elementor-heading-title elementor-size-default">
              APOIO INSTITUCIONAL
            </h2>{" "}
          </div>{" "}
        </div>{" "}
        <div className="elementor-element elementor-element-c7cd4c0 elementor-widget__width-inherit elementor-widget elementor-widget-ucaddon_card_carousel">
          {" "}
          <div className="elementor-widget-container">
            {" "}
            <Carousel widgetId="c7cd4c0" slides={apoio} />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </main>
  );
}
