import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AdmGeral from './Components/AdmGeral/AdmGeral.tsx'
import CadastrosAdm from './Components/CadastrosAdm/CadastrosAdm.tsx'
import Chat from './Components/Chat/Chat.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginProvider } from './Contexts/ContextoLogin/ContextoLogin.tsx'
import { AvisoProvider } from './Contexts/ContextoAviso/ContextoAviso.tsx'
import { UsuarioProvider } from './Contexts/ContextoUsuario/ContextoUsuario.tsx'
import Login from './Components/Login/Login.tsx'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.tsx'
import Blog from './Components/Blog/Blog.tsx'
import { ProfissionaisProvider } from './Contexts/ContextoProfissionais/ContextoProfissionais.tsx'
import { AtendimentoProvider } from './Contexts/ContextoAtendimento/ContextoAtendimento.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
      <AvisoProvider>
      <UsuarioProvider>
      <ProfissionaisProvider>
      <AtendimentoProvider>
        <Routes>
          <Route path="/" element={<App/>}></Route>
          <Route path="/admGeral" element={<AdmGeral/>}>
            <Route path="/admGeral/Cadastros" element={<CadastrosAdm/>}></Route>
          </Route>
          <Route path="/loginUsuario" element={<Login tipoLogin="Usuario"/>}></Route>
          <Route path="/cadastroUsuario" element={<CadastroUsuario/>}></Route>
          <Route path='/chatAtendente' element={<Chat tipoChat="atendente"/>}></Route>
          <Route path='/chat' element={<Chat tipoChat="usuario"/>}></Route>
          <Route path='/blog' element={<Blog/>}></Route>
        </Routes>
      </AtendimentoProvider>
      </ProfissionaisProvider>
      </UsuarioProvider>
      </AvisoProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
