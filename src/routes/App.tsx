import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';
import { darkMode, lightMode } from '../theme';
import { authService } from '../fireB';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  color:#000
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  -ms-overflow-style: none;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
  overflow: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  const [userObj, setUserObj] = useState<any>(null);
  const isDark = useRecoilValue(isDarkAtom);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
        console.log(userObj)
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, [])
  return (
    <>
      <ThemeProvider theme={isDark ? lightMode : darkMode}>
        <GlobalStyle />
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}  /> : "start..."}
      </ThemeProvider>
    </>
  );
}

export default App;
