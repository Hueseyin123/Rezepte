  //wird nicht vollständig benutzt
  // SocialCards-Seite: lädt alle Nutzerprofile vom Backend
// und zeigt sie als Karten mit Avatar, Name und Beschreibung an.
  import {
      Button,
      Card,
      Col,
      Image,
      message,
      Row,
      Space,
      Spin,
      Typography,
    } from "antd";
    import { useEffect, useState } from "react";

    

    import { API, AVATAR_API } from "../../constant";
    
    const SocialCards = () => {
      const [profiles, setProfiles] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    
      const fetchProfiles = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${API}/users`);
          const data = await response.json();
          setProfiles(data ?? []);
        } catch (error) {
          console.error(error);
          message.error("Error while fetching profiles!");
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        fetchProfiles();
      }, []);
    
      if (isLoading) {
        return <Spin size="large" />;
      }
    
      return (
        <Row gutter={[32, 32]}>
          {profiles.map((profile, index) => (
            <Col md={8} lg={8} sm={24} xs={24} key={`${profile.id}_${index}`}>
              <Card className="social_card">
                <Space
                  className="social_card_space"
                  direction="vertical"
                  align="center"
                >
                  <Image
                    className="social_image"
                    preview={false}
                    src={
                      profile.avatar_url ??
                      `${AVATAR_API}?name=${profile.username}&background=1890ff&color=fff`
                    }
                  />
                  <Typography.Title level={5}>{profile.username}</Typography.Title>
                  <Typography.Paragraph>{profile.about}</Typography.Paragraph>
                  <Space size={16} wrap>
                   
                   
                    
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      );
    };
    
    export default SocialCards;

