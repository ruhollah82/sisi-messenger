import { Card, Flex, Grid, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseTokens } from "../../theme/tokens";
import { useMovingRadial } from "../../hooks/useMovingRadial";
import login from "../../assets/images/auth/login.json";
import signup from "../../assets/images/auth/signup.json";
import Lottie from "lottie-react";
import { TypeAnimation } from "react-type-animation";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LeftSide = () => {
  const screens = useBreakpoint();
  const location = useLocation();
  const [mod, setMod] = useState("login");
  const [image, setImage] = useState(login);

  useEffect(() => {
    const newMod = location.pathname.toLowerCase().includes("signup")
      ? "signup"
      : "login";

    setMod(newMod);
    setImage(newMod === "login" ? login : signup);
  }, [location.pathname]);

  const r1 = useMovingRadial(
    baseTokens.token.secondary3,
    { x: 20, y: 10 },
    60,
    0.6,
    70,
    "perlin",
    "circle"
  );
  const r2 = useMovingRadial(
    baseTokens.token.primary1,
    { x: 80, y: 10 },
    60,
    0.6,
    70,
    "perlin",
    "circle"
  );
  const r3 = useMovingRadial(
    baseTokens.token.primary1,
    { x: 20, y: 90 },
    60,
    0.6,
    70,
    "perlin",
    "circle"
  );
  const r4 = useMovingRadial(
    baseTokens.token.primary2,
    { x: 80, y: 90 },
    60,
    0.6,
    70,
    "perlin",
    "circle"
  );
  const r5 = useMovingRadial(
    baseTokens.token.secondary2,
    { x: 50, y: 50 },
    70,
    0.7,
    120,
    "perlin",
    "circle"
  );

  const background = `${r1}, ${r2}, ${r3}, ${r4}, ${r5}`;

  const staticTitle =
    mod === "login"
      ? "به دنیای شیرین سی‌سی مسنجر خوش اومدییی 🎀💕"
      : "همین الان عضو خانواده‌ی سی‌سی شو ✨🌸";

  const animatedTexts =
    mod === "login"
      ? [
          "وای چه خوب شد اومدییی، جات خیلی خالی بود 🥰💌",
          "اینجا می‌تونی هر روز با رفیقای گلمون گپ بزنی 😍☕",
          "قول میدم همیشه باحال و امن باشه برات ✨🔒",
        ]
      : [
          "اکانتتو بساز تا باهم کلی خوش بگذرونیم 🌸💖",
          "کلی دوست جدید منتظر آشنایی با تو هستن 😍👯‍♀️",
          "با خیال راحت حرفاتو بزن، امنیتش با ماست 🤞🏼🔒",
        ];

  return (
    <Card
      style={{
        background,
        padding: 0,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 0,
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Flex
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "1rem",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          flex: "1",
        }}
      >
        <div
          style={{
            width: "100%",
            height: screens.md ? "400px" : "250px",
            minHeight: screens.md ? "400px" : "250px",
            maxHeight: screens.md ? "400px" : "250px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
          }}
        >
          <Lottie
            animationData={image}
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textAlign: screens.md ? "right" : "center",
            justifyContent: "center",
            minHeight: "auto",
            direction: "rtl",
          }}
        >
          <Title
            level={screens.xl ? 1 : 2}
            style={{
              color: baseTokens.token.primary9,
              margin: 0,
              fontWeight: 800,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontFamily: "'Vazir', 'Tanha', 'Iranian Sans', sans-serif",
            }}
          >
            {staticTitle}
          </Title>

          <Paragraph
            style={{
              fontSize: screens.md ? "1.1rem" : "1rem",
              color: baseTokens.token.primary9,
              fontFamily: "'Vazir', 'Tanha', 'Iranian Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            <TypeAnimation
              key={mod}
              preRenderFirstString={true}
              sequence={animatedTexts.flatMap((text) => [text, 2000])}
              speed={70}
              repeat={Infinity}
              style={{ display: "block", whiteSpace: "pre-line" }}
            />
          </Paragraph>
        </div>
      </Flex>
    </Card>
  );
};

export default LeftSide;
