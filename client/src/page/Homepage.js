import React, { useEffect, useState } from "react";
import DLayout from "../components/DLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState("fruits");
  const categories = [
    {
      name: "fruits",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg",
    },
    {
      name: "vegetables",
      imageURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg",
    },
    {
      name: "Snacks",
      imageURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXvFHoiKigrGEoArHnBOZlHJ8-bGRLlRpHPQ&s",
    },
    {
      name: "Beverages",
      imageURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqlCnaLwHISYXSWGGLXeyma6XBYs3t5Z5cqQ&s",
    },
  ];
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DLayout>

      <div className="d-flex categories">
            {categories.map((category)=>{
              return <div 
              onClick={()=>setSelectedCategoty(category.name)}
              className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                      <h4>{category.name}</h4>
                      <img src={category.imageURL} height='60' width='80' />
              </div>
            })}
      </div>

      <Row gutter={20}>

        {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DLayout>
  );
}

export default Homepage;