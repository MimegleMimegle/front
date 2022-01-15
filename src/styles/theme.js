import styled from 'styled-components'

// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size) => `${size / 16}rem`

// font size를 객체로 반환해주자.
const fontSizes = {
  small: pixelToRem(9),
  base: pixelToRem(12),
  lg: pixelToRem(14),
  xl: pixelToRem(16),
  xxl: pixelToRem(18),
}

// 자주 사용하는 색을 객체로 만들자.
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#FFD400',
  blue: '#6698FC',
  orange: '#F97D39',
  grey: '#878C92',
  line: '#E5E5E5',
  bg: '#FAFAFA',
}

// 자주 사용하는 스타일 속성을 theme으로 만들어보자.
const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
}

// theme 객체에 감싸서 반환한다.
const theme = {
  fontSizes,
  colors,
  common,
}

export default theme
