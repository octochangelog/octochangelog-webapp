import React from 'react';
import { Flex, CSSReset, ThemeProvider } from '@chakra-ui/core';
import Header from './Header';
import Footer from './Footer';
import { Global } from '@emotion/core';
import { globalStyles } from '../global';
import Container from './Container';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Global styles={globalStyles} />
      <Flex height="100%" direction="column">
        <Header />
        <Container my={4} flex="1 0 auto">
          <p>
            Lorem fistrum a gramenawer caballo blanco caballo negroorl no te
            digo trigo por no llamarte Rodrigor va usté muy cargadoo ese que
            llega jarl fistro qué dise usteer condemor diodenoo. Ese pedazo de
            ese pedazo de por la gloria de mi madre no te digo trigo por no
            llamarte Rodrigor. De la pradera papaar papaar tiene musho peligro
            sexuarl te voy a borrar el cerito va usté muy cargadoo a wan te va a
            hasé pupitaa por la gloria de mi madre papaar papaar. Ese que llega
            ese pedazo de ese pedazo de papaar papaar a peich. Ese que llega ese
            hombree diodenoo a gramenawer ese que llega ese pedazo de ese
            hombree condemor por la gloria de mi madre sexuarl mamaar. Por la
            gloria de mi madre apetecan quietooor me cago en tus muelas llevame
            al sircoo. Fistro va usté muy cargadoo tiene musho peligro amatomaa
            se calle ustée mamaar ese pedazo de ese que llega. No puedor
            apetecan a peich va usté muy cargadoo quietooor benemeritaar a wan
            no puedor de la pradera pecador qué dise usteer.
          </p>

          <p>
            Te va a hasé pupitaa llevame al sircoo no te digo trigo por no
            llamarte Rodrigor mamaar a gramenawer pecador caballo blanco caballo
            negroorl. Ese hombree diodenoo va usté muy cargadoo qué dise usteer
            sexuarl te va a hasé pupitaa te va a hasé pupitaa al ataquerl al
            ataquerl a wan. Te va a hasé pupitaa llevame al sircoo pecador
            caballo blanco caballo negroorl va usté muy cargadoo. Condemor hasta
            luego Lucas sexuarl va usté muy cargadoo me cago en tus muelas
            torpedo. A peich por la gloria de mi madre benemeritaar de la
            pradera pupita condemor pupita la caidita al ataquerl. Tiene musho
            peligro la caidita va usté muy cargadoo hasta luego Lucas ahorarr
            papaar papaar al ataquerl no puedor jarl mamaar torpedo. Te va a
            hasé pupitaa diodenoo ese hombree diodenoo fistro. Por la gloria de
            mi madre no te digo trigo por no llamarte Rodrigor por la gloria de
            mi madre caballo blanco caballo negroorl mamaar te voy a borrar el
            cerito quietooor no puedor al ataquerl. Quietooor se calle ustée
            pupita al ataquerl jarl no puedor mamaar te voy a borrar el cerito
            ese hombree benemeritaar.
          </p>

          <p>
            Papaar papaar va usté muy cargadoo papaar papaar diodeno hasta luego
            Lucas por la gloria de mi madre quietooor a peich. Jarl qué dise
            usteer ahorarr a peich a wan de la pradera apetecan te voy a borrar
            el cerito no puedor a gramenawer apetecan. Sexuarl me cago en tus
            muelas a wan diodenoo a wan se calle ustée amatomaa apetecan mamaar
            ese pedazo de. Pupita la caidita no te digo trigo por no llamarte
            Rodrigor quietooor fistro diodeno a gramenawer. Jarl amatomaa te voy
            a borrar el cerito quietooor condemor torpedo condemor a wan
            apetecan sexuarl. Apetecan fistro ahorarr condemor qué dise usteer
            diodenoo a wan ese que llega.
          </p>
        </Container>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
