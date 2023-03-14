import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Admin } from '../pages/Admin';
import { Inquiry, Faq, Notice } from '../pages/Customer';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Policy } from '../pages/Policy';
import { ProjectAdd, ProjectCheck } from '../pages/Project';
import { ChangeDetail, Columns, UserDetail } from '../pages/Users';
import { Change } from '../pages/Users';
import { Classifi } from '../pages/Users';
import { useCookies, Cookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import { useEffect } from 'react';
import { Setting } from '../pages/Setting';

function Root() {
  const [cookies, setCookie] = useCookies(['accessToken']);

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
                <Route path="change/:userName" element={<ChangeDetail />} />
                <Route path="classifi" element={<Classifi />} />
                <Route path=":userEamil" element={<UserDetail />} />
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
                <Route path=":projectId" element={<ProjectAdd isFix={true} />} />
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
