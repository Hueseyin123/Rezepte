//Zuständig fürs Login und die funktionen !
import { Alert, Button, Card, Form, Input, message, Spin, Typography } from "antd";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { API } from "../constant";
import { setToken } from "../helpers";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) throw data?.error;

      setToken(data.jwt);
      setUser(data.user);

      message.success(`Willkommen Zurück ${data.user.username}!`);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message ?? "etwas it schief Gelaufen!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="auth-page">
        <Card title="Einloggen" className="auth-card">
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
            name="Einloggen"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email Adresse"
              name="identifier"
              rules={[{ required: true, type: "email" }]}
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
              <Button type="primary" htmlType="submit" className="login_submit_btn">
                Einloggen {isLoading && <Spin size="small" />}
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph className="form_help_text">
           Du hast noch keinen Account? <Link to="/signup">Registrieren</Link>
          </Typography.Paragraph>
        </Card>
      </div>
    </Fragment>
  );
};

export default SignIn;
