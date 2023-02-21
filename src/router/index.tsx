import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { Admin } from '../pages/Admin';
import { Inquiry, Faq, Notice } from '../pages/Customer';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Policy } from '../pages/Policy';
import { ProjectAdd, ProjectCheck } from '../pages/Project';
import { Columns } from '../pages/Users';
import { Change } from '../pages/Users';
import { Classifi } from '../pages/Users';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import { useEffect } from 'react';
import { Setting } from '../pages/Setting';

function Root() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  useEffect(() => {}, [cookies.accessToken]);

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          {cookies?.accessToken && (
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<Navigate to="/" />} />
              <Route index element={<Dashboard />} />
              <Route path="admin" element={<Admin />} />
              <Route path="/users">
                <Route path="columns" element={<Columns />} />
                <Route path="change" element={<Change />} />
                <Route path="classifi" element={<Classifi />} />
              </Route>

              <Route path="/customer">
                <Route path="inquiry" element={<Inquiry />} />
                <Route path="faq" element={<Faq />} />
                <Route path="notice" element={<Notice />} />
              </Route>
              <Route path="policy" element={<Policy />} />
              <Route path="/project">
                <Route path="check" element={<ProjectCheck />} />
                <Route path="add" element={<ProjectAdd isAdd={true} />} />
                <Route path="detail/:projectId" element={<ProjectAdd isFix={true} />} />
              </Route>
              <Route path="setting" element={<Setting />} />
            </Route>
          )}
          {!cookies?.accessToken && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default Root;
