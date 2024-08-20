import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bannerBg": "url('./assets/images/bg-SimoneOrac.jpg')",
        "fundoEstrelado": "url('./assets/images/fundoEstrelado.jpg')",
        "fundoLogin": "url('./assets/images/fundoLogin.jpg')"
      },
      colors: {
        "roxoPrincipal": "#8c52ff",
        "branco": "#ffffff",
        "cinzaAzul900": "#343a46",
        "cinzaAzul950": "#22262f",
        "cinzaAzul200": "#d5dae2",
        "cinzaAzul300": "#b0b9c9",
        "cinzaAzul400": "#8694aa",
        "azulFundoChat": "#024bae",
        "roxoFundoChat": "#C76BE3",
        "fundoTextoChat": "#e4eaff",
        "azulTextoChat": "#1378ec"
      },
      padding:{
        "paddingSecaoGeral": "80px 100px",
        "paddingXSecao": "100px",
        "paddingXChat": "0 2vw"
      },      keyframes: {
        entrarMenu: {
          '0%': {
            transform: "translate(0px, -100%)"
          },
          '100%': { 
            transform: "translate(0px, 0px)"
           },
        },
        sairMenu: {
          '0%': {
            transform: "translate(0px, 0px)"
          },
          '100%': { 
            transform: "translate(0px, -100px)"
           },
        }
      },
      animation:{
        entrarMenu: "entrarMenu .3s linear", 
        sairMenu: "sairMenu .3s linear", 
      },
      fontFamily: {
        fontePrincipal: "'EB Garamond', serif",
        poppins: "'Poppins', sans-serif"
      },
      fontSize: {
        textoH1: "60pt",
        textoH2: "48pt",
        textoH3: "36pt",
        textoPadraoMaior: "24pt",
        textoPadrao: "18pt",
        textoGrandeChat: "27px",
        textoMedioChat: "19px",
        textoPadraoChat: "16px",
        textoPequenoChat: "13px"

      }
    },
  },
  plugins: [],
}

