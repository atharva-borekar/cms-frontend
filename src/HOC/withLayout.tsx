import React from "react";
import { Outlet } from "react-router";

import { Footer, Header } from "sharedComponents";

const withLayout = (
  wrappedComponent: React.ReactNode,
  includeHeader: boolean
) => {
  return (
    <>
      {includeHeader && <Header />}
      <div className="d-flex flex-column flex-1 overflow-auto">
        <div className="px-5 py-3">{wrappedComponent}</div>
        <Footer />
      </div>
      <Outlet />
    </>
  );
};

export default withLayout;
