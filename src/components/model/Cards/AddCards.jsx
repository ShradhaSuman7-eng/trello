import React, { useState } from "react";
import { createCard } from "../../../services/cards/addCards";
import { Input } from "antd";
import { Button, Flex } from "antd";

const AddCards = ({ listId }) => {
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Button type="primary" block>
        Add New List
      </Button>
    </div>
  );
};

export default AddCards;
