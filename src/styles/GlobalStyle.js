import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}
*, *::before, *::after {
  box-sizing : border-box;
}

body {
  /* font-family: ; */
  background-color: #e5e5e5;
  color: #111;
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

`

export default GlobalStyle
