import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AdmGeral from './Components/AdmGeral/AdmGeral.tsx'
import CadastrosAdm from './Components/CadastrosAdm/CadastrosAdm.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginProvider } from './Contexts/ContextoLogin/ContextoLogin.tsx'
import { AvisoProvider } from './Contexts/ContextoAviso/ContextoAviso.tsx'
import { UsuarioProvider } from './Contexts/ContextoUsuario/ContextoUsuario.tsx'
import Login from './Components/Login/Login.tsx'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
      <AvisoProvider>
      <UsuarioProvider>
        <Routes>
          <Route path="/" element={<App/>}></Route>
          <Route path="/admGeral" element={<AdmGeral/>}>
            <Route path="/admGeral/Cadastros" element={<CadastrosAdm/>}></Route>
          </Route>
          <Route path="/loginUsuario" element={<Login tipoLogin="Usuario"/>}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario/>}></Route>
        </Routes>
      </UsuarioProvider>
      </AvisoProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
