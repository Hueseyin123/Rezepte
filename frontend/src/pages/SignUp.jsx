import {Alert,Button,Card,Col,Form,Input,message,Row,Spin,Typography,
    } from "antd";
    import React, { Fragment, useState } from "react";
    import { Link } from "react-router-dom";
    import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useScreenSize from "../hooks/useScreenSIze";
import { API } from "../constant";
import { setToken } from "../helpers";
import "./SignUp.css";


 const SignUp = () => {
      const { isDesktopView } = useScreenSize();
      const navigate = useNavigate();
    
      const { setUser } = useAuthContext();
    
      const [isLoading, setIsLoading] = useState(false);
    
      const [error, setError] = useState("");
    
      const onFinish = async (values) => {
        setIsLoading(true);
        try {
          const response = await fetch(`${API}/auth/local/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          const data = await response.json();
          if (data?.error) {
            throw data?.error;
          } else {
            setToken(data.jwt);
    
            setUser(data.user);
    
            message.success(`Guten Apetit ${data.user.username}!`);
    
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.error(error);
          setError(error?.message ?? "etwas ist schief Gelaufen");
        } finally {
          setIsLoading(false);
        }
      };
    
      return (
        <Fragment>
          <Row align="middle" className="signup-container-row">
              <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
            <Card title="Registrieren" className="signup-card">
                {error ? (
                  <Alert
                    className="alert_error"
                    title={error}
                    type="error"
                    closable
                    afterClose={() => setError("")}
                  />
                ) : null}
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Name"
                    name="username"
                    rules={[
                      {
                        required: true,
                        type: "string",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    label="Email Adresse"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email addresse" />
                  </Form.Item>
    
                  <Form.Item
                    label="Passwort"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="Passwort" />
                  </Form.Item>
    
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login_submit_btn"
                    >
                      Abschicken {isLoading && <Spin size="small" />}
                    </Button>
                  </Form.Item>
                </Form>
                <Typography.Paragraph className="form_help_text">Du hast schon einen Account? <Link className="a1" to="/signin"> Einloggen</Link>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Fragment>
      );
    };
    
    export default SignUp;