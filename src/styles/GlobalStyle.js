import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}

html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, input, button {
      font-family: 'Pretendard Variable';
      font-style: normal;
      font-weight: 300;
    }

*, *::before, *::after {
  box-sizing : border-box;
}

body {
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 300;
  background-color: #e5e5e5;
  color: #000000;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
}

p, h1, h2, h3, h4 {
	margin: 0;
}

input, textarea {
  padding: 10px;
  outline: none;
}

input:focus, textarea:focus {
  outline: none;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
}

a {
  cursor: pointer;
}

li {
  list-style: none;
}

input, textarea, button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
}

`

export default GlobalStyle
