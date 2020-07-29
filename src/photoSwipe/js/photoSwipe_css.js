
const photoSwipeCss = `
/*! PhotoSwipe main CSS by Dmitry Semenov | photoswipe.com | MIT license */
/*
	Styles for basic PhotoSwipe functionality (sliding area, open/close transitions)
*/
/* pswp = photoswipe */
.pswp {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  -ms-touch-action: none;
  touch-action: none;
  z-index: 1500;
  -webkit-text-size-adjust: 100%;
  /* create separate layer, to avoid paint on window.onscroll in webkit/blink */
  -webkit-backface-visibility: hidden;
  outline: none; }
  .pswp * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box; }
  .pswp img {
    max-width: none; }

/* style is added when JS option showHideOpacity is set to true */
.pswp--animate_opacity {
  /* 0.001, because opacity:0 doesn't trigger Paint action, which causes lag at start of transition */
  opacity: 0.001;
  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--open {
  display: block; }

.pswp--zoom-allowed .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-zoom-in;
  cursor: -moz-zoom-in;
  cursor: zoom-in; }

.pswp--zoomed-in .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab; }

.pswp--dragging .pswp__img {
  /* autoprefixer: off */
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing; }

/*
	Background is added as a separate element.
	As animating opacity is much faster than animating rgba() background-color.
*/
.pswp__bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0;
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  will-change: opacity; }

.pswp__scroll-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; }

.pswp__container,
.pswp__zoom-wrap {
  -ms-touch-action: none;
  touch-action: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; }

/* Prevent selection and tap highlights */
.pswp__container,
.pswp__img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
      user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none; }

.pswp__zoom-wrap {
  position: absolute;
  width: 100%;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  /* for open/close transition */
  -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp__bg {
  will-change: opacity;
  /* for open/close transition */
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
          transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }

.pswp--animated-in .pswp__bg,
.pswp--animated-in .pswp__zoom-wrap {
  -webkit-transition: none;
  transition: none; }

.pswp__container,
.pswp__zoom-wrap {
  -webkit-backface-visibility: hidden; }

.pswp__item {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden; }

.pswp__img {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  left: 0; }

/*
	stretched thumbnail or div placeholder element (see below)
	style is added to avoid flickering in webkit/blink when layers overlap
*/
.pswp__img--placeholder {
  -webkit-backface-visibility: hidden; }

/*
	div element that matches size of large image
	large image loads on top of it
*/
.pswp__img--placeholder--blank {
  background: #222; }

.pswp--ie .pswp__img {
  width: 100% !important;
  height: auto !important;
  left: 0;
  top: 0; }

/*
	Error message appears when image is not loaded
	(JS option errorMsg controls markup)
*/
.pswp__error-msg {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  margin-top: -8px;
  color: #CCC; }

.pswp__error-msg a {
  color: #CCC;
  text-decoration: underline; }

.pswp_extends_close{
  position:absolute;
  right:1.25rem;
  top:1.25rem;
  width:2.25rem;
  height:2.25rem;
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAaVBMVEUAAAD4+Pi7u7tnZ2cyMjLIyMj+/v5HcEz8/Pz////////f39////////9PT090dHT///+EhIQPDw/////t7e3////////////Z2dmmpqb////////T09OlpaWUlJT///////+xsbH///8vlG3yAAAAInRSTlNM5ZtpWKj0AO770MRxs2FwBXZPCtlYHje7i2NCtIt/koiUBwkSmwAAAtVJREFUWMOtmNm2qyAMQKNCD1pxHlo7+/8feSVQWxVQe8mLazlsM5EE4M8ibffkkcfCkHkRf3at7V0wPWhifuhncuBxsw9U1jzstRLyutwMKmPWW4TF5SZQ9sGwI72lCSkKkqQ3evzcj7N1UBuptys/gJkEfqUeRu0KKHsot9IFRbGoCsEjs4EaqQ6jBAxSAKHSxKgxgy7ybycjRgo5Sa0vJlCNIfdyWJXcw1So9aAOOUcCG4QckdTpQFIfHzaKH051GkEXfHCGzXLGDy5zUCP8HN5hh9wF6dBMQRnG/Qa7BHWKsgnoscs/o58wM79BLcYLdgvGrv2A0DCP7AcRbzQOQbEA5/CD5OLL+A0qxeI5wU8iVgsrFUgoxMhvIMKUSqAUovCjUKXSAKpFXi0U0mt49uf3icjkGkFcoxCp+ipZFqMh3NX8nlCJC1Aj8jPQpJqXaDh9P1cpEGurGUDC1fPfwK3XkLCeLV6FCt0NaJmvz1lvouhVB1fa8wF00Fj2NoMF6xy07fAHYpkxXZVHQ1j6HWYtB0CkTwudabkW128SnSs4c0MHT3M2IumQjwXDwMGfPIFbChp9k/ypmZoQcxAVJAUr6f7Ci/GtVNQSEBUlsdfAMBxN1EoiwoAuJyvV1M4BgoEXfyssq/uF7c7aXwrxwiroLke31yrIblqRvwdJf800u7MlZ6WZS2dbw58i53XHC7WH35aQKVOq5FaSTEjLEgnYaJIkXW1LxLhoFYd+K3e1LFpTGYHEm5gjSafCWEYMhU1xrnMFj4WpsBlK7YIzfODpR413qY2NFX3exiX8bCr+2nZEtGYgyTe1I22DFL/RuCMZ+ibRBJ+bWzbx9XPpsrV/WrazIeJ/xprie6xxN2g5G/3cDaPOxmN3A7vaQpz3cXRbCGebGnfbLHcbP3dbUXebY3fb9S0HCLDpAMHdkYa7QxaHxz7uDqIcHo05PKz74fjwH7t7pGX0+GcxAAAAAElFTkSuQmCC');
  background-size:100% 100%;
  background-repeat:no-repeat;
}
`

export default photoSwipeCss