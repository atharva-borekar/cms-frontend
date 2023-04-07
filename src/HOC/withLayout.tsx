import React from "react";
import { Container } from "react-bootstrap";
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
        <Container>{wrappedComponent}</Container>
        <Footer />
      </div>
      <Outlet />
    </>
  );
};

export default withLayout;
