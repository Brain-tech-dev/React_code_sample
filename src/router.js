import React, { Suspense, Fragment, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarLayout from './Layout/SidebarLayout';
import Authenticated from './Guard/Authenticated';
import LoadScreen from './Component/loaderScreen';
export function RenderRout() {
 
  return (
    <>
      <Router>
        <Suspense fallback={<LoadScreen/>}
        >
          <Routes>
            {routes?.map((route, i) => {
              const Guard = route?.guard || Fragment;
              const Auth = route?.auth || Fragment;
              const Layout = route?.layout || Fragment;
              const Component = route?.element;
              return (
                <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  element={
                    <Guard>
                      <Auth>
                        <Layout >
                          <Component />
                        </Layout>
                      </Auth>
                    </Guard>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </Router>
    </>
  )

}

const routes = [
//Tanet
  {
    guard: Authenticated,
    layout: SidebarLayout,
    exact: true,
    path: '/tenant',
    element: lazy(() => import('./Component/Pages/Tenent/Index'))

  },
  //Material 
  {
    guard: Authenticated,
    layout: SidebarLayout,
    exact: true,
    path: '/material',
    element: lazy(() => import('./Component/Pages/Material/Index'))

  },
  
]