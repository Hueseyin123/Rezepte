import { Col, Layout, Row } from "antd";
import "./index.css";
import AppHeaderNew from "./components/Appheader/AppheaderNew";
import AppRoutes from "./Routes";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import AuthProvider from "./context/AuthProvider";

const { Header, Content } = Layout;

const link = new HttpLink({
  uri: "http://localhost:1337/graphql",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <div className="overlay"></div>

      <ApolloProvider client={client}>
        <AuthProvider>
          <Row gutter={[0, 32]}>
            
            <Col span={24}>
              <Header style={{ padding: 0, background: "transparent" }}>
                <AppHeaderNew />
              </Header>
            </Col>

            <Col span={22} offset={1}>
              <Content style={{ background: "transparent" }}>
                <AppRoutes />
              </Content>
            </Col>

          </Row>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}
