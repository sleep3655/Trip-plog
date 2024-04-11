import React, { useState, useEffect } from "react";
import { Image, Form, Input, Carousel, Button } from "antd";
import NavBar from "../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
// const contentStyle = {
//   margin: 0,
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

const Details = () => {
  const [data, setData] = useState([]);
  // 获取传递参数
  const { id } = useParams();
  console.log("获取的参数id:", id);
  // 根据id获取数据库Plog数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/plog/${id}`
        );
        const data = response.data;
        setData(data);
        console.log("data", data);
      } catch (error) {
        console.error("获取数据有误:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log("data.photourl", data.photourl);
  // 返回审核列表
  const navigate = useNavigate();
  const handleViewClick = () => {
    navigate("/management/view");
  };
  return (
    <NavBar
      title="游记详情"
      operation={<Button onClick={handleViewClick}>返回审核</Button>}
    >
      <img className={styles.bgImg}
        src="https://th.bing.com/th/id/R.0fee376982dced67bfb0eff96523085e?rik=b4ojbn64GHUG3w&riu=http%3a%2f%2fimage.hnol.net%2fc%2f2008-05%2f01%2f23%2f20080501230532125447-1752266.jpg&ehk=RK80R4gGofg5H2t63UUq4b3oENF3LL%2bJjU312T3SJhU%3d&risl=&pid=ImgRaw&r=0"
        alt=""
      />
      <div className={styles.details}>
        <div className={styles.detailsImg}>
          <Carousel
            autoplay
            infiniteloop
            style={{ width: "400px", height: "300px" }}
          >
            {data.photourl &&
              data.photourl.length > 0 &&
              data.photourl.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    style={{
                      width: "400px",
                      height: "300px",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              ))}
          </Carousel>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.detailsTitle}>
            <div>标题：</div>
            <div className={styles.detailsTitleText}>{data.title}</div>
          </div>
          <div className={styles.detailsContent}>
            <div>游记内容：</div>
            <div className={styles.detailsContentText}>{data.content}</div>
          </div>
        </div>
      </div>
    </NavBar>
  );
};
export default Details;
