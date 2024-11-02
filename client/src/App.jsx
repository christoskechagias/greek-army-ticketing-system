import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Header from "./components/layout/header/Header";
import { Layout } from "antd";
import BackgroundImage from "./components/layout/content/BackgroundImage";
const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen">
      <BackgroundImage />
      <Header />
      <Layout hasSider>
        <Sidebar />
        <Layout>
          <Content className="m-3">
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}
export default App;
