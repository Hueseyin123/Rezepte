import { Button, Card, Col, Form, Input, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { useState } from "react";
import { getToken } from "../../helpers";
import { Checkbox } from "antd";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';


const maxUpdates = 3;
let UpdateCount = 0;
let gesperrtbis = null;
let intervalId = null;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { user, isLoading, setUser } = useAuthContext();
  const [Count, setCounter] = useState(15)
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };


  function setCount(){
    const _count = Math.round(((gesperrtbis - Date.now()) / 1000)); 
    setCounter(_count)
          

    if (_count <= 0){
      console.log("intervalId: "+intervalId)
      clearInterval(intervalId)
    }
  }


  const handleProfileUpdate = async (values) => {
    setLoading(true);
    UpdateCount += 1;
    
    if (gesperrtbis > Date.now()) {
      setLoading(false);
      UpdateCount = 0;
      setSnackbarOpen(true);
      return;
    }

    if (UpdateCount > maxUpdates) {
      gesperrtbis = Date.now() + 15000;
      setLoading(false);
      intervalId = setInterval(setCount, 1000)
      console.log("x: "+ intervalId)

      setSnackbarOpen(true);
      return;
    }

    console.log(gesperrtbis)
    console.log(UpdateCount)
 
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(values),
      });

      const json = await response.json();
      console.log("UPDATE RESPONSE:", json);
      if (json.error) {
        console.error(json.error);
        return;
      }

      setUser(json);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Card className="profile_page_card">
      <Form
        layout="vertical"
        initialValues={{
          username: user?.username,
          email: user?.email,
          avatar_url: user?.avatar_url,
          website_url: user?.website_url,
          about: user?.about,
        }}
        onFinish={handleProfileUpdate}
      >
        <Row gutter={[16, 16]}>
          <Col md={22} lg={10} sm={22} xs={22}>
            <Form.Item
              label="Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Name ist Pflicht!",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col md={22} lg={22} sm={22} xs={22}>
            <Form.Item
              label="Email adresse"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email adresse ist pflicht!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email adresse" />
            </Form.Item>
          </Col>
        </Row>

        <Col md={22} lg={22} sm={22} xs={22} style={{ marginTop: 150 }}>
          <Form.Item
            name="allowUpdate"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Bitte erlauben Sie uns, Sie zu updaten!",
              },
            ]}
          >
            <Checkbox>Dürfen wir Sie updaten?</Checkbox>
          </Form.Item>
        </Col>

        <Button
          className="profile_save_btn"
          htmlType="submit"
          type="primary"
          size="large"
          loading={loading}
        >
          {loading ? (
            <>
              <Spin size="small" /> Wird gespeichert..
            </>
          ) : (
            "Speichern"
          )}
        </Button>
      </Form>


<Snackbar
  open={snackbarOpen}
  autoHideDuration={5000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert 
    onClose={handleSnackbarClose} 
    severity="error" 
    variant="filled" 
    sx={{ width: '100%' }}
  >
    Zu viele Updates! Bitte warte {Count} Sekunden
  </Alert>
</Snackbar>
    </Card>
  );
};

export default Profile;
